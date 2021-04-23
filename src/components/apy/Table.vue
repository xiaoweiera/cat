<script setup lang="ts">
// @ts-ignore
import { ElButton, ElSwitch, ElTable, ElTableColumn, ElLoading } from 'element-plus'
import { ref, defineProps, onMounted, onUpdated, reactive, watch, computed, toRefs, toRef, watchEffect } from 'vue'
import { numberFormat, percent2Precision } from '~/lib/tool'
import type { CoinModel, HeaderModel, RowModel, TableModel } from '~/types/apy'

const props = defineProps({
  project: { type: String },
  title: { type: String },
  dataSet: { type: Array },
  // Object of <HeaderModel[]>
  headerList: { type: Object },
  index: { type: Number },
  tableData: { type: Object },
})
const renderData = ref([])
const {
  rows,
  headers,
  options,
  loading,
} = toRefs(props.tableData)

watch(() => loading.value, (v) => {
  console.log('====', v)
})

// 初始化
const init = () => {
  const newData: RowModel[] = []
  const newList: RowModel[] = []
  newData.forEach((item, i) => {
    const newItem: RowModel = {
      project_name: item.project_name,
      data: [],
    }
    props.headerList.forEach((itemTwo, jj) => {
      // 币种信息
      const coin: CoinModel = item.data[itemTwo.token_name] ? item.data[itemTwo.token_name] : {}
      // 存款
      if (props.index === 0) {
        newItem.data.push([{
          token_name: coin.token_name,
          high_light: coin.high_light,
          name: '收到利息',
          key: 'apy',
          value: percent2Precision(coin.apy),
          status: true,
        }, {
          name: '产出',
          key: 'apy_detail',
          value: coin.apy_detail,
          status: true,
        }, {
          name: '存款总额',
          key: 'tvl',
          value: numberFormat(coin.tvl),
          status: true,
        }, {
          name: '借款总量',
          key: 'quota_used',
          value: numberFormat(coin.quota_used),
          status: false,
        }])
      }
      // else if (props.index === 1) {
      //   newItem.data.push([{
      //     token_name: coin.token_name,
      //     high_light: coin.high_light,
      //     name: '支付利率',
      //     key: 'apy',
      //     value: percent2Precision(coin.apy),
      //     status: true,
      //   }, {
      //     name: '计息',
      //     key: 'apy_detail',
      //     value: coin.apy_detail,
      //     status: true,
      //   }, {
      //     name: '可借',
      //     key: 'quota_remain',
      //     value: numberFormat(coin.quota_remain),
      //     status: false,
      //   }, {
      //     name: '借出',
      //     key: 'quota_remain*quota_remain_percent',
      //     value: numberFormat(coin.quota_remain * coin.quota_remain_percent),
      //     status: false,
      //   },
      //     {
      //       name: '剩余额度',
      //       key: 'quota_remain_percent',
      //       value: numberFormat(coin.quota_remain_percent),
      //       status: false,
      //     }])
      // }
      // else if (props.index === 2) {
      //   newItem.data.push([{
      //     token_name: coin.token_name,
      //     high_light: coin.high_light,
      //     name: '收到利息',
      //     key: 'apy',
      //     value: percent2Precision(coin.apy),
      //     status: true,
      //   }, {
      //     name: '产出',
      //     key: 'apy_detail',
      //     value: coin.apy_detail,
      //     status: true,
      //   }, {
      //     name: '可投出额度',
      //     key: 'quote',
      //     value: numberFormat(coin.quota_remain),
      //     status: true,
      //   }, {
      //     name: '总锁仓',
      //     key: 'tvl',
      //     value: numberFormat(coin.tvl),
      //     status: false,
      //   },
      //     {
      //       name: '剩余额度',
      //       key: 'quota_remain_percent',
      //       value: numberFormat(coin.quota_remain_percent),
      //       status: false,
      //     }])
      // }
    })
    newList.push(newItem)
  })
  renderData.value = newList
  console.log(renderData.value)
}
// 监听tag切换
watch(() => props.dataSet, (a, b) => {
  // init()
})

onMounted(() => {
  // init()
})
// 单元格背景色
const addClass = ({
  row,
  column,
  rowIndex,
  columnIndex,
}) => {
  if (row.data[columnIndex - 1] && columnIndex > 0 && row.data[columnIndex - 1][0].high_light === true) {
    return 'background:rgba(9, 217, 142, 0.2);'
  }
  else {
    return 'background:#F6FAFD;'
  }
}
// const loading = true
const addHeaderClass = () => {
  return 'background:rgba(43, 141, 254, 0.14)'
}
// 删选
const filterFunc = (args) => {
  const newData = []
  renderData.value.forEach((item, i) => {
    const newItem = []
    item.data.forEach((itemTwo, j) => {
      // 没列的数据
      const newItemTwo = []
      itemTwo.forEach((keyData, n) => {
        // 第一个永远显示
        args.forEach((keys) => {
          if (keys.key === keyData.key) {
            newItemTwo.push({
              high_light: keyData.high_light,
              key: keyData.key,
              name: keyData.name,
              status: keys.status,
              token_name: keyData.token_name,
              value: keyData.value,
            })
          }
        })
      })
      newItem.push(newItemTwo)
    })
    newData.push({
      project_name: item.project_name,
      data: newItem,
    })
  })
  renderData.value = newData
}
watch(() => options.select, (a, b) => {
  const filterArgs = options.data.map((i) => {
    if (i.name !== a) {
      return i
    }
    i.status = !i.status
    return i
  })
  filterFunc(filterArgs)
})
</script>
<template>
  <ApyTableFilters :project="project" :options="options" :title="title"/>
  <div class="flex flex-col">
    <el-table
        :data="renderData"
        :header-cell-style="'background:rgba(43, 141, 254, 0.14)'"
        :cell-style="addClass"
        style="width: 100%;"
    >
      <el-table-column
          fixed
          prop="date"
          label="日期"
          width="140"
      >
        <template #header="scope">
          <div class="text-kd12px16px text-global-default opacity-65 ">项目/币种</div>
          <div class="text-kd12px16px text-global-default opacity-65">价格/涨跌幅</div>
        </template>
        <template #default="scope">
          <div class="min-w-35  w-35   justify-center   flex flex-col">
            <div class="flex px-3  items-center  ">
              <img class="w-8 h-8 mr-1.5" src="https://res.ikingdata.com/nav/platForm.png" alt="">
              <div class="flex flex-col ">
                <div class="font-kdExp mb-1  text-kd14px18px text-global-highTitle font-normal">
                  {{ scope.row.project_name }}
                </div>
                <div
                    class="font-normal rounded h-4.5 w-max   px-1 py-0.4  bg-global-primary bg-opacity-10 text-kd10px14px text-global-primary"
                >
                  借贷平台
                </div>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
          v-for="(item,i) in headerList"
          width="212"
      >
        <template #header="scope">
          <ApyHeaderColumn :header-data="item"/>
        </template>
        <template #default="scope">
          <ApyTableItem :index="index" :item-data="scope.row.data[i]"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped lang="postcss">
::v-deep(.el-table td) {
  border-bottom: 0;
}

.t_btn2 ::v-deep(.el-table, .el-table__expanded-cell) {
  background-color: #F6FAFD;
}

.el-table::before {
  height: 0px;
}

::v-deep(.el-switch__core) {
  width: 35px !important;
  height: 18px;
}

::v-deep(.el-switch__action) {
  height: 12px !important;
  width: 12px !important;
  margin-top: 1px;
}

el-table th, .el-table tr {
  background-color: red;
}

::v-deep(.el-table tr) {
//background: blue !important;
}

</style>
