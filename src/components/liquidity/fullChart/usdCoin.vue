<script setup lang="ts">
import I18n from '~/utils/i18n/index'
import {  setInject, getInject } from '~/utils/use/state'
const coinType=getInject('coinType')
const set=setInject('coinType')
const changeTag = (tag: string) => {
  set(tag)
}
</script>
<template>
  <div class="usdCoinContainer flex" >
    <div @click="changeTag('usd')" :class="coinType[0]==='usd'?'tagSelected':'tag'">{{I18n.liquidity.mainHeader.usd}}</div>
    <div @click="changeTag('coin')" :class="coinType[0]==='coin'?'tagSelected':'tag'">{{I18n.liquidity.mainHeader.coin}}</div>
  </div>

</template>
<style scoped lang="postcss">
.tag {
  border-radius: 2px;
  cursor: pointer;
  @apply px-2 py-1 text-kd14px18px text-global-default opacity-65 min-w-12 text-center;
}
.tagSelected {
  cursor: pointer;
  border-radius: 2px;
  @apply px-2 py-1 text-kd14px18px text-global-primary bg-white min-w-12 text-center;
}
.usdCoinContainer {
  padding: 2px;
  background: rgba(43, 141, 254, 0.08);
  border-radius: 4px;
}
</style>
