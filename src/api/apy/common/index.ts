// 币种列表
import { pick, toUpper } from 'ramda'
import axios from '~/lib/service'
export { list as getTokenList } from '~/api/apy/token/index'
import { projectParam,poolsParam,tokenSearch,poolSearch,loanPoolParam,calcToken,barChart } from '~/logic/apy2/interface'
import { map, forEach, toArray, toBoolean, isEmpty } from '~/utils'
import safeSet from '@fengqiaogang/safe-set'
import { asyncCheck } from '~/lib/response'
import DBList from '@fengqiaogang/dblist'
import safeGet from '@fengqiaogang/safe-get'

const request=async (param:any)=>{
    const result=await axios(param)
    return result?.data
}
enum API {
    announcements = '/api/apy/ninja/announcements',
    summary_info='/api/apy/ninja/summary_info',
    commercial='https://kingdata.com/api/v2/commercial?position=5&lang=en',
    projectList='/api/apy/ninja/projects',
    projectDetail='/api/apy/ninja/project_detail',
    pool='/api/apy/ninja/pools',
    token_search='/api/apy/ninja/token_search',
    pool_search='/api/apy/ninja/pool_search',
    calculator='/api/apy/ninja/lending_pools/calculator',
    calcProjects='/api/apy/ninja/lend_projects',
    calcTokens='/api/apy/ninja/lend_project_tokens',
    compare='/api/apy/ninja/poll/mining_top5_compare',

}
interface FollowQuery {
    value: string | number | string[] | number[],
    type: string,
    pool: boolean,
    multiple?: boolean
}

interface SymbolItem {
    name: string,
    followed: boolean
    checked?: boolean
    word?: string
}

let initSymbolList = false
const symbolDB = new DBList([], 'name')

// 代币分类列表
export const symbolList = async function(query: object): Promise<SymbolItem[]> {
    if (!initSymbolList) {
        initSymbolList = true
        const type = safeGet<string>(query, 'type')
        const result = axios.get('/api/apy/ninja/symbols', {
            params: { type, pool_type: type }
        })
        const data = await asyncCheck<SymbolItem[]>(result)
        const list = map(function(item: SymbolItem){
            item.checked = toBoolean(item.followed)
            item.word = toUpper(item.name)
            return item
        }, data)
        symbolDB.insert(list)
    }
    const where: any = {}
    forEach(function(value: any, key: string) {
        if (!isEmpty(value, true)) {
            where[key] = value
        }
    }, pick(['symbol_type', 'followed'], query))
    // 根据条件，精准筛选
    let value = symbolDB.select<SymbolItem>(where)
    if (safeGet<string>(query, 'query')) {
        const db = new DBList(value, 'name')
        const like = {
            word: toUpper(safeGet<string>(query, 'query'))
        }
        // 根据搜索词模糊搜索
        value = db.like<SymbolItem>(like)
    }
    return value
}

export const setFollow = function(query: FollowQuery) {
    let url: string
    const values = toArray(query.value)
    const data: any = {
        type: query.type,
    }
    const multiple = toBoolean(query.multiple)
    if (query.pool) {
        // 池子收藏或取消
        if (multiple) { // 批量操作
            url = '/api/apy/ninja/pool_follow_bulk'
            safeSet(data, 'pools', values)
        } else {
            url = '/api/apy/ninja/pool_follow'
            safeSet(data, 'pool_id', values[0])
        }
    } else {
        // 单币收藏或者取消
        if (multiple) { // 批量操作
            url = '/api/apy/ninja/symbol_follow_bulk'
            safeSet(data, 'symbols', values)
        } else {
            url = '/api/apy/ninja/symbol_follow'
            safeSet(data, 'symbol', values[0])
        }
    }
    const result = axios.post(url, data, {
        params: {
            // 需要判断登录身份
            Authorization: true
        }
    })
    return asyncCheck(result)
}
// 公告接口
export const announcements = ()=>request({  url:API.announcements,   method: 'get'})
// 项目汇总接口
export const summary_info = ()=> request({url:API.summary_info, method: 'get'})
// 轮播
export const commercial = ()=> request({url:API.commercial, method: 'get'})

//项目列表
export const getProjectList= (param:projectParam)=> request({url:API.projectList,params:param, method: 'get'})
//项目列表
export const getProjectDetail= (projectId:number)=> request({url:API.projectDetail,params:{project_id:projectId}, method: 'get'})
//矿池列表
export const getPoolsList= (param:poolsParam)=> request({url:API.pool,params:param, method: 'get'})
//币种搜索
export const getTokenSearch= (param:tokenSearch)=> request({url:API.token_search,params:param, method: 'get'})
//池子搜索
export const getPoolSearch= (param:poolSearch)=> request({url:API.pool_search,params:param, method: 'get'})
//利润计算数据
export const getCalculator=(param:loanPoolParam)=>request({url:API.calculator,params:param, method: 'get'})
//利润计算数据借贷项目列表
export const getCalcProjects=()=>request({url:API.calcProjects, method: 'get'})
//利润计算数据币种列表
export const getCalcTokens=(param:calcToken)=>request({url:API.calcTokens,params:param, method: 'get'})
//弹框柱状图
export const getBarChart=(param:barChart)=>request({url:API.compare,params:param, method: 'get'})


