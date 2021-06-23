/**
 * @file 数据报表
 * @author svon.me@gmail.com
 */

import { topic } from './pathname'
import request from '~/lib/service'
import safeGet from '@fengqiaogang/safe-get'
import DBList from '@fengqiaogang/dblist'
import { MenuItem } from '~/logic/topic/props'


const myself: MenuItem = {
  name: '我的图表',
  id: 'my',
  order: 0,
  icon_image: 'https://res.ikingdata.com/nav/topicMy.png',
}

const recommend: MenuItem = {
  name: '精选推荐',
  id: '0',
  order: 0.5,
  icon_image: 'https://res.ikingdata.com/nav/topicRecom.png',
}



const convert = function(array: Array<MenuItem>): MenuItem[] {
  const db = new DBList([], 'mid', 'pid', '-1', 'order')
  // 根据 topic 字段打散数据
  const list = db.flatten<MenuItem>(array, 'topic')
  // 整理数据
  db.insert(list.map((item: MenuItem): MenuItem => {
    if (item.web_logo_image) {
      item.icon_image = item.web_logo_image
    }
    return item;
  }))
  // 按规则返回
  return db.childrenDeep()
}


export const getMenuList = async function(): Promise<MenuItem[]> {
  try {
    const result = await request.get(topic.getMenuList)
    if (safeGet<number>(result, 'data.code') === 0) {
      const data = safeGet<MenuItem[]>(result, 'data.data')
      const array: MenuItem[] = []

      array.push(recommend)
      array.push(...data)
      array.push(myself)

      return convert(array)
    }
  }
  catch (e) {
    // todo
  }
  return [myself, recommend]
}
