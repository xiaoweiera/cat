
import axios from '~/lib/service'
const request=async (param:any)=>{
    const result=await axios(param)
    return result?.data
}
import {projectMiningChart} from '~/logic/apy2/interface'
enum API {
    mining_best10 = '/api/apy/ninja/project/mining_best10',
}
//top10图表
export const mining_best10 =(param:projectMiningChart)=> {
    console.log('最后参数',param)
    request({url:API.mining_best10, params:param, method: 'get'}
    )
}


