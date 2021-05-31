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

export const getProjectInfo = async function(project: string): Promise<any> {
  const url = '/api/growthpad/user_info/'
  const type = getProjectType(project)
  try {
    const result = await request.get(url, {
      params: { project: type },
    })
    return safeGet(result, 'data.data')
  } catch (e) {
    return Promise.reject(e)
  }
  // return {
  //   mission: {
  //     pancake: true,
  //     uniswap: true,
  //     sushiswap: true,
  //     retweet: true,
  //     follow_twitter: true,
  //   },
  //   info: {
  //     bsc_token: '0x3280892383292_new',
  //     pancake_token: 'ox83928930289_new',
  //     uniswap_token: '0xjiodsuodu_new',
  //     sushiswap_token: '0xjiodsuodu_new',
  //     telegram: 'sed_newsd',
  //     twitter: 'david_8_bot_new',
  //     invited_count: 0,
  //     reward: 0,
  //   },
  //   article_url: 'https://www.baidu.com',
  //   article_image: '/media/%E6%B4%BB%E8%88%B9.jpg',
  //   article_audit: 'New',
  // }
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
