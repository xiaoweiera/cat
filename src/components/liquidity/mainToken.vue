<script setup lang="ts">
import { ref,watch } from 'vue'
import { pairStore,paramChart } from '~/store/liquidity/state'
import {useRoute, useRouter} from 'vue-router'
import {changeRouteParam,smallToken} from '~/lib/tool'
const filterType = ref([
  { name: 'Pair', value: 'pair', selected: true },
  { name:pairStore.name.split('/')[0] , value: 'eth', selected: false },
  { name: pairStore.name.split('/')[1], value: 'usdt', selected: false },
])
watch(()=>pairStore.name,(n,o)=>{
  filterType.value=[
    { name: 'Pair', value: 'pair', selected: true },
    { name:pairStore.name.split('/')[0] , value: 'eth', selected: false },
    { name: pairStore.name.split('/')[1], value: 'usdt', selected: false },
  ]
})

const route = useRoute()
const router = useRouter()
const closePair = () => {
  pairStore.id = null
  changeRouteParam(route,router,{pair:undefined,pairName:undefined})
}
</script>
<template>
  <div class="flex h-13.5 items-center justify-between px-5 bg-white">
    <!--    选择的token标签-->
    <div class="flex items-center">
      <div class="bg-global-primary bg-opacity-8 rounded px-1.5 py-0.4">
        <span class="text-kd16px160 text-global-primary font-kdExp">{{pairStore.name }}</span>
        <span class="text-kd14px160 text-global-primary font-kdFang ml-2.5">{{smallToken(pairStore.id) }}</span>
      </div>
      <img class="w-4 h-4 ml-1.5 cursor-pointer" src="https://res.ikingdata.com/nav/cardClose.png" alt="" @click="closePair"/>
    </div>
    <!--    筛选呀-->
    <div>
      <LiquidityFilterType tag-type="tokenType" :filter-data="filterType" />
    </div>
  </div>
</template>
<style scoped lang="postcss"></style>
