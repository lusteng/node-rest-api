const User = require('../models/users')

module.exports = {
    async getUser (ctx){
        ctx.body = await User.find()
    },
    async findUser(ctx){ 
        let id = ctx.params.id 
        let res = await User.findOne({id})
        if(!res) ctx.throw('404', '该用户不存在')
        ctx.body = res
    },
    async createUser(ctx){
        ctx.verifyParams({
            name: {type: "string", required: true}
        })
        let { name } = ctx.request.body 
        let hasCreate = await User.findOne({name})
 
        if(hasCreate){ 
            // 已存在该用户
            ctx.body = {
                ok: false,
                msg: "用户已存在"
            }
        }else{
            await User.create({name})
            ctx.body = {
                ok: true,
                msg: "创建成功"
            }
        } 
        
    },
    async updateUser(ctx){ 
        ctx.verifyParams({
            name: {type: "string", required: true}
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
        console.log(ctx.params.id);
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
        
    }

} 