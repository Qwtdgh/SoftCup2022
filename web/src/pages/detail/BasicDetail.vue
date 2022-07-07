<template>
  <page-layout :title="查询详情页">
    <a-card :bordered="false">
      <detail-list title="查询详情">
        <detail-list-item term="查询时间">{{ log_time }}</detail-list-item>
        <detail-list-item term="输入文本">{{ text }}</detail-list-item>
        <!--          <detail-list-item term="状态">已取货</detail-list-item>-->
        <!--          <detail-list-item term="销售单号">987654321</detail-list-item>-->
        <!--          <detail-list-item term="子订单">1234567890</detail-list-item>-->
      </detail-list>
      <a-divider style="margin-bottom: 32px"/>
      <detail-list title="查询结果">
        <detail-list-item term="生成标题">{{ text_header }}</detail-list-item>
        <detail-list-item term="生成摘要">{{ text_abstract }}</detail-list-item>
        <!--          <detail-list-item term="联系电话">18100000001</detail-list-item>-->
        <!--          <detail-list-item term="常用快递">菜鸟仓储</detail-list-item>-->
        <!--          <detail-list-item term="取货地址">浙江省杭州市西湖区万塘路19号</detail-list-item>-->
        <!--          <detail-list-item term="备注">无</detail-list-item>-->
      </detail-list>
    </a-card>
  </page-layout>
</template>

<script>
import DetailList from '../../components/tool/DetailList'
import PageLayout from '../../layouts/PageLayout'
// import {getRoutesConfig} from "../../services/user";
// import {loadRoutes} from "../../utils/routerUtil";

const DetailListItem = DetailList.Item

export default {
  name: 'BasicDetail',
  components: {PageLayout, DetailListItem, DetailList},
  data() {
    let text
    let text_header
    let log_time
    let text_abstract
    return {
      text,
      text_header,
      log_time,
      text_abstract,
    }
  },
  created() {
    if (this.$route.params.text === undefined) {
      alert("请先选择您要查看详细信息的查询")
      // getRoutesConfig().then(result => {
      //   const routesConfig = result.data.data
      //   loadRoutes(routesConfig)
      // this.$emit('close', "/details/basicDetail")
      this.$router.replace({path: '/list/card',})
      // this.$router.push({path: '/list/card',})
      // })
    }
    this.text_header = this.$route.params.text_header
    this.text_abstract = this.$route.params.text_abstract
    this.log_time = this.$route.params.log_time
    this.text = this.$route.params.text
    // console.log(this.$route.params)
  }
}
</script>

<style lang="less" scoped>
.title {
  color: @title-color;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
}
</style>
