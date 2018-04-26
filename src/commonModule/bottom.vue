<template>
  <div class="bottom" v-if="isShowBottom">
    <ul class="">
        <li v-for="nav in navs" :key="nav.icon">
            <router-link :to="{name:nav.path}" active-class="active" >
                <i :class="'iconfont icon-'+nav.icon"></i>
                <span>{{nav.text}}</span> 
            </router-link>
        </li>
    </ul>
  </div>
</template>
<script>
export default {
  name:'bottom',
  data(){
      return{
          navs:[
              {text:'首页',icon:'shouye',path:'MainIndex'},
              {text:'分类',icon:'icon--',path:'classify'},
              {text:'逛',icon:'huojian',path:'ShoppingMall'},
              {text:'购物车',icon:'gouwuche',path:'ShoppingCar'},
              {text:'我的',icon:'wode',path:'Main'},
          ],
          isShowBottom:true  //是否显示底部导航
      }
  },
  created () {
      if(this.$route.path== '/classify'|| this.$route.path == '/'){
          this.isShowBottom = true
      }else{
          this.isShowBottom = false
      }
  },
  watch: {
      $route(to, from) { 
        if(to.path == '/' || to.path =='/classify'){
            this.isShowBottom = true
        }else{
            this.isShowBottom = false
        }
    }
  }
}
</script>
<style lang="scss" scoped>
.bottom{
    border-top: 1px solid #b0b0b0;
    height: 0.58rem;
}
ul{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.58rem;
    padding: 0 0.15rem;
    li{
        a{
            display: flex;
            height: 0.4rem;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            color:#b0b0b0;
            i{
                font-size: 0.2rem;
            }
            span{
                font-size: 0.1rem;
                
            }
        }
    }
}
.active{
    color: #ff88ae;
}
</style>


