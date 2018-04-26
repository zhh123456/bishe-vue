<template>
  <div class="login">
      <header>
        <div class="login-detail">
            <i class="iconfont icon-jiantouzuo"></i>
            <router-link to="register">注册</router-link>
        </div> 
        <span>Yohu!Family账号可登录Yoho!Buy有货</span>
      </header>
      <div class="login-detail">
          <ul>
              <li>
                  <i class="iconfont icon-shouji-tianchong"></i>
                  <input type="text" placeholder="请输入手机号" v-model="account">
              </li>
              <li>
                  <i class="iconfont icon-suo"></i>
                  <input type="password" placeholder="请输入密码" v-model="password">
              </li>
               <li>
                  <i class="iconfont icon-yduidunpaishixin"></i>
                  <input type="text" placeholder="请输入随机数" v-model="randomNum">
                  <span>0123</span>
              </li>
          </ul>
      </div>
       <div class="login-button">
        <button @click="login">登录</button>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      account: '',
      password: '',
      randomNum:''
    }
  },
  methods: {
    login () {
      let params = {
        account: this.account,
        password: this.password
      }
      this.$http.post('/api/user/login', params)
        .then((response) => {
          console.log(response)
          var message = response.body.message
          if (response.body.status === 1000) {
            message = response.body.data[0].account + ' ' + message
          }
          alert(message)
        })
        .catch((reject) => {
          console.log(reject)
        })
    },
    register () {
      let params = {
        account: this.account,
        password: this.password
      }
      this.$http.post('/api/user/register', params)
        .then((response) => {
          console.log(response)
          var message = response.body.message
          if (response.body.status === 1000) {
            message = this.account + ' ' + message
          }
          alert(message)
        })
        .catch((reject) => {
          console.log(reject)
        })
    },
    getAllAccount () {
      console.log('call getAllAccount')
      this.$http.get('/api/user/all')
        .then((response) => {
          console.log(response)
        })
        .catch((reject) => {
          console.log(reject)
        })
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