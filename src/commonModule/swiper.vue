<template>
     <div class="swiper"> 
        <mt-swipe :auto="4000" class="swipe">
            <mt-swipe-item class="swipe-list">
                <router-link :to="{name:'MainIndex'}">
                    <img src="../assets/swiper/banner_1.jpg">
                </router-link>
                
            </mt-swipe-item>
            <mt-swipe-item class="swipe-list">
                <router-link :to="{name:'MainIndex'}">
                    <img src="../assets/swiper/banner_2.jpg">
                </router-link>
            </mt-swipe-item>
            <mt-swipe-item class="swipe-list">
                <router-link :to="{name:'MainIndex'}">
                    <img src="../assets/swiper/banner_3.jpg">
                </router-link>
            </mt-swipe-item>
            
        </mt-swipe>
     </div> 
  
</template>

<script>

export default {
  
}
</script>

<style lang="scss" scoped>
.swiper .swipe{
  width:100%;
  height:1.8rem;
}
.swipe .swipe-list{
  width:100%;
  height:1.8rem;
}
.swipe .swipe-list img{
  height: 100%;
  width:100%;
}
.swiper /deep/ .mint-swipe-indicators{
    /* background: #d3d0d0; */
    border-radius: 0.5rem;
}
.swiper /deep/ .is-active{
     background: #ffffff;
}
</style>
