<script setup lang="ts">
// @ts-ignore
import {ElTooltip} from 'element-plus'
import {defineProps, onBeforeMount, reactive, watch, ref} from 'vue'
import {testData} from '/mock/liquidity'
import {useRoute, useRouter} from 'vue-router'
import * as R from 'ramda'
import {changeRoute,changeRouteParam} from '~/lib/tool'
import {
  pairStore,
  updateData,
} from '~/store/liquidity/state'
import {getPair_side} from '~/api/liquidity'

const route = useRoute()
const router = useRouter()
const props = defineProps({
  symbol:String,
})
const headerData = ['交易对', 'TVL($)', '价格($)', '涨跌幅']
const pairList = ref([])
const changePair = (name: string, id: string) => {
  updateData(pairStore, {name, id})
  changeRouteParam(route,router,{pair:id,pairName:name})

}
const likeStart = (item: any) => console.log(item)
const getPair_list = async () => {
  // const result = await getPair_side({
  //   platId: 1,
  //   symbol_id: props.symbol,
  // })
  // if (result?.data?.code === 0) {
  //   pairList.value = result?.data?.data
  // }
}
onBeforeMount(() => {
  getPair_list()
})
</script>
<template>
  <div class="w-full h-full">
      <ul class="px-3 h-7 w-full flex items-center text-global-default opacity-65 text-kd12px16px font-kdFang tableHeader">
        <li class="flex-1">交易对</li>
        <li class="w-15 pl-1">TVL($)</li>
        <li class="w-15 pl-1">价格($)</li>
        <li class="w-15 pl-1">涨跌幅</li>
      </ul>
      <div class="w-full h-full showY">
        <template v-for="item in testData">
          <div :class="pairStore.id === item.pair_id? 'selectRow': 'defaultRow'" @click="changePair(item.symbol0 + '/' + item.symbol1, item.pair_id)">
            <div class="flex-1 font-kdExp flex items-center overflow-hidden">
              <img class="w-3 h-3" src="https://res.ikingdata.com/nav/noStart.png" alt="" @click="likeStart(item)"/>
              <el-tooltip :hide-after="10" :content="item.symbol0 + '/' + item.symbol1" placement="bottom" effect="light">
                <span class="txtSmall ml-1.5 text-kd12px16px text-global-default opacity-85">
                  {{ item.symbol0 + '/' + item.symbol1 }}
                </span>
              </el-tooltip>
            </div>
            <div class="tokenRow text-kd12px16px text-global-default">{{ item.TVL }}</div>
            <div class="tokenRow text-kd12px16px text-global-default">{{ item.price }}</div>
            <div class="percentGreen text-left">+20%</div>
          </div>
        </template>
      </div>
    </div>
</template>
<style lang="postcss" scoped>
::v-deep(.el-table td) {
  padding: 8px 0;
}

.selectRow {
  border-right: 3px solid rgba(43, 141, 254, 0.9);
  @apply bg-global-primary bg-opacity-18 flex h-7 px-3 selectRow items-center cursor-pointer;
}

.defaultRow {
  border-right: 3px solid #ffffff;
  @apply flex h-7 px-3 selectRow items-center cursor-pointer;
}

.tableHeader {
  border-bottom: 1px solid rgba(37, 62, 111, 0.04);
  border-top: 1px solid rgba(37, 62, 111, 0.04);
}

.txtSmall {
  text-overflow: ellipsis;
  overflow: hidden;
}

.showY {
  overflow: hidden;
  overflow-y: auto;
}

.showY::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.showY::-webkit-scrollbar-thumb:vertical {
  background: rgba(0, 0, 0, 0.1);
}

.tokenRow {
  @apply w-15 pl-1;
}

.percentGreen {
  @apply w-15 pl-1 text-kd12px16px text-global-numGreen;
}

.percentRed {
  @apply w-15 pl-1 text-kd12px16px text-global-numRed;
}
</style>
