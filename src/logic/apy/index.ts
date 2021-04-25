import { ref, reactive } from 'vue'
import { getColumns, getDataset } from '~/api/apy'

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

interface ChainModel {
  key: String
  name: String
  img: String
}

export const defaultChains = (defaults: ChainModel[]) => {
  const chains = reactive({ data: defaults })

  return { chains }
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
  }
  else {
    tables.value[index].loading = true
  }
}

export const requestTables = () => {
  const tables = ref<TableItem[]>([])
  const requestData = async(index: number, slug: String, title: String, options: any, params: TableParams) => {
    initDefaultTable(tables, slug, title, index)
    // @ts-ignore
    tables.value[index].options.data = options.data
    // @ts-ignore
    tables.value[index].options.select = options.select
    tables.value[index].title = title

    let {
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
