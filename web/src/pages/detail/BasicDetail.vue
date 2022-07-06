<template>
    <page-layout :title="查询详情页">
      <a-card :bordered="false">
        <detail-list title="查询详情">
          <detail-list-item term="查询时间">{{log_time}}</detail-list-item>
          <detail-list-item term="输入文本">{{text}}</detail-list-item>
<!--          <detail-list-item term="状态">已取货</detail-list-item>-->
<!--          <detail-list-item term="销售单号">987654321</detail-list-item>-->
<!--          <detail-list-item term="子订单">1234567890</detail-list-item>-->
        </detail-list>
        <a-divider style="margin-bottom: 32px"/>
        <detail-list title="查询结果">
          <detail-list-item term="生成标题">{{text_header}}</detail-list-item>
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

const goodsColumns = [
  {
    title: '商品编号',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '商品名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '商品条码',
    dataIndex: 'barcode',
    key: 'barcode'
  },
  {
    title: '单价',
    dataIndex: 'price',
    key: 'price',
    align: 'right'
  },
  {
    title: '数量（件）',
    dataIndex: 'num',
    key: 'num',
    align: 'right'
  },
  {
    title: '金额',
    dataIndex: 'amount',
    key: 'amount',
    align: 'right'
  }
]

const goodsData = [
  {
    id: '1234561',
    name: '矿泉水 550ml',
    barcode: '12421432143214321',
    price: '2.00',
    num: '1',
    amount: '2.00'
  },
  {
    id: '1234562',
    name: '凉茶 300ml',
    barcode: '12421432143214322',
    price: '3.00',
    num: '2',
    amount: '6.00'
  },
  {
    id: '1234563',
    name: '好吃的薯片',
    barcode: '12421432143214323',
    price: '7.00',
    num: '4',
    amount: '28.00'
  },
  {
    id: '1234564',
    name: '特别好吃的蛋卷',
    barcode: '12421432143214324',
    price: '8.50',
    num: '3',
    amount: '25.50'
  }
]



export default {
  name: 'BasicDetail',
  components: {PageLayout, DetailListItem, DetailList},
  data () {
    let text
    let text_header
    let log_time
    return {
      text,
      text_header,
      log_time,
      goodsColumns,
      goodsData,
    }
  },
  created() {
    if(this.$route.params.text === undefined){
      alert("请先选择您要查看详细信息的查询")
      // getRoutesConfig().then(result => {
      //   const routesConfig = result.data.data
      //   loadRoutes(routesConfig)
        this.$router.push({path: '/list/card',})
      // })
    }
    this.text_header = this.$route.params.text_header
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
