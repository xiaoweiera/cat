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

// 信息登记
export const setAdress = function(
  project: string,
  address: string,
): Promise<any> {
  const url = '/api/growthpad/validate_user_info/'
  const type = getProjectType(project)
  return request({
    url,
    method: 'POST',
    params: { project: type },
    data: { bsc_token: address },
  })
}

// 设置 telegram id
export const setTelegram = function(
  project: string,
  token: string,
  id: string,
): Promise<any> {
  const url = '/api/growthpad/validate_user_info/'
  const type = getProjectType(project)
  return request({
    url,
    method: 'POST',
    params: { project: type },
    data: { telegram: id, bsc_token: token },
  })
}

// 设置 twitter
export const setTwitter = function(
  project: string,
  token: string,
  id: string,
): Promise<any> {
  const url = '/api/growthpad/validate_user_info/'
  const type = getProjectType(project)
  return request({
    url,
    method: 'POST',
    params: { project: type },
    data: { twitter: id, bsc_token: token },
  })
}

// 设置 pancake
export const setPancake = function(
  project: string,
  token: string,
  value: string,
): Promise<any> {
  const url = '/api/growthpad/validate_user_info/'
  const type = getProjectType(project)
  return request({
    url,
    method: 'POST',
    params: { project: type },
    data: { pancake_token: value, bsc_token: token },
  })
}

// 设置 Uniswap
export const setUniswap = function(
  project: string,
  token: string,
  value: string,
): Promise<any> {
  const url = '/api/growthpad/validate_user_info/'
  const type = getProjectType(project)
  return request({
    url,
    method: 'POST',
    params: { project: type },
    data: { uniswap_token: value, bsc_token: token },
  })
}

// 设置 sushiswap
export const setSushiswap = function(
  project: string,
  token: string,
  value: string,
): Promise<any> {
  const url = '/api/growthpad/validate_user_info/'
  const type = getProjectType(project)
  return request({
    url,
    method: 'POST',
    params: { project: type },
    data: { sushiswap_token: value, bsc_token: token },
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

export const setSinaNickname = function(
  project: string,
  token: string,
  value: string,
): Promise<any> {
  const url = '/api/growthpad/validate_user_info/'
  const type = getProjectType(project)
  return request({
    url,
    method: 'POST',
    params: { project: type },
    data: { weibo: value, bsc_token: token },
  })
}

// 设置 venus
export const setVenus = function(
  project: string,
  token: string,
  value: string,
): Promise<any> {
  const url = '/api/growthpad/validate_user_info/'
  const type = getProjectType(project)
  return request({
    url,
    method: 'POST',
    params: { project: type },
    data: { venus_token: value, bsc_token: token },
  })
}

// 设置 compound
export const setCompound = function(
  project: string,
  token: string,
  value: string,
): Promise<any> {
  const url = '/api/growthpad/validate_user_info/'
  const type = getProjectType(project)
  return request({
    url,
    method: 'POST',
    params: { project: type },
    data: { compound_token: value, bsc_token: token },
  })
}

// 设置 cream
export const setCream = function(
  project: string,
  token: string,
  value: string,
): Promise<any> {
  const url = '/api/growthpad/validate_user_info/'
  const type = getProjectType(project)
  return request({
    url,
    method: 'POST',
    params: { project: type },
    data: { cream_token: value, bsc_token: token },
  })
}

// 设置 cream
export const setAutofarm = function(
  project: string,
  token: string,
  value: string,
): Promise<any> {
  const url = '/api/growthpad/validate_user_info/'
  const type = getProjectType(project)
  return request({
    url,
    method: 'POST',
    params: { project: type },
    data: { autofarm_token: value, bsc_token: token },
  })
}

// 设置 cream
export const setBeltfit = function(
  project: string,
  token: string,
  value: string,
): Promise<any> {
  const url = '/api/growthpad/validate_user_info/'
  const type = getProjectType(project)
  return request({
    url,
    method: 'POST',
    params: { project: type },
    data: { belt_token: value, bsc_token: token },
  })
}

// 设置 bunny
export const setBunny = function(
  project: string,
  token: string,
  value: string,
): Promise<any> {
  const url = '/api/growthpad/validate_user_info/'
  const type = getProjectType(project)
  return request({
    url,
    method: 'POST',
    params: { project: type },
    data: { bunny_token: value, bsc_token: token },
  })
}
