<template>
  <span>
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-form @submit="onSubmit" :form="form">
        <a-form-item
            :label="$t('title')"
            :labelCol="{span: 7}"
            :wrapperCol="{span: 10}"
        >
          <a-input v-decorator="['title', {rules: [{ required: false, message: '请输入标题', whitespace: true}]}]" :placeholder="$t('titleInput')"></a-input>
        </a-form-item>
        <a-form-item
            :label="$t('content')"
            :labelCol="{span: 7}"
            :wrapperCol="{span: 10}"
        >
          <a-textarea rows="4" v-decorator="['content', {rules: [{ required: true, message: '请输入内容', whitespace: true}]}]" :placeholder="$t('contentInput')"/>
        </a-form-item>
        <a-form-item style="margin-top: 24px" :wrapperCol="{span: 10, offset: 7}">
          <a-button type="primary" htmlType="submit">{{$t('submit')}}</a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-divider />
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false" title="生成标题" v-show="myValid">
      <p>{{newTitle}}</p>
    </a-card>
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false" title="生成摘要" v-show="myValid">
      <p>{{newAbstract}}</p>
    </a-card>
    <div>
    <a-spin tip="Loading..." v-show="wait">
      <div class="spin-content">
        您的qlh正在玩命寻找npy...
      </div>
    </a-spin>
  </div>
  </span>
</template>

<script>
import {doSomething} from '@/services/user'
export default {
  name: 'TextInput',
  i18n: require('./i18n'),
  data () {
    let myValid = false
    let wait = false
    let newTitle = ""
    let newAbstract = ""
    return {
      myValid,
      wait,
      newTitle,
      newAbstract,
      value: 1,
    form: this.$form.createForm(this)
    }
  },
  computed: {
    desc() {
      return this.$t('pageDesc')
    }
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err) => {
        if (!err) {
          this.logging = true
          const title = this.form.getFieldValue('title')
          const content = this.form.getFieldValue('content')
          console.log(title + " " + content)
          this.myValid = false
          this.wait = true
          doSomething(title, content).then(this.afterDoSomethig)
        }
      })
    },
    afterDoSomethig(res) {
      const DoRes = res.data
      this.wait = false
      if(DoRes.Success){
        this.newTitle = DoRes.title
        this.newAbstract = DoRes.abstract
        this.myValid = true
      }
      else{
        // alert(DoRes.message)
        alert("请输入中文且内容长度不小于50个字")
      }
    }
  }
}
</script>

<style scoped>
.spin-content {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
}
</style>
