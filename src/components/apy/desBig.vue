<script setup lang="ts">
//@ts-ignore
import * as echarts from 'echarts'
import {defineProps, onMounted,watch, ref,reactive} from 'vue'

import {chartsConfig} from '~/logic/apy/config'
import {ElDatePicker} from 'element-plus'
import {dataToTimestamp,formatDefaultTime} from '~/lib/tool'


const props = defineProps({
  title:{type:String},
  selected: {type: String},
  tableIndex: {type: Number},
  chartIndex: {type: Number},
  changeTime:{type:Function}
})
const getTitle=()=>{
  if(props.chartIndex===2){
    return props.title+props.selected+'对比'
  }else{
    return props.selected+' '+props.title
  }
}
// dataToTimestamp('2021-11-03')
const time=ref(null)
const beginTime=ref(0)
const endTime=ref(0)
watch(()=>props.selected,(n,o)=>{
  time.value=null
})
watch(()=>time.value,(n,o)=>{
  if(time.value) {
    beginTime.value = dataToTimestamp(formatDefaultTime(n[0]))
    endTime.value = dataToTimestamp(formatDefaultTime(n[1]))
    props.changeTime(dataToTimestamp(formatDefaultTime(n[0])), dataToTimestamp(formatDefaultTime(n[1])))
  }
})

</script>
<template>
  <div class="flex justify-between items-center">
    <div class="text-kd18px28px text-global-highTitle font-normal">{{getTitle()}}</div>
    <div class="timeContainer">
      <el-date-picker
          size="mini"
          v-model="time"
          type="daterange"
          range-separator="-"
          start-placeholder="开始"
          end-placeholder="结束"
      >
      </el-date-picker>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.timeContainer {
  ::v-deep(.el-input__inner) {
    margin-right: 0px;
    padding-right: 0px;
    padding: 0px 8px 0px 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
  }
 ::v-deep(.el-range-editor--mini.el-input__inner){
    width:180px !important;
  }
}
.timeColor{
  color:#A2A4A8;
}
</style>