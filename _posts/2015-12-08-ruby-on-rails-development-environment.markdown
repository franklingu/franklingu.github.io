---
layout: blog_base
title: Ruby on Rails Development Environment Setup
category: life
tag: programming, RoR, development
meta_desc: A guide of development environment setup for Ruby on Rails developers, including rbenv, RubyMine, Sublime, Atom, Zsh
---

I guess most people who are reading this post will be pretty much familiar with what Ruby on Rails is already without me even talking about it. Anyway, I will provide a short description for Ruby on Rails. Ruby on Rails is a MVC framework aiming at helping fast web development. The whole framework is based on Ruby programming language and it is based on the idea "convention over configuration". Developers by following those recommended conventions, could write better code and deliver features more timely. There are many useful and powerful gems included in Ruby on Rails and therefore we can call it "battery-included"--all needed for web development are provided by Ruby on Rails and you can just start writing your code right away.

Now comes the actual content of the this post: a guide for Ruby on Rails development environment setup. I am recommending rbenv for Ruby version management, RubyMine as the IDE if you prefer one, Sublime or Atom as text editor with good plugins, Zsh as the terminal.

* **rbenv as Ruby version manager**<br>
  There are many discussions online about rbenv versus rvm and I do not want to start one here as I did not use rvm from the very start. I do recommend rbenv because it is very convenient to use rbenv, especially with plugins like rbenv-gem-rehash, rbenv-vars, ruby-build.
  Setup instruction: [Link to rbenv](github.com)

* **RubyMine as Ruby on Rails IDE**<br>
  Ever since I started using Idea Intellij, I have been falling in love with products from Jetbrains. Even the Android studio is based on Intellij and I have observed many developers switching from Eclipse to Intellij now. Maybe we are not saying Eclipse is bad, probably just not good enough when compared to Intellij with its assistance in Java development. For Python there is PyCharm and RubyMine for Ruby on Rails development(There are also IDEs for Node development and PHP, C#, which I have not used).
  However, I personally believe that IDE is not that powerful when it comes to a dynamic-typed language like Ruby. There are indeed some useful functionality provided by RubyMine:
  1. Debugging: with the built-in debugger in RubyMine, debugging will be much easier compared to using "(gem name, need to remember)". Especially the inspector is so much more convenient than typing out to see values printed on console.
  2. Testing and coverage: although we can have rspec + simplecov to run spec tests and coverage, the inline highlighting of coverage among code and failed tests re-running could sometimes really come in handy.
  3. Syntax highlighting and auto-completion: this might be really useful for new Ruby on Rails programmers. While based on my personal experience though, the auto-completion may not be of much use as Ruby is dynamic and RubyMine is just not smart enough to detect all errors and even report false alarms.
  Generally speaking, I am not for the idea of IDE when it comes to Rails development, especially if we have a good text editor with right plugins, writing Rails code fast and being productive is just easier and feels more natural. But RubyMine could be really useful with new Rails developers to get some basic guidance at the start.

* **Sublime + all of its wonderful plugins**<br>
  Although indeed there is a trend in the community to go for the more hackable Atom editor powered by GitHub(by all means I am totally a supporter of Atom and after working with it for some time, it is indeed developer-friendly), I would still recommend Sublime here as I have been use Sublime longer and it has proven itself to be an exceptionally good editor and (in my opinion, Atom with all its greatness, is still lacking in some perspectives like handling large files and launching speed). But anyway, I am not here to argue for or against Atom in Rails development as the plugins we are going to use can be found for both editors with ease.
  1. RuboCop and its plugin: RuboCop is Ruby code static analyzer with watching for style violation, cleanness and complexity. It is incredibly useful in Rails development especially if all members are using it and the repo will be so much cleaner and more readable. And if there is only plugin that you definitely need to get, it must be RuboCop.
  2. JSHint: this may not be very useful for projects with API serving only since most likely there will not be any JavaScript or CoffeeScript involved in the development. This is watching for style violations in JavaScript and it is just very handy when writing a bit of front-end JavaScript code with some sort of safe guard on the quality of the code.
  3. BracketHighlighter: you may wonder since we are not talking about writing Lisp code, why is highlighting of brackets of any importance at all? Well, to me this plugin is more like to have it in case I have deep nested dictionaries/hashes. So in most of the case we will need it much as most hashes are not too complex and we use yaml over JSON(more levels of nested brackets). Once we do need some assistance on brackets, this plugin can save us from trying to figure out which is the most inner scope and whether there are any mismatched.
  4. SideBarEnhancements: this may be more useful when working in Sublime as the default sidebar in Sublime is not of much use at all. With this plugin, you can do almost anything with the file or folder that normally you can do in a file explorer. Adding or renaming the file can be done in the editor itself without switching context.
  5. TrailingSpaces: in a language like Python, Ruby or Haskell, indentation is vital and trailing spaces is in fact a serious style violation even if it does not affect interpretation of the program. This plugin can do one thing and only one thing well, highlighting trailing spaces and remove them on save if configured.

* **Zsh as the terminal**<br>
  So if Bash is the shell *born again*, then Zsh must be the shell *final*(as z is the final letter of a-z). The UI, the auto-completion, and all sort of powerful plugins(like rails, git, github, rbenv) are just going to make the terminal fun and cool to use. There will not be much I talk about Zsh and once you start using it, you will know how cool it is.

Ruby on Rails is a cool framework and let's use cool tools when developing it and become a cool developer. Happy coding :P
