/**
 * @file 自定义指令
 * @author svon.me@gmail.com
 */

import login from './login'
import validity from './validity'
import copy from './copy'
import { install as router } from './router'

// @ts-ignore
const install = function(vue): void {
  login(vue)
  validity(vue)
  copy(vue)
  router(vue)
}

export default { install }
