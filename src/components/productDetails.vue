<template>
  <div class="productDetails">
    <div class="head">
        <div @click="back()">
            <i class="iconfont icon-jiantou4"></i>
        </div>
        <p>商品详情</p>
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
    <div class="pruduct-info">
      <div class="img">
        <img :src="productDetail.imgurl" alt="">
      </div>
      <span class="text">{{productDetail.title}}</span>
      <div class="price">
        <p>{{productDetail.price}}</p>
        <button @click="prpductDetail()">加入购物车</button>
      </div>
      
    </div>
    <div class="choice-detail" v-if="showDetail">
      <div class="describe">
        <img :src="productDetail.imgurl" alt="">
        <p>
          <span class="price1">￥{{productDetail.price}}</span>
          <span v-if="goods.color || goods.size">已选：{{goods.color}}、{{goods.size}}</span>
          <span v-else>请选择颜色、尺码</span>
        </p>
        <i @click="closeDetail()" class="iconfont icon-guanbi"></i>
      </div>
      <div class="color">
        <span>颜色</span>
        <button v-for="item in colors" :key="item.id" active-class="active" :class="{active:item.id == isActiveColor}" @click=changeColor(item.id)>{{item.color}}</button>
      </div>
      <div class="size">
        <span>尺码</span>
        <div>
          <button v-for="item in sizes" :key="item.id" active-class="active" :class="{active:item.id == isActiveSize}" @click=changeSize(item.id)>{{item.size}}</button>
          
        </div>
      </div>
      <div class="num">
        <span>数量</span>
        <div class="changeNum">
          <span @click="addNum()">-</span>
          <input type="text" v-model="num">
          <span @click="reduceNum()">+</span>
        </div>
      </div>
      <div class="addCar">
        <button class="payment" @click="topay(productDetail)">立即购买</button>
        <button @click="addCar()">加入购物车</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import {mapState} from 'vuex'
import { Toast } from 'mint-ui';
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
          showDetail:false,
          num:1,
          productDetail:[],
          sizes:[
            {
              id:36,
              size:'36码'
            },
            {
              id:37,
              size:'37码'
            },
            {
              id:38,
              size:'38码'
            },
            {
              id:39,
              size:'39码'
            },
          ],
          colors:[
            {
              id:1,
              color:'白色'
            },
            {
              id:2,
              color:'黑色'
            },
            {
              id:3,
              color:'卡其色'
            },
            {
              id:4,
              color:'灰色'
            },
          ],
          isActiveSize:0,
          isActiveColor:0,
          goods:{
            username: '',
            price:'',
            color:'',
            size:'',
            num:'',
            title:'',
            imgurl:"",
            goodid:''
          }
    }
  },
  created () {
    this.getdetails()
    this.goods.goodid=this.$route.params.id
    
  },
  computed: {
      ...mapState(['user'])
  },
  methods: {
     showList(){
          this.isList = true;
      },
      prpductDetail(){
        this.showDetail = true;
      },
      closeDetail(){
        this.showDetail = false;
      },
      getdetails(){
        let self = this;
        let num = this.$route.params.id

        axios.get('../../static/productList.json').then((response)=>{
          let list = response.data
          for(let i = 0;i < list.length;i++){
            if(list[i].id == num){
              self.productDetail = list[i]
              self.goods.title = list[i].title
              self.goods.price = list[i].price
              self.goods.imgurl = list[i].imgurl
            }
          }
        })
      },
      back(){
        this.$router.go(-1)
      },
      //选择衣服尺寸
      changeSize(item){
        
        this.isActiveSize = item
        if(item){
          for(let i = 0;i < this.sizes.length ; i ++){
            if(this.sizes[i].id == item){
              this.goods.size = this.sizes[i].size
            }
          }
        }
      },
      //颜色
      changeColor(item){
        this.isActiveColor = item
        if(item){
          for(let i = 0;i < this.colors.length ; i ++){
            if(this.colors[i].id == item){
              this.goods.color = this.colors[i].color
            }
          }
        }
      },
      //数量
      addNum(){
        if(this.num == 1){
          return ;
        }
        this.num --;
       
      },
      reduceNum(){
        this.num++
      },

      //加入购物车
      addCar(){
        let self = this
        if(this.user.user.username==''){
            Toast('请先登录！');
            return ;
        }else{
            this.goods.username = this.user.user.username
            this.goods.num = this.num
            let params = {}
            params = this.goods
            axios.post('/api/user/shopadd',params).then((response)=>{
                 var message = response.data.message
                
                Toast({message});
            })
            setTimeout(function(){
              self.$router.push({name:'ShoppingCar'})
            },1000)
        }
        // this.showDetail = false;
      },
      //立即购买
      topay(details){
        let self = this
        let params = {
          username:this.user.user.username,
          goodid : details.id,
          title : details.title,
          imgurl : details.imgurl,
          price : details.price,
          color : self.goods.color,
          size : self.goods.size,
          num : self.num 
        }
         console.log('params:',params)
        axios.post('/api/user/myOrder',params).then((response)=>{
          console.log('response:',response)
          this.$router.push({path:'/myOrder'})
        })
      }
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getdetails'
    }
}
</script>

