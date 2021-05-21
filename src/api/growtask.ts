/**
 * @file growthpad
 * @author svon.me@gmail.com
 */

import * as R from 'ramda'
import safeGet from '@fengqiaogang/safe-get'
import request from '~/lib/request'

enum Project {
  mdx = 'MDX',
}

function getProjectType(project: string): Project {
  let type: Project
  switch (R.toUpper(project)) {
  case Project.mdx:
    type = Project.mdx
    break
  default:
    break
  }
  // @ts-ignore
  return type
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
