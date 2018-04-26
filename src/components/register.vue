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
                  <input type="text" placeholder="请输入手机号" v-model="account">
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
                  <input type="text" placeholder="潮流口令（非必填）">
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
export default {
  data () {
    return {
      account: '',
      password: '',
      randomNum:''
    }
  },
  methods: {
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


