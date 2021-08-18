/**
 * @file 数据报表
 * @author svon.me@gmail.com
 */

import { uniq } from 'ramda'
import getAdsList from './ads'
import { topic } from './pathname'
import request from '~/lib/request'
import CreateDB from '~/logic/topic/db'
import safeGet from '@fengqiaogang/safe-get'
import * as response from '~/lib/response'
import { MenuItem, MenuType } from '~/logic/topic/props'
import { compact } from '~/utils'


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

// 根据
export const getChartList = async function(topId: string | number, query: { [key: string]: any }) {
  // 我的图表
  // https://kingdata.com/api/v2/charts/my/multy_follows?page=1&page_size=10
  // 精选推荐
  // https://kingdata.com/api/v2/charts/web_recommend?page=1&page_size=10
  // 根据 topId 获取
  // https://kingdata.com/api/v2/topics/22/web_charts?page=1&page_size=10
  let url: string
  switch (topId) {
  // 判断是否请求 "我的图表" 图表数据
  case myself.id:
    url = topic.followList
    break
  // 判断是否请求 "精选推荐" 图表数据
  case recommend.id:
  case parseInt(recommend.id as string, 10):
    url = topic.recommend
    break
  // 其余图表数据
  default:
    url = topic.charts
    query['id'] = topId
    break
  }
  // 判断查询参数中是否包含 query 字段
  if (safeGet<string>(query, 'query')) {
    url = topic.search
  }
  try {
    const result: any = await request.get(url, { params: query })
    // @ts-ignore
    const data = response.check<any>(result)
    if (data) {
      const count = safeGet<number>(data, 'count')
      const list = safeGet<any[]>(data, 'results')
      return { count, list }
    }
  } catch (e) {
  }
  return {
    count: 0,
    list: []
  }
}

// 获取单图详情
export const getChartDetail = async function(id: string | number, query?: any) {
  const params = Object.assign({}, query || {}, { id })
  try {
    const result = await request.get(topic.detail, { params })
    return response.check<any>(result)
  } catch (e) {
    return void 0
  }
}

// 获取多图详情
export const getChartMultipleDetail = async function(id: string | number, query?: any) {
  const params = Object.assign({}, query || {}, { id })
  try {
    const result = await request.get(topic.multipleDetail, { params })
    return response.check<any>(result)
  } catch (e) {
    return void 0
  }
}

// 获取单图数据
export const getChartTrends = async function (id: string | number, query?: any) {
  const params = Object.assign({}, query || {}, { id })
  try {
    const result = await request.get(topic.trend, { params })
    return response.check<any>(result)
  } catch (e) {
    return void 0
  }
}
// 获取多图数据
export const getChartMultipleTrends = async function(ids: string[] | number[], query?: any) {
  // 去重，去空
  const list = uniq(compact<string | number>(ids))
  const params = Object.assign({}, query || {}, {
    chart_ids: list.join(','),
    cache: true
  })
  try {
    const result = await request.get(topic.multipleTrends, { params })
    return response.check<any>(result)
  } catch (e) {
    return void 0
  }
}
// 关注
export const addFollow = async function(id: string | number) {
  const data = { id }
  try {
    const result = await request.post(topic.addfollow, data)
    return response.check<any>(result)
  } catch (e) {
    return void 0
  }
}
// 取消关注
export const unFollow = async function(id: string | number) {
  const data = { id }
  try {
    const result = await request.post(topic.unfollow, data)
    return response.check<any>(result)
  } catch (e) {
    return void 0
  }
}

