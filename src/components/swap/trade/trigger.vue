<script setup lang="ts">
import { ref } from 'vue'
// @ts-ignore
import { uuid } from '~/utils'

const showStatus = ref<boolean>(true)

// @ts-ignore
const onShowSwap = function() {
  showStatus.value = true
}
// @ts-ignore
const onHideSwap = function() {
  showStatus.value = false
}
// @ts-ignore
const pair = '0x6dd2993b50b365c707718b0807fc4e344c072ec2'


</script>

<template>
  <div class="inline-block">
    <div class="swap-trigger" @click="onShowSwap">
      <span class="text-white text-sm">交易</span>
    </div>
  </div>
  <template v-if="showStatus">
    <el-drawer title="" v-model="showStatus" size="400px" direction="ltr" :append-to-body="true" :withHeader="false" :show-close="false" :before-close="onHideSwap" destroy-on-close>
      <SwapTradeSwap :key="uuid(pair)" :pair="pair"/>
    </el-drawer>
  </template>
</template>

<style scoped lang="scss">
  .swap-trigger {
    @apply min-w-23 text-center bg-global-primary inline-block rounded cursor-pointer py-1 px-3;
  }
</style>

