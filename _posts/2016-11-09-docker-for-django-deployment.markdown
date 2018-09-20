---
layout: blog_base
title: deploy Django project with docker
category: programming
tag: python
meta_desc: learn to deploy Django project in production env with docker
---

Docker is a very popular container and a lot of companies are using it -- it provides isolation and flexibility to application development and deployment. Especially when you do not have sudo access and you want to deploy your web application, docker can be very handy.

To get started, you have to have to be able to connect docker daemon and run docker commands -- so docker has to be installed and running and you have to be added to the docker group. You could test your access to docker via `docker ps` to see the output.

Now let's say you have a sample Django web application to deploy. The traditional way is to have Nginx + uwsgi + Django + RDBMS (for example, PostgreSQL) and now we are going to do the same with docker and once configured properly, the same script can be just moved to another machine and boot web application with just a command.

To manage things with greater ease, I recommend installing docker-compose which will help to bring up a few connected containers in one way. So `pip install docker-compose`. Notice this command does not require sodo access if a virtual environment is created and used.

First let's understand the structure: Python code will live in a Python container and run by uwsgi; Nginx is responsible for serving static files and forward requests to uwsgi -- so Nginx container should be able to access uwsgi port and be able to access static files in Django, and if needed, uploaded files need to be shared between Nginx and Django as well; for data storage and caching, PostgreSQL and redis should be linked to Django as well. Following graph illustrate this process:

<image src="/img/blogs/django_deployment_dependency_graph.png"></image>

Let's get started with redis and PostgreSQL since they do not have any dependencies.

~~~
# postgres Dockerfile
# I recommend created a separate deployment folder and postgres sub folder
# you can change the version of postgres if needed
FROM postgres:9.5

MAINTAINER franklingu
~~~

~~~
# redis Dockerfile
FROM redis:3.2

MAINTAINER franklingu
~~~

And we are done with caching and database -- that is 2 out of 4 done!

Let's move on to Django container. So for production deployment, there are a few things to modified to make sure your app is secure and the most important thing is to turn debug off. Let's modify settings.py then.

~~~python
# additional part, placed at bottom of settings.py, not to be overriden
DEBUG = True
DEBUG = False if os.environ.get('DJANGO_DEPLOYMENT') else True
if not DEBUG:
    SECRET_KEY = os.environ['DJANGO_SECRET_KEY']
    # currently no ssl support at the moment
    CSRF_COOKIE_SECURE = False
    SESSION_COOKIE_SECURE = False
    CSRF_COOKIE_HTTPONLY = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    SECURE_BROWSER_XSS_FILTER = True
    X_FRAME_OPTIONS = 'DENY'
    SITE_URL = 'production_url'
    ALLOWED_HOSTS = ['production_url']
        DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.environ['POSTGRES_DB'],
            'USER': os.environ['POSTGRES_USER'],
            'PASSWORD': os.environ['POSTGRES_PASSWORD'],
            'HOST': 'postgres',
            'PORT': '5432',
            'CONN_MAX_AGE': 3600,
        }
    }
	MEDIA_ROOT = '/usr/src/uploads/'
    STATIC_ROOT = '/usr/src/static/'
~~~

Of course there could be other things you want to do differently in production env, for example, you may want to remove django-extensions and django-debug-toolbar from INSTALLED_APPS.

Notice that in the above script, some os environments variables are used -- these need to be set by docker container -- we will get back to this later.

Let's create Dockerfile for Django container:

~~~
# Dockerfile for deployment
FROM ubuntu:16.04

# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
ENV DEBIAN_FRONTEND noninteractive
# Install all required packages here and do a clean to reduce image size
RUN apt-get update && apt-get install -y build-essential \
    libpq-dev libssl-dev libffi-dev python3-pip \
    apt-get clean
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY requirements.txt /usr/src/app/
RUN pip3 install -U pip setuptools
RUN pip3 install -r requirements.txt
RUN pip3 install uwsgi
# Copy source code to container
COPY . /usr/src/app/
RUN mkdir -p /var/run/uwsgi \
    /var/log/uwsgi \
    /var/log/app \
    /usr/src/app/run \
    /var/data/app
~~~

So basically there we are installing necessary system packages, Python packages and create necessary runtime directories for application.

We also need to prepare script and configuration files for uwsgi.

~~~
# uwsgi.ini file
[uwsgi]
# Django-related settings
# the base directory (full path)
chdir = /usr/src/app
# Django's wsgi file
module = webapp.wsgi

# process-related settings
# master
master = True
# maximum number of worker processes
processes = 10
# the socket (use the full path to be safe
socket = :8000
# ... with appropriate permissions
chmod-socket = 664
# clear environment on exit
vacuum = True

# set an environment variable
env = DJANGO_SETTINGS_MODULE=doc_store.settings
# create a pidfile
safe-pidfile = /var/run/uwsgi/doc_store.pid
# respawn processes taking more than 20 seconds
harakiri = 20
# limit the project to 128 MB, inactive
# limit-as        = 128
# respawn processes after serving 5000 requests
max-requests = 5000

single-interpreter=True
enable-threads=True
~~~

