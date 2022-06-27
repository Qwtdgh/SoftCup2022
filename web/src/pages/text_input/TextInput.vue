<template>
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
</template>

<script>
export default {
  name: 'TextInput',
  i18n: require('./i18n'),
  data () {
    return {
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
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
