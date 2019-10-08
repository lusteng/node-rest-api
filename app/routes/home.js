const Router = require('koa-router')
const HOME = require('../controllers/home')


let router = new Router() 
router
    .get('/', HOME.index)
    .post('/upload', HOME.upload)
 
module.exports = router 