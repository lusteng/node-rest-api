const mongoose = require('mongoose')

const { Schema, model } = mongoose

//声明user表结构
const userSchema = new Schema({
    name: {type: String, required: true},
    //select: false查库时隐藏该字段， 要在查库时显示 xx.select('+password')
    password: {type: String, required: true, select:true},
    __v: {type: Number, select:false},
    avatar_url: {type: String},
    gender: {type: String, enum: ['male', 'female'], default: 'male', required: true},
    headline: {type: String, select: false},
    location: {
        // 注册数组类型
        type: [{
            type: String
        }],
        select: false
    },
    bussiness: {type: String},
    employments: {
        type: [{
            company: {type: String},
            job: {type: String}
        }],
        select: false
    },
    educations: {
        type: [{
            school: {type: String},
            major: {type: String},
            diploma: {type: Number, enum: [1,2,3,4,5]},
            entrance_year: {type: Number}, 
        }],
        select: false
    },
    following: {
        type: [{
            // 使用Schema的objectId
            type: Schema.Types.ObjectId,
            ref: 'User'  // 关联表的ObjectId
        }],
        select: false
    } 
})

//在数据库中生成User的集合(表)
module.exports = model('User', userSchema)

