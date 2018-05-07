<template>
  <div class="myorder">
    <div class="head">
        <div @click="back()">
            <i class="iconfont icon-jiantou4"></i>
        </div>
        <p>我的订单</p>
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
            <div class="goods-lists" v-for="good in orders" :key="good.goodid" >
                <div class="goods-img">
                    <img :src="good.imgurl" alt="">
                </div>
                <div class="goods-details">
                    <p class="title"><span>{{good.title}}</span>x{{good.num}}</p>
                    <p class="color"><span>颜色：{{good.color}}</span> <span>尺码：{{good.size}}</span></p>
                    <p class="price">￥{{good.price}}</p>
                    <mt-button type="danger" size="small" @click="removeGood(good.goodid)">删除</mt-button>
                </div>
            </div>
            <div class="clearCar">
                <mt-button plain type="danger" @click="clearCar">清空订单列表</mt-button>          
            </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import {mapState} from 'vuex';
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
  data () {
      return {
        navs:[
            {text:'首页',icon:'shouye',path:'MainIndex'},
            {text:'分类',icon:'icon--',path:'classify'},
            {text:'购物车',icon:'gouwuche',path:'ShoppingCar'},
            {text:'我的',icon:'wode',path:'Main'},
        ],
        isList:false,
        orders:[],
        shoppingCar:true
      }
  },
  created () {
     this.getOrder()
  },
  computed: {
      ...mapState(['user'])
  },
  methods: {
    back(){
    this.$router.go(-1)
    },
    showList(){
        this.isList = true;
    },
    getOrder(){
        let self = this
        axios.get('/api/user/searchOrder').then((response)=>{
            // console.log('response:',response)
            if(response.status == '200'){ 
                for(let i = 0 ; i < response.data.length ; i++){
                    if(response.data[i].username == self.user.user.username){
                        if(response.data[i].orders.length == 0){
                            //提示没有订单
                            Toast('该用户没有订单！')
                            this.shoppingCar = false;
                        }else{
                            this.shoppingCar = true;
                            self.orders = response.data[i].orders
                        }
                    }else{
                        this.shoppingCar = false;
                    }
                } 
            }
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
      axios.post('/api/user/clearOrder',params).then((response)=>{
        var message = response.data.message
        Toast({message});
        setTimeout(function(){
          self.getOrder()
          self.shoppingCar = false;
        },1000)
      })
    },
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
      axios.post('/api/user/removeOrder',params).then((response)=>{
        var message = response.data.message
        Toast({message});
        setTimeout(function(){
          self.getOrder()
        },1000)
        
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.myorder{
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
    }
}
</style>


