/**
 * @file 数据报表
 * @author svon.me@gmail.com
 */

import getAdsList from './ads'
import { topic } from './pathname'
import request from '~/lib/request'
import CreateDB from '~/logic/topic/db'
import safeGet from '@fengqiaogang/safe-get'
import { MenuItem, MenuType } from '~/logic/topic/props'


const myself: MenuItem = {
  name: '我的图表',
  id: 'my',
  order: 0,
  icon_image: 'https://res.ikingdata.com/nav/topicMy.png',
  type: MenuType.star
}

const recommend: MenuItem = {
  name: '精选推荐',
  title: '精选推荐数据专题',
  id: '0',
  order: 0.5,
  icon_image: 'https://res.ikingdata.com/nav/topicRecom.png',
  type: MenuType.recommend
}

const convert = function(array: Array<MenuItem>): MenuItem[] {
  const db = CreateDB()
  // 根据 topic 字段打散数据
  const list = db.flatten<MenuItem>(array, 'topic')
  // 整理数据
  db.insert(list.map((item: MenuItem): MenuItem => {
    if (item.web_logo_image) {
      item.icon_image = item.web_logo_image
    }
    item.id = `${item.id}`
    return item;
  }))

  const temp = CreateDB()

  // @ts-ignore
  db.clone().forEach(function(item: MenuItem) {
    const data = Object.assign({}, item)
    const parent: MenuItem = db.parent(item)
    data.topicID = item.id
    if (parent) {
      data.tagId = parent.id
    } else {
      data.tagId = 'item'
    }
    temp.insert(data)
  })

  // 按规则返回
  return temp.childrenDeep()
}

// 获取菜单列表
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

// 精选广告位
export const getAds = function<T>(): Promise<T[]> {
  // 获取数据图表-精选推荐广告位
  return getAdsList(4)
}

