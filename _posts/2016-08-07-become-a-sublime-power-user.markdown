---
layout: blog_base
title: Become a sublime power user
category: programming
tag: sublime
meta_desc: Become a sublime power user but installing awesome packages, adding good user settings and mastering shortcuts.
---

Sublime is a great text editor. It is fast and extensible and it looks nice as well. It is really hard to argue that it is the best editor. In fact, although I am a fan a Sublime text editor, I would not say that it is faster than Vim in terms of editing if you are really familiar. But I would claim that if you are really good at one, the editing experience would be equally awesome for Vim or Sublime. I have not used Atom or Emacs much so I would not compare those two and others such as Notepad++ or TextMate.

First of all, let us get clear on what is the definition of "power user"--it means that you are really good and familiar with text editing in a editor so that you can quickly finish common little tasks and therefore saving a lot of time when you do really a lot of editing. Most of the time, as a programmer you would not be writing code but instead just thinking and reading(if you are writing a lot of code, think again if you are doing it right). But when we do have some ideas already--or if we are doing something that we are really familiar with(but think again, can we automate this task?), a great text editing speed would be such a plus. When you are just so used to some editor features, that editor will be part of you and when it comes to express your thought as fast as possible, there is just smooth code editing coming out of your finger tips.

Honestly I have been coding and learning programming for quite some time but it was not until some time not long ago that I really started to pay attention to developing a super familiarity with my favorite text editor Sublime. I had this thought only after I watched how smooth the editing experience of one of my colleague, who is really good at Vim shortcuts and techniques. So I started to intentionally train myself to be really fast in Sublime as well.

At first it is not easy at all. In fact you have to try to remember those shortcuts and apply them in every cases. For nearly all sort of moves, before you actually do it the old, think again if you can do it in the new way, in fact you may even have to look at the help or Google it a bit. However, once you become used to it, it will pay back with a great boost in productivity.

So the key is to use shortcuts and reduce the movement of your hand and even fingers. Sometimes context switching is necessary that it will slow you down even more. By saying context switching, I mean like moving your hand, mostly right hand for right-handed to reach out to mouse (mouse is generally considered as slow). And even moving your right hand from alphabets to arrow keys or number pad is considered context switching as well. It is not just the movement, your brain has to adjust from the old layout to the new context. Of course it is not much time but it will add up.

In fact, from this point of view we can sort of see that Vim users will be faster than Sublime users, which is TRUE for most of the highly skilled users of two editors--as a Sublime supporter, I admit this. But Sublime is good at some tasks as well with its GUI features(like Line Swapping). And what is more important, Sublime is easy to get started and get mastery, and once you are a master the editing speed difference is not much anyway. Last reason, it is sort like a religious war: like those who are in favor of Vim always talk about how stupid Emacs is by saying that the shortcut requires pressing too many keys at the same time; yet Emacs uses would defend that clearly EmacsLisp is much more powerful than vimrc or any other editor's settings.

OK. I guess it is enough for my own experience in becoming a power user of Sublime (I am still on this journey and help suggestions would be welcomed). Let us get to the real hard-core stuff to become good at Sublime.

First some useful shortcuts:

1. `Ctrl + p`: open any file. In fact you can also add '@' as prefix to go to symbol--which is just equivalent to `Ctrl + r` and you can also add ':' as prefix go to line--which just equivalent to `Ctrl + g`.
2. `Ctrl + click`: multiple selection.
3. `Ctrl + Shift + right click`: multiple vertical selection.
4. `Shift + Alt + w`: wrap multiple selections into tags--really useful for frontend programmers; or you may want to try Emmet for even better user experience.
5. `Ctrl + Shift + Up/Down`: move up or down the current editing line.
6. `Ctrl + '`: expand selection to quotes(install Expand selection to quotes package).
7. `Ctrl + l`: expand selection to line.
8. `Ctrl + d`: expand selection to word.
9. `Shift + Alt + Up/Down`: expand selection to the line above/below.
10. `Ctrl + Shift + d`: duplicate the current line.

Of course there are some handy shortcuts and you could define your own shortcuts as well. And notice that everything listed down here is for Ubuntu/Linux. So if you are using Mac or Windows, check Sublime help first :P.

Some nice packages:

1. `Emmet`: really useful for html and css, a must-have for frontend developers.
2. `Anaconda`: a great package to make Sublime a powerful IDE for Python.
3. `JSHint`: for JavaScript developers.
4. `Color Highlighter`: highlighting css colors.
5. `Origami`: easily manage multiple panes (also personally I am more used to Layout that comes with Sublime).
6. `Git Gutter`: show `git diff` while editing.
7. `Bracket Highlighter`: highlight matching brackets and tags more easily.

Some other setup:

1. Pick a darker theme, my favorite is 3024 (Night).
2. `"highlight_line": true`: show current line more clearly.
3. Have a wider caret:
~~~
"caret_extra_bottom": 2
"caret_extra_top": 2
"caret_extra_width": 4
"caret_style": "solid"
"wide_caret": true
~~~
4. `"highlight_modified_tabs": true`: highlight unsaved files.
5. Higher lines for code reading:
~~~
"line_padding_bottom": 1,
"line_padding_top": 1,
~~~
6. Differentiate files and folders: `"bold_folder_labels": true`.

Hope you just get better with using Sublime if you are also a fan, or become good with any editor that you are in love with.
