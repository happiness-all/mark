<template>
  <div>
    <div id="basic-example" class="editor"></div>

    <button @click="getContent">getContent</button>
    <button @click="setContent">setContent</button>

    <div>{{ richValue }}</div>
  </div>
</template>

<script>
import tinymce from './js/init-editor';
import defaultConfig from './configs/default-config';
import plugins from './js/plugins';

import mockData from '../mock/values';

export default {
  name: 'App',
  data() {
    return {
      total: 0,
      richValue: '',
    };
  },
  mounted() {
    this.initEditor();
  },
  methods: {
    initEditor() {
      let timeout = null;
      const cfg = Object.assign({}, defaultConfig, {
        selector: '#basic-example',
        plugins,
        automatic_uploads: false,
        width: 750,
        height: 250,
        autoresize_min_height: 350,
        imageupload_url: 'serverAddress/file/fileUpload', //图片上传地址
        // 显示上传图片了
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | image',
        setup: (editor) => {
          editor.on('init', () => {
            this.editor = editor;
          });

          editor.on('blur', this.handleChange);
        },
        init_instance_callback: (editor) => {
          editor.on('input', (e) => {
            console.log('input', e.target);
          });
          editor.on('drop', (e) => {
            console.log('----drop-------', e);
            this.handleDropAndPaste(e.dataTransfer);
          });
          editor.on('paste', (e) => {
            console.log('----paste-------', e);
            this.handleDropAndPaste(e.clipboardData || window.clipboardData);
          });
        },
        images_upload_handler: (blobInfo) => {
          return new Promise((resolve, reject) => {
            console.log('=============================');
            clearTimeout(timeout);
            timeout = setTimeout(() => {
              this.total++;

              if (this.total >= 3) {
                this.total = 0;
                reject({ remove: true, message: '不能上传多个文件' });
                return;
              }

              console.log('=blob=', blobInfo);
              console.log('=blob=', blobInfo.blob().type);
              console.log('=blob=', blobInfo.uri());
              console.log('=blob=', blobInfo.filename());

              const formData = new FormData();
              formData.append('file', blobInfo.blob(), blobInfo.filename());

              // resolve('http://xxxxx');
              const base64 = `data:${
                blobInfo.blob().type
              };base64,${blobInfo.base64()}`;
              resolve(base64)
            }, 300);
          });
        },
      });
      tinymce.init(cfg);
    },

    // 处理粘贴、拖拽
    handleDropAndPaste(dataTransfer) {
      const dropItems = dataTransfer.items;
      for (let i = 0; i < dropItems.length; i++) {
        const dropItem = dropItems[i];
        if (dropItem.type.indexOf('image') !== -1) {
          const file = dropItem.getAsFile();
          console.log('粘贴的是图片类型', file);
          this.insetImage(file);
        }
      }
    },

    insetImage(file) {
      const blob = URL.createObjectURL(file);

      this.editor.insertContent(
        `<img data-fileId="abc" src="${blob}" onload="URL.revokeObjectURL(this.src)" alt="${file.name}" />`
      );
    },

    getContent() {
      const val = this.editor.getContent();
      console.log(val);
      this.richValue = val;
    },

    setContent() {
      this.editor.setContent(mockData);
    },

    handleChange() {
      this.getContent();
      const urls = this.matchImageTags(this.richValue);
      console.log(urls);
    },

    matchImageTags(content) {
      const imgRegExp = /<img.*?(?:>|\/>)/gi;
      const srcRegExp = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;

      const imgArr = content.match(imgRegExp);
      const paths = [];
      imgArr.forEach((item) => {
        const [path] = item.match(srcRegExp);
        paths.push(path);
      });

      return paths;
    },
  },
};
</script>

<style lang="less" scoped>
.editor {
  height: 500px;
}
</style>
