---
layout: blog_base
title: Understand Python web server models with examples
category: programming
tag: Python
meta_desc: Understand Python web server models with examples--single linear process, multi-processing, multi-threading, epoll.
---

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

Benchmark with `ab` with `ab -n 100000 -c 8 http://localhost:9527/`

~~~
Concurrency Level:      8
Time taken for tests:   4.549 seconds
Complete requests:      100000
Failed requests:        0
Total transferred:      6700000 bytes
HTML transferred:       0 bytes
Requests per second:    21980.70 [#/sec] (mean)
Time per request:       0.364 [ms] (mean)
Time per request:       0.045 [ms] (mean, across all concurrent requests)
Transfer rate:          1438.19 [Kbytes/sec] received
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

for _  in range(8):
    process = multiprocessing.Process(target=handler, args=())
    process.start()
~~~

~~~
Concurrency Level:      8
Time taken for tests:   5.420 seconds
Complete requests:      100000
Failed requests:        0
Total transferred:      6700000 bytes
HTML transferred:       0 bytes
Requests per second:    18450.30 [#/sec] (mean)
Time per request:       0.434 [ms] (mean)
Time per request:       0.054 [ms] (mean, across all concurrent requests)
Transfer rate:          1207.20 [Kbytes/sec] received
~~~
