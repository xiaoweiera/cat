// @ts-ignore
import request from 'axios'

//table header
export function getColumns() {
    return request({
        url: `/api/apy/columns/`,
        method: 'get',
        params:{chain:'bsc'}
    })
}