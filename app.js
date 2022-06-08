//导入express
const express = require("express");
//导入用于解析还原jwt字符串为json数据的包
const expressJWT = require("express-jwt");
//导入cors
const cors = require("cors");
//导入路由配置文件
const bookuser = require('./router/userInfo');
//用户信息路由配置
const getUserInfo = require('./router/getUserInfo');
//图书信息路由配置
const books = require('./router/books');
//图书借阅模块配置
const borrowBook = require('./router/borrowBook');



//导入验证插件
const joi = require("joi");
//实例化express对象
const app = express();

//导入bodyParser模块  用于设置处理请求数据最大长度、空间大小
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit:'10mb'}));  //用于设置处理json格式请求数据大小
app.use(bodyParser.urlencoded({limit:'10mb',extended:true})); //用于设置处理urlencoded格式请求数据大小

//全局注册cors解决跨域问题
app.use(cors());

//启动服务器
app.listen(80,()=>{
    console.log("服务器启动成功");
})

// app.use(express.urlencoded({extended:false}));
// 全局注册解析用户端传入数据中间件
app.use(express.json());
//解析token中间件
app.use(expressJWT({secret:"secretKey"}).unless({path:[/^\/book\//]}));

//全局注册中间件,用来优化封装res.send方法
app.use((req,res,next)=>{
    //给res自定义一个方法，封装res.send方法   以后可以通过res.rep调用
    res.rep = (msg,code = 1)=>{
        res.send({code,msg});
    }
    //放行
    next();
})

//注册用户登录注册路由
app.use('/book',bookuser);
//注册获取用户信息路由
app.use('/user',getUserInfo);
//注册图书模块路由
app.use('/book',books);
//注册图书借阅模块
app.use('/book',borrowBook)

//全局注册错误级别中间件，用来处理错误保证程序继续运行  同时捕捉token解析失败的错误(如果用户端传来的token不合法或过期会导致解析失败)
app.use((err,req,res,next)=>{
    //通过错误对象的名称来判断是否为token解析失败产生的错误，如果是则返回错误信息
    if(err.name === "UnauthorizedError") return res.send({code:2,msg:"无效的token!"});
    //全局错误级别中间件中，捕获验证失败的错误，并把验证失败的结果响应给客户端：
    if(err instanceof joi.ValidationError) return res.rep("输入不合法",3);
    //处理其他错误
    console.log(err.message)
    res.rep("服务器错误,请稍后再试");
    next();
})