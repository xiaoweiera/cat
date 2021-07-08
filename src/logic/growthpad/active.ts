/**
 * @file growthpad 任务
 * @author svon.me@gmail.com
 */

import { ref } from 'vue'
import { useHead } from '@vueuse/head'
import { wxShare } from '~/lib/wxShare'
import Store from '~/store/growthpad/store'

import {
  getProjectType,
  ProjectPageTitle,
  ProjectShareTitle,
  ProjectShareDesc
} from '~/logic/growthpad/config'

export const loading = ref<boolean>(true)

export const ready = async function(store: Store): Promise<void> {
  const name = store.getNickName()
  // 项目名称
  const id = getProjectType(name)
  if (id) {
    if (ProjectPageTitle[id]) {
      useHead({ title: ProjectPageTitle[id] })
    }
    const title: string = ProjectShareTitle[id]
    const desc: string = ProjectShareDesc[id]
    // 设置分享地址
    wxShare(title, desc)
    await store.init()
    loading.value = false
  } else {
    window.location.href = `/growthpad${window.location.search}`
  }
}
