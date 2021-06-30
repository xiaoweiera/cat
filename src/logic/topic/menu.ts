/**
 * @file 数据报表左侧菜单逻辑
 * @author svon.me@gmail.com
 */

import { ref } from 'vue'
import { MenuItem } from './props'
import { getMenuList } from '~/api/topic'

export const menuList = ref<MenuItem[]>([])


export const syncMenuList = async function() {
  const list = await getMenuList()
  menuList.value = list
}




