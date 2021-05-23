/**
 * @file 自定义指令
 * @author svon.me@gmail.com
 */

import login from './login'

// @ts-ignore
const install = function(vue): void {
  login(vue)
}

export default { install }
