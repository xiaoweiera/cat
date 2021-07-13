/**
 * @file
 */

import * as api from '~/api/topic'
import { toBoolean } from '~/utils/index'
// 关注
export const addFollow = async function(id: number | string) {
  return toBoolean(api.addFollow(id))
}
