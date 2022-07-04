<template>
  <div>
    <a-upload-dragger
        name="file"
        :multiple="true"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        @change="handleChange"
    >
      <p class="ant-upload-drag-icon">
        <a-icon type="inbox" />
      </p>
      <p class="ant-upload-text">
        点击或拖拽文件到此区域以进行上传
      </p>
      <p class="ant-upload-hint">
        支持单文件或多文件上传
      </p>
    </a-upload-dragger>
    <div>{{this.$route.params.title}}</div>
    <a-divider />
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false" title="生成标题" v-show="myValid">
      <p>{{newTitle}}</p>
    </a-card>
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false" title="生成摘要" v-show="myValid">
      <p>{{newAbstract}}</p>
    </a-card>
  </div>
</template>
<script>
export default {
  data () {
    let myValid = false
    let newTitle = ""
    let newAbstract = ""
    return {
      myValid,
      newTitle,
      newAbstract,
      value: 1,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    handleChange(info) {
      const status = info.file.status;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully.`);
        this.myValid = true
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
  },
};
</script>
