<script setup lang="ts">
// @ts-ignore
import { ref, defineProps, watch, toRefs, reactive } from 'vue'
import * as R from 'ramda'
import * as table from '~/logic/apy/table'
import I18n from '~/utils/i18n/index'
import * as lang from '~/utils/lang'
import { filterByOptions } from '~/logic/apy/tableDetail'
import { unitConfig, unitConfigen } from '~/logic/apy/config'
const isTipArrow = false // 提示框是否显示小尖头呀
const props = defineProps({
  chains: { type: String },
  project: { type: String },
  title: { type: String },
  index: { type: Number },
  tableData: { type: Object },
  timer: { type: Number },
  isFirstShow: { type: Boolean },
})
const isShowTip = ref({})
const getTipShow = () => {
  isShowTip.value = R.find(
    (item) => item.status === false,
    props.tableData.options.data,
  )
}

// @ts-ignore
const { rows, headers, options, loading } = toRefs(props.tableData)
const renderCells = ref([])
const key = ref(null)
const type = ref(null)
const selectHeaderIndex = reactive({ indexValue: 0 })
const orderByApy = (
  keyValue: string,
  typeValue: string,
  headerIndex: number,
) => {
  key.value = typeValue !== 'no' ? keyValue : null
  type.value = typeValue !== 'no' ? typeValue : null
  selectHeaderIndex.indexValue = headerIndex
  renderCells.value = filterByOptions(
    headers.value,
    rows.value,
    options.value.data,
    key.value,
    type.value,
  )
}
watch(
  () => loading.value,
  (v) => {
    if (!v) {
      // @ts-ignore
      renderCells.value = filterByOptions(
        headers.value,
        rows.value,
        options.value.data,
        key.value,
        type.value,
      )
    }
  },
)
const chainInfo = {
  eth: {
    name: 'ETH',
    color: 'rgba(37, 62, 111, 0.65)',
    bgcolor: 'rgba(27, 27, 27, 0.1)',
  },
  heco: { name: 'HECO', color: '#12AD50', bgcolor: 'rgba(18, 173, 80, 0.1)' },
  bsc: { name: 'BSC', color: '#CEA100', bgcolor: 'rgba(206, 161, 0, 0.1)' },
  hsc: { name: 'ETH', color: '#00C19C', bgcolor: 'rgba(0, 193, 156, 0.1)' },
  oec: { name: 'OEC', color: '#00C19C', bgcolor: 'rgba(0, 193, 156, 0.1)' },
}
const getPlatInfo = (name: string) => {
  return chainInfo[name]
}
// 单元格背景色
// @ts-ignore
const addClass = ({ row, columnIndex }) => {
  let apyType=''
  options.value.data.find(item=>{
    if(item.key==='single_and_mine_award' && item.status){
      apyType='single_high_light'
    }else if(item.key==='compound_and_mine_award' && item.status){
      apyType='compound_high_light'
    }else if(item.key==='apy' && item.status){
      apyType='high_light'
    }
  })
  if (columnIndex > 0 && row.data[columnIndex - 1] && row.data[columnIndex - 1]?.[apyType]) {
    return 'background:rgba(9, 217, 142, 0.2); padding-top:0px; padding-bottom: 0;'
  }
  return 'background: #F6FAFD;'
}
// 是否为空  / 是否显示图片
const isNullFun = (data: any) => {
  console.log('null : ', data)
  let isNull = false
  if (data) {
    data.forEach((item) => {
      if (item.value) {
        isNull = true
      }
    })
  }
  return isNull
}
const headerCellStyle = () => 'background-color: #EAF3FD;border:none;'
watch(
  () => options.value.data,
  (a, _) => {
    getTipShow()
    renderCells.value = filterByOptions(headers.value, rows.value, a)
  },
)
const getValue = (data: any) => {
  const unitList = lang.current.value === 'cn' ? unitConfig : unitConfigen
  if (data) {
    if (!data.value && data.value !== 0) return '-'
    if (unitList[data.name]) {
      if (unitList[data.name].unit === '$')
        return unitList[data.name]?.unit + data.value
      else return data.value + unitList[data.name]?.unit
    }
    return data.value
  }
}
const tipShowInfo=(key:string)=>{
  let apyType=''
  options.value.data.find(item=>{
    if(item.key==='single_and_mine_award' && item.status){
      apyType='single'
    }else if(item.key==='compound_and_mine_award' && item.status){
      apyType='compound'
    }else if(item.key==='apy' && item.status){
      apyType='apy'
    }
  })
  const singleNoKey=['compound_and_mine_award','compound_detail','apy','comprehensive']
  const compoundNoKey=['single_and_mine_award','single_detail','apy','comprehensive']
  const apyKey=['single_and_mine_award','single_detail','compound_and_mine_award','compound_detail']
  if(apyType==='single'){
    if(singleNoKey.includes(key)) return false
    return true
  }else if(apyType==='compound'){
    if(compoundNoKey.includes(key)) return false
    return true
  }else{
    if(apyKey.includes(key)) return false
    return true
  }
}
</script>
<template>
  <div v-if="props.tableData.rows" class="tableHeaderTop">
    <ApyTableFilters :timer="timer" :project="tableData.slug" :options="options" :title="title"/>
    <div class="flex flex-col relative minWidth">
      <img v-if="tableData.loading && isFirstShow" class="loading" src="/assets/loading.gif" alt=""/>
      <div class="xshidden">
        <!-- pc -->
        <el-table v-if="!tableData.loading || (tableData.loading && !isFirstShow)" :data="renderCells" :header-cell-style="headerCellStyle" :cell-style="addClass" style="width: 100%">
          <el-table-column fixed width="140">
            <template #header="scope">
              <div class="text-kd12px16px text-global-default opacity-65 mb-2.5 ml-3">
                <span>{{ I18n.apy.tableHeader.type }}</span>
              </div>
              <div class="text-kd12px16px text-global-default opacity-65 ml-3">
                <span>{{ I18n.apy.tableHeader.dataType }}</span>
              </div>
            </template>
            <template #default="scope">
              <div class="justify-center flex flex-col">
                <a class="flex flex-col hand pl-3" :href="scope.row.url + '?utm_source=https://apy.kingdata.com'" target="_blank">
                  <div class="flex text-left items-center">
                    <!-- 隐藏 icon-->
                    <!-- <img class="w-8 h-8 mr-2" :src="scope.row.icon" alt="" />-->
                    <div class="font-kdExp text-kd14px18px text-global-highTitle font-normal">
                      <span>{{ scope.row.project_name }}</span>
                    </div>
                    <!-- 展示项目是否为新项目 -->
                    <ApyBadge class="flex ml-1" :time="scope.row.online_time"></ApyBadge>
                  </div>
                  <div class="flex mt-2 items-center">
                    <div v-if="props.chains === 'all'" class="tableItemTypePlat" :style="{
                        background: getPlatInfo(scope.row.chain).bgcolor,
                        color: getPlatInfo(scope.row.chain).color}">
                      <span>{{ getPlatInfo(scope.row.chain).name }}</span>
                    </div>
                  </div>
                </a>
              </div>
            </template>
          </el-table-column>
          <el-table-column v-for="(item, i) in headers" :key="`${index}-${i}-${item.token_name}`" min-width="132">
            <template #header="scope">
              <ApyHeaderColumn :order-by-apy="orderByApy" :select-header-index="selectHeaderIndex" :header-index="i" :header-data="item"/>
            </template>
            <template #default="scope">
              <div v-if="!table.isShow(scope, options) ||  !isShowTip || !isNullFun(scope.row?.data[scope.column.no - 1]?.data)">
                <div class="h-full min-h-12">
                  <ApyTableItem :scope-data="scope" :index="index" :options="options" :item-data="scope.row.data[i]?.data"/>
                </div>
              </div>
              <div v-else>
                <el-popover class="mt-10 py-10" :offset="-6" :width="300" :show-arrow="isTipArrow" effect="light" trigger="hover" placement="bottom">
                  <template #default>
                    <template v-for="(item, i) in scope.row?.data[i]?.data" :key="i">
                      <div v-if="getValue(item, i) !== '-' && tipShowInfo(item.key) " class="flex mb-0.5 items-center flex-wrap TipTxt">
                        <span class="mr-1">{{ item.name }}</span>
                        <div>
                          <span>{{ getValue(item, i) }}</span>
                        </div>
                      </div>
                    </template>
                  </template>
                  <template #reference>
                    <div class="h-full min-h-12">
                      <ApyTableItem :scope-data="scope" :index="index" :options="options" :item-data="scope.row.data[i]?.data"/>
                    </div>
                  </template>
                </el-popover>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--    手机-->
      <div class="mdhidden">
        <el-table v-if="!tableData.loading || (tableData.loading && !isFirstShow)" :data="renderCells" :header-cell-style="headerCellStyle"  :cell-style="addClass" style="width: 100%">
          <el-table-column fixed width="103">
            <template #header="scope">
              <div class="text-kd12px16px text-global-default opacity-65 mb-2.5">
                <span>{{ I18n.apy.tableHeader.type }}</span>
              </div>
              <div class="text-kd12px16px text-global-default opacity-65">
                <span>{{ I18n.apy.tableHeader.dataType }}</span>
              </div>
            </template>
            <template #default="scope">
              <div class="justify-center flex flex-col">
                <a class="flex flex-col flex-wrap justify-center items-center hand" :href="scope.row.url + '?utm_source=https://apy.kingdata.com'"  target="_blank">
                  <!-- 隐藏 icon -->
                  <div class="flex flex-col">
                    <div class="font-kdExp ml-0.5 text-center mb-1 text-kd12px18px md:text-kd14px18px text-global-highTitle font-normal">
                      <span>{{ scope.row.project_name }}</span>
                    </div>
                    <div class="text-center">
                      <span v-if="props.index === 0" class="tableItemType">{{I18n.apy.vaults }}</span>
                      <span v-else class="tableItemType">{{I18n.apy.lendPlat }}</span>
                    </div>
                    <div class="w-full flex justify-center items-center mt-1">
                      <span v-if="props.chains === 'all'" class="tableItemTypePlat" :style="{background: getPlatInfo(scope.row.chain).bgcolor, color: getPlatInfo(scope.row.chain).color }">{{ scope.row.chain }}</span>
                      <!-- 展示项目是否为新项目 -->
                      <ApyBadge class="flex ml-1" :time="scope.row.online_time"></ApyBadge>
                    </div>
                  </div>
                </a>
              </div>
            </template>
          </el-table-column>
          <el-table-column v-for="(item, i) in headers" :key="`${index}-${i}-${item.token_name}`" min-width="140">
            <template #header="scope">
              <ApyHeaderColumn :order-by-apy="orderByApy" :header-data="item" />
            </template>
            <template #default="scope">
              <ApyTableItem :index="index" :options="options" :item-data="scope.row.data[i]?.data"/>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.TipTxt {
  @apply text-kdFang text-kd13px20px text-global-default opacity-85;
}
::v-deep(.el-table td) {
  padding: 8px 0;
}
.tableItemType {
  @apply font-normal rounded  w-max   px-1 py-0.4  bg-global-primary bg-opacity-10 text-kd10px14px text-global-primary;
}
.tableItemTypePlat {
  @apply font-normal rounded  w-max   px-1 py-0.4  bg-global-primary bg-opacity-10 text-kd10px14px;
}
::v-deep(.el-table th.gutter) {
  display: table-cell !important;
}

::v-deep(.el-table colgroup.gutter) {
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
