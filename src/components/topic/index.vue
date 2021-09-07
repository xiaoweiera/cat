<script setup lang="ts">
import { ref, reactive, onBeforeMount, watch } from 'vue'
// @ts-ignore
import { param, onReady } from '~/logic/topic/router'
// @ts-ignore
import { menuList, syncMenuList, menuCurrent } from '~/logic/topic/menu'
// @ts-ignore
import { MenuType } from '~/logic/topic/props'

import { uuid } from '~/utils/index'
import { setScrollTop } from '~/utils/event/scroll'

// @ts-ignore
const search = ref<string>('')

const charBoxKey = ref<string>(uuid())

// @ts-ignore
const current = reactive({
  data: {}
})

const makeCharBoxKey = function() {
  const data = {
    // @ts-ignore
    topId: current.data.topicID,
    search: search.value
  }
  charBoxKey.value = uuid(JSON.stringify(data))
}


const setCurrent = function() {
  search.value = '' // 清空搜索内容
  const data = menuCurrent() || {}
  current.data = data
  makeCharBoxKey()
}

watch(param, setCurrent, {
  deep: true
})

// 搜索
// @ts-ignore
const onSearch = function() {
  setScrollTop()
  makeCharBoxKey()
}


onBeforeMount(async () => {
  onReady()
  makeCharBoxKey()
  // 获取菜单列表数据
  await syncMenuList()
  // 设置当前选中的菜单数据
  setCurrent()
})
</script>

<template>
  <div class="w-full flex">
    <div class="w-72 hidden md:block">
      <div class="fixed -bottom-0 -left-0 top-header w-72 z-10">
        <div class="w-full h-full">
          <div class="menu-box w-full h-full overflow-y-auto overflow-x-hidden bg-white">
            <div class="search-box h-14 flex items-center" v-login>
              <el-input v-model="search" placeholder="搜索" @change="onSearch">
                <template #prefix>
                  <IconFont type="icon-sousuo" class="flex text-base"></IconFont>
                </template>
              </el-input>
            </div>
            <template v-if="menuList.length > 0">
              <TopicMenu :list="menuList" icon-size="2xl"></TopicMenu>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-auto w-1" v-if="menuList.length > 0">
      <div class="max-w-full" v-if="current.data.topicID">
        <TopicTitle :menu="current.data"/>
        <div>
          <!-- 精选推荐广告位 -->
          <template v-if="current.data.type && current.data.type === MenuType.recommend">
            <TopicRecommend :menu="current.data"/>
          </template>
          <!-- 图表列表 -->
          <TopicChart :key="charBoxKey" :menu="current.data" :query="search"/>
        </div>
      </div>
      <div class="hidden">
        <UiWechatShare title="KingData 数据图表" content="加密资产数据分析必备工具"/>

        <UiHeaderTitle value="KingData 数据图表"/>
        <UiHeaderMeta name="keywords" content="BTC, ETH, EOS, USDT, 波卡, DeFi, DOT,智能投研, 大数据分析, coinmarket, 数字货币数据分析,数字货币行业大数据, 虚拟币数据分析, Coinmarketcap, 中文版 Coinmarketcap, 区块链, 大数据, 数据分析, 比特币, 莱比特, 以太坊, ETH, EOS, 钱包, 共识算法, 舆情分析, cryptocompare, coinmarket, 数字货币数据分析,投资,投资顾问, 智能投资,智投,投资工具,数据分析,数据可视化,Digital currency data analysis, Digital currency industry big data, 数字货币行业大数据, 虚拟币数据分析, Virtual currency data analysis, 中文版Coinmarketcap, blockchain, big data, BTC, 比特币, 莱比特, LTC, 以太坊, ETH, EOS, 钱包, wallet, 共识算法, 舆情分析, Consensus algorithm,cryptocompare, Public opinion analysis"/>
        <UiHeaderMeta name="description" content="KingData 全球领先的区块链分析搜索引擎，基于区块链交易构成的复杂关系网络，以及行业不同领域的数据特性，运用图计算、机器学习和图构建等技术，为用户提供区块链行业在交易、安全，投研、溯源、可视化、Dapp等领域的专业数据服务。"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .menu-box {
    box-shadow: 0.25rem 0 0.75rem rgba(44,140,248,0.08);
  }
  .search-box {
    border-bottom: 1px solid rgba(37,62,111,.04);
    ::v-deep(input) {
      border: 0;
      background: none;
    }
    ::v-deep(.el-input__prefix) {
      @apply top-1/2 h-5 transform -translate-y-1/2;
    }
  }
</style>
