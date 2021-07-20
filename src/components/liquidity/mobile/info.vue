<script lang="ts" setup>
import { ref, defineProps, onMounted,watch } from 'vue'
import { selectCoin,symbolStore } from '~/store/liquidity/state'
import { copyToken } from '~/logic/liquidity/dataTool'
import {smallToken,messageTip,formatRulesNumber,subStr } from '~/lib/tool'
import I18n from '~/utils/i18n'
import { getToken_side } from '~/api/liquidity'
import { getInject,setInject } from '~/utils/use/state'

const props = defineProps({
  symbol: Object,
})
const pairData=getInject('pairData')
const tokenTableShow=getInject('tokenTableShow')
const setTokenTableShow=setInject('tokenTableShow')
const info = ref({})

watch(()=>symbolStore.id,()=>{
  getInfo()
})
const getInfo = async() => {
  const param = {
    platId: 1,
    symbol_id: symbolStore.id,
  }
  const result = await getToken_side(param)
  if (result?.data?.code === 0) {
    info.value = result?.data?.data[0]
    symbolStore.name=info.value.symbol
  }
}
const changeTokenTable=()=>{
  setTokenTableShow(!tokenTableShow.value[0])
  if(!tokenTableShow.value[0]){
    setTimeout(()=>  window.scrollTo(0,3))
  }
}
const getHref=(id:string)=>`https://hecoinfo.com/address/${id}?utm_source=https://ikingdata.com/liquidity`

onMounted(()=>getInfo())
</script>
<template>
  <div class="w-full mt-4.25 relative">
    <div class="flex flex-col font-kdExp ">
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center  w-full">
          <div class="text-global-default opacity-85 font-bold text-kd22px26px  max-w-20 txtSmall">{{subStr(info.symbol) }}</div>
          <div class="ml-1.5 text-global-default opacity-85 text-kd14px20px max-w-20 txtSmall">{{ info.symbol_name }}</div>
          <div class="bg-global-primary ml-1.5 px-1.5 py-0.5 rounded bg-opacity-8 text-global-primary text-kd14px22px">{{ info.exchange }}</div>
          <div @click="changeTokenTable()" :class="tokenTableShow[0]?'selectedPair':'pair'">相关交易对<IconFont :class="tokenTableShow[0]?'selectedIconjiantou':'iconjiantou'" type="icon-xiajiantou"></IconFont></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="postcss">
.pair{
  border:1px solid rgba(43, 141, 254, 0.2);
  font-weight: 500;
  @apply px-2 py-0.5 rounded h-6.5  flex items-center   text-kd12px16px font-kdFang text-global-primary py-0.5 absolute  right-0;
}
.selectedPair{
  border:1px solid rgba(43, 141, 254, 0.2);
  font-weight: 500;
  @apply px-2 py-0.5 rounded h-6.5  flex items-center bg-global-primary   text-kd12px16px font-kdFang text-global-white py-0.5 absolute  right-0;
}
.iconjiantou{
  @apply  text-global-primary ml-2;
}
.selectedIconjiantou{
  @apply text-global-white  ml-2;
}

.txtSmall {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
