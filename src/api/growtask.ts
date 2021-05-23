/**
 * @file growthpad
 * @author svon.me@gmail.com
 */

import { toUpper } from 'ramda'
import safeGet from '@fengqiaogang/safe-get'
import request from '~/lib/request'

export enum Project {
  mdx = 'MDX',
}

export function getProjectType(project: string): Project {
  if (project && toUpper(project) === Project.mdx) {
    return Project.mdx
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
    data: { telegram: id, bsc_token: token },
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
