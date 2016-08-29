---
layout: blog_base
title: Python Django Class Based Views and Access Mixins
category: programming
tag: Python, Django
meta_desc: Usage of Access Mixin(including AccessMixin, LoginRequiredMixin, UserPassesTestMixin) and django-braces as well and why we should do it that way
---

Last time I used Django it was about 2 years ago and I was basically in the world of Flask, Rails and Node.js during that time. Now for one project I need to pick up Django again(because of its built-in support for admin portal and permissions). Although 3 years ago there were already class based views, I did not use that feature at that time and this time I thought I could give it a try.

While, turns out it is more complicated than what I thought(not much but it is not trivial either). So first of all I have to read these documentation of ListView, DetailView and CreateView, UpdateView and DeleteView. And understand which methods to override to get exactly what I want. So figuring this part out is not tricky--just needs a bit of time for reading.

So pages are displayed properly already, then I went ahead to add some access control related stuff--and first of all I will only show data to logged-in users. That was easy before when there are just view functions--use the `login_required` decorator. And I did that in the very first place as well. The code snippet is as below:

~~~python
from django.views.generic import ListView
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

class SampleListView(ListView):
    context_object_name = 'sample_list'
    template_name = 'sample_list.html'
    
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(SampleListView, self).dispatch(*args, **kwargs)
    
    def get_queryset(self):
        # implementation omitted
~~~

Of course this works. Using decorator is great and elegant enough as well--just that it is not OO--it is not object-oriented enough should not even count as a reason as decorators are just great. I thought since I am trying something new, why do not I go one step further and try `LoginRequiredMixin`?

So now the really tricky thing comes(spoiler alert: it is about MRO--and if you do not know what is MRO, well, I am thinking about writing a post about that and I will update a link here. But Google and SO is often the best teacher). I added `LoginRequiredMixin` and I can still view evey page!!! The *wrong* code looks like:

~~~python
from django.views.generic import ListView
# I am using Django 1.9, adjust the import path if you are using 1.10
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.urlresolvers import reverse_lazy

class SampleListView(ListView, LoginRequiredMixin):
    login_url = reverse_lazy('login')
    redirect_field_name = 'redirect_to'
    context_object_name = 'sample_list'
    template_name = 'sample_list.html'
    
    def dispatch(self, *args, **kwargs):
        return super(SampleListView, self).dispatch(*args, **kwargs)
    
    def get_queryset(self):
        # implementation omitted
~~~

So I Googled but I did not really find anything helpful to me--I found people talking about decorators and they just use `LoginRequiredMixin` but it just does not work for me(of course there must be a reason and I suspect mostly it is something that I did wrongly). Then I decided to dig into the [Django source code](https://github.com/django/django/blob/master/django/contrib/auth/mixins.py).

Right after I see how `AccessMixin` and `LoginRequiredMixin` and `UserPassesTestMixin` I got where I was wrong. Before I reveal my finds, check the correct code:

~~~python
from django.views.generic import ListView
# I am using Django 1.9, adjust the import path if you are using 1.10
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.urlresolvers import reverse_lazy

class SampleListView(LoginRequiredMixin, ListView):  # this line changed a bit
    login_url = reverse_lazy('login')
    redirect_field_name = 'redirect_to'
    context_object_name = 'sample_list'
    template_name = 'sample_list.html'
    
    def dispatch(self, *args, **kwargs):
        return super(SampleListView, self).dispatch(*args, **kwargs)
    
    def get_queryset(self):
        # implementation omitted
~~~

So it is about method-resolution-order(MRO). So `AccessMixin` and its subclasses need to jupm in and check whether user is logged-in during dispatch. However, there are many classes in the inheritance chain that is implementing this method. And if you put `LoginRequiredMixin` later than ListView, it will be further down in MRO chain. And take a look at Django's base View class [here](https://github.com/django/django/blob/master/django/views/generic/base.py) and you will find that View simple returns without calling super. Therefore LoginRequiredMixin is never invoked--the execution is simply intercepted but previous class. To be more clear about this, let us check the MRO of `SampleListView` in two cases.

~~~python
# first example
(<class 'sample_project.views.SampleListView'>, <class 'django.views.generic.list.ListView'>, <class 'django.views.generic.list.MultipleObjectTemplateResponseMixin'>, <class 'django.views.generic.base.TemplateResponseMixin'>, <class 'django.views.generic.list.BaseListView'>, <class 'django.views.generic.list.MultipleObjectMixin'>, <class 'django.views.generic.base.ContextMixin'>, <class 'django.views.generic.base.View'>, <class 'django.contrib.auth.mixins.LoginRequiredMixin'>, <class 'django.contrib.auth.mixins.AccessMixin'>, <class 'object'>)
# second example
(<class 'sample_project.views.SampleListView'>, <class 'django.contrib.auth.mixins.LoginRequiredMixin'>, <class 'django.contrib.auth.mixins.AccessMixin'>, <class 'django.views.generic.list.ListView'>, <class 'django.views.generic.list.MultipleObjectTemplateResponseMixin'>, <class 'django.views.generic.base.TemplateResponseMixin'>, <class 'django.views.generic.list.BaseListView'>, <class 'django.views.generic.list.MultipleObjectMixin'>, <class 'django.views.generic.base.ContextMixin'>, <class 'django.views.generic.base.View'>, <class 'object'>)
~~~

We can see clearly that in the first case, since `django.views.generic.base.View` just returns, `django.contrib.auth.mixins.AccessMixin` will never to invoked.

The error is small--just the ordering issue but if you dig deep and you will learn. Hope this post can help you understand a bit about MRO and Django internals.
