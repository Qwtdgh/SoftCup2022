<template>
  <span>
    <div>
    <span style="background-color: #ffffff;font-size: 40px; font-weight: bold; margin-left: 40px;">
      开发团队
    </span>
  </div>
  <div>
    <el-carousel :interval="4000" type="card" height="500px" style="width: 60%; margin-top: 2%; margin-left: 20%">
      <el-carousel-item v-for="item in this.founders" :key="item" style="border-radius: 12px">
        <el-image :src="item.path" class="image" style="margin-top: 20px"></el-image>
        <div style="margin-top: 120px; margin-left: 20%">
          <span style="font-size: 30px; font-weight: bold">{{ item.name }}</span>
        </div>
        <div style="margin-left: 20%; margin-top: 25px">
          <span style="font-size: 20px; font-weight: bold">{{item.role}}</span>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
  </span>
</template>

<script>
import qlh from "../../assets/img/alipay.png"
import msq from "../../assets/img/alipay.png"
import mjw from "../../assets/img/alipay.png"
import lhy from "../../assets/img/alipay.png"
export default {
  name: "Founders",
  data() {
    return {
      founders: [
        {path: qlh, name:"曲乐皓", role:"Vue前端开发"},
        {path: msq, name:"马世清", role:"ROS机器人功能框架开发"},
        {path: mjw, name:"麻佳炜", role:"Springboot后端开发"},
        {path: lhy, name:"刘怀元", role:"ROS机器人火情检测开发"}
      ]
    }
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}
.image {
  width: 200px;
  height: 200px;
  top:30%;
  left:50%;
  border-radius: 10px;
  transform:translate(-50%,-50%);
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
