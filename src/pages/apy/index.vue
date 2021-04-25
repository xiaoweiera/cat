<script setup lang="ts">
import {onMounted, onUnmounted, reactive, ref, watch} from 'vue'
import { requestTables, defaultChains } from '~/logic/apy'
import { chainConfig, tableConfig, anchorConfig } from '~/logic/apy/config'

const { chains } = defaultChains(chainConfig)
const {
  tables,
  requestData: fetchTableData,
} = requestTables()
const selectedAnchor = ref('存款 APY')
const clickAnchor = (name: String) => {
  if (name === '回到顶部') {
    document.scrollingElement.scrollTop = 0
  }
  selectedAnchor.value = name
}
const fetchTableByChain = (chain: String) => {
  tableConfig.map((i, idx) => {
    return fetchTableData(idx, i.name, i.title, i.options, {
      chain,
      category: i.name,
    })
  })
}

const timer = ref(60)
let timerInterval = null
const intervalFetchTableByChain = (chainId: String, timeout=60) => {
  fetchTableByChain(chainId)
  timerInterval = setInterval(() => {
    if (timer.value !== 0) {
      timer.value -= 1
      return
    }
    timer.value = timeout
    fetchTableByChain(chainId)
  }, 1000)
}

watch(() => chains.data, (newVal) => {
  if (timerInterval) {
    clearInterval(timerInterval)
    timer.value = 60
    timerInterval = null
  }
  newVal.forEach((i) => {
    if (i.select) {
      intervalFetchTableByChain(i.key)
    }
  })
})
onMounted(async() => intervalFetchTableByChain('bsc'))
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

      <ApyTable :timer="timer"  :index="index" :project="item.project" :title="item.title" :tableData="item"/>
      <div class="grid  md:gap-10 grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
        <div v-for="(chartType,i) in []" class="flex flex-col mt-8 md:mt-5 relative">
          <!--          描述信息-->
          <ApyDes/>
          <!--          平台列表-->
          <ApyPlat/>
          <!--          图表-->
          <ApyChart line="1" :chartType="chartType" :chain="tagSelet" :id="'one'+index+i"/>
          <div v-if="i>0" class=" absolute border-1 h-full -left-6 "></div>
        </div>
      </div>
    </div>
    <ApyFooter/>
    <!--    浮动tag-->
    <div class="tagContainer  w-18 h-28 flex-col fixed fixed right-2  2xl:right-40 top-70">
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
