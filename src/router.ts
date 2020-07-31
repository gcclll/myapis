import Koa from 'koa'
import Router from 'koa-router'
import * as test from './modules/test/routes/'

let isProtected: boolean = false
const unprotectedRouters: Router<any, {}>[] = [test.unprotectedRouter]
const protectedRouters: Router<any, {}>[] = [test.protectedRouter]

function use(app: Koa) {
  isProtected
    ? protectedRouters.forEach((router) =>
      app.use(router.routes()).use(router.allowedMethods())
    )
    : unprotectedRouters.forEach((router) =>
      app.use(router.routes()).use(router.allowedMethods())
    )
}

function unprotect() {
  isProtected = false
  return this
}

function protect() {
  isProtected = true
  return this
}

export { use, unprotect, protect }
