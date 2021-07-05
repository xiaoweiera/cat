<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue'
import * as echarts from 'echarts'

defineProps({
  height: {
    type: Number,
    default () {
      return 200
    }
  }
})

const echartsRef = ref<any>(null)



onMounted(function() {
  
})

</script>

<template>
  <div :style="{ 'height': `${height}px` }">
    <div>
      <slot name="yAxis">
        <EchartsYaxis/>
      </slot>
    </div>
    <div class="relative w-full h-full" ref="echartsRef"></div>
  </div>
</template>
