<script setup lang="ts">
import { defineProps, reactive, ref } from 'vue'
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

const upData = async function(date: any) {
  const times = getDateValue(date)
  const query = {
    type: props.type,
    // symbol: props.symbol,
    symbol: 'ETH',
    ...times
  }
  const { chart: result, max } = await getTop5(query)
  maxYaxis.value = max
  if (result) {
    echartData.key = result.key
    echartData.legends = result.legends
    echartData.xAxis = result.xAxis
    echartData.series = result.series
  }
}

watchState(dataEventName.value, upData)

</script>

<template>
  <el-container class="h-full">
    <el-header height="initial" class="p-0">
      <div class="flex justify-between items-center">
        <div>
          <span class="text-sm text-global-highTitle text-opacity-85">{{ title }}</span>
        </div>
        <div class="flex items-center">
          <slot></slot>
          <EchartsDownload class="ml-3" :title="title"/>
        </div>
      </div>
    </el-header>
    <el-main class="p-0">
      <Echarts :key="echartData.key" :direction="Direction.vertical" :legend="false">
        <!-- 提示框 trigger: 触发方式 -->
        <EchartsTooltip/>

        <template v-for="(item, index) in echartData.legends" :key="index">
          <EchartsLegend :index="index" :value="item.name" :type="item.type"/>
        </template>

        <EchartsYaxis :index="0" :min="0" :max="maxYaxis"/>

        <!-- 设置X轴 -->
        <EchartsXaxis :value="echartData.xAxis"/>


        <!--数据-->
        <template v-for="(item, index) in echartData.legends" :key="index">
          <!--
            通过 index 与 legend 对应 (legend 中的 position 字段会影响数据的展示)
            value: 数据
          -->
          <EchartsSeries :index="index" :color="item.color" :value="echartData.series[item.id]"/>
        </template>
      </Echarts>
    </el-main>
  </el-container>
</template>


