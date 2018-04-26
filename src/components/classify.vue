<template>
  <div class="shoppingCar">
      <div class="content_1">
        <div class="left">
          <ul>
            <li v-for="(li,index) in list" :key="li.id" @click="id= li.id;getList(index)" :class="{active:index == isActive}">{{li.title}}</li>
          </ul>
        </div>
        <div class="right">
          <ul>
            <li>全部{{title}}</li>
            <li v-for="li in listInner" :key="li.id">{{li.title}}</li>
          </ul>
        </div>
      </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data(){
    return{
      isActive:0,
      list:[],
      listInner:[],
      id:1,
      title:''
    }
  },
  created(){
    this.getList()
  },
  methods: {
    getList(item){
      let self = this
      axios.get('./../../static/classify.json').then((res)=>{
        
        self.list = res.data;
        self.listInner = res.data[self.id-1].details
        self.title = res.data[self.id-1].title
      })
       self.isActive=item;
    }
  }
}
</script>
<style lang="scss" scoped>
 .shoppingCar{
    flex: 1;
    overflow: auto;
   
   .content_1{
    height: 8.5rem;
    display: flex;
     .left{
        width: 45%;
        background: #dddddd;
        ul{
          li{
            height: 0.445rem;
            line-height: 0.445rem;
          }
        }
     }
     .right{
       width: 55%;
        ul{
          li{
            height: 0.445rem;
            line-height: 0.445rem;
            padding-left: 0.1rem;
            text-align: left;
            border-bottom:1px solid #dddddd;
          }
        }
     }
   }
 }
 .active{
   background: #ffffff;
 }
</style>


