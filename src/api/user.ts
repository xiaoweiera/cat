/**
 * @file 用户
 * @author svon.me@gmail.com
 */

import safeGet from '@fengqiaogang/safe-get'
import request from '~/lib/request'

export interface LogoData {
  mobile: string
  password: string
  area_code?: number
}

export interface LogoResult {
  code: number
  message?: string
  [key: string]: any
}

export const getInfo = async function() {
  try {
    const reuslt = await request.get('/api/v1/users/my')
    return safeGet(reuslt, 'data.data')
  } catch (e) {
    return Promise.reject(e)
  }
}

// 登录
export const logo = async function(query: LogoData): Promise<LogoResult> {
  const method = 'post'
  const url = '/api/v1/users/login'
  // 电话区号默认为 +86
  const data = Object.assign({ area_code: 86 }, query)
  try {
    const result = await request({ url, method, data })
    const value = safeGet<LogoResult>(result, 'data')
    return value
  } catch (e) {
    // todo
    return Promise.reject(e)
    // return {
    //   code: 0,
    //   data: {
    //     username: 'Dk0nx0WrfhwLvnq4',
    //     token:
    //       'eyJpdiI6IkN2OTlmRUJnVFdmUURpR0ZucGh1Q0E9PSIsInZhbHVlIjoicEpHUGZyaHJzajBXOVhrOHRDbitYeGVxUlQ4MTQraWpZV3RmR0J4c0xcLzhmTDBcL1RubzBJdkw1YkpwaW1DQjZJIiwibWFjIjoiNjRlZDM0YjVkMWViZTFhMmM5MzFmMmVhMmE4ZmRkOTIxNDMyODJiYjk5MjZjMmY2MDRmOTVlYmMyYTdhMzhmNCJ9',
    //     mobile: '18712932583',
    //     area_code: 86,
    //     nickname: '苑絮威',
    //     avatar_url: '',
    //     follow_posts_count: 0,
    //     follow_topics_count: 0,
    //     follow_charts_count: 179,
    //     follow_push_enabled: true,
    //     recommend_push_enabled: true,
    //     my_invitation_code: 'xcvv',
    //     registration_rank: 168,
    //     is_vip: true,
    //     invited_count: 3,
    //   },
    // }
  }
}
