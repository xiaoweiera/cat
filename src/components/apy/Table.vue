<script setup lang="ts">
// @ts-ignore
import { ElButton, ElSwitch, ElTable, ElTableColumn, ElLoading } from 'element-plus'
import { ref, defineProps, onMounted, onUpdated, reactive, watch, computed, toRefs, toRef, watchEffect } from 'vue'
import { numberFormat, percent2Precision } from '~/lib/tool'
import type { CoinModel, HeaderModel, RowModel, TableModel } from '~/types/apy'
import { filterByOptions } from '~/logic/apy/tableDetail'

const props = defineProps({
  project: { type: String },
  title: { type: String },
  dataSet: { type: Array },
  // Object of <HeaderModel[]>
  headerList: { type: Object },
  index: { type: Number },
  tableData: { type: Object },
})
const {
  rows,
  headers,
  options,
  loading,
} = toRefs(props.tableData)

const renderCells = ref([])

watch(() => loading.value, (v) => {
  if (!v) {
    renderCells.value = filterByOptions(headers.value, rows.value, options.value.data)
  }
})

// 单元格背景色
const addClass = ({
  row,
  column,
  rowIndex,
  columnIndex,
}) => {
  if (columnIndex > 0 && row.data[columnIndex - 1] && row.data[columnIndex - 1]?.data?.high_light === true) {
    return 'background:rgba(9, 217, 142, 0.2);'
  }
  return 'background:#F6FAFD;'
}

const headerCellStyle = () => {
  return 'background-color: rgba(43,131,254,0.14)'
}
watch(() => options.value.select, (a, b) => {
  options.value.data = options.value.data.map((i) => {
    if (i.name !== a) {
      return i
    }
    i.status = !i.status
    return i
  })
  options.value.select = a
  renderCells.value = filterByOptions(headers.value, rows.value, options.value.data)
})
</script>
<template>
  <ApyTableFilters :project="project" :options="options" :title="title"/>
  <div class="flex flex-col">
    <el-table
        :data="renderCells"
        :header-cell-style="headerCellStyle"
        style="width: 100%;"
    >
      <el-table-column
          fixed
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
          v-for="(item, i) in headers"
          :key="`${index}-${i}-${item.token_name}`"
          width="212"
      >
        <template #header="scope">
          <ApyHeaderColumn :header-data="item"/>
        </template>
        <template #default="scope">
          <ApyTableItem :index="index" :itemData="scope.row.data[i].data"/>
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
