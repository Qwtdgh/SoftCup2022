<template>
  <div>
    <a-row style="margin-top: 20px; margin-left: 20px">
      <a-row>
        <span style="float: left; font-weight: bold; font-size: 40px">团队介绍</span>
      </a-row>
      <a-row style="margin-top: 20px">
        <span style="float: left; font-size: 20px">智慧创作全都队旨在为热爱文学创作的学者提供文学创作参考，激发用户的灵感。四位成员均来自北京航空航天大学计算机学院，获得过北京市蓝桥杯“二等奖”。</span>
      </a-row>
    </a-row>
    <a-row style="margin-top: 45px">
      <div>
        <a-carousel autoplay :autoplaySpeed="autoplaySpeed" arrows dots-class="slick-dots slick-thumb">
          <a slot="customPaging" slot-scope="props">
            <img :src="getImgUrl(props.i)"/>
          </a>
          <div>
            <img :src="qlh" alt="组长跑路至今未归" height="500"/>
            <p align="center">QLH 组长 模型训练</p>
          </div>
          <div>
            <img :src="pbq" alt="模型训练跑路至今未归" height="500"/>
            <p align="center">PBQ 模型训练</p>
          </div>
          <div>
            <img :src="boy" alt="后端开发跑路至今未归" height="500"/>
            <p align="center">BOY 后端开发</p>
          </div>
          <div>
            <img :src="zzk" alt="前端开发跑路至今未归" height="500"/>
            <p align="center">ZZK 前端开发</p>
          </div>
        </a-carousel>
      </div>
    </a-row>

  </div>
</template>
<script>
import qlh from '../../assets/img/qlh.jpg'
import pbq from '../../assets/img/pbq.jpg'
import boy from '../../assets/img/boy.jpg'
import zzk from '../../assets/img/zzk.jpg'

const baseUrl =
    'https://raw.githubusercontent.com/vueComponent/ant-design-vue/master/components/vc-slick/assets/img/react-slick/';
export default {
  data() {
    return {
      baseUrl,
      qlh,
      pbq,
      boy,
      zzk,
    };
  },
  methods: {
    getImgUrl(i) {
      if (i === 0) {
        return `${qlh}`;
      } else if (i === 1) {
        return `${pbq}`;
      } else if (i === 2) {
        return `${boy}`;
      }
      return `${zzk}`;
    },
  },
  computed:{
    autoplaySpeed(){
      return  2000
    }
  },
};
</script>
<style scoped>
/* For demo */
.ant-carousel >>> .slick-dots {
  height: auto;
}

.ant-carousel >>> .slick-slide img {
  border: 5px solid #fff;
  display: block;
  margin: auto;
  max-width: 50%;
}

.ant-carousel >>> .slick-thumb {
  bottom: -45px;
}

.ant-carousel >>> .slick-thumb li {
  width: 60px;
  height: 45px;
}

.ant-carousel >>> .slick-thumb li img {
  width: 100%;
  height: 100%;
  filter: grayscale(100%);
}

.ant-carousel >>> .slick-thumb li.slick-active img {
  filter: grayscale(0%);
}
</style>
