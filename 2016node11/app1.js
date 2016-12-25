var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'zfpx'
}));

//设置模板引擎
app.set('view engine','html');
//设置模板存放的路径
app.set('views',path.resolve('views'));
app.engine('html',require('ejs').__express);

var user = require('./routes/user');
app.use(express.static(path.resolve('public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/user',user);

app.listen(8081);