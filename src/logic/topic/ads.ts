/**
 * @file 广告位
 * @author svon.me@gmail.com
 */

import { ref } from 'vue'
import { getAds } from '~/api/topic'
import { Media } from '~/logic/apy/ads'

// 广告位列表
export const adsList = ref<Media[]>([])

// 获取广告位列表数据
export const requestAdsList = async function() {
  // 调用 api 获取媒体数据
  const array = await getAds<Media>()
  adsList.value = array
}
