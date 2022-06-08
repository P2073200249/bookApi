//图书模块处理函数
const db = require('../mysql/mysql');

//获取图书分类
exports.getBookType = (req,res)=>{
    //sql
    const sql = 'select * from booktype';
    //操作数据库
    db.query(sql,(err,results)=>{
        //异常处理
        if (err) return res.rep('服务器繁忙');
        //返回数据
        res.send({
            code:0,
            msg:'获取成功',
            bookType:results.map(val=> Object.values(val)[0])//数据处理
        })
    })
}

//获取所有图书
exports.getBooks = (req,res)=>{
    //定义sql
    const sql = 'select * from books';
    //操作数据库
    db.query(sql,(err,results)=>{
        //失败处理
        if(err) return res.rep('查询失败');
        if(results.length === 0) return res.rep('未找到相关图书');
        //成功返回数据
        res.send({
            code:0,
            msg:'查询成功',
            books:results
        })
    })
}

//获取所有图书名称
exports.getBookName = (req,res)=>{
    //定义sql
    const sql = 'select bookName from books';
    //操作数据库
    db.query(sql,(err,results)=>{
        //成功返回数据
        if (results.length >= 0){
            return res.send({
                code:0,
                msg:'获取成功',
                bookName:results.map(val=> Object.values(val)[0])//数据处理
            })
        }
        //失败处理
        res.rep('获取失败');
    })
}


//根据图书名获取图书
exports.getBookByName = (req,res)=>{
    //定义sql
    const sql = 'select * from books where bookName=? or bookType=?';
    //操作数据库
    db.query(sql,[req.body.keyword,req.body.keyword],(err,results)=>{
        //失败处理
        if(err) return res.rep('查询失败');
        if(results.length === 0) return res.rep('未找到相关图书');
        //成功返回值
        res.send({
            code:0,
            msg:'查询成功',
            books:results
        })
    })
}


//添加图书
exports.addBook = (req,res)=>{
    //sql
    const sql = 'insert into books set ?';
    db.query(sql,req.body,(err,results)=>{
        //错误
        if (err) return res.rep('添加失败');
        if (results.affectedRows === 0) return res.rep('添加失败');
        //返回数据
        res.send({
            code:0,
            msg:'添加成功',
            date:req.body
        })
    })
}

//删除图书
exports.deleteBook = (req,res)=>{
    //定义sql
    const sql = 'delete from books where id = ?';
    //操作数据库
    db.query(sql,req.body.id,(err,results)=>{
        //失败
        if (err) return res.rep('删除失败');
        if(results.affectedRows === 0) return  res.rep("删除失败");
        //成功
        res.rep("删除成功",0);
    })
}

//修改数量
exports.updateBookNum = (req,res)=>{
    const sql = 'update books set bookNum=? where bookName=?';
    db.query(sql,[req.body.borrowNum,req.body.bookName],(err,results)=>{
        if (err) return res.rep('修改失败');
        if (results.affectedRows === 0) return res.rep('修改失败');
        res.rep('修改成功',0);
    })
}

//file转base64格式  中间件
function fileToBase64(file){
    //创建flieReader对象
    let fileReader = new FileReader();
    //格式转换
    fileReader.readAsDataURL(flie);
    //转换结果
    let result;
    //监听文件读取完成事件
    fileReader.onload = ()=>{
        result = fileReader.result;//读取成功的结果
        console.log(result)
    }

    // console.log(result)
    //放行
    return result;
}

