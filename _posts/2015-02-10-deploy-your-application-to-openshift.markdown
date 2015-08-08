---
layout: blog_base
title: Deploy your Node.js application to OpenShift(RedHat)
category: programming
tag: Node.js, mongodb, deployment
meta_desc: Guide for deployment of Node.js app to OpenShift
---
Recently I am developing a Node.js app with my friends. Since we are just developing this as a side project now, we do not have a plan yet to purchase a server or pay for a cloud one yet. So we are searching for any free hosting services for Node.js. Turns out many servers do support hosting of Node.js with no charge for small apps but adding mongoDB as database will incur charges(e.g. Heroku--although this one does not cost you anything, some people like me are just not comfortable with providing credit card information), or others may require a credit card. Anyway we found a totally free one--OpenShift and pushed the source code to remote server, and boom nothing worked.

So we logged into the server to have a look: the log file is saying that server.js is not found. And we were just confused, we used ./bin/www as the starting script, why the system is asking for server.js? Anyway to save any trouble in trying to figure this out, we renamed to server.js and pushed to remote server again.

But the website is still not up--why? We opened up the log and had another look--it is saying the same thing. Then we have no way but to Google it. Sadly, there is a reason why OpenShift offers a total free-trial--there are just so few resources online talking about OpenShift. All we have is the official forum and guideline--which is not very clear in our idea.

Well, it turns out that we are looking at the same messages as the first time. OpenShift uses node-supervisor to restart the server if it is down and that means the first error message is repeated many times. A simple search leads us to "tail" command in unix-like systems[Wikipedia Link](http://en.wikipedia.org/wiki/Tail_%28Unix%29) and we are able to see the actual error messages now: config.js file is missing. That happens because we created a template file for config.js and expected any new developers to modify the template to match his/her own settings. We have not find a very good solution until now but to create the config on the actual server directly--if the repo is private, we can just create config directly without worries but since the repo is public, others can easily see our API keys and so on.

OK. That is settled but if the server was running after this, there is just no much point writing this blog. Then we saw error message saying that database is not connected. Well, apparently we did not read instructions carefully enough, ```process.env.OpenShift_MONGODB_DB_URL``` actually already contains all the information you need to connect to your database. Other useful environmental settings include "OpenShift_NODEJS_PORT" and "OpenShift_NODEJS_IP". Luckily our config.js can easily include these changes. <em> A useful link for this [MongoDB doc](http://docs.mongodb.org/ecosystem/platforms/red-hat-openshift/) </em>

And the website is finally up and running. After that, we checked and found that "main" in package.json actually sepecifies the entry point of a node module--which is also OpenShift is looking at. So if you want custom entry point, specify it clearly in package.json with not only starting script but also main script defined to be your desired entry point.

A list of all note-hosting[Node Hosting ](https://github.com/joyent/node/wiki/Node-Hosting).
