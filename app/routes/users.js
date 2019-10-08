const Router = require('koa-router')
// const jwt = require('jsonwebtoken');
const jwt = require('koa-jwt');
const USERS = require('../controllers/users')
const {SECRET} = require('../config')


// 使用koa-jwt认证 内部已经将user信息放到ctx.state
const AUTH_TOKEN = jwt({secret: SECRET})

// // 认证token中间件
// const AUTH_TOKEN = async (ctx, next) => {
//     const {authorization = ''} = ctx.request.header    
//     const token = authorization.replace('Bearer ', '')
//     try {
//         // 认证token
//         let user = jsonwebtoken.verify(token, SECRET)
//         // 将获取的用户信息存储在ctx的state中
//         ctx.state.user = user
//         await next()
//     } catch (error) {
//         //认证不成功
//         ctx.throw('401', error.message)
//     }
// }

const router = new Router({
    prefix: '/users'
})

router
    .get('/', USERS.getUser)
    .get('/:id', USERS.findUser)
    .post('/register', USERS.register)
    .put('/:id', AUTH_TOKEN, USERS.checkOwner, USERS.updateUser)
    .delete('/:id', USERS.deleteUser) 
    .post('/login', USERS.login)  
    .get('/:id/following', USERS.listFollowing)  // 获取用户的关注列表 
    .put('/follow/:id', AUTH_TOKEN, USERS.follow)  // 关注某用户
    .delete('/follow/:id', AUTH_TOKEN, USERS.unfollow)   // 取消关注某用户
 
module.exports = router

 