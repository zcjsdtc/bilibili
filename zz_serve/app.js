//使用express构建web服务器 --11:25
const express = require('express');
const session = require("express-session");
const bodyParser = require('body-parser');
const cors=require("cors");
/*引入路由模块*/
var index=require("./routes/index");
var user=require("./routes/user");
var user_person=require("./routes/user_person");
var details=require("./routes/details");

var app = express();
app.use(cors({
  origin:'http://127.0.0.1:8765',
  credentials:true
}))
var server = app.listen(3333);
//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
//托管静态资源到public目录下
app.use(express.static('public'));
app.use(session({
  secret:'随机字符串',
  cookie:{maxAge:60*1000*30},//过期时间ms
  resave:true,
  saveUninitialized:true
}));//将服务器的session，放在req.session中
/*使用路由器来管理路由*/
app.use("/index",index);
app.use("/user",user);
app.use("/user_person",user_person);
app.use("/details",details);
