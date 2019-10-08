module.exports = {
    // 签名正式项目不写在代码中，安全性极差，一般通过环境变量引入
    SECRET: 'i-am-secret',
    // 数据库账号密码不可暴露在代码中，此仅练习项目
    dbUrl: 'mongodb+srv://admin:admin@cluster0-ibzvu.mongodb.net/test?retryWrites=true&w=majority',
    port: '1418',
    //存放image上传目录
    IMAGE_UPLOAD_PATH: 'uploads' 
}