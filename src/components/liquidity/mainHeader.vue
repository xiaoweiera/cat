<script setup lang="ts">
import { ref,watch,onMounted } from 'vue'
import { pairStore,paramChart,symbolStore,analysisType} from '~/store/liquidity/state'
import {useRoute, useRouter} from 'vue-router'
import {changeRouteParam,smallToken} from '~/lib/tool'
import I18n from '~/utils/i18n/index'
const getHref=(id:string)=>`https://hecoinfo.com/address/${id}?utm_source=https://ikingdata.com/liquidity`
const route = useRoute()
const router = useRouter()
const closePair = () => {
  pairStore.id = null
  //这里触发了两次监听  ---tip me
  paramChart.tokenType='pair'
  changeRouteParam(route,router,{pair:undefined,pairName:undefined})
}
const getDesc=()=>{
  if(pairStore.id){
    return  I18n.template(I18n.liquidity.mainHeader.payData, {pair:pairStore.orderTokenName})
  }else{
    return I18n.template(I18n.liquidity.mainHeader.liquidity,{token:symbolStore.name})
  }
}
</script>
<template>
  <div class="flex w-full h-14.5 min-h-14.5 items-center justify-between px-5 bg-white font-kdFang bottomBorder">
    <!--    类型切换-->
    <div class="flex h-full items-center">
      <div v-if="pairStore.id" class="flex items-center mr-4">
        <a :href="getHref(pairStore.id)" target="_blank" class="bg-global-primary bg-opacity-8 rounded px-1.5 py-0.4">
          <span class="text-kd16px160 text-global-primary font-kdExp">{{pairStore.orderTokenName }}</span>
          <span class="text-kd14px160 text-global-primary font-kdFang ml-2.5">{{smallToken(pairStore.id) }}</span>
        </a>
        <img class="w-4 h-4 ml-1.5 cursor-pointer" src="https://res.ikingdata.com/nav/cardClose.png" alt="" @click="closePair"/>
      </div>
      <div class="font-kdFang text-kd13px19px text-global-default text-opacity-45 font-normal">{{getDesc()}}</div>
    </div>
    <!--    时间筛选-->
    <div class="flex">
      <LiquidityHeaderOption/>
    </div>
  </div>
</template>
<style scoped lang="postcss">
.tagDefault {
  border-bottom: 2px solid white;
  @apply kd-16px24px text-global-default opacity-65 mr-6 cursor-pointer;
}

.tagSelect {
  border-bottom: 2px solid rgba(43, 141, 254, 1);
  @apply text-kd16px24px text-global-primary mr-6 cursor-pointer  h-full flex items-center;
}

.bottomBorder {
  border-bottom: 1px solid rgba(37, 62, 111, 0.04);
}
</style>
