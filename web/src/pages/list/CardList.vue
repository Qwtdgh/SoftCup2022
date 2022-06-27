<template>
  <div class="card-list">
    <a-list
      :grid="{gutter: 24, lg: 3, md: 2, sm: 1, xs: 1}"
      :dataSource="dataSource"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <template v-if="item.add">
          <a-button class="new-btn" type="dashed" @click="route2Home">
            <a-icon type="plus" />新增产品
          </a-button>
        </template>
        <template v-else>
          <a-card :hoverable="true">
            <a-card-meta >
              <div style="margin-bottom: 3px" slot="title">{{item.text_header}} {{item.log_time}}</div>
<!--              <a-avatar class="card-avatar" slot="avatar" :src="item.avatar" size="large" />-->
              <div class="meta-content" slot="description">{{item.text}}</div>
            </a-card-meta>
            <a slot="actions">详情</a>
            <a slot="actions" @click="deteleFunc(item.id)">删除</a>
          </a-card>
        </template>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import {getRoutesConfig, detele, queryAll} from "../../services/user";
import {loadRoutes} from "../../utils/routerUtil";

const dataSource = []
dataSource.push({
  add: true
})
// for (let i = 0; i < 11; i++) {
//   dataSource.push({
//     title: 'Alipay',
//     avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
//     content: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。'
//   })
// }

export default {
  name: 'CardList',
  data () {
    return {
      desc: '段落示意：蚂蚁金服务设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态， 提供跨越设计与开发的体验解决方案。',
      linkList: [
        {icon: 'rocket', href: '/#/', title: '快速开始'},
        {icon: 'info-circle-o', href: '/#/', title: '产品简介'},
        {icon: 'file-text', href: '/#/', title: '产品文档'}
      ],
      extraImage: 'https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png',
      dataSource
    }
  },
  mounted () {
    queryAll().then(this.afterQuery)
    // console.log(res.data)
    // if(res.message != null && res.message.length != 0){
    //   for(var item of res.message){
    //     dataSource.push(item)
    //   }
    // }
    // console.log(dataSource)
    // for (let i = 0; i < 11; i++) {
    //   dataSource.push({
    //     title: 'Alipay',
    //     avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
    //     content: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
    //     date: '2022.6.27'
    //   })
    // }
  },
  methods: {
    route2Home() {
      getRoutesConfig().then(result => {
        const routesConfig = result.data.data
        loadRoutes(routesConfig)
        this.$router.push({path: '/dashboard/workplace',})
      })
    },
    deteleFunc(id) {
      detele(id).then(this.afterDelete)
    },
    afterQuery(res) {
      const registerRes = res.data
      // console.log(registerRes.message)
      if(registerRes.message != null){
        for(var item of registerRes.message){
          // console.log(item)
          dataSource.push(item)
        }
      }
    },
    afterDelete(res) {
      const registerRes = res.data
      // console.log(registerRes)
      if(registerRes.success){
        alert("删除成功")
      }
      else{
        alert("删除失败")
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .card-avatar {
    width: 48px;
    height: 48px;
    border-radius: 48px;
  }
  .new-btn{
    border-radius: 2px;
    width: 100%;
    height: 187px;
  }
  .meta-content{
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    height: 64px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

</style>
