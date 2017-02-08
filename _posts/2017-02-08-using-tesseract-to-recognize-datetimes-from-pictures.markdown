---
layout: blog_base
title: Using Tesseract to recognize datetime from pictures
category: programming
tag: python, OCR
meta_desc: How to use Tesseract to recognize datetime from pictures
---

~~~python
"""recognize and extract datetime information from images
"""
from optparse import OptionParser

import numpy as np
from PIL import Image, ImageEnhance


def process_img(img_path):
    """crop, resize, replace color, improve contrast
    """
    img = Image.open(img_path)
    img = img.crop((3, 0, img.size[0], img.size[1]))
    resized = img.resize((img.size[0] * 16, img.size[1] * 16), Image.ANTIALIAS)
    r1, g1, b1 = (200, 200, 100)
    r2, g2, b2 = (255, 255, 255)
    data = np.array(resized.convert('RGBA'))
    red, green, blue, alpha = data.T
    yellow_areas = (red > r1) & (green > g1) & (blue > b1)
    data[..., :-1][yellow_areas.T] = (r2, g2, b2)
    contrast = ImageEnhance.Contrast(Image.fromarray(data))
    adjusted = contrast.enhance(3)
    adjusted.save('new_img.png')


if __name__ == '__main__':
    parser = OptionParser()
    opts, args = parser.parse_args()
    process_img(args[0])
~~~

`tesseract /home/jgu/repos/dat_factset_terminal/new_img.png stdout -psm 7 tesseract.conf`

~~~
tessedit_char_whitelist apm:0123456789/
~~~
