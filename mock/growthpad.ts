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
  {
    url: '/api/v1/growthpad/projects',
    method: 'get',
    response: ({ query: { status } }: { query: { status: String } }) => {
      return {
        code: 0,
        data: [],
      }
    },
  },
] as MockMethod[]
