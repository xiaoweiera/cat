/**
 * @file growthpad
 * @author svon.me@gmail.com
 */

import { toUpper } from 'ramda'
import safeGet from '@fengqiaogang/safe-get'
import request from '~/lib/devRequest'

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
const projectDetail = async function(project: string): Promise<any> {
  try {
    if (_projectInfoData && _projectInfoData[project]) {
      return Promise.resolve(_projectInfoData[project])
    }
    const result = await request.get('/api/growthpad/project_info/', {
      params: { project },
    })
    const data = safeGet(result, 'data.data')
    _projectInfoData[project] = data
    return data
  } catch (e) {
    console.log(e)
    return {}
  }
}
// 用户完成任务的信息
const projectInfo = async function(project: string): Promise<any> {
  try {
    const result = await request.get('/api/growthpad/user_info/', {
      params: { project },
    })
    return safeGet(result, 'data.data')
  } catch (e) {
    console.log(e)
    return {}
  }
}

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

export const setProjectUserInfo = function(
  project: string,
  data: any,
): Promise<any> {
  const url = '/api/growthpad/validate_user_info/'
  const type = getProjectType(project)
  return request({
    url,
    method: 'POST',
    params: { project: type },
    data,
  })
}

export const setWeiboContent = function(
  project: string,
  data: FormData,
): Promise<any> {
  const url = '/api/growthpad/article_image/'
  const type = getProjectType(project)
  return request({
    url,
    method: 'POST',
    params: { project: type },
    data,
  })
}
