---
layout: blog_base
title: Deployment of web server using Nginx and puma on CentOS
category: development
tag: programming, puma, nginx, CentOS, deployment
meta_desc: A simple guide for deployment of puma with nginx as reverse proxy server on CentOS 7. Forward requests to internal running puma processes using nginx
---

[Nginx](http://nginx.org/en/) is a great web server which is mostly based on reverse proxy. Well, I guess this is not precise, so let us consult its official website:
> nginx [engine x] is an HTTP and reverse proxy server, a mail proxy server, and a generic TCP proxy server, originally written by Igor Sysoev. For a long time, it has been running on many heavily loaded Russian sites including Yandex, Mail.Ru, VK, and Rambler. According to Netcraft, nginx served or proxied 23.36% busiest sites in September 2015. Here are some of the success stories: Netflix, Wordpress.com, FastMail.FM.

And puma(not the sports branch of course), well, should be familiar to most Ruby On Rails developers. But I will just copy and paste some intro to it here:
> Unlike other Ruby Webservers, Puma was built for speed and parallelism. Puma is a small library that provides a very fast and concurrent HTTP 1.1 server for Ruby web applications. It is designed for running Rack apps only.
What makes Puma so fast is the careful use of a Ragel extension to provide fast, accurate HTTP 1.1 protocol parsing. This makes the server scream without too many portability issues.

Honestly, there are a lot of posts online about using nginx with puma. But the problem is that what I have found were either on Ubuntu or too outdated(imprecise) on CentOS. Even if some solutions may seems to work that I have tried, I was stopped by some administration issue with the server. In the end, I figured out a relatively easy way to setup a webserver with nginx + puma on CentOS.

Well, by the time I am writing this post, if you use yum directly download and install nginx from CentOS is just fine. So there is completely no need for adding any thing to your source--simply:

```
sudo yum update
sudo yum install nginx
```

Then after that you just need to start nginx service by typing:

```
service nginx start
service nginx status -l  # for checking status of the server
```

So the default behavior of Nginx server is to listen on port 80 of your server. So try to access by typing your domain name or IP address in the browser address bar. And if your firewall settings are fine--allow tcp connections on port 80--you should be seeing a default Nginx page. (If you see connection refused for example, use "iptables" command to check[iptables guide](http://www.thegeekstuff.com/2010/07/list-and-flush-iptables-rules/)).

So now it is about serving your own puma server. Assume that your Rails app is ready in some folder already. Then navigate to that folder and start the server. Of course you can use "rails serve" command but I would recommend you to use "puma" for more control. If you want to a template for puma config file, see [its example on GitHub](https://github.com/puma/puma/blob/master/examples/config.rb). I would say you should just bind to port 9292 for now to get started. If you want to dig more, of course there are more to configure such as set number of workers to be numbers of cores of your server ...

Just start the puma server by:

```
RAILS_ENV=production puma &  # running in background
```

Now let's configure nigix to serve your website instead of serving its default html. Here is an example:

```
upstream my_app {
  server 127.0.0.1:9292;  # or the port you configured in puma configuration file
}

server {
  listen 80;
  server_name my_app_url.com; # change to match your URL, or localhost for simplicity
  root /var/www/my_app/public; # the path to your app directory + /public
                               # the default Rails public folder in an app

  location / {
    proxy_pass http://my_app; # match the name of upstream directive which is defined above
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }

  location ~* ^/assets/ {
    # Per RFC2616 - 1 year maximum expiry
    expires 1y;
    add_header Cache-Control public;

    # Some browsers still send conditional-GET requests if there's a
    # Last-Modified header or an ETag header even if they haven't
    # reached the expiry date sent in the Expires header.
    add_header Last-Modified "";
    add_header ETag "";
    break;
  }
}
```

Just insert this block of code in /etc/nginx/nginx.conf. But make sure you delete the original definition of serving html from nginx folder.

And that is it. Of course there should be more to explore. For one I just learn about this and for another, this is only a guide to get you started with running nginx to server puma processes.

Have fun and code on :P
