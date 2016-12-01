---
layout: blog_base
title: Unzip zip file with specially encoded filenames inside
category: linux
tag: command-line, unzip
meta_desc: how to deal with special encoded filenames in zipfile under linux in general
---

Encoding is always hard to get right. At least to many programs and programers I have seen, getting encoding right is not a trivial task at all. If we just need to work with the 26 characters in English and a few digits and symbols, a lot of problems will be gone. But since the fall of Towser of Babel, we have so many languages--and my mother tongue is one of the most special and ancient languages--Chinese--so I read and work with Chinese stuff a lot.

There are several popular encodings of Chinese character set--Guobiao, Big5(And since Chinese, Korean and Japanese share a lot in culture, we could see a lot of Chinese charaters in Japanese and Korean as well. So encodings like Shift-JIS do handle Chinese charaters as well). Other than these special encodings just for Chinese, we have the unicode standard which aims to include all writable characters--so Chinese could be represented in unicode. The most famous encoding is UTF-8(this encoding is just such a great design!).

That is for the background knowledge of Chinese encodings. Encoding is a big issue and after getting some basics, we will be able to understand why some garbage comes out of some file downloaded from the Internet. In this post I just want to talk about unzip in Linux(Ubuntu as the example cause I work with it most of the time).

So I downloaded some file(A collection of novels) from Baidu Pan. It is a zip file and I tried to use Archive Manager to view its content--well, garbage folder names and file names. And I cannot even extract them because of the bad encoding. So I switched to command line and I see this output:

~~~
➜  Downloads unzip -l 东野圭吾.zip
Archive:  东野圭吾.zip
  Length      Date    Time    Name
