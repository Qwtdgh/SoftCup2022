<template>
  <span>
    <div>
    <a-upload-dragger
        name="file"
        :multiple="true"
        accept=".txt"
        :data="{
          userId: this.userId
        }"
        action="http://106.54.191.30:80/api/uploadFile/"
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
  <div>
    <a-spin tip="Loading..." v-show="wait">
      <div class="spin-content">
        我们正在玩命运行...
      </div>
    </a-spin>
  </div>
  </span>
</template>
<script>
import Global from "../../Global";
export default {
  data () {
    let myValid = false
    let wait = false
    let newTitle = ""
    let newAbstract = ""
    const userId = Global.userId
    return {
      userId,
      myValid,
      newTitle,
      newAbstract,
      wait,
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
        this.wait = true
        this.$message.success(`${info.file.name} file uploaded successfully.`);
        this.newTitle = info.file.response.title
        this.newAbstract = info.file.response.abstract
        this.myValid = true
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
      this.wait = false
    },
  },
};
</script>
