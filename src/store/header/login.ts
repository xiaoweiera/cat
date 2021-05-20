/**
 * @file 导航 - 登录
 * @author svon.me@gmail.com
 */

import { ref } from 'vue'

export const visible = ref(false) // 弹窗状态

export const showVisible = function(): void {
  visible.value = true
}
