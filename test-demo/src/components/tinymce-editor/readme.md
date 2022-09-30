### 宇宙第一坑爹编辑器 tinymce 踩坑集合

> 1. 安装方式
>    - npm 安装后，需要手动复制样式到 public 目录
>    - 通过 content_css 设置 content.min.css 样式完整 **相对路径**
>    - skin_url 设置样式 skin.min.css 的 **目录**
>    - 国际化文件需要手动下载并添加到工程目录下，然后再设置语言，不然默认英文

> 2. base64 图片显示方式
>    - images_reuse_filename 熟悉只能设置为 false， 不然会被手动加上时间戳导致图片无法正常显示
>    - images_upload_handler 函数在 6 版本只支持返回 Promise
>    - images_upload_handler reject 时候，如果设置了 remove: true, 则会移除 **全部** 的 base64 的图片（特别坑爹）

> 3. 自定义图片上传
>   - paste_data_images false 禁用自动拖拽粘贴图片
>   - 监听 drop、paste 事件，判断内容，通过 insertContent 插入对应的标签
