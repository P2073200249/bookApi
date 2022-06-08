const db = require('../mysql/mysql');

//图书借阅
exports.borrowBook = (req,res)=>{
    const sql = 'insert into borrowHistory set ?';
    if(!req.body.borrowTime){
        let borrowTime = +new Date();
        req.body = {borrowTime,...req.body};
    }
    db.query(sql,req.body,(err,results)=>{
        if(results.affectedRows > 0){
            return res.rep('借阅成功',0);
        }
        res.rep('借阅失败');
    })
}

//查看所有借阅记录
exports.getBorrowHistory = (req,res)=>{
    const sql = 'select * from borrowHistory';
    db.query(sql,(err,results)=>{
        if(err) return  res.rep('查询失败');
        if(results.length === 0) return res.rep('无记录');
        return  res.send({
            code:0,
            msg:'查询成功',
            borrowHistory:results
        })
    })
}

//根据书名查询借阅记录
exports.getHistoryByName = (req,res)=>{
    const sql = 'select * from borrowHistory where bookName = ?';
    db.query(sql,req.body.bookName,(err,results)=>{
        if(err) return  res.rep('查询失败');
        if(results.length === 0) return res.rep('无记录');
        res.send({
            code:0,
            msg:'查询成功',
            borrowHistory:results
        })
    })
}

//根据id删除借阅记录
exports.deleteHistoryById = (req,res)=>{
    const sql = 'delete from borrowHistory where id = ?';
    db.query(sql,req.body.id,(err,results)=>{
        if(err) return  res.rep('删除失败');
        if(results.length === 0) return res.rep('无记录');
        res.rep('删除成功',0);
    })
}
