---
layout: blog_base
title: Understand Python web server models with examples
category: programming
tag: Python
meta_desc: Understand Python web server models with examples--single linear process, multi-processing, multi-threading, epoll.
---

In this post we will explore linear process, multi-processing and multi-threading and epoll as different models for Python web server.

~~~python
import socket

response = 'HTTP/1.1 200 OK\r\nConnection: Close\r\nContent-Length: 11\r\nHello world'

server = socket.socket()
server.bind(('0.0.0.0', 9527))
server.listen(1024)

while True:
    client, addr = server.accept()
    request = client.recv(1024)
    client.send(response)
    client.close()
~~~

Benchmark with `ab` with `ab -n 100000 -c 4 http://localhost:9527/`

~~~
Concurrency Level:      4
Time taken for tests:   6.218 seconds
Complete requests:      100000
Failed requests:        0
Total transferred:      6700000 bytes
HTML transferred:       0 bytes
Requests per second:    16082.28 [#/sec] (mean)
Time per request:       0.249 [ms] (mean)
Time per request:       0.062 [ms] (mean, across all concurrent requests)
Transfer rate:          1052.26 [Kbytes/sec] received
~~~

~~~python
import socket
import multiprocessing

response = 'HTTP/1.1 200 OK\r\nConnection: Close\r\nContent-Length: 11\r\nHello world'

server = socket.socket()
server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
server.bind(('0.0.0.0', 9527))
server.listen(1024)


def handler():
    while True:
        client, addr = server.accept()
        request = client.recv(1024)
        client.send(response)
        client.close()

for _  in range(4):
    process = multiprocessing.Process(target=handler, args=())
    process.start()
~~~

~~~
Concurrency Level:      4
Time taken for tests:   5.310 seconds
Complete requests:      100000
Failed requests:        0
Total transferred:      6700000 bytes
HTML transferred:       0 bytes
Requests per second:    18832.12 [#/sec] (mean)
Time per request:       0.212 [ms] (mean)
Time per request:       0.053 [ms] (mean, across all concurrent requests)
Transfer rate:          1232.18 [Kbytes/sec] received
~~~

~~~python
import socket
import threading

response = 'HTTP/1.1 200 OK\r\nConnection: Close\r\nContent-Length: 11\r\nHello world'

server = socket.socket()
server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
server.bind(('0.0.0.0', 9527))
server.listen(1024)


def handler():
    while True:
        client, addr = server.accept()
        request = client.recv(1024)
        client.send(response)
        client.close()

for _  in range(4):
    thread = threading.thread(target=handler, args=())
    thread.daemon = True
    thread.start()
~~~

~~~
Concurrency Level:      4
Time taken for tests:   5.284 seconds
Complete requests:      100000
Failed requests:        0
Total transferred:      6700000 bytes
HTML transferred:       0 bytes
Requests per second:    18926.67 [#/sec] (mean)
Time per request:       0.211 [ms] (mean)
Time per request:       0.053 [ms] (mean, across all concurrent requests)
Transfer rate:          1238.37 [Kbytes/sec] received
~~~

epoll example to be continued
