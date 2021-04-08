import type { MockMethod } from 'vite-plugin-mock'
import { ProjectInfo } from '~/types/growthpad'

const projects = [
  {
    chain: 'Heco',
    symbol: 'ETH',
    slug: 'heco-ether',
    logo: '',
    name: 'ETH',
    desc: 'wala',
    reward_total: '10000',
    reward_value: '222222',
    reward_1_person: '123123123',
    start_ts: 10000,
    end_ts: 1000000000,
    active: false,
    status: 'progress',
  },
  {
    chain: 'Heco',
    symbol: 'BTC',
    slug: 'bitcoin',
    logo: '',
    name: 'BTC',
    desc: 'wala',
    reward_total: '10000000',
    reward_value: '22222222',
    reward_1_person: '123123123',
    start_ts: 10000000,
    active: true,
    status: 'progress',
  },
  {
    chain: 'Heco',
    symbol: 'BTC',
    slug: 'bitcoin2',
    logo: '',
    name: 'BTC',
    desc: 'wala',
    reward_total: '10000000',
    reward_value: '22222222',
    reward_1_person: '123123123',
    start_ts: 10000000,
    active: true,
    status: 'progress',
  },
  {
    chain: 'Heco',
    symbol: 'BTC',
    slug: 'bitcoin3',
    logo: '',
    name: 'BTC',
    desc: 'wala',
    reward_total: '10000000',
    reward_value: '22222222',
    reward_1_person: '123123123',
    start_ts: 10000000,
    status: 'progress',
  },
  {
    chain: 'Heco',
    slug: 'mdex',
    logo: '',
    symbol: 'MDX',
    name: 'MDX',
    desc: 'walaMDX',
    reward_total: '10000000',
    reward_value: '22222222',
    reward_1_person: '123123123',
    start_ts: 10000000,
    status: 'done',
  },
] as ProjectInfo[]

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
      const data: ProjectInfo[] = projects.filter(p => p.status === status).slice(0, 6)
      // console.log('request query', status, data)
      return {
        code: 0,
        data,
      }
    },
  },
] as MockMethod[]
