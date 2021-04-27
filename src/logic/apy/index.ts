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

export interface chartModel {
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
export const initChart = (category:string,charts: any,tableIndex:number, chartIndex: number, title: string, selectTag: string) => {
    if (!charts.value[tableIndex]) {
        charts.value[tableIndex] = reactive({
            chartAll:reactive<chartModel[]>([])
        })
    }
    if(!charts.value[tableIndex].chartAll[chartIndex]){

        charts.value[tableIndex].chartAll[chartIndex] = reactive<chartModel>({
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
    //name :lend loan 机枪池
    const requestChartData = async (tableIndex:number,chartIndex:number,category:string,title: string,requestData:Function, chartData:Function, xyDataFun: Function,param:any) => {
        //@ts-ignore
        initChart(category,charts,tableIndex, chartIndex, title)
        //@ts-ignore
        charts.value[tableIndex].chartAll[chartIndex].option=await requestData(param)
    }
    return {
        charts,
        requestChartData
    }
}
