<script setup lang="ts">
import { toRef,defineProps } from 'vue'
import I18n from '~/utils/i18n/index'
const props = defineProps({
  coinType: Object
})
const coinTypeValue=toRef(props.coinType,'value')
const changeTag = (tag: string) => {
  coinTypeValue.value=tag
}
</script>
<template>
  <div class="usdCoinContainer  flex">
    <div @click="changeTag('usd')" :class="coinTypeValue==='usd'?'tagSelected':'tag'">{{I18n.liquidity.mainHeader.usd}}</div>
    <div @click="changeTag('coin')" :class="coinTypeValue==='coin'?'tagSelected':'tag'">{{I18n.liquidity.mainHeader.coin}}</div>
  </div>

</template>
<style scoped lang="postcss">
.usdCoinContainer {
  width:fit-content;
  background: #F6FAFD;
  border-radius: 4px;
  @apply p-0.25  flex  font-kdFang;
}
.tag{
  cursor: pointer;
  border-radius: 2px;
  @apply px-1 py-0.5 flex items-center text-center   text-kd12px16px text-global-default text-opacity-65 font-normal ;
}
.tagSelected {
  cursor: pointer;
  border-radius: 2px;
  @apply px-1 py-0.5 flex items-center text-center   text-kd12px16px bg-global-primary text-white  font-medium ;
}
.timeFilter {
  padding: 2px;
  background: rgba(43, 141, 254, 0.08);
  border-radius: 4px;
}
</style>
