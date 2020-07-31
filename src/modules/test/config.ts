/**
 * 模块配置文件
 * @fileOverview
 * @name config.ts<test>
 * @author ZhiCheng Lee <gccll.love@gmail.com>
 * @license <MIT>
 */

export interface Config {
  tokenExpiresTime: number // token 过期时间
  jwtSecret: string
}

const config: Config = {
  tokenExpiresTime: 24 * 60 * 60 * 1000,
  jwtSecret: '123456'
}

export { config }
