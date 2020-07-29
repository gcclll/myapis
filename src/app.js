import Koa from 'koa'
import Router from 'koa-router'
import cors from 'koa2-cors'
import bodyParser from 'koa-bodyparser'
import * as db from './db'
import * as routes from './routes'
import setting from './setting'

const app = new Koa()
app.use(bodyParser()) // 解析request的body

const router = new Router({
  prefix: '/api'
})

// allow CORS
app.use(setting.allowCors())

// connect db
db.connect()
// init route configurations
routes.run(router)

app.use(router.routes())
const ip = require('./utils/os').getIp()
app.listen(9000, ip)
console.log(`app started at port ${ip}:9000...`)
