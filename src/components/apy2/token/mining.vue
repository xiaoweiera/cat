<script setup lang="ts">
import { defineProps, onMounted, reactive, watch } from 'vue'
import { echartData } from '~/logic/apy2/token'
import { getInject } from '~/utils/use/state'
import dataEventName from '~/components/ui/date/eventname'
import { debounce } from '~/utils'

// @ts-ignore
import { Position, LegendDirection, colors, seriesType, EchartData } from '~/logic/echarts/interface'

const chartData = reactive<EchartData>(new EchartData())

const props = defineProps({
  // 币种名称
  symbol: {
    type: String,
    required: true
  },
  // 币种ID
  id: {
    type: String,
    required: true
  },
  // 池子类型
  type: {
    type: String,
    required: true
  }
})

const date = getInject(dataEventName.value)

const updateData = debounce<any>(async function() {
  const [[ from_ts, to_ts ]]: number[][] = date.value
  const pools = ''
  const query = {
    pools,
    from_ts: Math.floor(from_ts / 1000),
    to_ts: Math.floor(to_ts / 1000),
    ...props
  }
  echartData(query)
}, 500)

watch(date, updateData)
onMounted(updateData)

</script>

<template>
  <div>
    <!-- 币种描述 -->
    <Apy2TokenDetail/>
    <div v-if="chartData.xAxis && chartData.xAxis.length > 0">
      <Echarts custom-class="h-45 md:h-85" :legend="LegendDirection.custom">
        <!-- 提示框 trigger: 触发方式 -->
        <EchartsTooltip trigger="axis" />

        <template v-for="(item, index) in chartData.legends" :key="index">
          <EchartsLegend :index="index" :value="item.name" :type="item.type" :position="item.kline ? Position.right : Position.left"/>
        </template>

        <EchartsYaxis :index="0" :position="Position.left"/>
        <EchartsYaxis :index="1" :position="Position.right"/>

        <!-- 设置X轴 -->
        <EchartsXaxis :value="chartData.xAxis"/>


        <!--数据-->
        <template v-for="(item, index) in chartData.legends" :key="index">
          <!--
            通过 index 与 legend 对应 (legend 中的 position 字段会影响数据的展示)
            value: 数据
          -->
          <EchartsSeries :index="index" :color="item.color" :value="chartData.series[item.id]"/>
        </template>
      </Echarts>
    </div>
  </div>
  <div class="mt-8">
    <h3 class="text-xl text-global-highTitle text-opacity-85">BTC 所有 APY 池子</h3>
  </div>
</template>
