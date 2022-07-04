<template>
  <span>
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-form @submit="onSubmit" :form="form">
        <a-form-item
            :label="$t('title')"
            :labelCol="{span: 7}"
            :wrapperCol="{span: 10}"
        >
          <a-input v-decorator="['title', {rules: [{ required: false, message: '请输入标题，如没有请输入无', whitespace: true}]}]" :placeholder="$t('titleInput')"></a-input>
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
  </span>
</template>

<script>
import {doSomething} from '@/services/user'
export default {
  name: 'TextInput',
  i18n: require('./i18n'),
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
          doSomething(title, content).then()
        }
      })
    },
    afterDoSomethig(res) {
      this.myValid = true
      const DoRes = res.data
      if(DoRes.success){
        this.newTitle = DoRes.title
        this.newAbstract = DoRes.abstract
      }
      else{
        alert("网络请求错误，请您稍后重试")
      }
    }
  }
}
</script>

<style scoped>

</style>
