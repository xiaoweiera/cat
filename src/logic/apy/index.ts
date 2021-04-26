import {ref, reactive} from 'vue'
import {getColumns, getDataset} from '~/api/apy'
import {getChart,getChartByMoney} from '~/api/apy'

interface TableParams {
    chain: String
    category: String
}

interface TableItem {
    slug: String
    title: String
    headers: Object
    rows: Object
    options: Object
    loading: boolean
}

interface chartItem {
    chartAll: Object,
}

interface chartModel {
    category:String
    title: String
    tagList:Object
    option: Object
    selectTag: Object
    loading: Boolean
}

interface ChainModel {
    key: String
    name: String
    img: String
}
interface chartTag{
    name:String,
    select:Boolean
}
export const defaultChains = (defaults: ChainModel[]) => {
    const chains = reactive({data: defaults})

    return {chains}
}
const initDefaultTable = (tables: any, slug: String, title: String, index: number) => {
    if (!tables.value[index]) {
        tables.value[index] = reactive<TableItem>({
            headers: {},
            rows: {},
            slug,
            title,
            options: reactive({
                data: [],
                select: 'key',
            }),
            loading: true,
        })
    } else {
        tables.value[index].loading = true
    }
}

export const requestTables = () => {
    const tables = ref<TableItem[]>([])
    const requestData = async (index: number, slug: String, title: String, options: any, params: TableParams) => {
        initDefaultTable(tables, slug, title, index)
        // @ts-ignore
        tables.value[index].options.data = options.data
        // @ts-ignore
        tables.value[index].options.select = options.select
        tables.value[index].title = title
        const {
            data: {
                data: headers,
            },
        } = await getColumns(params)
        tables.value[index].headers = headers
        // 获取dataSet
        const {
            data: {
                data: rows,
            },
        } = await getDataset(params)

        tables.value[index].rows = rows
        tables.value[index].loading = false
    }

    return {
        tables,
        requestData,
    }
}
export const initChart = (category:string,charts: any,index:number, chartIndex: number, title: string, selectTag: string) => {
    if (!charts.value[index]) {
        charts.value[index] = reactive({
            chartAll:reactive<chartModel[]>([])
        })
    }
    if(!charts.value[index].chartAll[chartIndex]){

        charts.value[index].chartAll[chartIndex] = reactive<chartModel>({
            category:category,
            title,
            tagList:reactive<chartTag[]>([]),
            option: reactive({}),
            selectTag,
            loading: false
        })
    }
}
export const requestChart = () => {
    const charts = ref<chartItem[]>([])
    const requestChartData = async (chain: string, category: string, index: number, chartIndex: number, title: string) => {
        //@ts-ignore
        initChart(category,charts,index, chartIndex, title)
        const param = {chain: chain, category: category}
        if(chartIndex===0){
            //第一个图表
            let {data: lendData} = await getChart({...param, keyword1: 'project_name', keyword2: 'token_name'})
            //@ts-ignore
             charts.value[index].chartAll[chartIndex].option=lendData
        }else if(chartIndex===1){
            //第二个图表
            let {data: loanData} = await getChart({...param, keyword1: 'token_name', keyword2: 'project_name'})
            //@ts-ignore
            charts.value[index].chartAll[chartIndex].option=loanData
        }else{
            //第二个图表
            let {data: gunData} = await getChartByMoney({...param})
            //@ts-ignore
            charts.value[index].chartAll[chartIndex].option=gunData
        }
    }
    return {
        charts,
        requestChartData
    }
}
