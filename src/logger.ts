import { Context } from 'koa'
import { config } from './config'
import { transports, format } from 'winston'

const logger = (winstonIns: any): any => {
  winstonIns.configure({
    level: config.debugLogging ? 'debug' : 'info',
    transports: [
      new transports.File({ filename: 'error.log', level: 'error' }),
      new transports.Console({
        format: format.combine(format.colorize(), format.simple())
      })
    ]
  })

  return async (ctx: Context, next: () => Promise<any>): Promise<void> => {
    const start = new Date().getTime()

    await next()

    const ms = new Date().getTime() - start

    let logLevel: string
    if (ctx.status >= 500) {
      logLevel = 'error'
    } else if (ctx.status >= 400) {
      logLevel = 'warn'
    } else {
      logLevel = 'info'
    }

    const msg = `${ctx.method} {ctx.originalUrl} ${ctx.status} ${ms}ms`

    winstonIns.log(logLevel, msg)
  }
}

export { logger }
