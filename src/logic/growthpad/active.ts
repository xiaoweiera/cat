/**
 * @file growthpad 任务
 * @author svon.me@gmail.com
 */

import { ref } from 'vue'
import I18n from '~/utils/i18n/index'
import Store from '~/store/growthpad/store'
import { wxShare } from '~/lib/wxShare'
import { Project } from '~/api/growtask'

export const loading = ref<boolean>(true)

export const ready = async function(store: Store): Promise<void> {
  // 判断 URL 地址是否正确
  let title: string
  let desc: string
  // 项目名称
  // @ts-ignore
  const name: Project = store.projectName
  if (name === Project.coinwind) {
    // @ts-ignore
    const project = store.title.value || 'CoinWind'
    title = I18n.template(I18n.growthpad.wechat.title, { project })
    desc = I18n.template(I18n.growthpad.wechat.desc, { project })
  } else if (name === Project.mdx) {
    // @ts-ignore
    const project = store.title.value || 'MDEX'
    title = I18n.template(I18n.growthpad.wechat.title, { project })
    desc = I18n.template(I18n.growthpad.wechat.desc, { project })
    wxShare(title, desc)
    await store.init()
  } else if (name === Project.channels) {
    // @ts-ignore
    const project = store.title.value || 'Channels'
    title = I18n.template(I18n.growthpad.wechat.title, { project })
    desc = I18n.template(I18n.growthpad.wechat.desc, { project })
  } else if (name === Project.growth) {
    // @ts-ignore
    const project = store.title.value || 'GrowthPad'
    title = I18n.template(I18n.growthpad.wechat.title, { project })
    desc = I18n.template(I18n.growthpad.wechat.desc, { project })
  }
  // @ts-ignore
  if (title && desc) {
    // 设置分享地址
    wxShare(title, desc)
    await store.init()
    loading.value = false
  } else {
    // window.location.href = `/growthpad${window.location.search}`
  }
}
