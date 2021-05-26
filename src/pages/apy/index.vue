<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue'
// import { useRouter } from 'vue-router'
import { requestTables, defaultChains, requestChart } from '~/logic/apy'
// @ts-ignore
import {
  chainConfig,
  tableConfig,
  anchorConfig,
  chartsConfig,
} from '~/logic/apy/config'
import { wxShare } from '~/lib/wxShare'
const { chains } = defaultChains(chainConfig)
const chainParam = ref('')
// @ts-ignore
const { tables, requestData: fetchTableData } = requestTables()
// @ts-ignore
const { charts, requestChartData: fetchChartData } = requestChart()
const selectedAnchor = ref('机枪池APY')
// 计算元素距离 body 的位置
const offsetY = function(dom: HTMLElement, number = 0): number {
  const body = document.body || document.querySelector('body')
  if (dom) {
    const value = number + dom.offsetTop
    const parent = dom.offsetParent
    if (parent === body) {
      return value
    }
    return offsetY(parent, value)
  }
  return number
}

const clickAnchor = (name: string, key?: string) => {
  if (name === '回到顶部') {
    // @ts-ignore
    document.scrollingElement.scrollTop = 0
  }
  selectedAnchor.value = name
  if (key) {
    const top = offsetY(document.querySelector(`#content-${key}`))
    document.scrollingElement.scrollTop = top
  }
}
const fetchTableByChain = (chain: String) => {
  tableConfig.map((i, idx) => {
    return fetchTableData(idx, i.name, i.title, i.options, {
      chain,
      category: i.name,
    })
  })
}
const fetchChartByChain = (chain: String) => {
  tableConfig.forEach((chartItem, tableIndex) => {
    chartItem.charts.forEach((chart: any, chartIndex: number) => {
      return fetchChartData(
        tableIndex,
        chartIndex,
        chartItem.name,
        chart.title,
        chart.requestData,
        chart.chartData,
        chart.xyData,
        {
          chain,
          category: chartItem.name,
          ...chart.param,
        },
      )
    })
  })
}
const timer = ref(60)
let timerInterval: any = null
const isFirstShow = ref(true)
const newTable = ref([])
const intervalFetchTableByChain = (chainId: string, timeout = 60) => {
  chainParam.value = chainId
  fetchTableByChain(chainId)
  fetchChartByChain(chainId)
  timerInterval = setInterval(() => {
    if (timer.value !== 0) {
      timer.value -= 1
      return
    }
    isFirstShow.value = false
    timer.value = timeout
    isFirstShow.value = false
    fetchTableByChain(chainId)
    fetchChartByChain(chainId)
  }, 1000)
}
watch(
  () => chains.data,
  (newVal) => {
    if (timerInterval) {
      clearInterval(timerInterval)
      isFirstShow.value = true
      timer.value = 60
      timerInterval = null
    }
    newVal.forEach((i: any) => {
      if (i.select) {
        chainParam.value = i.key
        intervalFetchTableByChain(i.key)
      }
    })
  },
)
const selectedMobileAnchor = reactive({ name: '机枪池APY' })
onMounted(() => {
  wxShare(
    'DeFi挖矿收益APY大全',
    '全网最全的挖矿收益APY大全，数百家项目数据多维度对比。',
  )
  // intervalFetchTableByChain('heco')
})
onUnmounted(() => clearInterval(timerInterval))
</script>
<template>
  <div class="flex-col w-full max-w-360 md:mb-25">
    <!-- 头部描述信息-->
    <div class="px-4 md:px-30">
      <!-- 大屏时隐藏 -->
      <div class="mdhidden mt-6">
        <ApyBanner></ApyBanner>
      </div>
      <div class="flex justify-center items-center mt-4 md:mt-15">
        <div
          style="font-weight: bold"
          class="
            flex
            justify-center
            mr-2
            md:mr-3
            text-kd24px100 text-global-highTitle
            md:text-kd36px36px
          "
        >
          DeFi挖矿收益APY大全
        </div>
        <a
          href="http://ikingdata.mikecrm.com/ijyjMFO?utm_source=https://apy.kingdata.com"
          target="_blank"
          class="goForm text-kd12px20px font-normal"
        >申请收录</a>
      </div>
      <div class="mt-4 text-global-default opacity-65 font-normal">
        <div class="text-kd14px22px md:text-center">
          本站收集整理了多条公链各借贷平台和机枪池的数据,根据类型将其分类方便您的查看。
        </div>
        <div style="color: #e9592d" class="text-kd12px18px md:text-center mt-1">
          风险提示：本站数据来源于各平台的公开数据，本站并未对收录内容做安全审计，内容不构成投资建议，请注意风险。
        </div>
      </div>
      <div class="text-center flex justify-center md:mb-5">
        <!-- active 默认选中项 -->
        <ApyChains :chains="chains" active="heco" />
      </div>
      <!-- 小屏时隐藏 -->
      <div class="xshidden">
        <ApyAds></ApyAds>
      </div>
    </div>

    <!-- table表格-->
    <div v-for="(item, index) in tables" :key="index" class="tableDefault">
      <ApyTableTitle :title="item.title" :timer="timer" />
      <div class="grid md:gap-10 grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
        <template
          v-for="(itemChart, i) in charts[index].chartAll"
          :key="`${index}-${i}`"
        >
          <ApyChart
            v-show="itemChart.option"
            :id="index + '' + i"
            :chain-id="chainParam"
            :table-index="index"
            :chart-index="i"
            :chart-data="itemChart"
          />
        </template>
      </div>

      <!-- chain type 等于 hsc(hoo) 时，不展示 单币种机枪池 APY 对比 -->
      <template v-if="chainParam === 'hsc' && index === 0">
        <div></div>
      </template>
      <div v-else :id="`content-${item.slug}`">
        <a class="mdhidden">
          <ApyMobileTag
            :title="item.slug"
            :table-index="index"
            :selected-mobile-anchor="selectedMobileAnchor"
          />
        </a>
        <ApyTable
          :chains="chainParam"
          :is-first-show="isFirstShow"
          :timer="timer"
          :index="index"
          :project="item.project"
          :title="item.title"
          :table-data="item"
        />
      </div>
    </div>
    <ApyFooter />
    <!--浮动tag-->
    <div>
      <div
        class="
          tagContainer
          w-19
          h-28
          flex-col
          2xl:right-10
          fixed
          right-2
          top-70
        "
      >
        <template v-for="(item, index) in anchorConfig" :key="index">
          <a
            class="hand"
            :class="
              selectedAnchor === item.name
                ? 'floatRightTag  selectRightTag hand'
                : 'floatRightTag  rightTag hand'
            "
            @click="clickAnchor(item.name, item.key)"
          >{{ item.name }}</a>
        </template>
      </div>
      <img
        class="mdhidden bottom-10 right-5 w-11 h-11 hand"
        src="https://res.ikingdata.com/nav/apyBack.png"
        @click="clickAnchor('回到顶部')"
      />
    </div>
  </div>
</template>
<style scoped lang="postcss">
.tableDefault {
  @apply px-4 md:px-30 md:mb-15 mb-5;
}

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
  border-left: 2px solid #2b8dfe;
  @apply relative right-0.3 block  text-global-primary;
}

.rightTag {
  @apply text-global-default block opacity-65;
}

.goForm {
  padding: 4px 12px;
  color: rgba(254, 254, 254, 1);
  /* color / 主色 */
  background: #2b8dfe;
  border-radius: 34px;
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
  border-left: 2px solid #2b8dfe;
}
</style>

// @formatter:off
<route lang="yaml">
meta:
  layout: home
</route>
// @formatter:off
