---
layout: blog_base
title: openCV on Rasbperry Pi
category: programming
tag: rpi, opencv
meta_desc: Running opencv on RPi
---
First update the archive:

~~~bash
$sudo apt-get update
$sudo apt-get upgrade
~~~

Install the dependencies:

Build tools:

~~~
sudo apt-get install build-essential cmake
~~~

GUI(optional):

~~~
sudo apt-get install qt5-default libvtk6-dev
~~~

Media I/O:

~~~
sudo apt-get install zlib1g-dev libjpeg-dev libwebp-dev libpng-dev libtiff5-dev libjasper-dev libopenexr-dev libgdal-dev
~~~

Video I/O:

~~~
sudo apt-get install libdc1394-22-dev libavcodec-dev libavformat-dev libswscale-dev libtheora-dev libvorbis-dev libxvidcore-dev libx264-dev yasm libfaac-dev libopencore-amrnb-dev libopencore-amrwb-dev libv4l-dev libxine-dev
~~~

Parallelism and linear algebra libraries:

~~~
sudo apt-get install libtbb-dev libeigen3-dev
~~~

Python:(python3 if you are using python3)

~~~
sudo apt-get install python-dev python-tk python-numpy python3-dev python3-tk python3-numpy
~~~

Documentation:

~~~
sudo apt-get install sphinx-common texlive-latex-extra
~~~

These dependencies may not be all needed for all kind of tasks. For beginners like me, installing all for later use is for safety.

Go to the [sourceforge](http://sourceforge.net/projects/opencvlibrary/files/opencv-unix/) to download the zip for later use.

A lot of online tutorials currently online are suggesting building opencv from source this way:

~~~bash
unzip opencv-[version].zip
cd opencv-[version]
mkdir release
cd release
cmake
make
sudo make install
~~~

But it will simply takes years to build since we are talking about RPi. So if you are too keen about getting the latest opencv, we can just download from archive but running <code>sudo apt-get install libopencv-dev</code>

Another problem when running opencv with camera on RPi may be driver issue--of course here I assume everybody has already gone through [RPi Camera](http://www.raspberrypi.org/help/camera-module-setup/). The driver that works on RPi is [uv4l](http://www.linux-projects.org/modules/sections/index.php?op=viewarticle&artid=14).

And then you are ready to start trying opencv examples and run your own opencv projects.
