<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-24 11:51:25
 * @LastEditTime: 2019-09-24 16:39:04
 * @LastEditors: Please set LastEditors
 -->
### RESTful APT
+ 基本的URI   xxx/users
+ 标准HTTP方法, GET、 POST、DELETE、PUT、PATCH
+ 传输的数据媒体类型， 如JSON、XML

### 安全 
+ HTTPS
+ 鉴权
+ 限流



### Session
Session 的优势
+ 相比jwt，可以主动清除session
+ session保存在服务器端，相对较为安全
+ 结合cookie使用，较为灵活，兼容性较好

Session 劣势
+ cookie + session 在跨域场景表现不太好
+ 采用分布式部署，需要多机共享session机制
+ 基于cookie的机制容易被CSRF
+ 查询session信息可能会有数据库操作，对服务器产生一些查询消耗

### JWT(json web token)

构成
>eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQ4OSwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMi40Ni95Zm9wcy9hdXRoL2xvZ2luL3Bhc3N3b3JkIiwiaWF0IjoxNTY5NTY4NTEyLCJleHAiOjE1Njk2MTE3MTIsIm5iZiI6MTU2OTU2ODUxMiwianRpIjoiYzU5ZFB1dXNFTmIxVm5IbSJ9.Zd1qUiXtRaUEQWC6AqD-IlP2ZSG6dFBQGoowM7Wwvlc
+ 头部（header）
```
{
    "typ":"JWT",
    "alg":"HS256"  //采用的那种hash算法
}  base64 编码 >>>  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9
```
+ 有效载荷（payload）
传递的信息，例如用户ID、用户名等
元数据， 过期日期、发布人等
payload可以采用加密再进行编码

+ 签名（signature）
对header payload进去签名

使用流程：
1、前端请求后获取到后端传过来的jwt，保存在客户端（localstorage或者sessionstorage）中
2、前端下次请求将jwt带在header的Authorization中 Bearer xxx.xxxx.xxx 
3、后端获取到前端请求发送的jwt，进去验证，鉴权



### 接口错误处理
+ 运行时发生错误，都返回500
+ 逻辑错误： 404（找不到）、412(先决条件失败)、422(无法处理的实体，参数格式错误)

koa 错误处理  
```
//par1 : 错误状态码
//par2 : 错误文本信息，默认不填，返回框架自有的
ctx.throw(401,'错误')
```

### Koa 
基于Node.js的下一代web框架
应用场景：web 应用和 API 开发领域
相对Express更加轻量，文档可读性高，容错能力强

使用async 函数 解决回调地狱


### 洋葱模型
1. 一个请求到一旦到后端，就开始接触洋葱的最外层。
2. 遇到一个next()，就进入下一层。不过值得提醒的是，异步函数的next(),与同步函数的next(),不是在同一个空间的，我们可以假想一个“异步空间栈”，后入先出。
3. 什么时候到洋葱中心？就是遇到的第一个没有next的中间件,或者遇到一个中间件报错，就会把这个中间件当成中心，因为遇到错误了，不会再继续往里面走。这个时候，就开始向洋葱的外层开始走了。如果第一个中间件就没有next，直接返回的。那么就不存在洋葱模型。
4. 一层一层外面走的时候，就先走位所有的同步中间件，再依次走“异步空间栈”的中间件。

```
// #1
app.use(async (ctx, next)=>{
    console.log(1)
    //等待#2中间件执行完
    await next();
    console.log(1)
});
// #2
app.use(async (ctx, next) => {
    console.log(2)
    //等待#3中间件执行完
    await next();
    console.log(2)
})

app.use(async (ctx, next) => {
    console.log(3)
})

// 1
// 2
// 3
// 2
// 1

```

koa-router 传递多个中间件
```
let auth = async (ctx, next) => {
    console.log(11111); 
    await next()
}

let auth1 = async (ctx, next) => {
    console.log(222222); 
    await next()
}
//可以加入多个中间件函数
router.get('/', auth, auth1, ctx => {
    ctx.body = '333333'
})
``` 
### HTTP options 预请求
+ 检测服务器所支持的请求方法
+ 用于CORS 中的预检请求

### HTTP request
+ 请求参数 如 ?q=keyword
+ Body 请求体
+ Header Accept、cookie

### HTTP response
response status 200
body 响应体
header 响应头 allow

### 设置响应头
``` 
ctx.set('Allow', '*')
```


### 云MongoDB
将MongoDB放在云上，提供一个开放的连接地址(阿里云，腾讯云)

MongoDB官方云MongoDB Altas  地址： [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
账号 163邮箱  密码 无英文密码

### 编写数据库Schema(表结构)
+ 分析功能模块的属性
+ 编写用户模块的 Schema
+ 使用Schema生成用户 Model








