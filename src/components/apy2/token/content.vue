<script setup lang="ts">
import { toBoolean } from '~/utils'
import I18n from '~/utils/i18n/index'
import { defineProps, onMounted, reactive, ref, toRaw } from 'vue'
import { getTokenDetail } from '~/logic/apy2/token'
import { TabCategoryData } from '~/logic/apy2/interface'
import safeGet from '@fengqiaogang/safe-get'
import makeRouterPath, { getParam, getLocation } from '~/utils/router'
import { toNumber } from '~/utils'
import DBList from '@fengqiaogang/dblist'

const props = defineProps({
  symbol: {
    type: String,
    required: true
  },
  category: {
    type: Array,
    required: true
  }
})

const detail = reactive({
  name: '',
  icon: '',
  prince: 0,
  change: 0,
  mining_followed: false, // 挖矿收藏
  lend_followed: false    // 借贷收藏
})
const active = ref<string>('')

const upDetail = async function() {
  const data: any = await getTokenDetail(props.symbol)
  detail.name = safeGet<string>(data, 'name')
  detail.icon = safeGet<string>(data, 'icon')

  detail.mining_followed = toBoolean(safeGet<boolean>(data, 'mining_followed'))
  detail.lend_followed = toBoolean(safeGet<boolean>(data, 'lend_followed'))

  detail.prince = safeGet<number>(data, 'ticker.prince')
  detail.change = safeGet<number>(data, 'ticker.change_percent')
}

const getUrl = function(value: string): string {
  const { path } = getLocation()
  const query = { symbol: props.symbol, category: value }
  const data: any = { path, query }
  return makeRouterPath(data)
}

onMounted(function() {
  if (props.category) {
    const category: any[] = toRaw(props.category)
    const db = new DBList(category)
    const key = getParam<string>('category')
    const item = db.selectOne({ id: key })
    if (item) {
      // @ts-ignore
      active.value = key
      upDetail()
    } else {
      const id = safeGet<string>(category, '[0].id')
      if (id) {
        window.location.replace(getUrl(id))
      }
    }
  }
})

</script>

<template>
  <div class="text-kdFang">
    <div class="hidden" v-if="symbol">
      <UiHeaderTitle :value="I18n.template(I18n.apyIndex.pageToken.title, { symbol: symbol })"/>
      <UiWechatShare :title="I18n.template(I18n.apyIndex.pageToken.title, { symbol: symbol })" :content="I18n.apyIndex.pageToken.content"/>
      <UiHeaderMeta name="keywords" content="BTC, ETH, EOS, USDT, 波卡, DeFi, DOT,智能投研, 大数据分析, coinmarket, 数字货币数据分析,数字货币行业大数据, 虚拟币数据分析, Coinmarketcap, 中文版 Coinmarketcap, 区块链, 大数据, 数据分析, 比特币, 莱比特, 以太坊, ETH, EOS, 钱包, 共识算法, 舆情分析, cryptocompare, coinmarket, 数字货币数据分析,投资,投资顾问, 智能投资,智投,投资工具,数据分析,数据可视化,Digital currency data analysis, Digital currency industry big data, 数字货币行业大数据, 虚拟币数据分析, Virtual currency data analysis, 中文版Coinmarketcap, blockchain, big data, BTC, 比特币, 莱比特, LTC, 以太坊, ETH, EOS, 钱包, wallet, 共识算法, 舆情分析, Consensus algorithm,cryptocompare, Public opinion analysis"/>
      <UiHeaderMeta name="description" content="KingData 全球领先的区块链分析搜索引擎，基于区块链交易构成的复杂关系网络，以及行业不同领域的数据特性，运用图计算、机器学习和图构建等技术，为用户提供区块链行业在交易、安全，投研、溯源、可视化、Dapp等领域的专业数据服务。"/>
    </div>
    <div class="flex justify-between md:flex-row flex-col">
      <div class="flex items-center font-kdExp">
        <IconFont class="xshidden" :type="detail.icon" size="40" rounded/>
        <IconFont class="mdhidden" :type="detail.icon" size="32" rounded/>
        <b style="font-size:24px;" class="title ml-2 font-bold text-global-highTitle text-opacity-85">{{ detail.name }}</b>
        <span class="md:ml-4 ml-2 text-xl text-global-highTitle text-opacity-85">${{ toNumber(detail.prince) }}</span>
        <div class="ml-2 bg-global-numRed flex items-center  pt-0.5 px-1 font-kdExp md:rounded rounded-kd4px">
          <div  class="text-global-white flex items-center md:text-kd16px24px text-kd14px18px">{{ toNumber(detail.change) }}%</div>
        </div>
      </div>

      <div class="flex items-center md:rounded-xl rounded-kd12px md:mt-0 mt-8 bg-global-highTitle bg-opacity-6 p-1" :class="{ 'hidden': category.length <= 1  }">
        <template v-for="item in category" :key="item.id">
          <router-link class="page-switch flex-1  text-center flex justify-center " :class="{'active': active === item.id}" :to="getUrl(item.id)">
            <IconFont class="xshidden" type="icon-danbi" size="24"/>
            <IconFont class="mdhidden" type="icon-danbi" size="20"/>
            <span class="ml-2 text-kd12px16px w-fit whitespace-nowrap">{{ item.name }}</span>
            <!-- 收藏 -->
            <Apy2BaseFollow class="ml-1.5" :type="item.id" :value="symbol" :status="detail[item.followed]"/>
          </router-link>
        </template>
      </div>
    </div>
    <div class="mt-8 pt-0.5" v-if="detail.name">
      <!--挖矿收益-->
      <template v-if="TabCategoryData.mining === active">
        <Apy2TokenMining :symbol="detail.name" :type="active" :key="active"/>
      </template>
      <!--利率收益-->
      <template v-else-if="TabCategoryData.deposit === active">
        <Apy2TokenDeposit :symbol="detail.name" :type="active" :key="active"/>
      </template>
    </div>
  </div>

</template>

<style scoped lang="scss">
.title {
  font-size: 1.75rem;
}

.page-switch {
  @apply inline-block h-9 flex items-center px-3.5  rounded-lg overflow-hidden text-global-highTitle text-opacity-65;
  &.active {
    @apply bg-global-white text-global-primary text-opacity-100;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.1);
  }
}
</style>

