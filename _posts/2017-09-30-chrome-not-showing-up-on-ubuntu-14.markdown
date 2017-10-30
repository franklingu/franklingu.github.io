---
layout: blog_base
title: Chrome not showing up on Ubuntu 14.04
category: software
tag: software
meta_desc: Chrome not showing up on Ubuntu 14.04, process is running but window is not showing and not draggable
---

So one day after I upgraded Chrome for my old Ubuntu 14.04 machine and I could not launch the browser. Well, if I do `ps aux | grep chrome` I can still find the process running but I could not see anything. A browser that is not viewable is not a browser anymore and not useful at all. The process is indeed running -- so it must be the display problem.

So after a bit of Googling I find this thread in Google group. So I think the window is off the screen for some reason -- maybe because I had two monitors before and now I only have the main monitor left? Not sure. So after reading [Google group thread](https://productforums.google.com/forum/#!topic/chrome/DzbkYRx71EQ) and went to [the extensive list of Chrome commands](https://peter.sh/experiments/chromium-command-line-switches/#window-position).

So I launched the browser in terminal with `google-chrome --window-position=100,100` and the window is back again. Then I dragged it and placed in the right position.

There are other options to explore on that article as well -- [list of Chrome commands](https://peter.sh/experiments/chromium-command-line-switches/#window-position)
