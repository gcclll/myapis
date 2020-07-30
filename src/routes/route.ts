import Router from '@koa/router'
import { general } from '../controller/test'

const unprotectedRouter = new Router()

// Hello World route
unprotectedRouter.get('/', general.helloWorld)

export { unprotectedRouter }
