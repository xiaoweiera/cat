import axios from '~/lib/service'
const request=async (param:any)=>{
    const result=await axios(param)
    return result?.data
}
enum API {
    announcements = '/api/apy/ninja/announcements',
    summary_info='/api/apy/ninja/summary_info',
    commercial='https://kingdata.com/api/v2/commercial?position=5&lang=en',
    tokenList='/api/apy/ninja/tokens',
    projectList='/api/apy/ninja/projects',
}
// 公告接口
export const announcements = ()=>request({     method: 'get'})
// 项目汇总接口
export const summary_info = ()=> request({url:API.summary_info, method: 'get'})
// 轮播
export const commercial = ()=> request({url:API.commercial, method: 'get'})
// 币种列表
export const getTokenList= ()=> request({url:API.tokenList, method: 'get'})
//项目列表
export const getProjectList= ()=> request({url:API.projectList, method: 'get'})


