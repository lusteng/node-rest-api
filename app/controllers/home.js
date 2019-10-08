const path = require('path')
const { IMAGE_UPLOAD_PATH } = require('../config')

module.exports = {
    index(ctx){
        ctx.body = `<a onclick="fetch('/users/33')">444</a>`
    },
    upload(ctx){
        let file = ctx.request.files.flie  
        
        let basename = path.basename(file.path) 
        ctx.body = {  
            url: `${ctx.origin}/${IMAGE_UPLOAD_PATH}/${basename}` 
        } 
    },
}