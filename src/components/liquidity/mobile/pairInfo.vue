<script setup lang="ts">
import { ref,watch,onMounted,computed } from 'vue'
import { pairStore,symbolStore,paramChart} from '~/store/liquidity/state'
import {useRoute, useRouter} from 'vue-router'
import {changeRouteParam,smallToken,subStrByNumber,messageTip} from '~/lib/tool'
import I18n from '~/utils/i18n/index'
import { copyToken } from '~/logic/liquidity/dataTool'
const getHref=(id:string)=>`https://hecoinfo.com/address/${id}?utm_source=https://ikingdata.com/liquidity`
const route = useRoute()
const router = useRouter()
const closePair = () => {
  pairStore.id = null
  //这里触发了两次监听  ---tip me
  paramChart.tokenType='pair'
  changeRouteParam(route,router,{pair:undefined,pairName:undefined})
}

const  copy=()=>{
  copyToken(pairStore.id)
  messageTip(I18n.liquidity.message.success,'success')
}
const pairName=computed(()=>{
  return subStrByNumber(pairStore.name.split('/')[0],5)+'/'+subStrByNumber(pairStore.name.split('/')[1],5)
})
</script>
<template>
  <div class="flex w-full h-14.5  items-center justify-between  bg-white font-kdFang bottomBorder">
    <!--    类型切换-->
    <div class="flex h-full justify-between items-center w-full">
      <div v-if="pairStore.id" class="flex items-center">
        <div target="_blank" class="bg-global-primary bg-opacity-8 rounded px-1.5 py-0.4">
          <span class="text-kd16px160 text-global-primary font-kdExp">{{pairName}}</span>
        </div>
        <img class="w-4 h-4 ml-1.5 cursor-pointer" src="https://res.ikingdata.com/nav/cardClose.png" alt="" @click="closePair"/>
      </div>
      <div class="flex items-center">
       <div class="flex items-center"><span class="text-kd12px16px text-global-default text-opacity-65 mr-1.5 ">Piar {{I18n.liquidity.address}}</span> <span class="text-kd14px160 text-global-primary font-kdFang">{{smallToken(pairStore.id) }}</span></div>
        <IconFont @click="copy()" class="ml-1.5 hand flexopacity-65 text-global-default" type="copy" size="base"></IconFont>
      </div>
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
