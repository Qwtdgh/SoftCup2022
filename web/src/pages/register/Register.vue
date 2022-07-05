<template>
  <common-layout>
    <div class="top">
      <div class="header">
        <img alt="logo" class="logo" src="@/assets/img/logo.png"/>
        <span class="title">智能创作全都队</span>
      </div>
      <div class="desc">请填写您的个人信息来完成注册</div>
    </div>
    <div class="login">
      <a-form @submit="onSubmit" :form="form">
        <a-tabs size="large" :tabBarStyle="{textAlign: 'center'}" style="padding: 0 2px;">
          <a-tab-pane tab="邮箱注册" key="2">
            <a-alert type="error" :closable="true" v-show="error" :message="error" showIcon
                     style="margin-bottom: 24px;"/>
            <a-form-item>
              <a-input
                  size="large"
                  placeholder="请输入您的邮箱"
                  autocomplete="autocomplete"
                  v-decorator="['email', {rules: [
                      { required: true, message: '请输入邮箱地址', whitespace: true},
                      { type: 'email', message: '请输入正确的邮箱地址'}
                      ]}
                      ]"
              >
                <a-icon slot="prefix" type="mail" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-row :gutter="8" style="margin: 0 -4px">
                <a-col :span="16">
                  <a-input
                      size="large"
                      placeholder="请输入邮箱验证码"
                      autocomplete="autocomplete"
                      v-decorator="['code', {rules: [{ required: true, message: '请输入验证码', whitespace: true}]}]"
                  >
                    <a-icon slot="prefix" type="safety" />
                  </a-input>
                </a-col>
                <a-col :span="8" style="padding-left: 4px">
                  <a-button style="width: 100%" class="captcha-button" size="large" @click="getVerCodeRequest">获取验证码</a-button>
                </a-col>
              </a-row>
            </a-form-item>
            <a-form-item>
              <a-input
                  size="large"
                  placeholder="请输入您的用户名"
                  autocomplete="autocomplete"
                  v-decorator="['name', {rules: [{ required: true, message: '请输入您的用户名', whitespace: true}]}]"
              >
                <a-icon slot="prefix" type="idcard"/>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                  size="large"
                  placeholder="请输入密码"
                  autocomplete="autocomplete"
                  type="password"
                  v-decorator="['password', {rules: [
                      { required: true, message: '请输入您的密码', whitespace: true},
                      {validator: validateToNextPassword},
                      ]}]"
              >
                <a-icon slot="prefix" type="lock"/>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                  size="large"
                  placeholder="请确认密码"
                  autocomplete="autocomplete"
                  type="password"
                  v-decorator="['password2', {rules: [
                      { required: true, message: '请再次确认您的密码', whitespace: true},
                      {validator: compareToFirstPassword},
                      ]}]"
              >
                <a-icon slot="prefix" type="lock"/>
              </a-input>
            </a-form-item>
          </a-tab-pane>
        </a-tabs>
        <a-form-item>
          <a-button :loading="logging" style="width: 100%;margin-top: 24px" size="large" htmlType="submit"
                    type="primary">注册
          </a-button>
        </a-form-item>
      </a-form>
      <div>
        <router-link style="float: right" to="/login">返回登录</router-link>
      </div>
    </div>
  </common-layout>
</template>

<script>
import CommonLayout from '@/layouts/CommonLayout'
import {getRoutesConfig, register} from '@/services/user'
import {loadRoutes} from '@/utils/routerUtil'
import {mapMutations} from 'vuex'
import {getVerCode} from "../../services/user";

export default {
  name: 'Register',
  components: {CommonLayout},
  data() {
    return {
      logging: false,
      error: '',
      form: this.$form.createForm(this)
    }
  },
  computed: {
    systemName() {
      return this.$store.state.setting.systemName
    }
  },
  methods: {
    ...mapMutations('account', ['setUser', 'setPermissions', 'setRoles']),
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err) => {
        if (!err) {
          this.logging = true
          const name = this.form.getFieldValue('name')
          const password = this.form.getFieldValue('password')
          const userEmail = this.form.getFieldValue('email')
          const code = this.form.getFieldValue('code')
          register(name, userEmail, password, code).then(this.afterRegister)
        }
      })
    },
    getVerCodeRequest(){
      this.form.validateFields(['email'], (err) => {
        if (!err) {
          const userEmail = this.form.getFieldValue('email')
          getVerCode(userEmail).then(this.afterGetVerCode)
        }
      })
    },
    afterRegister(res){
      const registerRes = res.data
      if(registerRes.success) {
        getRoutesConfig().then(result => {
          const routesConfig = result.data.data
          loadRoutes(routesConfig)
          this.$router.push('/login')
        })
      }
      else{
        alert(registerRes.message)
      }
    },
    afterGetVerCode(res){
      const registerRes = res.data
      console.log(res)
      if(registerRes.success) {
        alert("已经成功发送")
      }
      else{
        // alert("test")
        alert(registerRes.message)
      }
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    },
  }
}
</script>

<style lang="less" scoped>
.common-layout {
  .top {
    text-align: center;

    .header {
      height: 44px;
      line-height: 44px;

      a {
        text-decoration: none;
      }

      .logo {
        height: 44px;
        vertical-align: top;
        margin-right: 16px;
      }

      .title {
        font-size: 33px;
        color: @title-color;
        font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
        font-weight: 600;
        position: relative;
        top: 2px;
      }
    }

    .desc {
      font-size: 14px;
      color: @text-color-second;
      margin-top: 12px;
      margin-bottom: 40px;
    }
  }

  .login {
    width: 368px;
    margin: 0 auto;
    @media screen and (max-width: 576px) {
      width: 95%;
    }
    @media screen and (max-width: 320px) {
      .captcha-button {
        font-size: 14px;
      }
    }

    .icon {
      font-size: 24px;
      color: @text-color-second;
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: @primary-color;
      }
    }
  }
}
</style>
