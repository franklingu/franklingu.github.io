---
layout: blog_base
title: A few tips for production Golang app
category: programming
tag: golang
meta_desc: Safe gorouting, for-loop with pointer, returning struct for interface and a few other tips for a good production Golang app
---

After writing Golang code for some time, I found that Golang is a good language. Especially after coming from Python world, the inferred typing in most cases but explicit typing is really good for reading, understanding a moderate to big codebase. Exception handling requires some get-used-to but it is good enough now with error wrapping and unwrapping. Lack of generic is a pain point but not unmanageable. Language is good but human effort is still needed to make best use of it.

Go routine
------
Golang's go routine is great. It is actually awesome. I like it better than await everything in Python's case (not trying to start a war here, just personal feelings. Cause I do not like coloring my functions [What Color is Your Function?](https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function/)). However, if panic happens in a go routine, the whole application is down. So my tip to the use of go routine in production app:

~~~go
// Go starts a recoverable go routine with background context.
func Go(ctx context.Context, f func(ctx context.Context)) {
	funcName := getCallerFuncName(3)
	go func(ctx context.Context) {
		defer Recover(ctx, funcName, nil)

		f(ctx)
	}(BackgroundContext(ctx))
}

func getCallerFuncName(skip int) string {
	pc := make([]uintptr, skip+1)
	n := runtime.Callers(skip, pc)
	frames := runtime.CallersFrames(pc[:n])
	if frames == nil {
		return ""
	}
	frame, _ := frames.Next()
	return frame.Function
}

func Recover(ctx context.Context, name string, retErr *error) {
    // TODO: some logging and metrics here needed
	err := recover()
	if err == nil {
		return
	}
}

type backgroundContext struct {
	context.Context
}

// BackgroundContext converts context to a background context which is never canceled and has no deadline.
func BackgroundContext(ctx context.Context) context.Context {
	return &backgroundContext{ctx}
}

func (ctx *backgroundContext) Deadline() (deadline time.Time, ok bool) { return time.Time{}, false }
func (ctx *backgroundContext) Done() <-chan struct{}                   { return nil }
func (ctx *backgroundContext) Err() error                              { return nil }
~~~

See [an example on Golang playground](https://play.golang.org/p/hACuOsYeLxz)

For loop with pointer
------

Let's see an example first:

~~~go
package main

import (
	"fmt"
)

func main() {
	fmt.Println("Hello, playground")
	t := []int{1, 2, 3, 4, 5}
	a := []*int{}
	for _, v := range t {
		a = append(a, &v)
	}
	for _, v := range a {
		fmt.Println(*v)
	}	
}
~~~

What do you think the stdout will be like? 1 - 5? See [here](https://play.golang.org/p/OYqCtr8OsNe). The answer is 5,5,5,5,5 -- because variable created in for loop declaration use the same address -- but value the is different. And to achieve what we intend, it is very easy, create a local variable inside that loop.

~~~go
package main

import (
	"fmt"
)

func main() {
	fmt.Println("Hello, playground")
	t := []int{1, 2, 3, 4, 5}
	a := []*int{}
	for _, v := range t {
        v2 := v  // this creates a local variable whose address will be different each loop
		a = append(a, &v2)
	}
	for _, v := range a {
		fmt.Println(*v)
	}	
}
~~~

Return struct for interface type
------

Again let us see an example first:

~~~go
package main

import "fmt"

type S struct{}

type I interface{}

func newI1() I {
	return nil
}

func newI2() I {
	var t *S
	return t
}

func main() {
	i1 := newI1()
	i2 := newI2()
	if i1 != nil {
		fmt.Println(i1)
	} else {
		fmt.Println("i1 is nil")
	}
	if i2 != nil {
		fmt.Println(i2)
	} else {
		fmt.Println("i2 is nil")
	}
}

~~~


See the result [here](https://play.golang.org/p/BvK0fme86hV). `newI2` is clearly returning a nil right? But why the return value is not a nil? Because from type of *S to I there is a conversion and then the returned value has "iface" whose data pointer is pointing to nil.

Anyway, this is not following good practices in the first place: <b>accepts interface but returning struct</b>.


To be continued with more tips while I am working with Golang. :)
