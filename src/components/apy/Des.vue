<script setup lang="ts">
//@ts-ignore
import * as echarts from 'echarts'
import {defineProps, onMounted, ref} from 'vue'
import {chartsConfig} from '~/logic/apy/config'

const props = defineProps({
  title:{type:String},
  selected: {type: String},
  tableIndex: {type: Number},
  chartIndex: {type: Number}
})
const getTitle=()=>{
  if(props.chartIndex===2){
    return props.title+props.selected+'对比'
  }else{
   return props.selected+' '+props.title
  }
}
</script>
<template>
  <div class="flex justify-between items-center">
    <div class="text-kd14px18px text-global-highTitle font-normal">{{getTitle()}}</div>
    <div class="text-kd12px16px  timeColor font-normal ">更新：1分钟前</div>
  </div>
</template>
<style lang="postcss" scoped>
.timeColor{
  color:#A2A4A8;
}
</style>