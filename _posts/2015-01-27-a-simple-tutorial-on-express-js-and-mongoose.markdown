---
layout: blogbase
title: A simple tutorial on express.js and mongoose(Part 1)
category: programming
tag: JavaScript, Node.js, express.js, mongoose
---

Node is relatively new compared to Python(Django) and Ruby(Rails) but it getting a lot of popularity because of its simplicity and performance plus. Although there is some increasing concern with the stability of Node and maintainability of Node projects[...](link to be filled in), Node community is indeed thriving and improving Node very fast. Because of Node's simplicity and recent popularity, I decide to give it a try in a Hackathon.

While, given the fact that I am already familiar with JavaScript(not proficient in it yet though), it is completely not a problem at all to just start using Node.js with use of express.js and mongoose framework.

Of course, Node.js should be installed for whichever platform you are using. But special attention is needed for Windows as node-gyp requires VS2008 and its related files(See its repo for more information) as the build process may just fail if not managed carefully. And MongoDB should also be installed for database support. MongoDB is just a very mature example of NoSQL, which is schemeless and easy to get started. Of course nobody is stopping us from using CouchDB or even SQL databases. But just to get started, personally I still recommend MongoDB(some links here for references/comparisons).

OK, enough with useless talk and let's get into the serious business.

Install express-generator globally by typing ```npm install express-generator -g```(and remember to add sudo in the front if you need the admin rights). After that what you need to do is just type ```express [projectName]``` and a folder named as [projectName] will be created for you. Navigate to the folder by typing ```cd [folderName]``` and in case you want to share it on github or bitbucket type ```git init```(Of course you need git installed before hand).

Then create data folder under the project folder--that is for MongoDB to store out data. And make sure you put this folder in .gitignore if you are pushing to remote server--you do not want others to see your database and this folder will get really large as time goes.

Well, that is all the preparation work to start your project. But before we go to next step, some explanation is needed here to clear things up. Some old posts about express on the Internet are probably based on express.js@3.x, and since there is major change of the project structure after 4.0, there is something special to note.

Express-generator is basically going to create a "standard" folder structure recommended from express developers. The folder structure looks like following(Run ```mkdir data for MongoDB to use```):

~~~
[projectFolder]
    bin(contains everything that does not fit nicely inside npm script(e.g. hook, configuration and etc))
        www(entry point for the application)
    data(data folder used by MongoDB)
    node_modules(dependencies, managed by npm and in most cases you do not want to touch this by yourself)
    public(css, js and img for public use)
    routes(define routes/paths of the app)
    views(define templates, e.g.index.jade for Jade as view engine)
    app.js(basic setup of the express project. here usually we set up main middlewares and configuration)
    package.json(used for npm to install/manage dependencies)
~~~

Then you just need to install all the dependencies by "npm install" and all will be taken care of. Now if you type "npm start" in the console, you will be already seeing "Welcome to Express" page running on localhost:3000(The default port for express is usually 3000). And if you want to know the magic behind npm start--it is basically going to run the command specified package.json-->scripts.start, which by default is ```node ./bin/www```. And you guessed it, that "node ./bin/www" is in fact the command invoked by npm start.

Well, of course we can continue to add more pages, improve the existing index page if we want but before we go to that part, let's just finish all the installation for this tutorial and the next section is: MongoDB.

We are going to use mongoose for connecting and managing MongoDB. Although it is not the most user-friendly package for starters, it is a well-documented and widely used ORM tool in Node community. So instead of hack your way by using simpler ones like monk--which is not updated for years, we go directly to the proper one used by many in production.

Run ```npm install mongoose --save``` in the shell and we are basically installing mongoose package and save it as a dependency in package.json. And since it is about database where speed is a very important factor, the installation process requires building from the native code. But most likely the installation is fine and you are going to see "exit with 0" message--which means success. In case some weird issue happens, you can choose to Google your way or just post your question under this article and I will try my best to help.

All the installation is done for now and we are going to the the real coding now. First a glance on the app.js file generated by express-generator:

{% highlight javascript linenos %}
var express = require('express');  // require express package, installed by npm under current folder usually
var path = require('path');  // require path, a core package in node
var favicon = require('serve-favicon');  // express plugin
var logger = require('morgan');  // express plugin for logging
var cookieParser = require('cookie-parser');  // express plugin for parsing cookies sent back from clients
var bodyParser = require('body-parser');  // included many methods for json parsing, form parsing and query string parsing

var routes = require('./routes/index');  // entry for most paths/routes
var users = require('./routes/users');  // special routes for users but we may not use this or we may re-organize this

var app = express();  // create an app instance

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');  
// as explaned in the official comment, here we are setting view engine as jade 
// and if you know what you are doing, you can install like ejs and set ejs as view engine

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));  
// basically means that everything more severe that dev is going to logged--which means everything
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));  // setting up all middlewares and 

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
//   --whatever path is not defined in routes and users will be catched here to file up Error 404 
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
{% endhighlight %}

This the basically the app.js file auto-generated by express-generator. So now we are going to use mongoose and connect to the database, which will be basically covered in [Part 2](/programming/2015/02/13/a-simple-tutorial-on-express-js-and-mongoose-part-2/)
