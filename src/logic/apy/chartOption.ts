import {getDataset} from "~/api/apy";
import * as R from 'ramda'
import {reactive} from "vue";

// import {requestTables, defaultChains, requestChart} from '~/logic/apy'

interface dataSetModel {
    chain: string
    category: string
}

interface platInfo {
    chain: string
    data: object
    icon: string
    project_name: string
    url: string
}

//根据表格类型得到名字
export const getTypeNameByKey=(name:string)=>{
    if(name==='machine_gun_pool_single')
    {
        return '机枪池'
    }else if(name==='lend_single'){
        return '存款'
    }
    return '借款'
}


//得到链的名字，用作接口请求，接口是小写的
export const getChainName=(name:string)=>{
    return
}
//@ts-ignore  根据chain 获取 币种 和 平台
export const getInfo =  (params: dataSetModel) => {
    const chains=reactive({name:'所在链',select:params.chain.toLocaleUpperCase(),data:['ETH','HECO','BSC','HSC']})
    const types=reactive({name:'类型',select:params.category,data:[]})
    const plats=reactive({name:'平台',select:'',data:[]})
    const coins=reactive({name:'币种',select:'',data:[]})
    const marks=reactive({name:'指标',select:'',data:[]})

    const getData= async ()=>{
        const {data: {data: data}} = await getDataset(params)
        //@ts-ignore 得到所有平台
        plats.data= R.map((item: platInfo) => item.project_name, data)
        //@ts-ignore 得到所有的币
        coins.data=Object.keys(data[0].data)
        //第一次才进行重新赋值
        if(types.data.length===0) {
            if (params.chain === 'hsc') {
                //@ts-ignore
                types.data = ['lend_single', 'loan_single']
                types.select = 'lend_single'
            } else {
                //@ts-ignore
                types.data = ['machine_gun_pool_single', 'lend_single', 'loan_single']
                types.select = 'machine_gun_pool_single'
            }
            params.category = types.data[0]
            plats.select = plats.data[0]
            coins.select = coins.data[0]
        }
    }
    return {chains,types,plats,coins,marks,getData}
}