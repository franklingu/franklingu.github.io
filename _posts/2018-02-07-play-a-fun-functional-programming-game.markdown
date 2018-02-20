---
layout: blog_base
title: Play a fun functional programming game
category: programming
tag: python
meta_desc: Play a fun functional programming game to learn some basic concepts in functional programming such as map, filter and reduce
---

Functional programming is cool and fun -- at least it should be. But if I look at the definition on Wikipedia:

> In computer science, functional programming is a programming paradigm—a style of building the structure and elements of computer programs—that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data.

Then I guess it does not seem that fun any more. To me, it is more like after a few transformations we can get magic output from input -- [cube-composer](https://david-peter.de/cube-composer/) is an online little game for getting a basic sense of how map, filter, and reduce work in functional programming.

So basically it starts with some input, colored blocks and the target is another set of colored block arrangement. For example:

<img src="/img/blogs/functional_programming_game_2.png" alt="Game Demo" style="width: 100%;">

So first we do a simple reduce -- combining consecutive equal columns, and then we append yello block to each column, and now we reject red blocks, and finally we transform yellow to brown blocks and we get the target arrangement.

Map-reduce paradigm is a very powerful idea -- it is in fact the key idea behind [the great mapreduce paper from Google](https://static.googleusercontent.com/media/research.google.com/en//archive/mapreduce-osdi04.pdf). Hopefully by playing this game you can understand map and reduce concept a bit better and have fun at the same time.

<img src="/img/blogs/functional_programming_game.png" alt="Final Challenge as of 2018-02-09" style="width: 100%;">
