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
  logoMail: '/api/v1/users/email_login', // 邮箱登录
}

export const growthpad = {
  getProject: '/api/growthpad/project_info/', // 项目信息
  getUserInfo: '/api/growthpad/user_info/', // 用户表单信息
  postArticle: '/api/growthpad/article_image/', // 设置微博文章
  setUserInfo: '/api/growthpad/validate_user_info/', // 设置表单信息
}

// 忽略的接口地址，不传用户登录信息
export const ignore: string[] = [
  user.login,
  user.signup,
  user.verify,
  user.logoMail,
  '/apy/',
  '/api/v2/commercial',
]

// 判断登陆状态，已登陆状态下才发起请求
export const LoginStatus: string[] = [
  user.info,
  growthpad.getUserInfo,
  growthpad.postArticle,
  growthpad.setUserInfo,
]
