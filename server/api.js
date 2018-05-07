// 可能是我的node版本问题，不用严格模式使用ES6语法会报错
"use strict";
const models = require('./db');
const express = require('express');
const router = express.Router();

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

// 创建账号接口
router.post('/api/user/register',(req,res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
    models.Login.find({username: req.body.username}, (err,data) => {
        if (err) {
            console.log(err)
            // res.send(err);
            let newAccount = new models.Login({
                username : req.body.username,
                password : req.body.password,
                nickname : req.body.nickname
            });
            // 保存数据newAccount数据进mongoDB
            newAccount.save((err,data) => {
                if (err) {
                    res.send({'status': 1001, 'message': 'Fail to register!', 'data': err});
                } else {
                    res.send({'status': 1000, 'message': 'Register successfully!'});
                }
            });
        } else {
            console.log(data)
            if (data.length > 0) {
                res.send({'status': 1001, 'message': 'The account is already registered!'});
            } else {
                let newAccount = new models.Login({
                    username : req.body.username,
                    password : req.body.password,
                    nickname : req.body.nickname
                });
                // 保存数据newAccount数据进mongoDB
                newAccount.save((err,data) => {
                    if (err) {
                        res.send({'status': 1001, 'message': 'Fail to register!', 'data': err});
                    } else {
                        res.send({'status': 1000, 'message': 'Register successfully!'});
                    }
                });
            }
        }
    });

 
});
// 获取已有账号接口
router.post('/api/user/login',(req,res) => {
    // 通过模型去查找数据库
    models.Login.find({username: req.body.username, password: req.body.password}, (err,data) => {
        if (err) {
            // res.send(err);
            res.send({'status': 1001, 'message': 'The account is not existed!', 'data': err});
        } else {
            console.log(data)
            if (data.length > 0) {
                res.send({'status': 1000, 'message': 'Login successfully!', 'data': data});
            } else {
                res.send({'status': 1001, 'message': 'The account is not existed!', 'data': err});
            }
        }
    });
});
// 获取所有账号接口
router.get('/api/user/all',(req,res) => {
    // 通过模型去查找数据库
    models.Login.find((err,data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});
//查找商品列表信息
router.get('/api/user/goods',(req,res) => {
    // 通过模型去查找数据库
    models.Goods.find((err,data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});
//购物车添加数据
router.post('/api/user/shopadd',(req,res)=>{
    let params = req.body
     models.Car.find({username: params.username}, (err,data) => {
        if (err) {
            console.log('err:',err)
            let newAccount = new models.Car({
                username:params.username,
                goods:[
                    {
                    goodid : params.goodid,
                    title : params.title,
                    imgurl : params.imgurl,
                    price : params.price,
                    color : params.color,
                    size : params.size,
                    num : params.num
                    }  
                ]
            });
            // 保存数据newAccount数据进mongoDB
            newAccount.save((err,data) => {
                if (err) {
                    res.send({'status': 1001, 'message': '加入购物车失败!', 'data': err});
                } else {
                    res.send({'status': 1000, 'message': '加入购物车成功!'});
                }
            });
        } else {
            
            if (data.length > 0) {
                //如果用户有购物车数直接进行操作
                
                //用户此时的购物车数据
                let goods = data[0].goods
                let isHas = false
                //查找要加入购物车的数据是否存在
                for(let i = 0;i<goods.length;i++){
                    if(goods[i].goodid == params.goodid){
                        goods[i].title = params.title,
                        goods[i].imgurl = params.imgurl,
                        goods[i].price = params.price,
                        goods[i].color = params.color,
                        goods[i].size = params.size,
                        goods[i].num = params.num
                        isHas = true
                    }
                }
                if(!isHas){
                    goods.push({goodid:params.goodid,title:params.title,imgurl:params.imgurl,price:params.price,color:params.color,size:params.size,num:params.num})
                }
                models.Car.update({username:params.username},{$set:{goods:goods}},(err,data)=>{
                    if(err){
                        res.send({'status': 1001, 'message': '加入购物车失败！'});
                    }
                    res.send({'status': 1000, 'message': '加入购物车成功!'});
                })
                
            } else {
                let newAccount = new models.Car({
                    username:params.username,
                    goods:[
                        {
                            goodid : params.goodid,
                            title : params.title,
                            imgurl : params.imgurl,
                            price : params.price,
                            color : params.color,
                            size : params.size,
                            num : params.num
                        }  
                    ]
                });
                // 保存数据newAccount数据进mongoDB
                newAccount.save((err,data) => {
                    if (err) {
                        res.send({'status': 1001, 'message': '加入购物车失败!', 'data': err});
                    } else {
                        res.send({'status': 1000, 'message': '加入购物车成功!'});
                    }
                });
            }
        }
     })
});

//查找购物车商品
router.get('/api/user/searchCar',(req,res)=>{
    // 通过模型去查找数据库
    models.Car.find((err,data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
})
//删除商品

router.post('/api/user/removeCar',(req,res)=>{
    let params = req.body
    // console.log(params)
    models.Car.find({username: params.username},(err,data)=>{
        if(err) throw err;
        let goods = data[0].goods
        for(let i = 0 ; i < goods.length;i++){
            if(goods[i].goodid == params.goodid){
                goods.splice(i,1)
            }
        }
        models.Car.update({username:params.username},{$set:{goods:goods}},(err,data)=>{
            if(err){
                res.send({'status': 1001, 'message': '删除商品失败！'});
            }
            res.send({'status': 1000, 'message': '删除商品成功!'});
        })
    })
})

//清空购物车

router.post('/api/user/clearCar',(req,res)=>{
    let params = req.body
    // console.log(params)
    models.Car.find({username: params.username},(err,data)=>{
        if(err) throw err;
        models.Car.update({username:params.username},{$set:{goods:[]}},(err,data)=>{
            if(err){
                res.send({'status': 1001, 'message': '删除商品失败！'});
            }
            res.send({'status': 1000, 'message': '删除商品成功!'});
        })
    })
})

//我的订单
router.post('/api/user/myOrder',(req,res)=>{
    let params = req.body
     models.Order.find({username: params.username}, (err,data) => {
         
        if (err) {
            console.log('err:',err)
            let newAccount = new models.Order({
                username:params.username,
                orders:[
                    {
                    goodid : params.goodid,
                    title : params.title,
                    imgurl : params.imgurl,
                    price : params.price,
                    color : params.color,
                    size : params.size,
                    num : params.num
                    }  
                ]
            });
            // 保存数据newAccount数据进mongoDB
            newAccount.save((err,data) => {
                if (err) {
                    res.send({'status': 1001, 'message': '加入失败!', 'data': err});
                } else {
                    res.send({'status': 1000, 'message': '加入成功!'});
                }
            });
        } else {
            
            if (data.length > 0) {
                //如果用户有购物车数直接进行操作
                console.log('data.length:',data)
                //用户此时的购物车数据
                let goods = data[0].orders
                let isHas = false
                //查找要加入购物车的数据是否存在
                for(let i = 0;i<goods.length;i++){
                    if(goods[i].goodid == params.goodid){
                        goods[i].title = params.title,
                        goods[i].imgurl = params.imgurl,
                        goods[i].price = params.price,
                        goods[i].color = params.color,
                        goods[i].size = params.size,
                        goods[i].num = params.num
                        isHas = true
                    }
                }
                if(!isHas){
                    goods.push({goodid:params.goodid,title:params.title,imgurl:params.imgurl,price:params.price,color:params.color,size:params.size,num:params.num})
                }
                models.Order.update({username:params.username},{$set:{orders:goods}},(err,data)=>{
                    if(err){
                        res.send({'status': 1001, 'message': '失败！'});
                    }
                    res.send({'status': 1000, 'message': '成功!'});
                })
                
            } else {
                let newAccount = new models.Order({
                    username:params.username,
                    orders:[
                        {
                            goodid : params.goodid,
                            title : params.title,
                            imgurl : params.imgurl,
                            price : params.price,
                            color : params.color,
                            size : params.size,
                            num : params.num
                        }  
                    ]
                });
                // 保存数据newAccount数据进mongoDB
                newAccount.save((err,data) => {
                    if (err) {
                        res.send({'status': 1001, 'message': '失败!', 'data': err});
                    } else {
                        res.send({'status': 1000, 'message': '成功!'});
                    }
                });
            }
        }
     })
})

//获取订单信息
router.get('/api/user/searchOrder',(req,res)=>{
    // 通过模型去查找数据库
    models.Order.find((err,data) => {
        if (err) {   
            res.send(err);
        } else {
            res.send(data);
        }
    });
})

//清空订单
router.post('/api/user/clearOrder',(req,res)=>{
    let params = req.body
    // console.log(params)
    models.Order.find({username: params.username},(err,data)=>{
        if(err) throw err;
        models.Order.update({username:params.username},{$set:{orders:[]}},(err,data)=>{
            if(err){
                res.send({'status': 1001, 'message': '删除商品失败！'});
            }
            res.send({'status': 1000, 'message': '删除商品成功!'});
        })
    })
})

//删除单个订单

router.post('/api/user/removeOrder',(req,res)=>{
    let params = req.body
    // console.log(params)
    models.Order.find({username: params.username},(err,data)=>{
        if(err) throw err;
        let goods = data[0].orders
        console.log('goods:',goods)
        for(let i = 0 ; i < goods.length;i++){
            if(goods[i].goodid == params.goodid){
                goods.splice(i,1)
            }
        }
        models.Order.update({username:params.username},{$set:{orders:goods}},(err,data)=>{
            if(err){
                res.send({'status': 1001, 'message': '删除商品失败！'});
            }
            res.send({'status': 1000, 'message': '删除商品成功!'});
        })
    })
})

//添加收货地址
router.post('/api/user/addAddress',(req,res)=>{
    let params = req.body
     models.Addresses.find({username: params.username}, (err,data) => {
        if (err) {
            console.log('err:',err)
            let newAccount = new models.Addresses({
                username:params.username,
                address:[
                    {
                        reallyname : params.reallyname,
                        phone : params.phone,
                        province : params.province,
                        city : params.city,
                        villages : params.villages,
                        street : params.street,
                        detailsAddress : params.detailsAddress
                    }  
                ]
            });
            // 保存数据newAccount数据进mongoDB
            newAccount.save((err,data) => {
                if (err) {
                    res.send({'status': 1001, 'message': '保存失败!', 'data': err});
                } else {
                    res.send({'status': 1000, 'message': '保存成功!'});
                }
            });
        } else {
            
            if (data.length > 0) {
                let _address = data[0].address
                let isHas = false
                //查找要加入购物车的数据是否存在
                for(let i = 0;i<_address.length;i++){
                    if(_address[i].reallyname == params.reallyname&&
                        _address[i].phone == params.phone&&
                        _address[i].province == params.province&&
                        _address[i].city == params.city&&
                        _address[i].villages == params.villages&&
                        _address[i].street == params.street&&
                        _address[i].detailsAddress == params.detailsAddress
                    ){
                        _address[i].reallyname = params.reallyname,
                        _address[i].phone = params.phone,
                        _address[i].province = params.province,
                        _address[i].city = params.city,
                        _address[i].villages = params.villages,
                        _address[i].street = params.street,
                        _address[i].detailsAddress = params.detailsAddress,
                        isHas = true
                    }
                }
                if(!isHas){
                    _address.push({reallyname:params.reallyname,phone:params.phone,province:params.province,city:params.city,villages:params.villages,street:params.street,detailsAddress:params.detailsAddress})
                }
                
                models.Addresses.update({username:params.username},{$set:{address:_address}},(err,data)=>{
                    if(err){
                        res.send({'status': 1001, 'message': '保存失败！'});
                    }
                    res.send({'status': 1000, 'message': '保存成功!'});
                })
                
            } else {
                let newAccount = new models.Addresses({
                    username:params.username,
                    address:[
                        {
                            reallyname : params.reallyname,
                            phone : params.phone,
                            province : params.province,
                            city : params.city,
                            villages : params.villages,
                            street : params.street,
                            detailsAddress : params.detailsAddress
                        }  
                    ]
                });
                // 保存数据newAccount数据进mongoDB
                newAccount.save((err,data) => {
                    if (err) {
                        res.send({'status': 1001, 'message': '加入购物车失败!', 'data': err});
                    } else {
                        res.send({'status': 1000, 'message': '加入购物车成功!'});
                    }
                });
            }
        }
     })
});

//删除收货地址
router.post('/api/user/removeAddress',(req,res)=>{
    let params = req.body
    // console.log(params)
    models.Addresses.find({username: params.username},(err,data)=>{
        if(err) throw err;
        let _address = data[0].address
        for(let i = 0 ; i < _address.length;i++){
            if(_address[i].reallyname == params.reallyname&&
                        _address[i].phone == params.phone&&
                        _address[i].province == params.province&&
                        _address[i].city == params.city&&
                        _address[i].villages == params.villages&&
                        _address[i].street == params.street&&
                        _address[i].detailsAddress == params.detailsAddress
            ){
                _address.splice(i,1)
            }
        }
        models.Addresses.update({username:params.username},{$set:{address:_address}},(err,data)=>{
            if(err){
                res.send({'status': 1001, 'message': '删除商品失败！'});
            }
            res.send({'status': 1000, 'message': '删除商品成功!'});
        })
    })
})
module.exports = router;