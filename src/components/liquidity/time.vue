<script setup lang="ts">
import { ref,watch } from 'vue'
import {paramChart} from '~/store/liquidity/state'
import I18n from '~/utils/i18n/index'
import { dataToTimestamp, formatDefaultTime, getagoTimeStamp } from '~/lib/tool'
import * as R from 'ramda'
const filterOption = ref([
  { name: I18n.liquidity.mainHeader.week, value: 7, selected: true },
  {name: I18n.liquidity.mainHeader.month, value: 30, selected: false},
  { name: I18n.liquidity.mainHeader.streeMonth, value: 90, selected: false },
  { name: I18n.liquidity.mainHeader.sixMonth, value: 180, selected: false },
  { name: I18n.liquidity.mainHeader.year, value: 365, selected: false },
  // { name: '自定义', value: 0, selected: false },
])

interface timeModel {
  name: string
  value: number
  selected: boolean
}
const time = ref(null)
const beginTime = ref(0)
const endTime = ref(0)
watch(() => time.value, (n) => {
      if (time.value) {
        paramChart.timeBegin=dataToTimestamp(formatDefaultTime(n[0]))
        paramChart.timeEnd=dataToTimestamp(formatDefaultTime(n[1]))
        paramChart.time=n
      }
    },
)
//如果切换颗粒度的时候，时间筛选不是自定义的话，那么把自定义里面的时间清空
watch(()=>paramChart.timeType,(n)=>{
  //如果不是自定义 7 30 90  0 时间间隔
  if(n!==0){
    time.value = null // 自定义清空
  }
})
//选择时间tag  7 30  90
const selectTag = (timeM: timeModel) => {
  //如果颗粒度小h大于30天
  if(!getClass(timeM)){
    return
  }
  if (timeM.name === '自定义') {
    paramChart.timeType=0
    document.getElementsByClassName('el-range-input')[0].click()
  } else {
    paramChart.timeType=timeM.value
    paramChart.timeBegin=getagoTimeStamp(timeM.value)
    paramChart.timeEnd=dataToTimestamp(formatDefaultTime())
    paramChart.time=getagoTimeStamp(timeM.value)
    time.value = null // 自定义清空
  }
  R.forEach((item) => {
    if (item.name === timeM.name) {
      item.selected = true
    } else {
      item.selected = false
    }
  }, filterOption.value)
}
const selectTime=ref()
//给时间选择进行时间范围限制，1h的时候只能访问前1个月的，1d的时候只能访问前三个月的
const pickerOptions=(time)=>{
    if(time) {
      if(paramChart.interval==='1D'){
        if(dataToTimestamp(time) < dataToTimestamp(formatDefaultTime(getagoTimeStamp(90))) || dataToTimestamp(time)>dataToTimestamp(new Date())) return true
      }else{
        if(dataToTimestamp(time) < dataToTimestamp(formatDefaultTime(getagoTimeStamp(30))) || dataToTimestamp(time)>dataToTimestamp(new Date())) return true
      }
    }
    return false
  }
const getClass=(item:any)=>{
  if(paramChart.interval==='1D' || (paramChart.interval==='1H' && item.value<=30)){
    return true
  }else{
    return false
  }
}
</script>
<template>
  <div>
    <div class="flex">
      <div class="flex h-7.8 items-center timeFilter">
        <template v-for="item in filterOption">
          <div :class="getClass(item)?'showItemTime':'noShowItemTime'"  >
          <div v-if="item.name !== '自定义' || (item.name === '自定义' && paramChart.timeType!==0)" :class="item.value===paramChart.timeType? 'timeTagSelected' : 'timeTag'" @click="selectTag(item)">
            {{ item.name }}
          </div>
          </div>
        </template>
<!--        <div v-show="paramChart.timeType===0" class="timeContainer">-->
<!--          <el-date-picker  :disabledDate="pickerOptions" id="datePickerDom" v-model="time" size="mini" type="daterange" range-separator="–" start-placeholder="开始" end-placeholder="结束">-->
<!--          </el-date-picker>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.noShowItemTime{
  @apply opacity-35;
}
.showItemTime{
  @apply cursor-pointer;
}
.timeTag {
  border-radius: 2px;
  @apply px-2 py-1 text-kd14px18px text-global-default opacity-65;
}
.timeTagSelected {
  cursor: pointer;
  border-radius: 2px;
  @apply px-2 py-1 text-kd14px18px text-global-primary bg-white;
}

.timeFilter {
  padding: 2px;
  background: rgba(43, 141, 254, 0.08);
  border-radius: 4px;
}
::v-deep(.el-range-editor--mini .el-range-input) {
  width: 100px !important;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: rgba(37, 62, 111, 0.85);
}

::v-deep(.el-range-editor--mini .el-range-separator) {
  font-family: 'i8n-font-inter';
}

::v-deep(.el-range-editor--mini.el-input__inner) {
  width: 235px;
  border: none;
}

::v-deep(.el-input__inner) {
  margin-right: 0px;
  padding-right: 0px;
  width: 2px;
  padding: 0px 8px 0px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
}

::v-deep(.el-range__icon) {
  display: none;
}

::v-deep(.el-range-input) {
  color: #2b8dfe;
  width: 50%;
  font-size: 14px;
}

::v-deep(.el-range-separator) {
  padding: 0 0;
  line-height: 28px;
  color: #2b8dfe;
}

::v-deep(.el-date-editor .el-range-separator) {
  margin: 0px 5px;
  padding: 0;
}

::v-deep(.el-range__close-icon) {
  display: none;
}

.timeColor {
  color: #a2a4a8;
}

.closeSmall {
  border: 1px solid #e7e7e7;
  box-sizing: border-box;
  border-radius: 4px;
}
</style>
