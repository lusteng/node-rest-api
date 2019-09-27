const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')

const { dbUrl } = require('../config')

// 连接数据库
let db = mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true }, () => console.log('db connection success'))
mongoose.connection.on('error', console.error)

module.exports = app => {  
    fs.readdirSync(__dirname).forEach(file => {
        if(file === 'index.js') return
        const route = require(`./${file}`)
        app.use(route.routes()).use(route.allowedMethods())
    })
}
  
 