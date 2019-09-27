const Koa = require('koa')
const _ = require('lodash');
const error = require('koa-json-error')
const parameter = require('koa-parameter');
const bodyParser = require('koa-bodyparser');

const registerRouter = require('./routes/index')
const { port } = require('./config')


const app = new Koa()


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

app.use(bodyParser())

//注册路由
registerRouter(app) 
app.listen(port, () => { 
    console.log('server start in port %s', port);
})

  