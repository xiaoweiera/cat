<script setup lang="ts">
// @ts-ignore
import * as echarts from 'echarts'
import { defineProps, onMounted, ref } from 'vue'
import { chartsConfig } from '~/logic/apy/config'
import I18n from '~/utils/i18n/index'
import * as lang from '~/utils/lang'
const props = defineProps({
  title: { type: String },
  selected: { type: String },
  tableIndex: { type: Number },
  chartIndex: { type: Number },
})
const getTitle = () => {
  if (props.chartIndex === 2) {
    if (lang.current.value === 'cn') {
      return `${props.title + props.selected}对比`
    } else {
      return `Comparison of ${props.selected} on different platforms`
    }
  } else {
    return `${props.selected} ${props.title}`
  }
}
</script>
<template>
  <div class="flex justify-between items-center">
    <div class="text-kd14px18px text-global-highTitle font-normal max-w-60">
      {{ getTitle() }}
    </div>
    <div class="text-kd12px16px timeColor font-normal">
      {{ I18n.apy.oneMinUpdate }}
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.timeColor {
  color: #a2a4a8;
}
</style>
