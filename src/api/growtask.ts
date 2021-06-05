/**
 * @file growthpad
 * @author svon.me@gmail.com
 */

import { toUpper } from 'ramda'
import safeGet from '@fengqiaogang/safe-get'
import request from '~/lib/service'
import { growthpad } from '~/api/pathname'
import { LoginStatus } from '~/logic/user/check'
export enum Project {
  mdx = 'MDX',
  channels = 'CHANNELS',
  coinwind = 'COINWIND',
  growth = 'GROWTH',
}

export function getProjectType(project: string): Project {
  if (project && toUpper(project) === Project.mdx) {
    return Project.mdx
  }
  if (project && toUpper(project) === Project.channels) {
    return Project.channels
  }
  if (project && toUpper(project) === Project.coinwind) {
    return Project.coinwind
  }
  if (project && toUpper(project) === Project.growth) {
    return Project.growth
  }
  // @ts-ignore
  return '' as Project
}

const _projectInfoData: any = {}
// 项目信息
export const projectDetail = async function(project: string): Promise<any> {
  try {
    if (_projectInfoData && _projectInfoData[project]) {
      return Promise.resolve(_projectInfoData[project])
    }
    const result = await request.get(growthpad.getProject, {
      params: { project },
    })
    const data = safeGet(result, 'data.data')
    _projectInfoData[project] = data
    return data
  } catch (e) {
    return {}
  }
}
// 用户完成任务的信息
const projectInfo = LoginStatus(
  growthpad.getUserInfo,
  async(project: string): Promise<any> => {
    try {
      const result = await request.get(growthpad.getUserInfo, {
        params: { project },
      })
      return safeGet(result, 'data.data')
    } catch (e) {
      return {}
    }
  },
)

export const getProjectInfo = async function(project: string): Promise<any> {
  const type = getProjectType(project)
  const [result, detail]: Array<any> = await Promise.all([
    projectInfo(type),
    projectDetail(type),
  ])
  const value = Object.assign({}, result, {
    price: safeGet(detail, 'price') || 0,
  })
  return value
}

export const setProjectUserInfo = LoginStatus(
  growthpad.setUserInfo,
  (project: string, data: any): Promise<any> => {
    const type = getProjectType(project)
    return request({
      url: growthpad.setUserInfo,
      method: 'POST',
      params: { project: type },
      data,
    })
  },
)

export const setWeiboContent = LoginStatus(
  growthpad.postArticle,
  async(project: string, data: FormData): Promise<any> => {
    const type = getProjectType(project)
    try {
      const result = await request({
        url: growthpad.postArticle,
        method: 'POST',
        params: { project: type },
        data,
      })
      const code = safeGet<number>(result, 'data.code')
      if (parseInt(code as any) !== 0) {
        return Promise.reject(result)
      }
      return result.data
    } catch (e) {
      return Promise.reject(e)
    }
  },
)
