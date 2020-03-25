<template>
  <div class="row mt-5">
    <div class="col">
      <h2 class="mb-3">新增文章(研究中 ...｡ﾟヽ(ﾟ´Д`)ﾉﾟ｡)</h2>
      <div class="row justify-content-center">
        <div class="col-md-6">
          <form @submit.prevent="updatePost">
            <ckeditor
              :editor="editor"
              v-model="editorData"
              :config="editorConfig"
            ></ckeditor>
            <div class="text-right">
              <button
                type="submit"
                class="btn btn-secondary mt-3"
              >送出</button>
            </div>
          </form>
        </div>
      </div>

      <h6 class="mt-5">待新增功能</h6>
      <ol>
        <li>圖片上傳</li>
        <li>標籤</li>
      </ol>
    </div>
  </div>
</template>


<style lang="scss">
.ck-editor__editable {
  min-height: 250px;
}
</style>

<script>
// import ClassicEditor from '../../node_modules/@ckeditor/ckeditor5-build-classic';
import ClassicEditor from '../../../node_modules/@ckeditor/ckeditor5-build-classic';

export default {
  data() {
    return {
      editor: ClassicEditor,
      editorData: '<p></p>',
      editorConfig: {
        placeholder: '從這裡開始全新的內容 ...',
        // 當編輯器內容為空時顯示此字串
        initialData: '<h2>我是預設字串</h2>',
        // 初始化載入文字
        heading: {
          // 設定 Heading 內的樣式，可新增多個
          options: [
            {
              model: 'paragraph',
              title: 'Paragraph',
              class: 'ck-heading_paragraph',
            },
            {
              model: 'heading1',
              view: 'h2',
              title: 'Heading 1',
              class: 'ck-heading_heading1',
            },
            {
              model: 'heading2',
              view: 'h3',
              title: 'Heading 2',
              class: 'ck-heading_heading2',
            },
          ],
        },
        language: 'zh',
        // 設定語言
      },
    };
  },
  methods: {
    updatePost() {
      const vm = this;
      firebase
        .database()
        .ref()
        .push(vm.editorData);

      vm.$router.push('/admin/uploadPosts-result');
    },
  },
};
</script>
