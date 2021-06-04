/**
 * @file 接口地址
 * @author svon.me@gmail.com
 */

export const user = {
  info: '/api/v1/users/my', // 获取个人信息
  logout: '/api/v1/users/logout', // 退出
  login: '/api/v1/users/login', // 登录
  signup: '/api/v1/users/signup', // 注册
  verify: '/api/v1/users/captcha', // 验证码
}

// 忽略的接口地址，不传用户登录信息
export const ignore = [user.login, user.signup, user.verify]
