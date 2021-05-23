/**
 * @file 自定义指令
 * @author svon.me@gmail.com
 */

import login from './login'
import validity from './validity'

// @ts-ignore
const install = function(vue): void {
  login(vue)
  validity(vue)
}

export default { install }
