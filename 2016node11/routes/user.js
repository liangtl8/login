
var express = require('express');

var bodyParser = require('body-parser');
var fs = require('fs');
var router = express.Router();



//注册
router.get('/signup',function (req,res){
    res.render('signup',{error:req.session.error});
});
router.post('/signup',function (req,res){
    var obj = req.body;
    fs.readFile('./user.json','utf8',function (err,data){
        data = JSON.parse(data);
        console.log(data)
        var user = data.find(function (item){
            return item.username == obj.username && item.password == obj.password;
        });
        if(user){
            req.session.error = '用户名已存在或密码输入错误';
            res.redirect('/user/signup');
        }else{
            req.session.error ='';
            data.push(obj);
            fs.writeFile('./user.json',JSON.stringify(data),function(){
                res.redirect('/user/signin');
            });
        }
    });
});

//登录
router.get('/signin',function (req,res){
    res.render('signin',{title:'欢迎登录',error:req.session.error,success:req.session.success});
});
router.post('/signin',function (req,res){
    var obj = req.body;
    fs.readFile('./user.json','utf8',function (err,data){
        data = JSON.parse(data);
        var user = data.find(function (item){
            return item.username == obj.username && item.password == obj.password;
        });
        if(user){
            req.session.userName = req.body.username;
            req.session.success = '登陆成功';
            res.redirect('/user/welcome');
        }else{
            req.session.userName = '';
            req.session.success = '';
            res.redirect('/user/signin');
        }
    });
});

//回到主页
router.get('/welcome',function (req,res){
    res.render('welcome',{title:'欢迎回家',userName:req.session.userName,success: req.session.success})
});

module.exports = router;