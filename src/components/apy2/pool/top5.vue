<script setup lang="ts">
import { defineProps, onMounted, reactive, ref } from 'vue'
import * as echarts from 'echarts'
import * as R from 'ramda'
import { formatRulesNumber } from '~/lib/tool'
import {colors} from '~/logic/echarts/colors'
import {getConfig} from '~/logic/chartConfig/leftBar'
import { getBarChart } from '~/logic/apy2'
import { watchState } from '~/utils/use/state'
import { getTop5 } from '~/logic/apy2/table'
import dataEventName, { getDateValue } from '~/components/ui/date/eventname'
// @ts-ignore
import { EchartData, Direction, triggerType } from '~/logic/echarts/interface'

const props = defineProps({
  type: {
    type: String,
    required: true,
    default: () => 'loan',
    validator: function(value: string) {
      // 类型为挖矿与借贷
      return value === 'mining' || value === 'loan';
    }
  },
  symbol: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  }
})
const maxYaxis = ref<number>(0)
const echartData = reactive<EchartData>(new EchartData())
const data=ref({})

let myChart: any = null
const upData = async function(date: any) {
  const times = getDateValue(date)
  const query = {
    type: props.type,
    symbol: props.symbol,
    ...times
  }
  //@ts-ignore
  data.value=await getBarChart(query)
}

watchState(dataEventName.value, upData)

</script>
<template>
  <el-container class="h-full">
    <el-header height="initial" class="p-0">
      <div class="flex justify-between items-center">
        <div>
          <span class="text-sm leading-5 font-medium text-global-highTitle text-opacity-85">{{ title }}</span>
        </div>
        <div class="flex items-center">
          <slot></slot>
          <UiDownloadButton class="ml-3" :title="title" size="16"/>
        </div>
      </div>
    </el-header>
    <el-main class="p-0 overflow-init">
       <Apy2PoolBarChart :key="echartData.key" :chartData='data' />
    </el-main>
  </el-container>
</template>



