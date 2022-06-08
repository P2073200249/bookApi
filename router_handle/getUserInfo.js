//图书模块处理函数
const db = require('../mysql/mysql');

//获取token中的用户信息
exports.getUserInfo = (req,res)=>{
    //返回数据给客户端
    res.send({
        code:0,
        msg:'获取成功',
        info: {
            userName:req.user.userName,
            isAdmin:req.user.isAdmin,
            status:req.user.status
        }
    })
}

//获取所有用户信息
exports.getAllUser = (req,res)=>{
    //判断token解析结果中isAdmin是否为管理员 不是则终止操作
    if(!req.user.isAdmin) return res.rep('您不是管理员，获取用户信息');
    //定义sql
    const sql = 'select * from bookusers';
    //操作数据库
    db.query(sql,(err,result)=>{
        //判断是否出错
        if(err) return res.rep('获取用户列表失败');
        //判断是否有结果
        if(!result.length) return res.rep('用户列表为空');
        //返回结果
        return res.send({
            code:0,
            msg:'获取成功！',
            users:result
        })
    })
}


//删除用户
exports.deleteUser = (req,res)=>{
    //判断token解析结果中isAdmin是否为管理员 不是则终止操作
    if(!req.user.isAdmin) return res.rep('您不是管理员，无权操作');
    //定义sql
    const sql = 'delete from bookusers where id=?';
    //操作数据库
    db.query(sql,req.body.id,(err,result)=>{
        //判断是否出错
        if(err) return res.rep('删除用户失败');
        //判断是否删除成功
        if(result.affectedRows === 0) return res.rep('删除用户失败')
        //删除成功，返回结果
        res.rep('删除用户成功',0);
    })
}


//禁用用户
exports.stopUse = (req,res)=>{
    ////判断token解析结果中isAdmin是否为管理员 不是则终止操作
    if(!req.user.isAdmin) return res.rep('您不是管理员，无权操作');
    //定义sql
    const sql = 'update bookusers set status=? where id=?';
    //操作数据库
    db.query(sql,[req.body.status,req.body.id],(err,result)=>{
        //判断是否出错
        if(err) return res.rep('禁用用户失败');
        //判断是否删除成功
        if(result.affectedRows === 0) return res.rep('禁用用户失败')
        //删除成功，返回结果
        res.rep('禁用用户成功',0);
    })
}


//更改用户权限
exports.updateRoot = (req,res)=>{
    ////判断token解析结果中isAdmin是否为管理员 不是则终止操作
    if(!req.user.isAdmin) return res.rep('您不是管理员，无权操作');
    //定义sql
    const sql = 'update bookusers set isAdmin=? where id=?';
    //操作数据库
    db.query(sql,[req.body.isAdmin,req.body.id],(err,result)=>{
        //判断是否出错
        if(err) return res.rep('修改用户权限失败');
        //判断是否删除成功
        if(result.affectedRows === 0) return res.rep('修改用户权限失败')
        //删除成功，返回结果
        res.rep('修改用户权限成功',0);
    })
}