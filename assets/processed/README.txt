处理后图片存放目录
====================

本目录用于存放无人机图像处理后的结果图片。

命名规范:
--------
处理后图片必须按照以下格式命名:
  imgXXX_processed.jpg

其中 XXX 为三位数字编号,例如:
  - img001_processed.jpg
  - img002_processed.jpg
  - img123_processed.jpg

对于两位或一位数字的编号也支持:
  - img01_processed.jpg
  - img1_processed.jpg

匹配规则:
--------
当用户上传原始图片(如 img001.jpg 或 img001_raw.jpg)时,
系统会自动从文件名中提取编号(如 001),
然后在本目录下查找对应的处理后图片 img001_processed.jpg

支持的图片格式:
--------------
.jpg, .jpeg, .png

示例:
----
原始图片: img001.jpg 或 uav_img001.jpg 或 img001_raw.jpg
处理后图片: img001_processed.jpg

原始图片: img05.jpg
处理后图片: img05_processed.jpg
