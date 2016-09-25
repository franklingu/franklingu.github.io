---
layout: blog_base
title: Understand web server concurrency  models with examples in Python
category: programming
tag: Python
meta_desc: Understand web server models with examples in Python--single linear process, multi-processing, multi-threading, epoll.
---

In this post we will explore single linear process, multi-processing and multi-threading and epoll as different models for web server concurrency in Python.

First comes with the easiest model: linear model. This does not even count as a one "concurrency" level but we have it here just for completeness' sake.
~~~python
import socket

response = 'HTTP/1.1 200 OK\r\nConnection: Close\r\nContent-Length: 11\r\n\r\nHello world'

server = socket.socket()
server.bind(('0.0.0.0', 9527))
server.listen(1024)

while True:
    client, addr = server.accept()
    request = client.recv(1024)
    client.send(response)
    client.close()
~~~

Benchmark its performance with `ab` with `ab -n 100000 -c 8 http://localhost:9527/`.

~~~
Time taken for tests:   5.230 seconds
~~~

Since we know that `recv()` is definitely blocking and `send()` is half-blocking(it is supposed to be a blocking call as well, however, for sending data, as long as the process puts the response--if it is short enough--to the OUT buffer the function can return directly. So it is not entirely blocking in practice), we tend to have multiple processes to handle. Ideally we should have one process for each request handling--but forking a request is so expensive and soon we will hit the memory limit. So we go with preforking strategy. Here is the code.
~~~python
import socket
import multiprocessing

response = 'HTTP/1.1 200 OK\r\nConnection: Close\r\nContent-Length: 11\r\n\r\nHello world'

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
Time taken for tests:   5.584 seconds
~~~

If it was because of Python's GIL, threading would be great as threads are light weighted processes. This is code snippet for threading model. However we can see that because of GIL and time spent on queuing, the performance is really bad in this case.
~~~python
import Queue
import socket
import threading

response = 'HTTP/1.1 200 OK\r\nConnection: Close\r\nContent-Length: 11\r\n\r\nHello world'

server = socket.socket()
server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
server.bind(('0.0.0.0', 9527))
server.listen(1024)


def handler(queue):
    while True:
        client = queue.get()
        request = client.recv(1024)
        client.send(response)
        client.close()

queue = Queue.Queue()
for _  in range(8):
    thread = threading.Thread(target=handler, args=(queue,))
    thread.daemon = True
    thread.start()


while True:
    client, addr = server.accept()
    queue.put(client)
~~~

~~~
Time taken for tests:   16.346 seconds
~~~

Well, since we know that servers are blocking by nature--what if we can handle it as non-blocking IO and only acknowledge when there is an event. First we have `select` and then `poll` and later `epoll` for this purpose. Let's see how to code it.

~~~python
~~~
