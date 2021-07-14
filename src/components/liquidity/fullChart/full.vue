<script setup lang="ts">
import { defineProps,onMounted,ref,reactive,watch } from 'vue'
const props=defineProps({
  chartType:String,
  chartId:String,
  queryCoinType:Object
})
const chartType=ref(props.queryChartType)
const state=ref(false)
const coinType=reactive({value:props.queryCoinType.value})
</script>
<template>
  <FullScreen>
    <template #default="scope">
      <el-container v-if="scope.status" class="h-full border-1">
        <el-header height="initial" class="p-0">
          <div class="border-1">
            <LiquidityFullChartHeader :chartType="chartType" :chartId="props.chartId" :coinType="coinType"/>
          </div>
        </el-header>
        <el-main  class="p-0">
          <div class="border-1 h-full">
            <LiquidityFullChartMain :coinType="coinType"/>
          </div>
        </el-main>
        <el-footer height="initial" class="p-0">
          <div class="border-1">footer</div>
        </el-footer>
      </el-container>
      <div class="flex absolute right-0" v-else>
        <FullZoom/>
      </div>
    </template>
  </FullScreen>
</template>
<style scoped lang="postcss">

</style>
