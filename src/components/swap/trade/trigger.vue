<script setup lang="ts">
// @ts-ignore
import { uuid } from '~/utils'
import { ref, defineProps, computed } from 'vue'
// @ts-ignore
import { getConnected, getAddress } from '~/utils/ethereum/status'

defineProps( {
  pair: {
    type: String,
    required: true
  }
})

const showStatus = ref<boolean>(true)

// @ts-ignore
const onShowSwap = function() {
  showStatus.value = true
}
// @ts-ignore
const onHideSwap = function() {
  showStatus.value = false
}

const userAddress = ref<string>('')

// @ts-ignore
const awalletAddress = computed<string>(function() {
  if (userAddress.value) {
    return userAddress.value
  }
  return getAddress()
})

// @ts-ignore
const onChangeAddress = function(value: string) {
  userAddress.value = value
}

</script>

<template>
  <div class="inline-block">
    <!-- 先判断是否已安装插件 -->
    <Before :app="getConnected" content="请先连接钱包">
      <div class="swap-trigger" @click="onShowSwap">
        <span class="text-white text-sm">交易</span>
      </div>
    </Before>
  </div>
  <template v-if="showStatus">
    <el-drawer title="" v-model="showStatus" size="400px" direction="ltr" :append-to-body="true" :withHeader="false" :show-close="false" :before-close="onHideSwap" destroy-on-close>
      <SwapTradeSwap :key="uuid(pair)" :pair="pair" :wallet-address="awalletAddress">
        <template #wallet>
          <SwapWallet class="w-full text-center" @change="onChangeAddress"/>
        </template>
      </SwapTradeSwap>
    </el-drawer>
  </template>
</template>

<style scoped lang="scss">
  .swap-trigger {
    @apply min-w-23 text-center bg-global-primary inline-block rounded cursor-pointer py-1 px-3;
  }
</style>

