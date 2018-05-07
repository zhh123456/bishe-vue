<template>
  <div class="shoppingCar">
    <div class="head">
        <div>
          <router-link to="/">
            <i class="iconfont icon-jiantou4"></i>
          </router-link>
        </div>
        <p>购物车</p>
        <div @click="showList()">
            <i class="iconfont icon-icon--"></i> 
        </div>
        <ul class="moreClassify" v-if="isList">
            <li v-for="nav in navs" :key="nav.icon">
                <router-link :to="{name:nav.path}" active-class="active" >
                    <i :class="'iconfont icon-'+nav.icon"></i>
                    <span>{{nav.text}}</span> 
                </router-link>
            </li>
        </ul>
    </div>
    <div class="center">
      <div class="goods" v-if="shoppingCar"> <!--购物车商品-->
        <div class="goods-lists" v-for="good in goods" :key="good.goodid" >
          <i class="iconfont icon-duihao2" @click="chiocePay(good)"></i> 
          <!-- <label for="" >
            <input type="checkbox">
          </label> -->
            <div class="goods-img">
              <img :src="good.imgurl" alt="" @click="toDetail(good.goodid)">
            </div>
            <div class="goods-details">
              <p class="title"><span>{{good.title}}</span>x{{good.num}}</p>
              <p class="color"><span>颜色：{{good.color}}</span> <span>尺码：{{good.size}}</span></p>
              <p class="price">￥{{good.price}}</p>
              <mt-button type="danger" size="small" @click="removeGood(good.goodid)">删除</mt-button>
            </div>
        </div>
        <div class="clearCar">
           <mt-button plain type="danger" @click="clearCar">清空购物车</mt-button>          
        </div>
      </div>
      <div v-else class="carEmpty">
        <i class="iconfont icon-gouwuche"></i>
        <p>您的购物车暂无商品</p>
      </div>
    </div>
    <div class="payment">
      <div class="allChoice" @click="allChoice">
        <i class="iconfont icon-duihao2"></i>
        <span>全选</span>
      </div>
      <div class="allPrice">
        <span>总计：￥{{price}}({{num}}件)</span>
        <mt-button size="small" type="danger">购买</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import {mapState} from 'vuex'
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
  data () {
    return {
      goods:[],
      navs:[
          {text:'首页',icon:'shouye',path:'MainIndex'},
          {text:'分类',icon:'icon--',path:'classify'},
          {text:'购物车',icon:'gouwuche',path:'ShoppingCar'},
          {text:'我的',icon:'wode',path:'Main'},
      ],
      isList:false,
      shoppingCar:true,
      price:0,
      num:0
    }
  },
  computed: {
      ...mapState(['user'])
  },
  created () {
    this.getGoods()
  },
  methods: {
    showList(){
        this.isList = true;
    },
    //获取购物车商品列表
    getGoods(){
      let self = this
      axios.get('/api/user/searchCar').then((response)=>{
        if(response.status == '200'){ 
          for(let i = 0 ; i < response.data.length ; i++){
            if(response.data[i].username == self.user.user.username){
              if(response.data[i].goods.length == 0){
                this.shoppingCar = false;
              }else{
                this.shoppingCar = true;
                self.goods = response.data[i].goods
              }
            }else{
              this.shoppingCar = false;
            }
          } 
        }  
      })
    },
    //部分选择商品
    chiocePay(item){
      this.getGoods()
      let price = 0;
      price = parseInt(item.price) * parseInt(item.num)
      this.price += price
      this.num += parseInt(item.num)
    },
    //商品全选
    allChoice(){
      this.getGoods()
      let self = this
      let allNum = 0;
      let allPrice = 0;
      for(let i = 0; i < self.goods.length ; i++){
        allNum +=  parseInt(self.goods[i].num)
        allPrice +=  parseInt(self.goods[i].price)
        this.price = allPrice
        this.num = allNum
      }
    },
    //进入商品详情页面更改商品信息
    toDetail(id){
      this.$router.push({name:'productDetails',params:{id}})
    },
    //删除商品
    removeGood(id){
      let self = this;
      MessageBox({
        title: '提示',
        message: '确定删除此商品?',
        showCancelButton: true
      });
      let params = {
        username:self.user.user.username,
        goodid:id
      }
      axios.post('/api/user/removeCar',params).then((response)=>{
        var message = response.data.message
        Toast({message});
        setTimeout(function(){
          self.getGoods()
        },1000)
        
      })
    },
    clearCar(){
      let self = this
      MessageBox({
        title: '提示',
        message: '确定清空购物车?',
        showCancelButton: true
      });
      let params = {
        username:self.user.user.username
      }
      axios.post('/api/user/clearCar',params).then((response)=>{
        var message = response.data.message
        Toast({message});
        setTimeout(function(){
          self.getGoods()
          self.shoppingCar = false;
        },1000)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.shoppingCar{
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #dddddd;
  .head{
    height: 0.52rem;
    background: #171717;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.2rem;
    padding: 0  0.1rem;
    position: relative;
    i{
        color: #ffffff;
        font-size: 0.2rem;
    }
    .moreClassify{
        width:1.4rem;
        background: #171717;
        color:#ffffff;
        position: absolute;
        top: 0.53rem;
        right:0;
        padding:0.1rem 0;
        border-radius: 0.1rem;
        li{
            line-height: 0.3rem;
            font-size: 0.14rem;
          
            a{
                color:#ffffff;
                i{
                    font-size: 0.14rem;
                    padding-right: 0.1rem;
                }
                
            }
        }
        
    }
  }
  .center{
    flex:1;
    overflow: auto;
    .goods{
      .goods-lists{
        background: #ffffff;
        padding: 0.1rem;
        display: flex;
        align-items: center;
        height: 1.23rem;
        justify-content: space-between;
        // label{
        //   input[type='checkbox']{
        //     width: 0.2rem;
        //     height: 0.2rem;
        //     background-color: #fff;
        //     -webkit-appearance:none;
        //     border: 1px solid #c9c9c9;
        //     border-radius: 50%;
        //     outline: none;
        //   }
        //   .checkBox input[type=checkbox]:checked{
        //     background-color: blue;
        //   }
        // }
        .goods-img{
          width: 0.76rem;
          height: 1.02rem;
          img{
            width: 100%;
            height: 100% ;
          }
        }
        .goods-details{
          p{
            line-height: 0.2rem;
            text-align: left;
            span{
              font-size: 0.13rem;
            }
          }
          .title{
            span{
              display: inline-block;
              width: 1.9rem;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              font-size: 0.13rem;
            }
          }
          
          .price{
            color: #c10;
          }
          .color{
            color: #bbbbbb;
          }
        }
      }
      .clearCar{
        background: #ffffff;
        height: 0.5rem;
        line-height: 0.5rem;
        text-align: right;
        padding: 0 0.2rem;
      }
    }
    .carEmpty{
      margin-top: 0.4rem; 
      i{
        font-size: 0.8rem;
      }
    }
  }
  .payment{
    display: flex;
    justify-content: space-between;
    background: #ffffff;
    height: 0.46rem;
    align-items: center;
    padding:0.1rem;
    font-size: 0.16rem;
    i{
      font-size: 0.2rem;
    }
    .allPrice{
      color:#f10;
    }
  }
}
</style>


