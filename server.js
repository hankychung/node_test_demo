const koa = require('koa')

const Router = require('koa-router')

const path = require('path')

const fs = require('fs')

let app = new koa()

let router = new Router()

function getFile() {
  return new Promise(resolve => {
    fs.readFile(
      path.resolve(__dirname, './test/small.txt'),
      'utf-8',
      (err, data) => {
        resolve(data)
      }
    )
  })
}

// router.get('/get', async ctx => {
//   let jsonData = {}
//   await new Promise((resolve, reject) => {
//     // 读image文件夹
//     fs.readFile('./test/small.txt', 'utf-8', function(err, json) {
//       if (err) ctx.throw(err)
//       jsonData = json // 将所有的文件夹名字放到外面来。
//       resolve() // resolve过后，await语句才结束
//     })
//   })
//   ctx.body = jsonData
//   console.log('外层读取到ctx===', ctx.body)
// })

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
    console.log(ctx.path)
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

router.get('/get2', ctx => {
  fs.readFile(
    path.resolve(__dirname, './test/large.txt'),
    'utf-8',
    (err, data) => {
      ctx.body = data
    }
  )
})

router.get('/', ctx => {
  ctx.body = 'home'
})

// app.use((ctx, next) => {
//   console.log(ctx.path)
//   next()
// })

app.use(router.routes())

app.listen('1111')
