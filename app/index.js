const path = require('path')
const fs = require('fs')
const Koa = require('koa')
const _ = require('lodash');
const error = require('koa-json-error')
const parameter = require('koa-parameter');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');

const registerRouter = require('./routes/index')
const { port, IMAGE_UPLOAD_PATH } = require('./config')
const { mkdirFiles } = require('./utils')

let imageUploadPath = path.join(__dirname, `/public/${IMAGE_UPLOAD_PATH}`)

const app = new Koa()

// 检测不存在images文件夹则创建
mkdirFiles(imageUploadPath) 

app.use(koaStatic(path.join(__dirname, 'public')));


// 错误中间件
// 针对不同异常给出状态码以及错误信息
let formatError = err => {
    let returnObj = {
        status: err.status,
        message: err.message,
        ok: false,
        reason: 'Unexpected',
        stack: err.stack
    }
    // 开发环境报错信息展示出报错代码路径
    return process.env.NODE_ENV === 'production' ? _.omit(returnObj, 'stack') : returnObj
}   
 
app.use(error(formatError));

// 校验参数
/** 
 * Usage example
 * 在控制层中间件使用
 *  ctx.verifyParams({
 *   name: 'string'
 *  });
**/
app.use(parameter(app)); 

app.use(koaBody({
    //上传文件格式
    multipart: true,
    // 上传的设置 
    formidable: {
        // 上传文件目录
        uploadDir: imageUploadPath,
        // 保存文件上传拓展名
        keepExtensions: true
    }
}))

//注册路由
registerRouter(app) 
app.listen(port, () => { 
    console.log('server start in port %s', port);
})

   