---------  ---------- -----   ----
        0  2012-12-29 12:47   ╢л╥░╣ч╬с/
    49230  2012-12-29 12:44   ╢л╥░╣ч╬с/╥╘╒г╤█╕╔▒н.txt
    40890  2012-12-29 12:23   ╢л╥░╣ч╬с/╥┴╢╣┬├╣▌╡─╔ё├╪░╕.txt
   158806  2012-12-29 12:45   ╢л╥░╣ч╬с/┘д└√┬╘╡─┐р─╒.txt
   312084  2012-12-29 12:22   ╢л╥░╣ч╬с/╩╣├№╙ы╨─╡─╝л╧▐.txt
   223452  2012-12-29 12:36   ╢л╥░╣ч╬с/╒ь╠╜┘д└√┬╘.txt
   309774  2012-12-29 12:22   ╢л╥░╣ч╬с/╨┼.txt
   380742  2012-12-29 12:21   ╢л╥░╣ч╬с/╖╓╔э.txt
   211955  2012-12-29 12:22   ╢л╥░╣ч╬с/╩о╥╗╫╓╔▒╚╦.txt
   483969  2012-12-29 12:20   ╢л╥░╣ч╬с/╡е┴╡.txt
   271727  2012-12-29 12:19   ╢л╥░╣ч╬с/▒ф╔э.txt
   276327  2012-12-29 12:22   ╢л╥░╣ч╬с/├√╒ь╠╜╡─╣ц╠ї.txt
   186715  2012-12-29 12:47   ╢л╥░╣ч╬с/├√╒ь╠╜╡─╫ч╓ф.txt
   190776  2012-12-29 12:21   ╢л╥░╣ч╬с/╗╪└╚═д╔▒╚╦╩┬╝■.txt
   346432  2012-12-29 12:22   ╢л╥░╣ч╬с/╩е┼о╡─╛╚╝├.txt
   174262  2012-12-29 12:47   ╢л╥░╣ч╬с/╠ь╩╣╓о╢·.txt
   295093  2012-12-29 12:22   ╢л╥░╣ч╬с/╧╙╥╔╖╕X╡─╧╫╔э.txt
   279797  2012-12-29 12:23   ╢л╥░╣ч╬с/╦▐├№.txt
   113275  2012-12-29 12:22   ╢л╥░╣ч╬с/╔┘┼о╬п═╨╚╦.txt
   128836  2012-12-29 12:20   ╢л╥░╣ч╬с/▓╝╣╚─ё╡─╡░╩╟╦н╡─.txt
   281490  2012-12-29 12:46   ╢л╥░╣ч╬с/▓╝┬│╠╪╦╣╡─╨─╘р.txt
   570664  2012-12-29 12:21   ╢л╥░╣ч╬с/╗├╥╣.txt
   175549  2012-12-29 12:46   ╢л╥░╣ч╬с/╣╓╚╦├╟.txt
   185335  2012-12-29 12:29   ╢л╥░╣ч╬с/╣╓╨ж╨б╦╡.txt
   248421  2012-12-29 12:20   ╢л╥░╣ч╬с/╢ё╥т.txt
   237937  2012-12-29 12:21   ╢л╥░╣ч╬с/╖┼╤з║є.txt
   243242  2012-12-29 12:32   ╢л╥░╣ч╬с/╨┬▓╬╒▀.txt
   550260  2012-12-29 12:22   ╢л╥░╣ч╬с/╔▒╚╦╓о├┼.txt
   231383  2012-12-29 12:29   ╢л╥░╣ч╬с/╢╛╨ж╨б╦╡.txt
   217015  2012-12-29 12:19   ╢л╥░╣ч╬с/▒╧╥╡╟░╔▒╚╦╙╬╧╖.txt
   252810  2012-12-29 12:46   ╢л╥░╣ч╬с/│┴╦п╡─╔н┴╓.txt
   235399  2012-12-29 12:38   ╢л╥░╣ч╬с/├╗╙╨╨╫╩╓╡─╔▒╚╦╥╣.txt
   383936  2012-12-29 12:21   ╢л╥░╣ч╬с/┴ў╨╟╓о░э.txt
   192384  2012-12-29 12:21   ╢л╥░╣ч╬с/║■▒▀╨╫╔▒░╕.txt
   308932  2012-12-29 12:20   ╢л╥░╣ч╬с/▒Ї╦└╓о╤█.txt
   267500  2012-12-29 12:45   ╢л╥░╣ч╬с/░╫┬э╔╜╫п╔▒╚╦╩┬╝■.txt
   366169  2012-12-29 12:39   ╢л╥░╣ч╬с/├╪├▄.txt
   226259  2012-12-29 12:21   ╢л╥░╣ч╬с/║ь╩╓╓╕.txt
   243301  2012-12-29 12:19   ╢л╥░╣ч╬с/░є╝▄╙╬╧╖.txt
   190787  2012-12-29 12:20   ╢л╥░╣ч╬с/│мбд╔▒╚╦╩┬╝■.txt
   192098  2012-12-29 12:23   ╢л╥░╣ч╬с/╤й╡╪╔▒╗·.txt
   182246  2012-12-29 12:23   ╢л╥░╣ч╬с/╘д╓к├╬.txt
   204722  2012-12-29 12:21   ╢л╥░╣ч╬с/║┌╨ж╨б╦╡.txt
---------                     -------
 10621981                     43 files
~~~

It is not any language, definitely not Chinese. So let's make a guess that this zip is encoded in GBK(cause I know it is simplified Chinese, so I will make a guess that it is Guobiao, which can be abbriviated as GB. And the next guess is naturally GBK as it is popularized by Microsoft--most users use Microsoft--with the standard CP 936).

~~~
➜  Downloads unzip -O GBK -l 东野圭吾.zip
Archive:  东野圭吾.zip
  Length      Date    Time    Name
