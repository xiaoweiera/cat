import { isFunction } from '~/utils'

const push = function(args: string[]) {
  // @ts-ignore
  const app = window['_hmt'] as any
  if (app && app.push && isFunction(app.push)) {
    return app.push(args)
  }
  return void 0
}

const hmt = {
  id: '',
  push,
  event: function(...args: string[]) {
    const query = ['_trackEvent'].concat(args)
    return push(query)
  },
}

export default hmt
