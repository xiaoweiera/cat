<script setup lang="ts">
// @ts-ignore
import {ElButton, ElSwitch, ElTable, ElTableColumn, ElLoading} from 'element-plus'
import {ref, defineProps, watch, toRefs, onMounted} from 'vue'
import {filterByOptions} from '~/logic/apy/tableDetail'

const props = defineProps({
  project: {type: String},
  title: {type: String},
  index: {type: Number},
  tableData: {type: Object},
  timer: {type: Number},
  isFirstShow: {type: Boolean}
})
//@ts-ignore
const {rows, headers, options, loading} = toRefs(props.tableData)
const renderCells = ref([])
const key = ref(null)
const type = ref(null)
const orderByApy = (keyValue: string, typeValue: string) => {
  key.value = keyValue
  type.value = typeValue
  renderCells.value = filterByOptions(headers.value, rows.value, options.value.data, keyValue, typeValue)
}

watch(() => loading.value, (v) => {
  if (!v) {
    //@ts-ignore
    renderCells.value = filterByOptions(headers.value, rows.value, options.value.data, key.value, type.value)
  }
})
// 单元格背景色
//@ts-ignore
const addClass = ({row, columnIndex}) => {
  if (columnIndex > 0 && row.data[columnIndex - 1] && row.data[columnIndex - 1]?.high_light) {
    return 'background:rgba(9, 217, 142, 0.2)'
  }
  return 'background:#F6FAFD'
}
const headerCellStyle = () => 'background-color: #EAF3FD;border:none;'
// const headerCellStyle = () => 'background-color: rgba(43, 141, 254, 0.06);'
watch(() => options.value.data, (a, _) => renderCells.value = filterByOptions(headers.value, rows.value, a))
</script>
<template>
  <div v-if="props.tableData.rows" class="tableHeaderTop">
    <ApyTableFilters :timer="timer" :project="tableData.slug" :options="options" :title="title"/>
    <div class="flex flex-col relative minWidth">
      <img v-if="tableData.loading && isFirstShow" class="loading" src="/assets/loading.gif" alt="">
      <div class="xshidden">
        <!--      pc-->
        <el-table
            v-if="!tableData.loading || (tableData.loading && !isFirstShow)"
            :data="renderCells"
            :header-cell-style="headerCellStyle"
            :cell-style="addClass"
            style="width: 100%;"
        >
          <el-table-column
              fixed
              width="140"
          >
            <template #header="scope">
              <div class="text-kd12px16px text-global-default opacity-65 mb-2.5 ">项目/币种</div>
              <div class="text-kd12px16px text-global-default opacity-65">价格/涨跌幅</div>
            </template>
            <template #default="scope">
              <div class="min-w-35  w-35   justify-center   flex flex-col">
                <a class="flex  md:px-3  items-center hand  " :href="scope.row.url" target="_blank">
                  <img class="w-8 h-8 mr-1.5" :src="scope.row.icon" alt="">
                  <div class="flex flex-col ">
                    <div class="font-kdExp mb-1  text-kd14px18px text-global-highTitle font-normal">
                      {{ scope.row.project_name }}
                    </div>
                    <div
                        class="font-normal rounded h-4.5 w-max   px-1 py-0.4  bg-global-primary bg-opacity-10 text-kd10px14px text-global-primary"
                    >
                      <span v-if="props.index==0">机枪池</span>
                      <span v-else>借贷平台</span>
                    </div>
                  </div>
                </a>
              </div>
            </template>
          </el-table-column>
          <el-table-column
              min-width="140"
              v-for="(item, i) in headers"
              :key="`${index}-${i}-${item.token_name}`"
          >
            <template #header="scope">
              <ApyHeaderColumn :orderByApy="orderByApy" :header-data="item"/>
            </template>
            <template #default="scope">
              <ApyTableItem :index="index" :itemData="scope.row.data[i]?.data"/>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--    手机-->
      <div class="mdhidden">
        <el-table
            v-if="!tableData.loading || (tableData.loading && !isFirstShow)"
            :data="renderCells"
            :header-cell-style="headerCellStyle"
            :cell-style="addClass"
            style="width: 100%;"
        >
          <el-table-column
              fixed
              width="103"
          >
            <template #header="scope">
              <div class="text-kd12px16px text-global-default opacity-65 mb-2.5 ">项目/币种</div>
              <div class="text-kd12px16px text-global-default opacity-65">价格/涨跌幅</div>
            </template>
            <template #default="scope">
              <div class="justify-center     flex flex-col">
                <a class="flex   flex-col    md:px-3 flex-wrap justify-center  items-center hand  "
                   :href="scope.row.url" target="_blank">
                  <img class="md:w-8 mx-auto my-0 md:h-8 w-6 h-6 md:mr-1.5" :src="scope.row.icon" alt="">
                  <div class="flex flex-col  ">
                    <div
                        class="font-kdExp text-center mb-1 text-kd12px18px  md:text-kd14px18px text-global-highTitle font-normal">
                      {{ scope.row.project_name }}
                    </div>
                    <div
                        class="font-normal rounded h-4.5 w-max mx-auto  px-1 py-0.4  bg-global-primary bg-opacity-10 text-kd9px14px md:text-kd10px14px text-global-primary"
                    >
                      <span v-if="props.index==0">机枪池</span>
                      <span v-else>借贷平台</span>
                    </div>
                  </div>
                </a>
              </div>
            </template>
          </el-table-column>
          <el-table-column
              min-width="140"
              v-for="(item, i) in headers"
              :key="`${index}-${i}-${item.token_name}`"
          >
            <template #header="scope">
              <ApyHeaderColumn :orderByApy="orderByApy" :header-data="item"/>
            </template>
            <template #default="scope">
              <ApyTableItem :index="index" :itemData="scope.row.data[i]?.data"/>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
::v-deep(.el-table th.gutter) {
  display: table-cell !important;
}

::v-deep(.el-table colgroup.gutter ) {
  display: table-cell !important;
}

table {
  width: 100% !important;
}

.minWidth {
  min-height: 200px;
}

.loading {
  width: 150px;
  height: 150px;
  margin: 0 auto;
  mix-blend-mode: darken;
  position: absolute;
  left: 0;
  right: 0;
  top: 20px;
  z-index: 11;
}

::v-deep(.el-table td) {
  border: 1px solid rgba(0, 0, 0, 0.02);
//border-color: rgba(0, 0, 0, 0.02);
}


</style>
