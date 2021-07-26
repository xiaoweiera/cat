<script lang="ts" setup>
import { ref, defineProps, onMounted,watch } from 'vue'
import {pairStore,symbolStore,updateData } from '~/store/liquidity/state'
import { copyToken } from '~/logic/liquidity/dataTool'
import {smallToken,messageTip,formatRulesNumber,subStr } from '~/lib/tool'
import I18n from '~/utils/i18n'
import { getToken_side } from '~/api/liquidity'
const props = defineProps({
  symbol: Object,
})
const info = ref({})
const  copy=(tokenId:string,type:string)=>{
  copyToken(tokenId)
  messageTip(I18n.liquidity.message.success,'success')
}

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
    //得到token颠倒到前面的交易对名称
    let orderTokenName=''
    const [symbol0,symbol1]=pairStore.name.split('/')
    if(symbolStore.name===symbol0){
      orderTokenName= symbol0 + '/' + symbol1
    }else{
      orderTokenName= symbol1 + '/' + symbol0
    }
    updateData(pairStore, {orderTokenName})
  }
}
const getHref=(id:string)=>`https://hecoinfo.com/address/${id}?utm_source=https://ikingdata.com/liquidity`
onMounted(()=>getInfo())
</script>
<template>
  <div class="w-full sideHeader">
    <!--      logo和搜索框-->
    <LiquiditySelectContainer />
    <!--      token的信息-->
    <div class="flex flex-col font-kdExp py-3 px-3">
      <!--      {{selectCoin}}-->
      <!--        币信息-->
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center">
          <div class="text-global-default opacity-85 font-normal text-kd30px28px">{{subStr(info.symbol) }}</div>
          <div class="ml-1.5 text-global-default opacity-85 text-kd14px20px">{{ info.symbol_name }}</div>
          <div class="bg-global-primary ml-1.5 px-1.5 py-0.5 rounded bg-opacity-8 text-global-primary text-kd14px22px">{{ info.exchange }}</div>
        </div>
<!--        <img src="https://res.ikingdata.com/nav/liquStart.png" class="w-5 h-5" alt=""/>-->
      </div>
      <!-- 涨幅-->
      <div class="flex items-center mt-1.5">
        <span class="text-global-default opacity-85 text-kd20px28px">${{formatRulesNumber(info.price)}}</span>
<!--        <div class="flex items-center bg-global-numRed px-1 py-0.25 ml-1.5" style="border-radius: 2px">-->
<!--          <img src="https://res.ikingdata.com/nav/liquUp.png" class="w-2 h-3" alt=""/>-->
<!--          &lt;!&ndash;          <span class="text-kd12px18px text-white ml-0.5">130%</span>&ndash;&gt;-->
<!--        </div>-->
      </div>
      <!-- TVL-->
      <div class="flex items-center mt-1.5">
        <span class="text-kd14px20px text-global-default opacity-65">{{I18n.liquidity.side.tvlNumber}}:</span>
        <span class="text-kd20px28px text-global-default opacity-85 ml-1.5">${{ info.tvl ? formatRulesNumber(info.tvl) : '-' }}</span>
      </div>
      <div class="flex items-center font-kdFang mt-1.5">
        <span class="text-kd12px16px text-global-default opacity-35">{{I18n.liquidity.info.tokenAddress}}</span>
        <a :href="getHref(info.symbol_id)" target="_blank" class="ml-1.5 text-global-primary text-kd14px20px">{{smallToken(info.symbol_id) }}</a>
        <IconFont @click="copy(info.symbol_id)" class="ml-2 hand flex mb-1 opacity-65" type="copy" size="base"></IconFont>
      </div>
    </div>
  </div>
</template>
<style scoped lang="postcss">

.sideHeader {
  height: 205px;
  background: linear-gradient(
    113.75deg,
    rgba(133, 153, 255, 0.06) 0%,
    rgba(144, 208, 255, 0.14) 61.65%,
    rgba(211, 140, 255, 0.05) 86.96%,
    rgba(253, 119, 135, 0.04) 100%
  );
}
</style>
