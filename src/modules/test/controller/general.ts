import { Context } from 'koa'
import { description, request, summary, tagsAll } from 'koa-swagger-decorator'
import { config } from '../../../config'
import { ErrorCodes, errorMessages } from '../../../errors/code'
import jwt from 'jwt-simple'

@tagsAll(['General'])
export default class GeneralController {
  @request('get', '/')
  @summary('Welcome page')
  @description(
    'A simple welcome message to verify the service is up and running.'
  )
  public static async helloWorld(ctx: Context): Promise<void> {
    ctx.body = 'Hello World!'
  }

  @request('post', '/login')
  @summary('logining')
  @description('User Login Operation.')
  public static async login(ctx: Context): Promise<void> {
    const { tokenExpiresTime, jwtSecret } = config
    const user = ctx.request.body

    if (user?.username) {
      let payload: any = {
        expire: Date.now() + tokenExpiresTime,
        name: user.username
      }

      let token = jwt.encode(payload, jwtSecret)

      ctx.body = {
        user: user.name,
        code: 0,
        token
      }
    } else {
      const code = ErrorCodes.INVALID_USERNAME_PASSWD
      ctx.body = {
        code,
        message: errorMessages[code]
      }
    }
  }
}