<style lang="scss" scoped>
.productDetails{
  position: relative;
  height: 100%;
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
  .pruduct-info{
    .img{
      display: flex;
      height: 3.86rem;
      width: 100%;
      justify-content: center;
      align-items: center;
      img{
        width: 2.62rem;
        height: 3.5rem;
        display: block;
      }
    }
    .text{
      display: block;
      background-color: #515150;
      color:#fff;
      padding: 0.2rem 0.3rem;
      text-align: left;
      line-height: 0.24rem;
    }
    .price{
      margin-top: 0.1rem;
      padding: 0 0.1rem;
      display: flex;
      justify-content: space-between;
      height: 0.46rem;
      align-items: center;
      p{
        color:#f10;
        font-size: 0.2rem;
      }
      button{
        border: none;
        background-color: #f10;
        color: #fff;
        font-size: 0.16rem;
        line-height: 0.46rem;
        width:1.52rem;
      }
    }
  }
  .choice-detail{
    position: absolute;
    bottom:0;
    padding:0 0.1rem;
    background:#ffffff;
    button{
      border: none;
      border: 1px solid #444;
      background-color: #ffffff;
      color: #444444;
      padding: 0.03rem 0.05rem;
      border-radius: 0.06rem;
      font-size:0.16rem;
      outline: none;
    }
    .describe{
      display: flex;
      justify-content: space-between;
      border-top:1px solid #dddddd;
      border-bottom: 1px solid #e6e6e6;
      padding-bottom: 0.15rem;
      padding-top: 0.1rem;
      img{
        width:0.94rem;
        height: 1.25rem;
        margin-top: -0.2rem;
      }
      p{
        span{
          display: block;
          text-align: left;
          line-height: 0.24rem;
        }
        .price1{
          font-size: 0.18rem;
        }
      }
      i{
        color:#dddddd;
        font-size: 0.2rem;
      }
      
    }
    .color{
      border-bottom: 1px solid #e6e6e6;
      padding: 0.15rem;
      display: flex;
      align-items: center;
      span{
        padding-right: 0.1rem;
      }
      button{
        margin-right: 0.08rem;
      }
      .active{
        background:#f10;
        color:#ffffff;
        border: 1px solid #f10;
      }
    }
    .size{
       border-bottom: 1px solid #e6e6e6;
       padding: 0.15rem;
       display: flex;
       align-items: center;
       span{
         padding-right: 0.1rem;
       }
       div{
         button{
           margin-right: 0.08rem;
         }
         .active{
            background:#f10;
            color:#ffffff;
            border: 1px solid #f10;
          }
       }
    }
    .num{
       padding: 0.15rem;
       display: flex;
       align-items: center;
       border-bottom: 1px solid #e6e6e6;
       span{
         padding-right: 0.1rem;
       }
       .changeNum{
        border: 1px solid #e6e6e6;
        display: flex;
        span{
          width:0.46rem;
          font-size: 0.3rem;
          height: 0.46rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        input{
          border: none;
          outline: none;
          width: 0.62rem;
          height: 0.46rem;
          border-left: 1px solid #e6e6e6;
          border-right:1px solid #e6e6e6;
          text-align: center;
        }
       }
    }
    .addCar{
      padding: 0.15rem;
      
      .payment{
        background: #444;
      }
      button{
        border: none;
        background-color: #f10;
        color: #fff;
        font-size: 0.16rem;
        line-height: 0.46rem;
        width:1.52rem;
      }
    }
  }
}

</style>
