<template>
    <div class="main">
        <div class="header">
           <div class="head">
                <div @click="back()">
                    <i class="iconfont icon-jiantou4"></i>
                </div>
                <p>个人中心</p>
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
            <div class="login">
                <router-link to='login' v-if="isShow">登录/注册</router-link>
                <a href="" v-else>欢迎用户{{user.user.username}}</a>
            </div>
        </div>
         <div class="center">
              <div class="order">
                <div class="order-header">
                    <span class="title">默认购物频道</span>
                    <p>
                        <span>男士MEN</span>
                        <i class="iconfont icon-jiantou"></i>
                    </p>
                </div>
            </div>
             <div class="order">
                <div class="order-header">
                    <span class="title">我的订单</span>
                    <p>
                        <router-link to="myOrder">
                        <span>全部订单</span>
                        <i class="iconfont icon-jiantou"></i>
                        </router-link>
                    </p>
                </div>
                <div class="order-detail">
                    <div class="order-item">
                        <i class="iconfont icon-daifukuan01"></i>
                        <span>待付款</span>
                    </div>
                    <div class="order-item">
                        <i class="iconfont icon-daifahuo1"></i>
                        <span>待发货</span>
                    </div>
                    <div class="order-item">
                        <i class="iconfont icon-daifahuo"></i>
                        <span>待收货</span>
                    </div>
                </div>
                <div class="order-detail">
                    <div class="order-item">
                        <span>0</span>
                        <span>待付款</span>
                    </div>
                    <div class="order-item">
                        <span>0</span>
                        <span>待发货</span>
                    </div>
                    <div class="order-item">
                        <span>0</span>
                        <span>待收货</span>
                    </div>
                </div>
            </div>
            <div class="order-items">
                <div class="detail">
                    <div class="order-item">
                        <i class="iconfont icon-youhuiquan"></i>
                    </div>
                    <div class="order-header">
                        <span class="title">优惠券</span>
                        <p>
                            <i class="iconfont icon-jiantou"></i>
                        </p>
                    </div>
                </div>
                <div class="detail">
                    <div class="order-item">
                        <i class="iconfont icon-xiangao"></i>
                    </div>
                    <div class="order-header">
                        <span class="title">有货币</span>
                        <p>
                            <i class="iconfont icon-jiantou"></i>
                        </p>
                    </div>
                </div>
            </div>
            <div class="order-items">
                <div class="detail">
                    <div class="order-item">
                        <i class="iconfont icon-xiaoxi"></i>
                    </div>
                    <div class="order-header">
                        <span class="title">消息</span>
                        <p>
                            <i class="iconfont icon-jiantou"></i>
                        </p>
                    </div>
                </div>
                <div class="detail">
                    <div class="order-item">
                        <i class="iconfont icon-kefu"></i>
                    </div>
                    <div class="order-header">
                        <span class="title">服务于反馈</span>
                        <p>
                            <i class="iconfont icon-jiantou"></i>
                        </p>
                    </div>
                </div>
            </div>
              <div class="content-img">
                <img src="../assets/mine/img_1.jpg">
                <img class="img_2" src="../assets/mine/img_2.jpg">
            </div>   
        </div>
        <div class="goods-list">
            <div class="title">
                <span>为你精选</span>
            </div>
            <ul>
                <li>
                    <img src="../assets/mine/img_3.jpg">
                    <span class="title1">意大利原产 Android</span>
                    <span class="title2">Homme TACTICAL BOOT</span>
                    <div class="price">
                        <p>￥3090<span>￥4250</span></p>
                        <i class="iconfont icon-gengduo-tianchong"></i>
                    </div>
                </li>
                <li>
                    <img src="../assets/mine/img_4.jpg">
                    <span class="title1">意大利原产 Android</span>
                    <span class="title2">Homme TACTICAL BOOT</span>
                    <div class="price">
                        <p>￥3090<span>￥4250</span></p>
                        <i class="iconfont icon-gengduo-tianchong"></i>
                    </div>
                </li>
                <li>
                    <img src="../assets/mine/img_5.jpg">
                    <span class="title1">意大利原产 Android</span>
                    <span class="title2">Homme TACTICAL BOOT</span>
                    <div class="price">
                        <p>￥3090<span>￥4250</span></p>
                        <i class="iconfont icon-gengduo-tianchong"></i>
                    </div>
                </li>
                <li>
                    <img src="../assets/mine/img_6.jpg">
                    <span class="title1">意大利原产 Android</span>
                    <span class="title2">Homme TACTICAL BOOT</span>
                    <div class="price">
                        <p>￥3090<span>￥4250</span></p>
                        <i class="iconfont icon-gengduo-tianchong"></i>
                    </div>
                </li>
            </ul>
        </div>  
        <div class="bottom">
            <div class="footer">
                <div class="left" @click="exit()">
                    退出
                    <!-- <a href="">登录 </a>|
                    <a href=""> 注册</a> -->
                </div>
                <div class="right">
                    <span>回到顶部</span>
                    <i class="iconfont icon-jiantoushang"></i>
                </div>
            </div>
            <p class="discribe">  
            CopyRight©2007-2018 南京新与力文化传播有限公司
            </p> 
        </div>
        
    </div>
