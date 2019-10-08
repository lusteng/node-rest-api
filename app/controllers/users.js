const User = require('../models/users')
const jwt = require('jsonwebtoken') 
const {SECRET} = require('../config') 

module.exports = {
    async getUser (ctx){
        let {filter = ''} = ctx.request.query
        filter = filter.split(',').filter(f => f).map(f => `+${f}`)
        // 查询多条被隐藏字段 select('+xxx +yyy')
        ctx.body = await User.find().select(filter.join(' '))
    },
    async findUser(ctx){ 
        let id = ctx.params.id 
        let res = await User.findOne({id})
        if(!res) ctx.throw('404', '该用户不存在')
        ctx.body = res
    },
    async updateUser(ctx){ 
        ctx.verifyParams({
            name: {type: "string", required: false},
            password: {type: "string", required: false}
        })
        let { name } = ctx.request.body
        let user = await User.findByIdAndUpdate(ctx.params.id, {name})
        if(!user){ 
            // 查找不到对应的用户
            ctx.body = {
                ok: false,
                msg: "该用户不存在"
            }
        }else{
            ctx.body = {
                ok: true,
                msg: "修改用户名成功"
            }
        } 
    },
    async deleteUser(ctx){
        let user = User.findByIdAndRemove(ctx.params.id, (error, data) => {
            if(error){
                console.log(error);
                throw error
            } else {
                console.log("data all gone and deleted yo"); 
            }
        })
        if(!user){ 
            // 查找不到对应的用户
            ctx.body = {
                ok: false,
                msg: "该用户已删除"
            }
        }else{
            ctx.body = {
                ok: true,
                msg: "删除用户成功"
            }
        } 
        
    },
    async register(ctx){ 
        ctx.verifyParams({
            name: {type: "string", required: true},
            password: {type: "string", required: true},
            avatar_url: {type: 'string', required: false}
        })
        let { name, password } = ctx.request.body 
        let hasCreate = await User.findOne({name})
 
        if(hasCreate){ 
            // 已存在该用户
            ctx.throw('409', '用户已存在')
        }else{
            await User.create({name, password})
            ctx.body = {
                ok: true,
                msg: "注册成功"
            } 
        } 
          
        
    },
    async login(ctx){
        ctx.verifyParams({
            name: {type: "string", required: true},
            password: {type: "string", required: true}
        })
        let {name, password} = ctx.request.body 
        let user = await User.findOne({name, password}) 

        if(!user) ctx.throw('401', '用户名或密码不正确')
        let {_id} = user;
        // 使用jsonwebtoken生成jwt token
        const token = jwt.sign({
            name, _id
        }, SECRET, {expiresIn: '1d'})

        ctx.body = {
            ok: true,
            token
        }  
    }, 
    // 检测操作的是否是所有者
    async checkOwner(ctx, next){
        if(ctx.params.id != ctx.state.user._id) ctx.throw('403', '没有权限')
        await next()
    },
    async listFollowing(ctx){
        const user = await User.findById(ctx.params.id).select('+following').populate('following') 
        if(!user) ctx.throw(404)
        ctx.body = user.following
    },
    async follow(ctx){
        const _id = ctx.params.id
        const me = await User.findById(ctx.state.user._id).select('+following') 
        if(!me.following.map(id => id.toString()).includes(_id)){
            me.following.push(_id)
            me.save()
        }
        ctx.status = 204 
    },
    async unfollow(ctx){
        const _id = ctx.params.id
        const me = await User.findById(ctx.state.user._id).select('+following') 
        let index = me.following.map(id => id.toString()).indexOf(_id)
        if(index > -1){
            me.following.splice(index, 1)
            // save mongo
            me.save()
        }
        ctx.status = 204 
    }
    
} 
 