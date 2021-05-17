import {getDataset} from "~/api/apy";
// import {requestTables, defaultChains, requestChart} from '~/logic/apy'

 interface  dataSetModel{
    chain:string
    category:string
}
//@ts-ignore  根据chain 获取 币种 和 平台
export const getInfo =async (params:dataSetModel) => {
  const {data:data}= await getDataset(params)

    console.log('正在做',data)
}