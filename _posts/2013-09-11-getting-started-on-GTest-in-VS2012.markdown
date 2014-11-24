---
layout: blogbase
title: Getting started on Google Test in VS2012
---
First of all, it is not hard at all the run  google test on Visual Studio 2012. For VS2008, it is even simpler. What you need to do is just one of  the two solutions in msvc. But do make sure the project settings: dll for the one with the name gtest-md.sln and static library for gtest.sln.

Okay, seriously, how many people today are still using VS2008. 2010? No problem–just check out this project https://github.com/leefw/Google-Test-Demo/zipball/2.1 . Well, I did not verify this personally so I cannot ensure this will work. But  anyway, you guys can try by yourself.

As I am a person who always wants keep his softwares updated, I am using VS2012 now because it is really to  run 2012 on fast computers. It is huge, but with a lot of cool features. Actually I started with Code::Blocks as it is open source–with g++. Later I enrolled in NUS and I do not have to buy 2012 by myself then I started VS2012. (Anyway, why am I talking about this?–I do not know. Probably just want to tell you that NUS SOC is really  cool. LOL)

Well, then we will start with  gtest tutorial 1: set-up googletest framework on your VS2012.

1. Create a static library project–under Win32 project. Do not use pre-compiled header.

2.Write some simple code: for example, you can use vector to  simulate a stack. Just make sure you only have *.cpp and *.h for the implementation. No main function since it is library.

3.Under the same solution, create a new static library project. Let us just name it–gtest. As you may have guessed–it is the gtest library. Under properties, go to configuration properties. For VC++ directories–>include directories, include (…)\gtest-1.6.0 and (…)\gtest-1.6.0\include two folders

4. Define _VARIADIC_MAX=10 under C\C++–>preprocessor. If you want to know the reason,  refer to here http://stackoverflow.com/questions/12558327/google-test-in-visual-studio-2012 . basically because VS2012 does not allow number of tuples to  exceed  5 by default while gtest  is  using 10.

5. Add existing files gtest-all.cc and gtest-main.cc in gtest-1.6.0\src\.

6.Add one more project, this time you will choose win32 console.

7. Then write your test case inside it like this

TEST(testCaseName,  testName){

//some operation here

}

8. Compile the first two and include those lib files as references also include gtest-1.6.0 and gtest\1.6.0\include.

then you are done.

Things may go wrong:

1. Static library project for gtest and the project to be tested. Driver is the test case project.

2. Preprocessor definition.

3. Folders and lib files to include.

References:

http://stackoverflow.com/questions/12558327/google-test-in-visual-studio-2012

http://leefrancis.org/2010/11/17/google-test-gtest-setup-with-microsoft-visual-studio-2008-c/

http://www.youtube.com/watch?v=n1OL800IcXI

Good luck with this!

Update: open source GUI for google test : http://code.google.com/p/gtest-gbar/

Update 2:

another form of the description:

The target–the project to be tested:

1. Create a Win32 project and declare it as a static library.

2. Uncheck “use pre-compiled headers”

3. write your class with out the main.c

4. Compile it as a lib file and locate the generated lib file.

GoogleTest.lib:

1. Create a Win32 project and specify (in the wizard) that it should be a static library.
2. Uncheck “use pre-compiled headers”
3. Extract GTest into the project folder
3. Right-click the project->Properties->Configuration Properties->VC++ Directories->Include Directories->add the include folder of GTest, and the GTest folder itself
4. Go to C/C++->Preprocessor->Preprocessor Definitions->add “_VARIADIC_MAX=10″
5. Apply all changes made to the project properties
6. Build the solution.
7. Locate the .lib file compiled by the project.

Then you need to link it to your unit test. Creating a separate project in the same solution is highly recommended.

1. Set up the project with steps 3 and 4 above(this time a win32 console is recommended).
2. Go to VC++ Directories->Library Directories->add the above GTest project’s Debug folder (where the newly-compiled .libs is)
3. Go to Linker->Input->Additional Dependencies->add the filename of the .lib files you found above
4. Apply all changes made to the project properties
5. Write your googletest test cases
