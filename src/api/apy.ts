// @ts-ignore
import request from '~/lib/request'

//table header
export function getColumns(query:any) {
    return request({
        url: `/api/apy/columns`,
        method: 'get',
        params:query
    })
}
export function getDataset(query:any) {
    return request({
        url: `/api/apy/dataset`,
        method: 'get',
        params:query
    })
}