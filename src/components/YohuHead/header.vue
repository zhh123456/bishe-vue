<template>
  <div class="header" v-if="isShowHeader">
   <i class="iconfont icon-gengduo"></i>
   <div class="logo"></div>
   <i class="iconfont icon-sousuo"></i>
  </div>
</template>
<script>
export default {
  data(){
      return{
        isShowHeader:true //是否显示头部导航
      }
  },
  created () {
      if(this.$route.path== '/classify'|| this.$route.path == '/Main' ||this.$route.path == '/login' || this.$route.path == '/register'){
          this.isShowHeader = false
      }else{
          this.isShowHeader = true
      }
  },
   watch: {
      $route(to, from) {  
        // console.log(to);  
        if(to.path == '/Main' || to.path =='/classify' || to.path == '/login' || to.path == '/register'){
            this.isShowHeader = false
        }else{
            this.isShowHeader = true
        }
    }
  }
}
</script>
<style lang="scss" scoped>
    .header{
        height: 0.6rem;
        background: #ff88ae;
        font-size: 0.14rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.2rem;
        .logo{
            width: 1.21rem;
            height: 0.6rem;
            background: url('../../assets/yohologo02.png') center center no-repeat;
            background-size: contain;
        }
        i{
            color: #ffffff;
            font-size: 0.2rem;
        }
    }
</style>


