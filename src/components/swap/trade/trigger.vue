<script setup lang="ts">
import { ref, defineProps } from 'vue'
// @ts-ignore
import { uuid } from '~/utils'
import { getConnected } from '~/utils/ethereum/status'

defineProps( {
  pair: {
    type: String,
    required: true
  }
})

const showStatus = ref<boolean>(false)

// @ts-ignore
const onShowSwap = function() {
  showStatus.value = true
}
// @ts-ignore
const onHideSwap = function() {
  showStatus.value = false
}

// @ts-ignore
const onWalletStatus = function(): boolean {
  console.log(getConnected())
  return false
}

</script>

<template>
  <div class="inline-block">
    <Before :app="onWalletStatus" content="请先连接钱包">
      <div class="swap-trigger" @click="onShowSwap">
        <span class="text-white text-sm">交易</span>
      </div>
    </Before>
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

