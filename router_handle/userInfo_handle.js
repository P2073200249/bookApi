//路由处理函数
//导入数据库配置文件 以及实例对象
const db = require("../mysql/mysql");
//导入用于生成jwt字符串的包
const jwt = require("jsonwebtoken");
//定义jwt字符串加密/解密的密钥

const secretKey = "secretKey";


//register注册处理函数
exports.register = (req,res)=>{
    //查询数据库是否存在同用户  sql语句
    const sqlOne = 'select * from bookusers where userName=?';
    //查询
    db.query(sqlOne,req.body.userName,(err,results)=>{
        //判断是否失败 失败后返回失败信息
        if(err) return res.rep("注册失败，请稍后重试");
        //判断是否存在该用户
        if(results.length > 0) return res.rep("注册失败,该账号已存在！",2);
        //如果不存在则注册
        //sql语句
        const sqlTwo = 'insert into bookusers set ?';
        //插入数据  简写形式直接传入对象
        db.query(sqlTwo,req.body,(err,results)=>{
            //判断是否失败  响应失败提示
            if(err) return res.rep("注册失败，请稍后重试")
            //判断数据是否插入成功
            if(results.affectedRows !== 1) return res.rep("注册失败，请稍后重试");
            //以上都没问题，说明注册成功，响应数据给服务器
            res.send({
                code:0,
                msg:"注册成功",
                //将token返回给客户端
                token: "Bearer " + jwt.sign({userName:req.body.userName,name:req.body.info},secretKey,{expiresIn:"24h"})
            });
        })
    })
}

//login登录处理函数
exports.login = (req,res)=>{
    //判断用户是否被禁用，禁用无法登录
    //定义sql
    const sql = 'select * from bookusers where userName=? and status=1';
    //查询
    db.query(sql,req.body.userName,(err,result)=>{
        //判断是否出错
        if (err) return res.rep('登录失败，出错了');
        //判断是否有查询结果，有的话，继续验证密码，否则不验证
        if(!result.length) return res.rep('您的账户已被禁用或未注册',2);
        else {
            //查询sql语句
            const sql = 'select * from bookusers where userName=? and password=?';
            //向数据库查询
            db.query(sql, [req.body.userName, req.body.password], (err, results) => {
                //失败响应信息
                if (err) return res.rep("登陆失败，请稍后重试！");
                //查询不到数据响应信息
                if (results.length === 0) return res.rep("用户名或密码错误");
                //登录成功后响应数据，并将带有用户名、昵称的token响应给客户端
                res.send({
                    code: 0,
                    msg: "登陆成功！",
                    token: "Bearer " + jwt.sign(
                        {userName: results[0].userName, isAdmin: results[0].isAdmin, status: results[0].status},
                        secretKey,
                        {expiresIn: "24h"})
                });
            })
        }
    })
}

//验证用户名
exports.verifyUser = (req,res)=>{
    //查询数据库是否存在同用户  sql语句
    const sqlOne = 'select * from bookusers where userName=?';
    //查询
    db.query(sqlOne,req.body.userName,(err,results)=> {
        //判断是否失败 失败后返回失败信息
        if (err) res.rep("验证失败");
        //判断是否存在该用户
        else if (results.length === 0) res.rep("该用户尚未注册");
        else if(!results[0].status) res.rep('该用户已被禁用',2);
        else res.rep('验证成功',0);

    })
}