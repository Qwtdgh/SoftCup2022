<template>
  <div class="footer">
    <div class="links">
      <a target="_blank" :key="index" href='https://github.com/Qwtdgh/SoftCup2022' v-for="(item, index) in linkLists">
        <a-icon v-if="item.icon" :type='item.icon'/>{{item.name}}
      </a>
    </div>
    <div class="copyright">
      Copyright<a-icon type="copyright" />智能创作全都队
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageFooter',
  props: ['copyright', 'linkList'],
  data(){
    const linkLists = [
      {
        icon: 'github',
        name: ""
      },
      {
        icon: '',
        name: "关于我们"
      }
    ]
    return {
      linkLists,
    }
  }
}
</script>

<style lang="less" scoped>
  .footer{
    padding: 48px 16px 24px;
    /*margin: 48px 0 24px;*/
    text-align: center;
    .copyright{
      color: @text-color-second;
      font-size: 14px;
      i {
          margin: 0 4px;
      }
    }
    .links{
      margin-bottom: 8px;
      a:not(:last-child) {
        margin-right: 40px;
      }
      a{
        color: @text-color-second;
        -webkit-transition: all .3s;
        transition: all .3s;
      }
    }
  }
</style>
