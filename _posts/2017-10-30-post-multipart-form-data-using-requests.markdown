---
layout: blog_base
title: Post multipart form data using Python requests
category: programming
tag: python
meta_desc: Post multipart form data using Python requests, multipart form data without files
---

Requests is a great library for networking in Python with its friendly APIs and rich features. But today when I try to send a POST request to a website, using multipart form encoding, but without files, I got stuck and did not find my luck in the documentation either.

So after googling around, turns out there was [some discussion](https://github.com/requests/requests/issues/1081) in requests issue tracker already and the maintainers did not want to add explicit support for multipart for API consistency. However, this could be done indeed via use of some not well documented feature (See example first):

~~~python
In [1]: data_req = Request('POST', 'https://franklingu.github.io/', data={'name
    ...: ': 'normal'}).prepare()

In [2]: print(data_req.body)
name=normal

In [3]: normal_multipart_req = Request('POST', 'https://franklingu.github.io/',
    ...:  files={'name': open('test.txt', 'r'), 'name2': 'content'}).pre
    ...: pare()

In [4]: print(normal_multipart_req.body.decode('utf-8'))
--cdf39af4e1bf449384b62fef701eda7b
Content-Disposition: form-data; name="name"; filename="name"

test


--cdf39af4e1bf449384b62fef701eda7b
Content-Disposition: form-data; name="name2"; filename="name2"

content
--cdf39af4e1bf449384b62fef701eda7b--


In [5]: no_file_multipart_req = Request('POST', 'https://franklingu.github.io/'
    ...: , files={'name2': (None, 'content')}).prepare()

In [6]: print(no_file_multipart_req.body.decode('utf-8'))
--32a85608b80a48bb8687e55b9cb26395
Content-Disposition: form-data; name="name2"

content
--32a85608b80a48bb8687e55b9cb26395--
~~~

So `data_req` is a normal POST request with urlencoded form data as body and this is what we usually need. And files can be POSTed using multipart form encoding as shown in `normal_multipart_req`. However, sometime we need multipart form data, but we do not need `filename` attribute there and therefore we will use the hidden syntax: use `tuple` as value for `files` dictionary: `files = {'name': (<filename>, <file object>, <content type>, <per-part headers>)}` and by setting filename to be None, we can mute the filename attribute. So in the final `no_file_multipart_req` we do not have filename in the entry.
