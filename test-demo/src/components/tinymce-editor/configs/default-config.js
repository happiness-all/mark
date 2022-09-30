const editorDefaultConfig = {
  language: 'zh_CN',
  content_style:
    'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
  content_css: './tinymce/content.min.css',
  skin_url: './tinymce',
  height: 500,
  toolbar:
    'undo redo | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | link unlink',

  promotion: false, // 升级按钮
  branding: false, // （隐藏右下角技术支持）
  menu: {}, // （自定义菜单）
  menubar: '', // （1级菜单）
  quickbars_insert_toolbar: '', // [插入]快捷工具栏
  statusbar: false, // （显示隐藏状态栏）
  indentation: '20px',

  paste_data_images:true, // 运行粘贴图形

  automatic_uploads: false, // 是否自动上传服务器
  images_reuse_filename: false, // 加了这个，图片地址会直接加时间戳
  object_resizing: true,
  images_upload_url: '',
  images_upload_handler() {
    throw new Error('images_upload_handler 不能为空')
  },

  link_default_target: '_blank'
}

export default editorDefaultConfig
