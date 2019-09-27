module.exports = {
    index(ctx){
        ctx.body = `<a onclick="fetch('/users/33')">444</a>`
    },
}