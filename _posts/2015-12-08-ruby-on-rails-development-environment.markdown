---
layout: blog_base
title: Ruby on Rails Development Environment Setup
category: life
tag: programming, RoR, development
meta_desc: A guide of development environment setup for Ruby on Rails developers, including rbenv, RubyMine, Sublime, Atom, PostgreSQL, Nginx, Puma
---

I guess most people who are reading this post will be pretty much familiar with what Ruby on Rails is already without me even begin talking about it. Anyway, I will provide a short description for Ruby on Rails. Ruby on Rails is a MVC framework aiming at helping fast web development. The whole framework is based on Ruby programming language and it is based on the idea "convention over configuration". Developers by following those recommended conventions, could write better code and deliver features more timely. There are many gems included in Ruby on Rails and therefore we can call it "battery-included"--all needed for web development are provided by Ruby on Rails and you can just start writing your code right away.

Now comes the actual content of the this post: a guide for Ruby on Rails development environment setup. I am recommending rbenv for Ruby version management, RubyMine as the IDE if you prefer one, Sublime or Atom as text editor with good plugins. Nginx as web server, PostgreSQL as database and Puma as Ruby web server, although of course these 3 are not needed for pure developers.

* **rbenv as Ruby version manager**<br>
  There are many discussions online about rbenv versus rvm and I do not want to start one here as I did not use rvm from the very start. I do recommend rbenv because it is very convenient to use rbenv, especially with plugins like rbenv-gem-rehash, rbenv-vars, ruby-build.
  Setup instruction: [Link to rbenv](github.com)

* **RubyMine as Ruby on Rails IDE**<br>
  Ever since I started using Idea Intellij, I have been falling in love with products from Jetbrains. Even the Android studio is based on Intellij and I have observed many developers switching from Eclipse to Intellij now. Maybe we are not saying Eclipse is bad, probably just not good enough when compared to Intellij with its assistance in Java development. For Python there is PyCharm and RubyMine for Ruby on Rails development(There are also IDEs for Node development and PHP, C#, which I have not used).
  However, some people, like me,
