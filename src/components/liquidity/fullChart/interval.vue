<script setup lang="ts">
import { toRef,defineProps } from 'vue'
import * as R from 'ramda'
import { paramChart } from '~/store/liquidity/state'
import {  setInject, getInject } from '~/utils/use/state'
const interval=getInject('interval')
const set=setInject('interval')
const changeTag = (tag: string) => {
  set(tag)
}

</script>
<template>
  <div class="usdCoinContainer flex">
    <div @click="changeTag('1H')" :class="interval[0]==='1H'?'tagSelected':'tag'">1H</div>
    <div @click="changeTag('1D')" :class="interval[0]==='1D'?'tagSelected':'tag'">1D</div>
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
