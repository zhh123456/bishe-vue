<template>
  <div class="hello">
     <div class="content">
      <Swiper></Swiper> 
      <ul class="ul1">
        <li>
          <router-link :to="{}">
            <img src="../assets/index/img1.png" alt="">
            <span>新品到着</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{}">
            <img src="../assets/index/img2.png" alt="">
            <span>人气搭配</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{}">
            <img src="../assets/index/img3.png" alt="">
            <span>折扣专区</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{}">
            <img src="../assets/index/img4.png" alt="">
            <span>全部分类</span>
          </router-link>
        </li>
      </ul>
      <div class="img-logo">
        <img src="../assets/index/img5.jpg" alt="">
      </div>
      <div class="toptop">
        <h2 class="title">热门品类</h2>
        <ul class="top-list">
          <li>
            <a href="">
              <img src="../assets/index/img6.jpg" alt="">
            </a>
          </li>
          <li>
            <a href="">
              <img src="../assets/index/img7.jpg" alt="">
            </a>
          </li>
          <li>
            <a href="">
              <img src="../assets/index/img8.jpg" alt="">
            </a>
          </li>
          <li>
            <a href="">
              <img src="../assets/index/img9.jpg" alt="">
            </a>
          </li>
          <li>
            <a href="">
              <img src="../assets/index/img10.jpg" alt="">
            </a>
          </li>
          <li>
            <a href="">
              <img src="../assets/index/img11.jpg" alt="">
            </a>
          </li>
          <li>
            <a href="">
              <img src="../assets/index/img12.jpg" alt="">
            </a>
          </li>
          <li>
            <a href="">
              <img src="../assets/index/img13.jpg" alt="">
            </a>
          </li>
          <li>
            <a href="">
              <img src="../assets/index/img14.jpg" alt="">
            </a>
          </li>
          <li>
            <a href="">
              <img src="../assets/index/img15.jpg" alt="">
            </a>
          </li>
          <li>
            <a href="">
              <img src="../assets/index/img16.jpg" alt="">
            </a>
          </li>
          <li>
            <a href="">
              <img src="../assets/index/img17.jpg" alt="">
            </a>
          </li>
        </ul>
      </div>
      <div class="img-logo">
        <img src="../assets/index/img18.jpg" alt="">
      </div>
       <div class="toptop">
        <h2 class="title">人气推荐</h2>
        <ul class="top-list">
          <li>
            <a href="">
              <img src="../assets/index/img19.jpg" alt="">
            </a>
          </li>
          <li>
            <a href="">
              <img src="../assets/index/img20.jpg" alt="">
            </a>
          </li> 
          <li>
            <a href="">
              <img src="../assets/index/img21.jpg" alt="">
            </a>
          </li>
          <li>
            <a href="">
              <img src="../assets/index/img22.jpg" alt="">
            </a>
          </li> 
          <li>
            <a href="">
              <img src="../assets/index/img23.jpg" alt="">
            </a>
          </li>
          <li>
            <a href="">
              <img src="../assets/index/img24.jpg" alt="">
            </a>
          </li> 
          <li style="width:50%;">
            <a href="">
              <img src="../assets/index/img25.png" alt="">
            </a>
          </li>
        </ul>
      </div>
      <div class="list-auto">
        <ul class="auto">
          <li v-for="item in productList" :key="item.id" @click="toDetail(item.id)">
            <!-- <router-link :to="{name:'productDetails'}"> -->
              <img :src="item.imgurl" alt="">
              <span>￥{{item.price}}</span>
              <span>{{item.person}}</span>
              <span>正在浏览</span>
            <!-- </router-link> -->
          </li>
        </ul>
      </div>
    </div> 
    
  </div>
</template>

<script>
import YohuHead from './YohuHead/header';
import Swiper from '../commonModule/swiper';
import Bottom from '../commonModule/bottom';
import axios from 'axios';
export default {
  name: 'MainIndex',
  data () {
    return {
      productList:[]
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList(){
       let self = this;
      
       axios.get('../../static/productList.json').then((response)=>{
         self.productList = response.data
       })
    },
    toDetail(id){
      this.$router.push({name:'productDetails',params:{id}})
    },
    back(){
      this.$router.go(-1)
    },
  },
  components: {
    Swiper,
    Bottom
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 .hello{
   background: #dddddd;
   overflow: auto;
   .content{
     .ul1{
       background: #ffffff;
       display: flex;
       height: 0.93rem;
       justify-content: space-around;
       align-items: center;
       box-sizing: border-box;
       padding-top:0.1rem;
       li{
         a{
           display: flex;
           flex-direction: column;
           align-items: center;
           justify-content: space-between;
           img{
             display: inline-block;
             width: 0.4rem;
             height: 0.4rem;
             margin-bottom: 0.06rem;
           }
         }
       }
     }
     .img-logo{
       margin-top: 0.15rem;
       width:100%;
       height: 1.17rem;
       img{
         width: 100%;
         height: 100%;
       }
     }
     .toptop{
       .title{
        line-height: 0.46rem;
        font-size: 0.16rem
       }
       .top-list{
         display: flex;
         flex-wrap: wrap;
         li{
           width: 25%;
           height: 1rem;
           border-right: 1px solid #dddddd;
           border-top: 1px solid #dddddd;
           a{
              img{
                width: 100%;
                height: 100%;
              }
           }
         }
       }
     }
     .list-auto{
       padding: 0.1rem 0 0.1rem 0.1rem;
       background: #ffffff;
       .auto{
         display: flex;
         flex-wrap: nowrap;
         overflow-x: auto;
         li{
           width: 0.89rem;
           margin-right: 0.1rem;
           
             img{
               display: inline-block;
               width: 0.89rem;
               height: 1.2rem;;
             }
             span{
               font-size: 0.1rem;
               display: block;
             }
           
         }
       }
     }
   }
 }
</style>
