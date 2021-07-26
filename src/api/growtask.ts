/**
 * @file growthpad
 * @author svon.me@gmail.com
 */

import safeGet from '@fengqiaogang/safe-get'
import request from '~/lib/service'
import { growthpad } from '~/api/pathname'
import { LoginStatus } from '~/logic/user/check'
import { getProjectType } from '~/logic/growthpad/config'
import { toNumber } from '~/utils/index'

// 项目信息
export const projectDetail = async function(id: string): Promise<any> {
  try {
    const result = await request.get(growthpad.getProject, {
      params: { project: id },
    })
    return safeGet(result, 'data.data')
  } catch (e) {
    return {}
  }
}
// 用户完成任务的信息
const projectInfo = LoginStatus(growthpad.getUserInfo, async(id: string): Promise<any> => {
    try {
      const result = await request.get(growthpad.getUserInfo, {
        params: { project: id },
      })
      return safeGet(result, 'data.data')
    } catch (e) {
      return {}
    }
  },
)

export const getProjectInfo = async function(id: string): Promise<any> {
  const type = getProjectType(id)
  if (type) {
    const [result, detail]: Array<any> = await Promise.all([
      projectInfo(type),
      projectDetail(type),
    ])
    return Object.assign({}, result, {
      price: safeGet(detail, 'price') || 0,
      lottery: toNumber(safeGet(detail, 'info.lottery_status') || 0) // 开奖状态
    })
  }
  return {}
}

type Next = <T>(...args: Array<any>) => Promise<T>

const setData = function(url: string): Next {
  return LoginStatus(url, (id: string, data: any = {}): Promise<any> => {
    const name = getProjectType(id)
    return request({
      url,
      data,
      params: { project: name },
      method: url === growthpad.getGrowthPicture ? 'GET' : 'POST',
    })
  })
}

// 提交任务信息
export const setProjectUserInfo = setData(growthpad.setUserInfo)

// 设置微博文章
export const setWeiboContent = setData(growthpad.postArticle)

// 上传朋友圈数据
export const setFriendPicture = setData(growthpad.postFriendPicture)
// 上传微信群数据
export const setChatPicture = setData(growthpad.postChatPicture)
// 获取朋友圈与微信群数据
export const getGrowthPicture = setData(growthpad.getGrowthPicture)
