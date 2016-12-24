/**
 * Created by SuperLi on 16/12/24.
 */
var express=require('express');
var path=require('path');
var bodyParser=require('body-parser');
var app=express();
//设置模板引擎
app.set('view engine','ejs');
app.set('views',path.resolve('./views'));
//app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:true}));

var users=[];
app.get('/signup',function(req,res){
    res.render('up',{title:'注册'});//渲染up页面
});
app.post('/signup',function(req,res){
    var user=req.body;
    console.log(user);
    var data=users.find(function (item) {
        return item.username == user.username;
    });
    if(data){
        res.redirect('/signup')
    }else{
        users.push(user);
        res.redirect('/signin')
    }
});
app.get('/signin',function(req,res){
    res.render('signin',{title:'登陆页'})
});
app.post('/signin',function(req,res){
    var user=req.body;
    if(user.username){
        var data=users.find(function (item) {
            return item.username ==user.username&&item.password==user.password;
        });
        if(data){
            res.redirect('welcome')
        }else{
            res.redirect('signin')
        }
    }

});
app.get('/welcome',function(req,res){
    res.render('welcome',{title:'欢迎页'})
});
app.listen(8080);