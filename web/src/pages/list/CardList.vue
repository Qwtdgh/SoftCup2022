<template>
  <div class="card-list">
    <a-list
      :grid="{gutter: 24, lg: 3, md: 2, sm: 1, xs: 1}"
      :dataSource="dataSource"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <template v-if="item.add">
          <a-button size="large" class="new-btn" type="dashed" @click="route2Home">
            <a-icon type="plus" />新增查询
          </a-button>
        </template>
        <template v-else>
          <a-card :hoverable="true">
            <a-card-meta >
              <div style="margin-bottom: 3px" slot="title">{{item.text_header}}</div>
              <div style="margin-bottom: 3px" slot="title">{{item.log_time}}</div>
<!--              <a-avatar class="card-avatar" slot="avatar" :src="item.avatar" size="large" />-->
              <div class="meta-content" slot="description">{{item.text_abstract}}</div>
            </a-card-meta>
            <a slot="actions" @click="route2Xiangqing(item.text_header, item.log_time, item.text_abstract, item.text)">详情</a>
            <a slot="actions" @click="deteleFunc(item.id)">删除</a>
          </a-card>
        </template>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { detele, queryAll} from "../../services/user";
// import {loadRoutes} from "../../utils/routerUtil";

let dataSource = []
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
      desc: '在这里可以查看您历史搜索记录',
      linkList: [
        {icon: 'rocket', href: '/#/', title: '新增查询'},
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

    //测试数据集
    // for (let i = 0; i < 11; i++) {
    //   dataSource.push({
    //     text_header: 'test_header',
    //     log_time: '2022.06.20',
    //     text: 'text',
    //   })
    // }
  },
  methods: {
    route2Xiangqing(text_header, log_time, text_abstract, text){
      // getRoutesConfig().then(result => {
      //   const routesConfig = result.data.data
      //   loadRoutes(routesConfig)
      //   console.log(text)
        this.$router.push({
          path: '/details/basicDetail',
          name: '查询详情页',
          params: {
            text_header: text_header,
            text_abstract: text_abstract,
            log_time: log_time,
            text: text,
          }
        })
      // })
    },
    route2Home() {
      // getRoutesConfig().then(result => {
      //   const routesConfig = result.data.data
      //   loadRoutes(routesConfig)
        this.$router.push({path: '/dashboard/workplace',})
      // })
    },
    deteleFunc(id) {
      detele(id).then(this.afterDelete)
      this.deleteItem(id)
    },
    afterQuery(res) {
      const registerRes = res.data
      // console.log(registerRes.message)
      if(registerRes.message != null){
        if(dataSource.length !== 1){
          dataSource.shift()
          dataSource.push({
            add: true
          })
          for(var item1 of registerRes.message.reverse()){
            // console.log(item)
            dataSource.shift()
            dataSource.push(item1)
          }
        }
        else{
          for(var item of registerRes.message.reverse()){
            // console.log(item)
            dataSource.push(item)
          }
        }
      }
      // console.log(dataSource)
    },
    deleteItem(id){
      this.dataSource = this.dataSource.filter(function(item) {
        return item.id !== id
      });
    },
    afterDelete(res) {
      // console.log(registerRes)
      // this.$forceUpdate()
      const registerRes = res.data
      if(registerRes.success){
        queryAll().then(this.afterQuery)
        console.log(dataSource)
        this.$forceUpdate()
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
    height: 214px;
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
