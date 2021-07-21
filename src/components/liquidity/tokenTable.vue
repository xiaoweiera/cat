<script setup lang="ts">
// @ts-ignore
import {ElTooltip, ElInfiniteScroll} from 'element-plus'
import {defineProps, onMounted, reactive, watch, ref} from 'vue'
import {symbolStore} from '~/store/liquidity/state'
import {testData} from '/mock/liquidity'
import {useRoute, useRouter} from 'vue-router'
import * as R from 'ramda'

import {changeRoute, changeRouteParam,formatRulesNumber,unitOrder} from '~/lib/tool'
import {
  pairStore,
  updateData,
} from '~/store/liquidity/state'
import {getPair_side} from '~/api/liquidity'
import I18n from '~/utils/i18n/index'
const page = ref(0) //第几页
const next = ref(true) //是否有下一页
const route = useRoute()
const router = useRouter()
const props = defineProps({
  symbol: String,
})
const pairList = ref([])
const changePair = (name: string, id: string) => {
  updateData(pairStore, {name, id})
  changeRouteParam(route, router, {pair: id, pairName: name})

}
watch(() => symbolStore.id, async () => {
  page.value = 0
  next.value = true
  pairList.value = []
  await getPair_list()
})
const likeStart = (item: any) => console.log(item)
const getPair_list = async () => {
  page.value++
  const result = await getPair_side({
    page_size: 100,
    page: page.value,
    platId: 1,
    symbol_id: symbolStore.id,
  })
  if (result?.data?.code === 0) {
    next.value = result?.data?.data.next ? true : false
    R.map(item=>pairList.value.push(item),result?.data?.data.results)
    // pairList.value = pairList.value.concat(result?.data?.data.results)
  }
}
onMounted(() => {
  getPair_list()
})
const load = () => {
  const listDom = document.querySelector('.pairList')
  if (parseInt(listDom.scrollHeight - listDom.scrollTop) === listDom.clientHeight) {
    if (next.value) {
      getPair_list()
    }
  }
}
</script>
<template>
  <ul class="px-3 h-7 w-full flex items-center text-global-default opacity-65 text-kd12px16px font-kdFang tableHeader" style=" border-right: 3px solid #ffffff;">
    <li class="flex-1">{{I18n.liquidity.side.pair}}</li>
    <li class="w-20">TVL($)</li>
    <li class="w-27 ">{{I18n.liquidity.side.price}}</li>
  </ul>
  <div class="w-full h-full showY pairList" @scroll="load">
    <template v-for="item in pairList">
      <div v-login :class="pairStore.id === item.pair_id? 'selectRow': 'defaultRow'" @click="changePair(item.symbol0 + '/' + item.symbol1, item.pair_id)">
        <div class="  flex-1 font-kdExp flex items-center overflow-hidden">
          <el-tooltip :hide-after="10" :content="item.symbol0 + '/' + item.symbol1" placement="bottom" effect="light">
                <span class="txtSmall  text-kd12px16px text-global-default opacity-85">{{ item.symbol0 + '/' + item.symbol1 }}</span>
          </el-tooltip>
        </div>
        <div class="w-20     text-kd12px16px text-global-default">{{ formatRulesNumber(item.tvl,false) }}</div>
        <div class="w-27  text-kd12px16px text-global-default">
          <el-tooltip :hide-after="10" :content="'1:'+formatRulesNumber(item.price,true)" placement="bottom" effect="light">
            <span class="txtSmall  text-kd12px16px text-global-default opacity-85">1:{{ formatRulesNumber(item.price,false) }}</span>
          </el-tooltip>

          </div>
      </div>
    </template>
  </div>
</template>
<style lang="postcss" scoped>
::v-deep(.el-table td) {
  padding: 8px 0;
}
.selectRow {
  border-right: 3px solid rgba(43, 141, 254, 0.9);
  @apply bg-global-primary bg-opacity-18 flex  h-7  px-3  items-center cursor-pointer;
}
.defaultRow {
  border-right: 3px solid #ffffff;
  @apply flex h-7  px-3   items-center cursor-pointer;
}

.tableHeader {
  border-bottom: 1px solid rgba(37, 62, 111, 0.04);
  border-top: 1px solid rgba(37, 62, 111, 0.04);
}

.txtSmall {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.showY {
  overflow: hidden;
  overflow-y: auto;
}

.showY::-webkit-scrollbar {
  height: 8px;
  @apply w-0.5;
}

.showY::-webkit-scrollbar-thumb:vertical {
  background: rgba(0, 0, 0, 0.1);
}


.percentGreen {
  @apply w-15 pl-1 text-kd12px16px text-global-numGreen;
}

.percentRed {
  @apply w-15 pl-1 text-kd12px16px text-global-numRed;
}
</style>
