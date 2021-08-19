/**
 * @file 表格数据
 */

import { omit } from "ramda"
import { forEach, uuid } from '~/utils'
import safeSet from '@fengqiaogang/safe-set'
import DBList from '@fengqiaogang/dblist'

const transform = function(db: DBList, type: string, list: any[]) {
    forEach(function(row: any) {
        const data = omit(['data'], row)
        const id = uuid()
        safeSet(data, 'uuid', id)
        safeSet(data, 'type', type)
        safeSet(data, 'expand', false)
        db.insert(data)
        forEach(function(item: any) {
            safeSet(item, 'type', 'apy')
            safeSet(item, 'pid', id)
            safeSet(item, 'uuid', uuid())
            db.insert(item)
        }, row.data)
    }, list)
    return db
}

export const getTableList = async function(db: DBList) {
    return transform(db, 'symbol',[
        {
            "symbol_alias": 'ETH',
            "symbol_price": "string",
            "symbol_change": "string",
            "symbol_contract_addr": "string",
            "symbol_logo": "string",
            "data": [
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
            ]
        },
        {
            "symbol_alias": Math.random(),
            "symbol_price": "string",
            "symbol_change": "string",
            "symbol_contract_addr": "string",
            "symbol_logo": "string",
            "data": [
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
            ]
        },
        {
            "symbol_alias": Math.random(),
            "symbol_price": "string",
            "symbol_change": "string",
            "symbol_contract_addr": "string",
            "symbol_logo": "string",
            "data": [
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
            ]
        }
    ])
}


export const getTableExpandList = async function (db: DBList, pid: string) {
    return transform(db, 'children',[
        {
            pid,
            "symbol_alias": 'ETH',
            "symbol_price": "string",
            "symbol_change": "string",
            "symbol_contract_addr": "string",
            "symbol_logo": "string",
            "data": [
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
            ]
        },
        {
            pid,
            "symbol_alias": 'ETH',
            "symbol_price": "string",
            "symbol_change": "string",
            "symbol_contract_addr": "string",
            "symbol_logo": "string",
            "data": [
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
            ]
        },
        {
            pid,
            "symbol_alias": 'ETH',
            "symbol_price": "string",
            "symbol_change": "string",
            "symbol_contract_addr": "string",
            "symbol_logo": "string",
            "data": [
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
            ]
        }
    ])
}
