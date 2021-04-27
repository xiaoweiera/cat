<script setup lang="ts">
import {onMounted, onUnmounted, ref, watch} from 'vue'
import {requestTables, defaultChains, requestChart} from '~/logic/apy'
//@ts-ignore
import {chainConfig, tableConfig, anchorConfig, chartsConfig} from '~/logic/apy/config'

const {chains} = defaultChains(chainConfig)
//@ts-ignore
const {tables, requestData: fetchTableData} = requestTables()

//@ts-ignore
const {charts, requestChartData: fetchChartData} = requestChart()
const selectedAnchor = ref('存款 APY')
//@ts-ignore
const clickAnchor = (name: string) => {
  if (name === '回到顶部') {
    //@ts-ignore
    document.scrollingElement.scrollTop = 0
  }
  selectedAnchor.value = name
}
// const fetchChart = (chain: string) => {
//   chartsConfig.map((item, i) => {
//     item.chartAll.map((itemTwo, chartIndex) => {
//       fetchChartData(chain, item.category, i, chartIndex, itemTwo.title)
//     })
//   })
// }
const fetchTableByChain = (chain: String) => {
  tableConfig.map((i, idx) => {
    return fetchTableData(idx, i.name, i.title, i.options, {
      chain,
      category: i.name,
    })
  })
}
const fetchChartByChain = (chain: String) => {
  tableConfig.map((chartItem, tableIndex) => {
    chartItem.charts.map((chart,chartIndex)=>{
      return fetchChartData(tableIndex,chartIndex,chartItem.name,chart.title,chart.requestData,chart.chartData, chart.xyData, {
        chain,
        category: chartItem.name,
        ...chart.param
      })
    })

  })
}

const timer = ref(60)
let timerInterval: any = null
const isFirstShow = ref(true)
const intervalFetchTableByChain = (chainId: string, timeout = 60) => {
  fetchTableByChain(chainId)
  fetchChartByChain(chainId)
  timerInterval = setInterval(() => {
    if (timer.value !== 0) {
      timer.value -= 1
      return
    }
    timer.value = timeout
    isFirstShow.value = false
    fetchTableByChain(chainId)
    fetchChart(chainId)
  }, 1000)
}

watch(() => chains.data, (newVal) => {
  if (timerInterval) {
    clearInterval(timerInterval)
    isFirstShow.value = true
    timer.value = 60
    timerInterval = null
  }
  newVal.forEach((i: any) => {
    if (i.select) {
      intervalFetchTableByChain(i.key)
      fetchChart(i.key)
    }
  })
})
onMounted(async () => {
  intervalFetchTableByChain('bsc')
})
onUnmounted(() => clearInterval(timerInterval))
</script>
<template>
  <div class=" flex-col w-full max-w-360  md:mb-25">
    <!-- 头部描述信息-->
    <div class="px-4 md:px-30">
      <div class="text-kd24px100 md:text-kd24px24px  md:text-kd36px36px mt-8 md:mt-9.25">DeFi APY 大全</div>
      <div class="mt-4 text-kd14px22px text-global-default opacity-65 font-normal">
        我们已经为每个加密货币类别创建了索引。类别按24小时价格变化排名。单击密码类别名称可查看指数的组成部分及其最近的价格表现。
      </div>
      <ApyChains :chains="chains"/>
    </div>
    <!-- table表格-->
    <div
        :class="index%2!==0 ? 'cardBg px-4 py-12  md:px-30 md:py-15':'px-4 py-12 md:px-30 md:py-15' "
        v-for="(item,index) in tables"
    >

      <ApyTable :isFirstShow="isFirstShow" :timer="timer" :index="index" :project="item.project" :title="item.title"
                :tableData="item"/>
      <div class="grid  md:gap-10 grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
        <template v-for="(item,i) in charts[index].chartAll">
          <ApyChart  :tableIndex="index" :chartIndex="i" :chartData="item" :id="index+''+i"/>

        </template>

      </div>
    </div>
    <ApyFooter/>
    <!--    浮动tag-->
    <div class="tagContainer  w-18 h-28 flex-col fixed fixed right-2   2xl:right-10 top-70">
      <template v-for="item in anchorConfig">
        <a @click="clickAnchor(item.name)" :href="'#'+item.key"
           :class="selectedAnchor===item.name? 'floatRightTag  selectRightTag hand':'floatRightTag  rightTag hand' "
        >{{ item.name }}</a>
      </template>
    </div>
  </div>
</template>
<style scoped lang="postcss">
@media screen and (max-width: 768px) {
  .heightAuto {
    height: calc(100vh - 357px);
  }
}

@media screen and (min-width: 768px) {
  .heightAuto {
    height: calc(100vh - 417px);
  }
}

.floatRightTag {
  @apply text-kd12px16px font-medium mb-4  pl-2;
}

.selectRightTag {

  border-left: 2px solid #2B8DFE;
  @apply relative right-0.3 block  text-global-primary;
}

.rightTag {
  @apply text-global-default block opacity-65;
}

.cardBg {
  background-image: url('https://res.ikingdata.com/nav/apyCardBg.png');
  background-size: cover;
}

.selected {

}

.tagContainer {
  border-left: 1px solid rgba(37, 62, 111, 0.1);
}


@media screen and (max-width: 880px) {
  .tagContainer {
    display: none;
  }
}

.rightTag {
  box-shadow: inset 1px 0px 0px rgba(37, 62, 111, 0.1);
}

.leftBorder {
  border-left: 2px solid #2B8DFE;
}
</style>
