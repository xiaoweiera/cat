import type {MockMethod} from 'vite-plugin-mock'
const columns = [
    {"token_name": "FIL", "token_price": 121, "change": 12}, {
        "token_name": "USDC",
        "token_price": 1.43164,
        "change": 100
    }, {"token_name": "UNI", "token_price": 90, "change": 1}, {
        "token_name": "ETH",
        "token_price": 2.391,
        "change": -12
    }, {"token_name": "ATOM", "token_price": 92, "change": 11}, {
        "token_name": "DAI",
        "token_price": 93.12,
        "change": 23
    }
]
export default [
    {
        url: '/api/v1/apy/getColumns',
        method: 'get',
        response: ({query: {chain}}: { query: { chain: String } }) => {
            return {
                code: 0,
                result:columns,
            }
        },
    },

] as MockMethod[]
