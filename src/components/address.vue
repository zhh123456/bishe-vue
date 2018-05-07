<template>
  <div class="address">
      <div class="header">
          <i class="iconfont icon-jiantou4"></i>
          <span>新增收货地址</span>
          <span @click="addAddress">保存</span>
      </div>
      <div class="center">
        <div class="addressDetails">
            <label for=""><span>收货人</span><input type="text" v-model="reallyname" placeholder="请输入收货人真实姓名"></label>
            <label for=""><span>手机号</span><input type="text" v-model="phone" placeholder="请输入收货人手机号"></label>
        </div>
        <div class="addressDetails">
            <label for=""><span>省份</span><input type="text" v-model="province" @focus="provinceShow()"></label>
            <label for=""><span>城市</span><input type="text" v-model="city" @focus="cityShow()"></label>
            <label for=""><span>县/区</span><input type="text" v-model="villages" @focus="villagesShow()"></label>
            <label for=""><span>街道</span><input type="text" v-model="street" @focus="streetShow()"></label>
            <label for=""><span>详细地址</span><input type="textarea" v-model="detailsAddress"></label>            
        </div>
      </div>
      <div class="showAddress">
        <div class="showProvince" v-if="showProvince">
          <ul>
              <li v-for="list in provinceList" :key="list.id" @click="chioceProvinse(list.id)">{{list.province}}</li>
          </ul>
        </div>
        <div class="showProvince" v-if="showCity">
          <ul>
              <li v-for="list in cityList" :key="list.cityid" @click="chioceCity(list.cityid)">{{list.cityname}}</li>
          </ul>
        </div>
        <div class="showProvince" v-if="showVillages">
          <ul>
              <li v-for="list in villagesList" :key="list.villagesid" @click="chioceVillages(list.villagesid)">{{list.villagesname}}</li>
          </ul>
        </div>
        <div class="showProvince" v-if="showStreet">
          <ul>
              <li v-for="list in streetList" :key="list.streetid" @click="chioceStreet(list.streetid)">{{list.streetname}}</li>
          </ul>
        </div>
      </div>
      

  </div>
</template>
<script>
import axios from 'axios';
import {mapState} from 'vuex';
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
  data () {
      return {
          reallyname:'',
          phone:'',
          province:'',
          city:'',
          villages:'',
          street:'',
          detailsAddress:'',
          provinceList:[],
          cityList:[],
          villagesList:[],
          streetList:[],
          showProvince:false,
          showCity:false,
          showVillages:false,
          showStreet:false,
      }
  },
  created () {
      this.getAddress()
      console.log(this.user.user)
  },
  computed: {
      ...mapState(['user'])
  },
  methods: {
      getAddress(){
        axios.get('../../static/address.json').then((res)=>{
          for(let i = 0 ; i < res.data.length ; i ++){
            this.provinceList.push(res.data[i])
          }
          
        })
        
      },
      chioceProvinse(id){
          let list  = this.provinceList
          for(let i = 0 ; i < list.length ; i++){
              if(list[i].id == id){
                this.province = list[i].province
                this.cityList = list[i].city
              }
          } 
          this.showProvince = false
      },
      chioceCity(id){
          let list  = this.cityList
          
          for(let i = 0 ; i < list.length ; i++){
              if(list[i].cityid == id){
                this.city = list[i].cityname
                this.villagesList = list[i].villages
              }
          }
          this.showCity = false
           
      },
      chioceVillages(id){
        let list = this.villagesList
        for(let i = 0 ; i < list.length ; i++){
            if(list[i].villagesid == id){
            this.villages = list[i].villagesname
            this.streetList = list[i].villagesstreet
            }
        }
        this.showVillages = false
      },
      chioceStreet(id){
        let list = this.streetList
        for(let i = 0 ; i < list.length ; i++){
            if(list[i].streetid == id){
            this.street = list[i].streetname
            }
        }
        this.showStreet = false
      },
      provinceShow(){
          this.showProvince = true
      },
      cityShow(){
          this.showCity = true;
      },
      villagesShow(){
          this.showVillages = true
      },
      streetShow(){
          this.showStreet = true
      },
      addAddress(){
        let params = {
            username:this.user.user.username,
            reallyname:this.reallyname,
            phone:this.phone,
            province:this.province,
            city:this.city,
            villages:this.villages,
            street:this.street,
            detailsAddress:this.detailsAddress
        }
        axios.post('/api/user/addAddress',params).then((response)=>{
            var message = response.data.message
            // Toast({message});
            console.log('response:',response)
        })
      }
  }
}
</script>
<style lang="scss" scoped>
.address{
    background: #dddddd;
    height: 100%;
    position: relative;
    .header{
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
    }
    .center{
        
        margin-top:0.2rem;
        .addressDetails{
            margin-bottom:0.15rem;
            display: flex;
            flex-direction: column;
            padding: 0 0.2rem;
            background:#ffffff;
            label{
                height: 0.4rem;
                border-bottom: 1px solid #dddddd;
                line-height: 0.4rem;
                text-align: left;
                input{
                    border: none;
                    outline: none;
                }
                span{
                    padding-right: 0.2rem;
                }
            }

        }
    }
    .showAddress{
        position: absolute;
        top: 0;
        left:50%;
        margin-left: -40%;
        margin-top: 45%;
        width: 80%;
        max-height: 40%;
        overflow: scroll;
        .showProvince{
            
            padding: 0.1rem 0.2rem;
            border: 1px solid red;
            background: #ffffff;
           
            
            ul{
                li{
                    line-height: 0.4rem;
                }
            }
        }
    }
    
}
</style>


