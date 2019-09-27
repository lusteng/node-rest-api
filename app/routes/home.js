const { index } = require('../controllers/home')
const Router = require('koa-router')


let router = new Router() 
router.get('/', index)
 
module.exports = router 