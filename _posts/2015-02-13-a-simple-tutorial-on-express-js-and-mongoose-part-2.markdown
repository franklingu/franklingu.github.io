---
layout: blog_base
title: A simple tutorial on express.js and mongoose(Part 2)
category: programming
tag: JavaScript, Node.js, express.js, mongoose
meta_desc: A simple tutorial on express.js and mongoose
---

Okay. [Last tutorial ](/programming/2015/01/27/a-simple-tutorial-on-express-js-and-mongoose/) in this series actually was about express.js. Express is a good framework in Node environment to get started with web programming but when compared to MVC frameworks in Python(Django), Ruby(Rails), Scala(Play), it is smaller and does not aim to come with everything pre-packaged. In fact, since express@4.x, the developers are rewriting the framework to be more independent of all middlewares. Some essential packages(body-parser, cookie-parser, jade, morgan, serve-favicon and etc.) are still around but most are stripped out the default installation. Most applications do require a backend database to support for usability and that is why we are looking at MongoDB now.

First we need to run mongoDB to accept connections by running the command ```mongod --dbpath [path to data folder]```. If you have followed last tutorial, you will kind of figure out that the data folder we are talking about here is the one named "data" that resides in our application folder. In this way, a web app contains everything, including source code and data within itself. Of course we still need programs like node and mongoDB to execute code and manage database but we will try our best to isolate the development of our application from outer programming environment. This topic itself is more that a tutorial and better practices are coming out day by day too. And if we go back to our topic: install mongoose with command ```npm install mongoose --save``` add the following lines to app.js for mongoose to work.

{% highlight javascript %}
var mongoose = require('mongoose');
// by default, there is an admin account with no password protection and
// if you happened to have created account and password for mongoDB, remember
// to provide authentication information here too
mongoose.connect('mongodb://localhost:27017/', function (err) {
// 27017 is the default port for mongodb and if you change your db port, change here also
    if (err) { // error handler for db connection
        return console.log('Cannot connect to database', err);
    }
    // of course your can have a better db connection error handler
    return console.log('Database connected.');
});
var db = mongoose.connection;  // this is basically the connection object returned from mongoose
{% endhighlight %}

The code above is basically trying to connect to the database using mongoose. And for project management's sake, some people may suggest that connecting to database should be done at the very start of the program, which in our case is ./bin/www. Personally I have no preferences and sorry that I do not have much experience with this in production to draw any conclusion which is better. But as we do more projects of such type, we will learn the best practices by ourselves.

In fact, there is no notion of Schema in mongoDB [Why Schemaless ](http://blog.mongodb.org/post/119945109/why-schemaless). However, mongoose decided to go with Schema design cause in actual development we want to control the level of madness of completely Schema free design. Having Schema can enforce validation and is easier for query and type casting and therefore, the first thing we need to do is to define a Schema. If you are familiar with Django/Rails, you can think of this step(plus creating model) as defining models, except that mongoose is not really going to create any real database table which conforms to the Schema and there is no "rake db:migrate" for this step.

Now, we can just go ahead and create a new js file with schema definition inside but it is not recommended and we may later create a bunch of schemas and therefore, we want to group them in a folder or something so that they are not scattered all around and easier to manage. Create a folder named "models" and a User.js file inside it, with content as follows:

{% highlight javascript %}
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  // userName by default will be ''
  userName: { type: String, default: '' },
  // when creating a user, an email is required
  email: { type: String, required: true },
  // a user must also have a password
  password: { type: String, required: true}
});

var User = mongoose.model('User', userSchema);

module.exports = User;
{% endhighlight %}

The code above creates a Schema, like an abstract definition of model, a model, the class used by mongoose for creating document in mongoDB. And a common functionality of User model is for authentication, which requires verification of password, and a validation method defined on User model would be nice--it goes like this:

{% highlight javascript %}
// insert into line 8 of the code block above
userSchema.methods.validatePassword = function (pswd) {
    return this.password === pswd;
}
{% endhighlight %}

And now if we create a new user, we can just call user.validatePassword(pswd) to verify the provided password. So let us go and create+save+query a user.

{% highlight javascript %}
var user1 = new User({ userName: 'test', email: 'test@example.com', password: 'password' });
user1.save(function (err, savedUser) {
  if (err) {
    return console.log(err); // or you want to handle it more gracefully
  }
  console.log('User saved successfully: ', savedUser);
});
user1.validatePassword('pswd');  // return false
User.find({userName: 'test'}, function (err, usersReturned) {
  if (err) {
    return console.log(err); // or you want to handle it more gracefully
  }
  console.log('Returned results ', usersReturned);
})
{% endhighlight %}

Of course, mongoose can do much more than what is show here. But we have successfully get started with it. The next step is to integrate the mongoose with express and do something more powerful.

For further learning of mongoose:
1. [Mongoose official guide ](http://mongoosejs.com/docs/index.html)
2. [Mongoose API docs](http://mongoosejs.com/docs/api.html)