~~~
#!/usr/bin/env bash
# uwsgi start.sh script
python3 manage.py migrate --noinput
python3 manage.py collectstatic --noinput
/usr/local/bin/uwsgi --ini /usr/src/app/deployment/uwsgi/uwsgi.ini
~~~

And for nginx, we need to make the link to Django container is done well, and access to static files and uploaded files are done. So the last step is a bit heavier than previous steps:

~~~
# Nginx container Dockerfile
FROM nginx:latest

MAINTAINER franklingu

WORKDIR /
ADD website.conf /
ADD ssl/*.crt /etc/ssl/certs/
ADD ssl/*.key /etc/ssl/private/
ADD start.sh /
RUN chmod +x start.sh
~~~

~~~
# nginx configuration file. in this case it is named as website.conf
# normally you leave this at the default of 1024
events {
    worker_connections 1024;
}

http {
    # cf http://blog.maxcdn.com/accept-encoding-its-vary-important/
    gzip_vary on;
    gzip_proxied any;
    gzip_types *;

    # http://nginx.org/en/docs/http/configuring_https_servers.html#optimization
    ssl_session_cache shared:SSL:1m;
    ssl_session_timeout 10m;

    server_tokens off;

    # the upstream component nginx needs to connect to
    upstream django {
        server webapp:8000;
    }

    server {
        listen 80 default_server;
        # the domain name it will serve for
        server_name ${NGINX_SERVER_NAME};
        charset     utf-8;

        # max upload size
        client_max_body_size 75M;

        # Django media
        location /media  {
            alias /usr/src/uploads;
        }

        location /static {
            alias /usr/src/static;
            # http://stackoverflow.com/q/19213510/1346257
            include /etc/nginx/mime.types;
        }

        location = /robots.txt { return 200 "User-agent: *\nAllow: /"; }
        location = /favicon.ico { access_log off; log_not_found off; return 404; }

        #Prevent serving of sysfiles / vim backup files
        location ~ /\.          { access_log off; log_not_found off; deny all; }
        location ~ ~$           { access_log off; log_not_found off; deny all; }

        # Finally, send all non-media requests to the Django server.
        location / {
            uwsgi_pass  django;
            include     uwsgi_params; # the uwsgi_params file you installed
        }
    }

    # configuration of the server
    server {
        # the port your site will be served on
        listen 433 ssl default_server;
        # the domain name it will serve for
        server_name ${NGINX_SERVER_NAME};
        charset     utf-8;

        ssl_certificate /etc/ssl/certs/${NGINX_CRT_NAME}.crt;
        ssl_certificate_key /etc/ssl/private/${NGINX_KEY_NAME}.key;
        ssl_prefer_server_ciphers on;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # ie defaults minus SSLv3

        # max upload size
        client_max_body_size 75M;

        # Django media
        location /media  {
            alias /usr/src/app/uploads;
        }

        location /static {
            alias /usr/src/app/staticfiles;
            # http://stackoverflow.com/q/19213510/1346257
            include /etc/nginx/mime.types;
        }

        location = /robots.txt { return 200 "User-agent: *\nAllow: /"; }
        location = /favicon.ico { access_log off; log_not_found off; return 404; }

        #Prevent serving of sysfiles / vim backup files
        location ~ /\.          { access_log off; log_not_found off; deny all; }
        location ~ ~$           { access_log off; log_not_found off; deny all; }

        # Finally, send all non-media requests to the Django server.
        location / {
            uwsgi_pass  django;
            include     uwsgi_params; # the uwsgi_params file you installed
        }
    }
}
~~~

~~~
#!/usr/bin/env bash
# start.sh
envsubst '${NGINX_CRT_NAME} ${NGINX_KEY_NAME} ${NGINX_SERVER_NAME}' < website.conf > /etc/nginx/nginx.conf

nginx -g "daemon off;"
~~~

And finally, a docker-compose file to stick all of the things together:

~~~
version: '2'
services:
  webapp_db:
    container_name: webapp_db
    build: ./deployment/psql
    mem_limit: 1024m
    volumes:
      - /export/scratch/data/webapp/pg_data:/var/lib/postgresql/data
    ports:
      - "0.0.0.0:5433:5432"
    env_file:
      - ./deployment/environ/deployment.env
  webapp_redis:
    container_name: webapp_redis
    build: ./deployment/redis
    mem_limit: 2048m
    expose:
      - "6379"
    env_file:
      - ./deployment/environ/deployment.env
  webapp:
    container_name: webapp
    build:
      context: .
      dockerfile: ./Dockerfile.webapp
    command: /usr/src/app/deployment/uwsgi/start.sh
    mem_limit: 1024m
    depends_on:
      - webapp_db
      - webapp_redis
    volumes:
      - /usr/src/static
      - /usr/src/uploads
    expose:
      - "8000"
    env_file:
      - ./deployment/environ/deployment.env
  webapp_nginx:
    container_name: webapp_nginx
    build: ./deployment/nginx
    command: /bin/bash start.sh
    mem_limit: 1024m
    links:
      - webapp
    depends_on:
      - webapp
    volumes_from:
      - webapp
    ports:
      - "0.0.0.0:80:80"
      - "0.0.0.0:433:433"
    env_file:
      - ./deployment/environ/deployment.env
~~~
