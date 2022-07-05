<template>
  <div>
    <div v-show="myPermission">
      <a-card
          style="margin-top: 24px"
          :bordered="false"
          title="用户列表"
      >
        <a-list size="large" :pagination="{showSizeChanger: true, showQuickJumper: true, pageSize: 5, total: 50}">
          <a-list-item v-for="(item,index) in userLists" :key="index">
            <a-list-item-meta
                :description="item.email"
            >
              <a-avatar slot="avatar" size="large" shape="circle"
                        src="	https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png"/>
              <a slot="title">{{ item.username }}</a>
            </a-list-item-meta>
            <div slot="actions">
              <a @click="showDrawer">编辑</a>
            </div>
            <div slot="actions">
              <a-dropdown>
                <a-menu slot="overlay">
                  <a-menu-item><a @click="showDrawer">编辑</a></a-menu-item>
                  <a-menu-item><a @click="onDeleteUser(item.id)">删除</a></a-menu-item>
                </a-menu>
                <a>更多
                  <a-icon type="down"/>
                </a>
              </a-dropdown>
            </div>
            <div class="list-content">
              <div class="list-content-item">
                <!--              <span>用户ID</span>-->
                <p>用户ID： {{ item.id }}</p>
              </div>
              <div class="list-content-item">
                <!--              <span>用户ID</span>-->
                <p>用户名： {{ item.username }}</p>
              </div>
              <div class="list-content-item">
                <!--              <span>用户ID</span>-->
                <p>用户邮箱： {{ item.email }}</p>
              </div>
<!--              <div class="list-content-item">-->
<!--                &lt;!&ndash;              <span>用户密码</span>&ndash;&gt;-->
<!--                <p>用户密码： {{ item.userPassword }}</p>-->
<!--              </div>-->
            </div>
            <a-drawer
                :title="'用户' + item.id + '：' + item.username"
                :width="720"
                :visible="visible"
                :body-style="{ paddingBottom: '80px' }"
                @close="onClose"
            >
              <a-form :form="form" @submit="onSubmit(item.id, item.username, item.email)" layout="vertical" hide-required-mark>
                <a-row :gutter="16">
                  <a-col :span="12">
                    <a-form-item label="用户ID">
                      <a-input
                          size="large"
                          :placeholder="item.id"
                          :default-value="item.id"
                          disabled="true"
                          autocomplete="autocomplete"
                          v-decorator="['userId', {
                          rules: [
                      { required: false, message: '请输入用户ID', whitespace: true},
                      ]}
                      ]"
                      >
                        <a-icon slot="prefix" type="mail"/>
                      </a-input>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item label="用户名">
                      <a-input
                          @change="test1"
                          size="large"
                          :placeholder="item.username"
                          :value="item.username"
                          :default-value="item.username"
                          autocomplete="autocomplete"
                          v-decorator="['userName', {rules: [
                      { required: myValid1, message: '请输入用户名', whitespace: true},
                      ]}
                      ]"
                      >
                        <a-icon slot="prefix" type="idcard"/>
                      </a-input>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row :gutter="16">
                  <a-col :span="12">
                    <a-form-item label="用户邮箱">
                      <a-input
                          @change="test2"
                          size="large"
                          :placeholder="item.email"
                          :value="item.email"
                          :default-value="item.email"
                          autocomplete="autocomplete"
                          v-decorator="['userEmail', {rules: [
                      { required: myValid2, message: '请输入邮箱地址', whitespace: true},
                      { type: 'email', message: '请输入正确的邮箱地址'}
                      ]}
                      ]"
                      >
                        <a-icon slot="prefix" type="mail"/>
                      </a-input>
                    </a-form-item>
                  </a-col>
                </a-row>
<!--                <a-row :gutter="16">-->
<!--                  <a-col :span="12">-->
<!--                    <a-form-item label="用户密码">-->
<!--                      <a-input-->
<!--                          @change="test3"-->
<!--                          size="large"-->
<!--                          :placeholder="item.userPassword"-->
<!--                          :value="item.userPassword"-->
<!--                          :default-value="item.userPassword"-->
<!--                          autocomplete="autocomplete"-->
<!--                          v-decorator="['userPassword', {rules: [-->
<!--                      { required: myValid3, message: '请输入用户密码', whitespace: true},-->
<!--                      ]}-->
<!--                      ]"-->
<!--                      >-->
<!--                        <a-icon slot="prefix" type="safety"/>-->
<!--                      </a-input>-->
<!--                    </a-form-item>-->
<!--                  </a-col>-->
<!--                </a-row>-->
              </a-form>
              <div
                  :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
              >
                <a-form-item>
                  <a-button type="primary" @click="onClose">
                    Cancel
                  </a-button>
                </a-form-item>
                <a-form-item>
                  <a-button type="primary"  @click="onSubmit(item.id, item.username, item.email)">
                    Submit
                  </a-button>
                </a-form-item>
              </div>
            </a-drawer>
          </a-list-item>
        </a-list>
      </a-card>
    </div>
    <div v-show="!myPermission">
      <exception-page home-route="/dashboard/workplace" :style="`min-height: ${minHeight}`" type="403" />
    </div>
  </div>
