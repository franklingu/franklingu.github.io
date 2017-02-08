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
import subprocess
from datetime import datetime

import numpy as np
from PIL import Image, ImageEnhance


class DTExtractor(object):
    """docstring for DTExtractor"""
    def __init__(self, config):
        super(DTExtractor, self).__init__()
        self.img_out_path = config['img_out_path']
        self.text_out_path = config['text_out_path']
        self.conf_path = config['tesseract_conf_path']

    def _process_img(self, img_path):
        """crop, resize, replace color, improve contrast

        crop: remove leading noise part
        resize: tesseract is not good with small fonts
        replace color: replace yellow with white
        improve contrast: make colors more distinct
        """
        img = Image.open(img_path)
        img = img.crop((3, 0, img.size[0], img.size[1]))
        resized = img.resize(
            (img.size[0] * 16, img.size[1] * 16), Image.ANTIALIAS
        )
        r1, g1, b1 = (200, 200, 100)
        r2, g2, b2 = (255, 255, 255)
        data = np.array(resized.convert('RGBA'))
        red, green, blue, alpha = data.T
        yellow_areas = (red > r1) & (green > g1) & (blue > b1)
        data[..., :-1][yellow_areas.T] = (r2, g2, b2)
        contrast = ImageEnhance.Contrast(Image.fromarray(data))
        adjusted = contrast.enhance(3)
        adjusted.save(self.img_out_path)

    def extract_dt(self, img_path):
        cmd = 'tesseract {} {} -psm 7 {}'.format(
            self.img_out_path, self.text_out_path, self.conf_path
        )
        self._process_img(img_path)
        proc = subprocess.Popen(cmd, stderr=subprocess.PIPE)
        _, err_msg = proc.communicate()
        if err_msg:
            raise ValueError(err_msg)
        with open(self.text_out_path, 'rb') as ifile:
            content = ifile.read()
        content = content.strip()
        patterns = [
            '%I:%M%p %m/%d/%Y', '%I:%M%p %m1%d1%Y',
            '%I:%M%p %m/%d1%Y', '%I:%M%p %m1%d/%Y'
        ]
        dt = None
        for pattern in patterns:
            try:
                dt = datetime.strptime(content, pattern)
                break
            except ValueError:
                continue
        if dt is None:
            raise ValueError('Could not recognize datetime in %s', img_path)
        return dt

~~~

`tesseract /home/jgu/repos/dat_factset_terminal/new_img.png stdout -psm 7 tesseract.conf`

~~~
tessedit_char_whitelist apm:0123456789/
~~~
