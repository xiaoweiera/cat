/**
 * @file Dapp
 */

import request from '~/lib/service'
import { asyncCheck } from '~/lib/response'

export * as group from './group'
export * as discover from './discover'

interface StarResult {
  clout: number
}

export const star = function(id: number) {
  console.log('id = ', id)
  const result = request.post('/api/dapps/{version}/clout', { id })
  return asyncCheck<StarResult>(result)
}
