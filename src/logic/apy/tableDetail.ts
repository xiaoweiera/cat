import {CoinModel, HeaderModel, OptionModel, RowModel} from '~/types/apy'
import * as R from "ramda";

interface CellRenderModel {
    name: String
    key: String
    status: boolean
    value?: String
}

/**
 * 单个元内具体内容
 * @param option 点击控制选项
 * @param cellOrigin 单元格对应的数据
 * @return {CellRenderModel} 格式化后的单元格内容
 */
const cellContent = (option: OptionModel, cellOrigin: CoinModel): CellRenderModel => {
    const obj: CellRenderModel = {
        name: option.name,
        key: option.key,
        status: option.status,
    }
    // 对应单元格内没有数据
    if (!cellOrigin) {
        return obj
    }
    // @ts-ignore
    const val = cellOrigin[option.key]
    if (option.format_func) {
        obj.value = option.format_func(val)
    } else if (option.format_cb) {
        obj.value = option.format_cb(cellOrigin)
    } else {
        obj.value = val || '-'
    }
    return obj
}

/**
 * 格式化表格显示内容
 * @param headers {HeaderModel[]} 表头
 * @param rows {RowModel[]} 具体内容
 * @param options {OptionModel[]} 点击选项
 * @return {Array[Object]}
 */
export const filterByOptions = (headers: HeaderModel[], rows: RowModel[], options: OptionModel[], key: string, type: string) => {
    if (key) {
        const getProp = R.curry((propName: string, obj: any) => obj && obj[propName] ? obj[propName] : null)
        const getApy = R.compose(getProp('apy'), getProp(key), getProp('data'))
        const sortF = type === 'asc' ? R.ascend : R.descend
        //@ts-ignore
        rows = R.sortWith([sortF(getApy)])(rows)
    }
    // if (key) {
    //     if (type === 'up') {
    //         sortByFirstItem = R.sortWith([R.ascend(R.prop('orderValue'))]);
    //     } else {
    //         sortByFirstItem = R.sortWith([R.descend(R.prop('orderValue'))]);
    //     }
    //     //@ts-ignore
    //     rows = sortByFirstItem(R.map((item: any) => ({
    //         ...item,
    //         orderValue: item.data[key] ? item.data[key].apy : null
    //     }), rows))
    // }
    return rows ? rows.map((row) => {
        return {
            //@ts-ignore
            project_name: row.project_name,
            //@ts-ignore
            icon: row.icon,
            //@ts-ignore
            url: row.url,
            data: headers.map(({token_name}: { token_name: String }) => {
                // @ts-ignore
                const cellOrigin: CoinModel = row.data[token_name]
                return {
                    high_light: cellOrigin?.high_light || false,
                    data: options.map(opt => cellContent(opt, cellOrigin)),
                }
            }),
        }
    }) : []
}