</template>
<script>
import {mapState} from 'vuex'
import axios from 'axios'
import { Toast } from 'mint-ui';
export default {
  data () {
      return {
          isShow:true,
          navs:[
              {text:'首页',icon:'shouye',path:'MainIndex'},
              {text:'分类',icon:'icon--',path:'classify'},
              {text:'购物车',icon:'gouwuche',path:'ShoppingCar'},
              {text:'我的',icon:'wode',path:'Main'},
          ],
          isList:false
      }
  },
  computed: {
      ...mapState(['user'])
  },
  created () {
         //console.log('user:',this.user.user)
         if(this.user.user.username){
             this.isShow = false
         }
  },
  watch: {
      
  },
  methods: {
      back(){
        this.$router.go(-1)
      },
      showList(){
          this.isList = true;
      },
      exit(){
          this.$router.push({name:'LoginView'})
          localStorage.removeItem('userInfo')
      }
  }
}
</script>
<style lang="scss" scoped>
.main{
    background:#dddddd;
    display: flex;
    flex-direction: column;
    overflow: auto;
}
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
.login{
    width: 100%;
    height: 1.02rem;
    background-image: url('../assets/header-bg.jpg');
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    a{
        display: block;
        width: 1.3rem;
        height: 0.35rem;
        border: 1px solid #ffffff;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
.order{
    margin-bottom: 0.1rem;
    background: #ffffff;
    
    .order-header{
        padding: 0 0.1rem;
        display: flex;
        justify-content: space-between;
        height: 0.4rem;
        align-items: center;
        border-bottom: 1px solid #dddddd;
        .title{
            font-size: 0.16rem;
        }
        i{
            color: #dddddd;
        }
    }
    .order-detail{
        padding: 0 0.1rem;
        border-bottom: 1px solid #dddddd;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 0.72rem;
        .order-item{
            display: flex;
            justify-content: space-around;
            flex-direction: column;
            align-items: center;
            height: 0.40rem;
            margin: 0 0.3rem;
            i{
                color:#000000;
                font-size: 0.24rem;
            }
        }
    }
}
.order-items{
    margin-bottom: 0.1rem;
    .detail{
        background: #ffffff;
        display: flex;
        height: 0.44rem;
        .order-item{
            width: 10%;
            display: flex;
            align-items: center;
            i{
                font-size: 0.2rem;
                padding-left:0.1rem; 
            }
            
        }
        .order-header{
            width: 90%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #dddddd;
            p{
                margin-right: 0.1rem;
            }
        }
    }
}
.content-img{
    img{
        display: inline-block;
        width: 100%;
        height: 0.9rem;
        margin-bottom: 0.05rem;
    }
    .img_2{
        height: 1.17rem;
    }
}
.goods-list{
    background: #ffffff;
    .title{
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: left;
        border-bottom: 1px solid #dddddd;
        span{
            margin-left: 0.1rem;
            border-left: 2px solid #eeeeee;
            padding-left: 0.1rem;
        }
    }
    ul{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        box-sizing: border-box;
        border-bottom: 1px solid #dddddd;
        li{
            padding: 0.16rem;
            width: 49%;
            position: relative;
            img{
                height: 2.15rem;
            }
            span{
                font-size: 0.1rem;
                display: block;
                text-align: left;
                line-height: 0.16rem;
            }
            .price{
                font-size: 0.1rem;
                display: flex;
                justify-content: space-between;
                span{
                    display: inline-block;
                }
            }
            
        }
        
    }
}
.footer{
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    height: 0.6rem;
    line-height: 0.6rem;
    padding: 0 0.2rem;
    font-size: 0.1rem;
}
.discribe{
    height: 0.55rem;
    line-height: 0.55rem;
    font-size: 0.12rem;
}
</style>


