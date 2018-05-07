// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose');
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost/test');

// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error',() => console.log('Mongo connection error'));
db.once('open',() => console.log('Mongo connection successed'));
//定义模式loginSchema用户登录信息 
const loginSchema = mongoose.Schema({
  username : String,
  password : String,
  nickname:String
});
//商品列表
const goodsSchema = mongoose.Schema({
  goodid : String,
  title : String,
  imgurl:String,
  price:String,
  description:String
});
//购物车信息
const carSchema = mongoose.Schema({
  username:String,
  goods:[
    {
      goodid : String,
      title : String,
      imgurl : String,
      price : String,
      color : String,
      size : String,
      num : String
    }
    
  ]
  
});
//订单信息
const orderSchema = mongoose.Schema({
  username:String,
  orders:[
    {
      goodid : String,
      title : String,
      imgurl : String,
      price : String,
      color : String,
      size : String,
      num : String
    }
    
  ]
  
});

//收货地址
const addressSchema = mongoose.Schema({
  username:String,
  address:[
    {
      reallyname:String,
      phone:String,
      province : String,
      city : String,
      villages : String,
      street : String,
      detailsAddress : String,
    }
    
  ]
})

/************** 定义模型Model **************/
const Models = {
    Login : mongoose.model('Login',loginSchema),
    Goods: mongoose.model('Goods',goodsSchema),
    Car: mongoose.model('Car',carSchema),
    Order: mongoose.model('Order',orderSchema),
    Addresses: mongoose.model('Addresses',addressSchema)
}

module.exports = Models;