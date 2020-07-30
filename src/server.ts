import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import helmet from 'koa-helmet'
import { createConnection, Connection } from 'typeorm'
import winston from 'winston'
import { logger } from './logger'
import { unprotectedRouter } from './routes/route'

// db config in `ormconfig.json`
createConnection()
  .then(async (n: Connection) => {
    const app = new Koa()

    // 提供重要的安全头，确保 app 功能更安全
    app.use(helmet())

    // 跨域
    app.use(cors())

    app.use(logger(winston))

    app.use(bodyParser())

    app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods())

    app.listen(3300)

    console.log(`Server running on port ${3300}`)
  })
  .catch((e) => console.log('Error: ', e))
