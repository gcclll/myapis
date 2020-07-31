export const enum ErrorCodes {
  INVALID_USERNAME_PASSWD
}

export const errorMessages: { [code: number]: string } = {
  [ErrorCodes.INVALID_USERNAME_PASSWD]: '无效的用户名或密码'
}
