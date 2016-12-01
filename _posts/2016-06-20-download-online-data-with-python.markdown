---
layout: blog_base
title: Download online data with Python
category: programming
tag: Python
meta_desc: Download data with Python, via requests,mechanize, wget or selenium.
---

Post in progress.

Python as a very convenient and powerful scripting language, is used allowed with scraping related data. One particular example of scraping would be downloading data. Let's say we already have format of destination links and what we need to do is just to save those online data locally in files or in a database. There are quite some ways to achieve it but each is going to fit for its own purpose.

Mainly there are the following ways:

1. requests

2. wget

4. curl

5. mechanize

6. selenium

### requests
Requests is a great library and you can see it from [the number of stars](https://github.com/kennethreitz/requests) it has received so far. It handles a lot of stuff in HTTP nicely. There is not much need in going into details about how good it is--always prefer it over urllib3 because it is just awesome and user-friendly.

### wget
It is "Wget - The non-interactive network downloader." as the name in its man page. It is born for downloading information and it is reliable. In fact, you can even [download an entire website](http://www.linuxjournal.com/content/downloading-entire-web-site-wget)

### curl
CURL is a tool for making all sort of http requests. And with a -O flag we can save response somewhere as well.

### mechanize
[Mechanize](http://wwwsearch.sourceforge.net/mechanize/) is a more like a simple browser. It could handle form submission, follow links easily. But of course it does not support JavaScript execution.

### selenium
Selenium is used more in user acceptance testing instead of web crawling. But because it runs by driving browser, it could be used to crawling dynamic pages. If you know what is the pattern for an Ajax request, then use requests or curl to make Ajax requests directly; but if the page is complicated enough, then mostly we will have to use selenium as the browser automation tool.
