const Router = require('koa-router')
const USERS = require('../controllers/users')

let router = new Router({
    prefix: '/users'
})

router.get('/', USERS.getUser)
router.get('/:id', USERS.findUser)
router.post('/', USERS.createUser)
router.put('/:id', USERS.updateUser)
router.delete('/:id', USERS.deleteUser) 
 
module.exports = router

 