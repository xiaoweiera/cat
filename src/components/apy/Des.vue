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
</script>
<template>
  <div class="flex justify-between items-center">
    <div class="text-kd14p18px text-global-highTitle font-normal">{{ selected + ' ' + title }}</div>
    <div class="text-kd12px16px text-global-time font-normal ">更新：1分钟前</div>
  </div>
</template>