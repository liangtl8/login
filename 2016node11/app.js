var express=require('express');
var path=require('path');
var bodyParser=require('body-parser');
//var cookieParser = require('cookie-parser');
var session=require('express-session');
var fs=require('fs');
var app = express();

//设置模板引擎
app.set('view engine','html');
app.set('views',path.resolve('views'));//设置模板存放的目录
app.engine('.html',require('ejs').__express);
// true时用querysring来解析req.body false时 是bodyParser自带的解析器
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.resolve('public')))
app.use(session({
    resave:true,//每次请求的时候都会重新保存session
    saveUninitialized:true,//不管用不用都 进行初始化。
    secret:'zfpx' //加密cookie
}));
//app.use(cookieParser());
//把请求体对象加到req.body
//app.use(bodyParser.json());

//注册
app.get('/signup',function(req,res){
    res.render('signup',{error:req.session.error})
})

app.post('/signup',function(req,res){
    var user=req.body;

    console.log(user)

    fs.readFile('./user.json','utf8',function (err,data) {
        data = JSON.parse(data);
        console.log("data",data)
        var oUser = data.find(function (item) {
            return item.username == user.username&& item.password == user.password;
            ;
        })
        if (oUser) {
            console.log(1)
            req.session.error = '此用户已注册';
            res.redirect('/signup')
        } else {
            console.log(2)
            console.log(JSON.stringify(data))
            req.session.error = '';
            data.push(user)
            console.log(data)
            fs.writeFile('./user.json',JSON.stringify(data),function(){
                res.redirect('/signin');
            });
        }
    })
});
//登陆
app.get('/signin',function (req,res) {
    res.render('signin',{error:req.session.error,success:req.session.success})
})
app.post('/signin',function (req,res) {
    var user=req.body;
    fs.readFile('./user.json','utf8',function (err,data) {
        data = JSON.parse(data);
        var oUser = data.find(function (item) {
            return item.username == user.username && item.password == user.password;
        })
        if (oUser) {
            req.session.userName = req.body.username;
            req.session.success = '登陆成功';
            res.redirect('/welcome');
        } else {
            req.session.userName = '';
            req.session.success = '';
            res.redirect('/signin');
        }
    })
})

//渲染welcome页面
app.get('/welcome',function(req,res){
    res.render('welcome',{username:req.session.username,success:req.session.success})
});





// function read(callback){
//     fs.readFile('./user.json','utf8',function (err,users) {
//         try{
//             users=JSON.parse(users)
//         }catch(err){
//             users=[];
//         }
//         callback(users)
//     })
// }
//
// // read(function (users) {
// //
// // })
// function save(users,callback){
//     fs.writeFile('./user.json',JSON.stringify(users),function (err) {
//
//     })
// }
// save()
app.listen(8080)