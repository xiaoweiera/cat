/**
 * @file 数据报表左侧菜单逻辑
 * @author svon.me@gmail.com
 */

import { ref } from 'vue'
import { MenuItem } from './props'
import { getMenuList } from '~/api/topic'
import CreateDB from '~/logic/topic/db'
import { param } from '~/logic/topic/router'

export const menuList = ref<MenuItem[]>([])

export const menuCurrent = function(): MenuItem | undefined {
  const db = CreateDB()
  db.insert(db.flatten(menuList.value, 'children'))
  // 查询 topicId 匹配数据
  const data = db.selectOne<MenuItem>({
    tagId: param.tagID,
    topicID: param.topicID,
  })
  return data
}

export const isChecked = function(item: any): boolean {
  const data = menuCurrent()
  if (data) {
    return data.mid === item.mid;
  }
  return false
}

// 判断子集数据是否匹配
// @ts-ignore
export const isChildren = function(item: any): boolean {
  if (item.children) {
    const db = CreateDB()
    db.insert(db.flatten(item.children, 'children'))
    const value = db.selectOne({
      tagId: param.tagID,
      topicID: param.topicID,
    })
    if (value) {
      return true
    }
  }
  return false
}


export const syncMenuList = async function() {
  const list = await getMenuList()
  menuList.value = list
}




