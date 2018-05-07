<template>
  <div class="login">
      <header>
        <div class="login-detail">
            <div @click="back()">
                <i class="iconfont icon-jiantouzuo"></i>
            </div>
            <router-link to="register">注册</router-link>
        </div> 
        <span>Yohu!Family账号可登录Yoho!Buy有货</span>
      </header>
      <div class="login-detail">
          <ul>
              <li>
                  <i class="iconfont icon-shouji-tianchong"></i>
                  <input type="text" placeholder="请输入用户名" v-model="username">
              </li>
              <li>
                  <i class="iconfont icon-suo"></i>
                  <input type="password" placeholder="请输入密码" v-model="password">
              </li>
               <li>
                  <i class="iconfont icon-yduidunpaishixin"></i>
                  <input type="text" placeholder="请输入随机数" v-model="randomNum">
                  <span @click="getRandomAlphaNum()">{{randomNum}}</span>
              </li>
          </ul>
      </div>
       <div class="login-button">
        <button @click="login">登录</button>
      </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import axios from 'axios'
export default {
  data () {
    return {
      username: '',
      password: '',
      randomNum:'',
     
    }
  },
  created () { 
      if(this.randomNum == ""){
          this.randomNum = '点击'
      }
      
  },
  methods: {
    login () {
      let params = {
        username: this.username,
        password: this.password
      }
      
      axios.post('/api/user/login', params)
        .then((response) => {
            // console.log(response)
          var message = response.data.message
          if (response.data.status === 1000) {
            this.$store.dispatch('userInfo',response.data.data[0])
            localStorage.setItem('userInfo',JSON.stringify(response.data.data[0]))  
            message = response.data.data[0].username + ' ' + message
            // console.log(JSON.parse(localStorage.getItem('userInfo')))
          }
          Toast({message });
          let self = this;
           
          if(response.data.status === 1000){
            setTimeout(function(){
               self.$router.push({path:'/Main'})
               },1000)
          }
        })
        .catch((reject) => {
          console.log(reject)
        })
    },
    back(){
        this.$router.go(-1)
    },
    // getAllAccount () {
    //   console.log('call getAllAccount')
    //   this.$http.get('/api/user/all')
    //     .then((response) => {
    //       console.log(response)
    //     })
    //     .catch((reject) => {
    //       console.log(reject)
    //     })
    // },
    getRandomAlphaNum() {
        let rdmString = "";
        for (; rdmString.length < 4; rdmString += Math.random().toString(36).substr(2));
        this.randomNum = rdmString.substr(0, 4);
    }
  }
}
</script>
<style lang="scss" scoped>
    .login{
        header{
            color: #ffffff;
            width: 100%;
            height: 1.45rem;
            background-image: url('../assets/login.jpg');
            background-size: contain;
            .login-detail{
                display: flex;
                justify-content: space-between;
                height: 0.25rem;
                align-items: center;
                padding: 0.4rem;
                margin-bottom: 0.4rem;
                a{
                   color: #ffffff;
                   border: 1px solid #ffffff;
                   padding: 0.05rem 0.08rem;
                   border-radius: 0.18rem; 
                }
                i{
                    font-size: 0.24rem;
                }
            }
            span{
                font-size: 0.1rem;
            }
        }
        .login-detail{
            padding: 0.3rem;
            ul{
                li{
                    margin-top: 0.3rem;
                    line-height: 0.2rem;
                    padding-bottom: 0.05rem;
                    display: flex;
                    border-bottom:1px solid #dddddd;
                    i{
                        font-size: 0.14rem;
                        color: #000000;
                    }
                    input{
                        padding-left: 0.1rem;
                        border: none;
                        outline: none;
                        width:75%;
                    }
                    span{
                        display: inline-block;
                        background: #b0b0b0;
                        color: #ffffff;
                        padding: 0.02rem 0.05rem;
                        border-radius: 0.1rem;
                    }
                }
            }
        }
        .login-button{
        margin-top: 0.2rem;
        padding: 0 0.3rem;
        button{
            background: #b0b0b0;
            width: 100%;
            height: 0.35rem;
            color: #ffffff;
            line-height: 0.35rem;
            border: none;
            text-align: center;
            font-size: 0.16rem;
            border-radius: 0.05rem;
        }
        }
    }
</style>