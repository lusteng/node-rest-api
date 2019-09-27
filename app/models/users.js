const mongoose = require('mongoose')

const { Schema, model } = mongoose

//声明user表结构
const userSchema = new Schema({
    name: {
        type: String, required: true
    }
})

//在数据库中生成User的集合(表)
module.exports = model('User', userSchema)

