import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/v1/growthpad/summary',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          total: 11123,
          totalProject: 123,
          person: 111,
        },
      }
    },
  },
] as MockMethod[]
