/**
 * @file Apy 媒体列表
 * @author svon.me@gmail.com
 * @description 媒体列表
 */
import { reactive } from 'vue'
import { getMediaList } from '~/api/apy'

export interface Media {
  url: string // 跳转地址
  image: string // 图片链接
  [key: string]: any // 可扩展属性
}

// 媒体列表
export const list = reactive<Media[]>([])

// 获取媒体列表数据
export const requestMediaList = async function() {
  // 调用 api 获取媒体数据
  const array = await getMediaList<Media>()
  list.push(...array)
}