</template>

<script>
// import HeadInfo from '../../components/tool/HeadInfo'
import Global from "../../Global";
import {queryUser, updateUser, deleteUser} from "../../services/user";
import ExceptionPage from '@/components/exception/ExceptionPage'
import {mapState} from 'vuex'

let userLists = []
export default {
  name: 'StandardList',
  // components: {HeadInfo}
  components: {ExceptionPage},
  computed: {
    ...mapState('setting', ['pageMinHeight']),
    minHeight() {
      return this.pageMinHeight ? this.pageMinHeight + 'px' : '100vh'
    }
  },
  data() {
    return {
      userLists,
      form: this.$form.createForm(this),
      visible: false,
      myPermission: false,
      myValid1: false,
      myValid2: false,
      myValid3: false,
    }
  },
  created() {
    if(Global.userName !== 'admin'){
      this.myPermission = false;
    }
    else{
      this.myPermission = true;
    }
  },
  mounted() {
    queryUser().then(this.afterQuery)
    //测试数据集
    // for (let i = 0; i < 11; i++) {
    //   userLists.push({
    //     userId: 1,
    //     userName: 'zzk',
    //     userEmail: 'zzk@qq.com',
    //     userPassword: 'zzk',
    //   })
    // }
  },
  methods: {
    onSubmit(newUserId, newUserName, newUserEmail) {
      // e.preventDefault()
      this.form.validateFields((err) => {
        if (!err) {
          let userId = newUserId
          let userName = this.form.getFieldValue('userName')
          // let userPassword = this.form.getFieldValue('userPassword')
          let userEmail = this.form.getFieldValue('userEmail')
          if (userName === undefined) {
            userName = newUserName
          }
          if (userEmail === undefined) {
            userEmail = newUserEmail
          }
          // if(userPassword === undefined){
          //   userPassword = newUserPassword
          // }
          // alert(userId + " " + userName + " " + userPassword + " " + userEmail)
          // this.$router.push('/dashboard/workplace')
          // login(name, password).then(this.afterLogin)
          updateUser(userId, userName, userEmail).then(this.afterUpdateUser)
          queryUser().then(this.afterQuery)
          this.$forceUpdate()
        }
      })
    },
    afterQuery(res) {
      const registerRes = res.data
      // console.log(registerRes)
      console.log(userLists)
      console.log(registerRes.data)
      if (registerRes.data != null) {
        if(this.userLists.length !== 0){
          for (var item1 of registerRes.data) {
            userLists.shift()
            userLists.push(item1)
          }
        }
        else{
          for (var item of registerRes.data) {
            // console.log(item)
            userLists.push(item)
          }
        }
        this.$forceUpdate()
      }
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    onDeleteUser(userId) {
      deleteUser(userId).then(this.afterDeleteUser)
      this.deleteItem(userId)
    },
    afterUpdateUser(res) {
      const Res = res.data
      console.log(res)
      if (Res.success) {
        this.visible = false;
        alert("更改用户信息成功")
      } else {
        alert("网络错误，请您稍后重试")
        // alert(registerRes.message)
      }
    },
    afterDeleteUser(res){
      const Res = res.data
      console.log(res)
      if(Res.success) {
        alert("删除用户信息成功")
      }
      else{
        alert("网络错误，请您稍后重试")
        // alert(registerRes.message)
      }
    },
    deleteItem(id){
      this.userLists = this.userLists.filter(function(item) {
        return item.id !== id
      });
    },
    test1(){
      this.myValid1 = true
    },
    test2(){
      this.myValid2 = true
    },
    test3(){
      this.myValid3 = true
    },
  }
}
</script>

<style lang="less" scoped>
.list-content-item {
  color: @text-color-second;
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  margin-left: 40px;

  span {
    line-height: 20px;
  }

  p {
    margin: 4px 0 0;
    line-height: 22px;
  }
}
</style>
