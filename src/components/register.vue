<template>
  <div class="register">
      <div class="register-title">
        <i class="iconfont icon-jiantouzuo"></i>
        <span>注册</span>
        <span> </span>
      </div>
      <div class="redgister-detail">
          <ul>
              <li>
                  <i class="iconfont icon-shouji-tianchong"></i>
                  <input type="text" placeholder="请输入用户名" v-model="username">
              </li>
               <li>
                  <i class="iconfont icon-yduidunpaishixin"></i>
                  <input type="text" placeholder="请输入随机数">
                  <span>点击</span>
              </li>
              <li>
                  <i class="iconfont icon-suo"></i>
                  <input type="text" placeholder="请输入密码" v-model="password">
              </li>
              <li>
                  <i class="iconfont icon-wode1"></i>
                  <input type="text" placeholder="昵称" v-model="nickname">
              </li>
          </ul>
      </div>
      <div class="register-button">
        <button @click="register">注册</button>
        <p>
            <i class="iconfont icon-duihao2"></i>
            <span>我已经同意遵守</span>
            <a href="">Yoho!Buy有货服务条款</a>
        </p>
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
      nickname:'',
      randomNum:''
    }
  },
  methods: {
    register () {
      let params = {
        username: this.username,
        password: this.password,
        nickname: this.nickname
      }
      axios.post('/api/user/register', params)
        .then((response) => {
        //    console.log(response)
          var message = response.data.message
          if (response.data.status === 1000) {
            message = this.username + ' ' + message
          }
           Toast({message });
           let self = this;
           
            if(response.data.status === 1000){
            setTimeout(function(){
               self.$router.push({path:'/login'})
               },1000)
            }
           
           
        })
        .catch((reject) => {
          console.log(reject)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.register{
    padding:0.3rem 0.4rem;
    .register-title{
        display: flex;
        justify-content: space-between;
        i{
           font-size: 0.22rem; 
        }
        font-size: 0.18rem;
    }
    .redgister-detail{
        padding-top: 0.3rem;
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
    .register-button{
        margin-top: 0.2rem;
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
        p{
            padding-top: 0.2rem;
            font-size: 0.1rem;
            i{
                font-size: 0.1rem;
            }
            a{
                color: #c00;
                text-decoration: underline;
            }
        }
    }
}
</style>


