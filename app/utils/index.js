const fs = require('fs')

module.exports = {
    // 检测文件不存在 创建文件
    mkdirFiles(fliePath){ 
        fs.exists(fliePath, async (exists) => {
            // 不存在path，则创建
            if(!exists){
                console.log(`不存在${fliePath}，创建`); 
                fs.mkdir(fliePath, err => {
                    if(err) console.error(err)
                })
            }
        })
    },
    // 重定向目录跳转
    redirect(ctx, next){ 
        ctx.redirect('/')
        next()
    }
}