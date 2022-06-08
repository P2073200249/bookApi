//导入定义验证规则模块
const joi = require("joi");
/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */
//定义用户名验证规则
const userName = joi.string().alphanum().min(6).max(12).required();
//定义密码验证规则
const password = joi.string().alphanum().min(6).max(12).required();
//定义status验证规则
const status = joi.number().min(0).max(1);
//定义isAdmin验证规则
const isAdmin = joi.number().min(0).max(1);

//导出定义的规则,定义的规则可以对params、query、body的参数进行验证，根据自己需求选择，如果其他项不需要可以不要，规则配置项必须为对象
module.exports = {
    body:{
        userName,password,isAdmin,status
    }
}