---------  ---------- -----   ----
        0  2012-12-29 12:47   东野圭吾/
    49230  2012-12-29 12:44   东野圭吾/以眨眼干杯.txt
    40890  2012-12-29 12:23   东野圭吾/伊豆旅馆的神秘案.txt
   158806  2012-12-29 12:45   东野圭吾/伽利略的苦恼.txt
   312084  2012-12-29 12:22   东野圭吾/使命与心的极限.txt
   223452  2012-12-29 12:36   东野圭吾/侦探伽利略.txt
   309774  2012-12-29 12:22   东野圭吾/信.txt
   380742  2012-12-29 12:21   东野圭吾/分身.txt
   211955  2012-12-29 12:22   东野圭吾/十一字杀人.txt
   483969  2012-12-29 12:20   东野圭吾/单恋.txt
   271727  2012-12-29 12:19   东野圭吾/变身.txt
   276327  2012-12-29 12:22   东野圭吾/名侦探的规条.txt
   186715  2012-12-29 12:47   东野圭吾/名侦探的诅咒.txt
   190776  2012-12-29 12:21   东野圭吾/回廊亭杀人事件.txt
   346432  2012-12-29 12:22   东野圭吾/圣女的救济.txt
   174262  2012-12-29 12:47   东野圭吾/天使之耳.txt
   295093  2012-12-29 12:22   东野圭吾/嫌疑犯X的献身.txt
   279797  2012-12-29 12:23   东野圭吾/宿命.txt
   113275  2012-12-29 12:22   东野圭吾/少女委托人.txt
   128836  2012-12-29 12:20   东野圭吾/布谷鸟的蛋是谁的.txt
   281490  2012-12-29 12:46   东野圭吾/布鲁特斯的心脏.txt
   570664  2012-12-29 12:21   东野圭吾/幻夜.txt
   175549  2012-12-29 12:46   东野圭吾/怪人们.txt
   185335  2012-12-29 12:29   东野圭吾/怪笑小说.txt
   248421  2012-12-29 12:20   东野圭吾/恶意.txt
   237937  2012-12-29 12:21   东野圭吾/放学后.txt
   243242  2012-12-29 12:32   东野圭吾/新参者.txt
   550260  2012-12-29 12:22   东野圭吾/杀人之门.txt
   231383  2012-12-29 12:29   东野圭吾/毒笑小说.txt
   217015  2012-12-29 12:19   东野圭吾/毕业前杀人游戏.txt
   252810  2012-12-29 12:46   东野圭吾/沉睡的森林.txt
   235399  2012-12-29 12:38   东野圭吾/没有凶手的杀人夜.txt
   383936  2012-12-29 12:21   东野圭吾/流星之绊.txt
   192384  2012-12-29 12:21   东野圭吾/湖边凶杀案.txt
   308932  2012-12-29 12:20   东野圭吾/濒死之眼.txt
   267500  2012-12-29 12:45   东野圭吾/白马山庄杀人事件.txt
   366169  2012-12-29 12:39   东野圭吾/秘密.txt
   226259  2012-12-29 12:21   东野圭吾/红手指.txt
   243301  2012-12-29 12:19   东野圭吾/绑架游戏.txt
   190787  2012-12-29 12:20   东野圭吾/超·杀人事件.txt
   192098  2012-12-29 12:23   东野圭吾/雪地杀机.txt
   182246  2012-12-29 12:23   东野圭吾/预知梦.txt
   204722  2012-12-29 12:21   东野圭吾/黑笑小说.txt
---------                     -------
 10621981                     43 files
~~~

OK. This time the output is OK already. So I unzipped the file with `unzip -O GBK 东野圭吾.zip`. Then I opened one novel in vim and start reading--well, the content is also GBK most likely. So let's convert files to UTF for vim and other programs like cat and less to process the file(my system language setting is UTF-8).

~~~
for d in $(ls ./); do iconv -f GBK -t UTF-8 $d > "encoded$d"; rm $d; mv "encoded$d" $d; done
~~~

Tada! Now I can enjoy novels!


References:

1. [unicode support from file roller?](https://ubuntuforums.org/showthread.php?t=2113157)
2. [Best way to convert text files between character sets?](http://stackoverflow.com/questions/64860/best-way-to-convert-text-files-between-character-sets)
