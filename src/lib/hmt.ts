import { isFunction, toArray } from '~/utils'
import safeGet from '@fengqiaogang/safe-get'

interface CMD {
  [key: string]: any
}

interface HMT {
  C: string[]
  J: object
  cmd: CMD
  plugins: CMD
  id: string
  push: (query: string[]) => void,
  event: (query: string[]) => void
}

const push = function(args: string[]) {
  // @ts-ignore
  const app = window['_hmt'] as any
  if (app && app.push && isFunction(app.push)) {
    return app.push(args)
  }
  return void 0
}
const handler = {
  get: function(obj: HMT, prop: string) {
    // @ts-ignore
    const app = window['_hmt'] as any
    if (prop === 'id') {
      if (app && app[prop]) {
        return app[prop]
      }
      return void 0
    }
    if (obj.hasOwnProperty(prop)) {
      return safeGet<any>(obj, prop)
    }
    return safeGet<any>(app, prop)
  }
}

// @ts-ignore
const hmt: HMT = new Proxy({}, handler)
// @ts-ignore
hmt.push = push
// @ts-ignore
hmt.event = function(...args: string[]) {
  const query = toArray('_trackEvent', args)
  return push(query)
}

export default hmt
