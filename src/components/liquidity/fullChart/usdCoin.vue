<script setup lang="ts">
import { toRef,defineProps } from 'vue'
import * as R from 'ramda'
import { paramChart } from '~/store/liquidity/state'
import {  setInject, getInject } from '~/utils/use/state'
const coinType=getInject('coinType')
const set=setInject('coinType')
const changeTag = (tag: string) => {
  set(tag)
}
</script>
<template>
  <div class="usdCoinContainer flex">
    {{coinType}}
    <div @click="changeTag('usd')" :class="coinType[0]==='usd'?'tagSelected':'tag'">USD 计价</div>
    <div @click="changeTag('coin')" :class="coinType[0]==='coin'?'tagSelected':'tag'">币本位计价</div>
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
