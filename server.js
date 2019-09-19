const koa = require('koa')
const fs = require('fs')

let app = new koa()

app.use(async ctx => {
  if (ctx.path == '/get') {
    let jsonData = {}
    await new Promise(resolve => {
      fs.readFile('./test/small.txt', 'utf-8', function(err, json) {
        if (err) ctx.throw(err)
        jsonData = json
        resolve()
      })
    })
    ctx.body = jsonData
  } else if (ctx.path == '/get2') {
    let jsonData = {}
    await new Promise(resolve => {
      fs.readFile('./test/large.txt', 'utf-8', function(err, json) {
        if (err) ctx.throw(err)
        jsonData = json
        resolve()
      })
    })
    ctx.body = jsonData
    //console.log(jsonData)  为什么解除了注释就会阻塞整个进程？
  }
})

app.listen('1111')
