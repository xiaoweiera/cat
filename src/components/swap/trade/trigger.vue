<script setup lang="ts">
// @ts-ignore
import { uuid } from '~/utils'
import { ref, defineProps, computed, onMounted } from 'vue'
import Wallet from '~/utils/ethereum/wallet'
import { EventType } from '~/utils/ethereum/interface'

const props = defineProps( {
  pair: {
    type: String,
    required: true
  },
  chainId: {
    type: Number,
    required: true
  }
})

let wallet:Wallet

const showStatus = ref<boolean>(true)
const swapDisabled = ref<boolean>(false)

// @ts-ignore
const onShowSwap = function() {
  showStatus.value = true
}
// @ts-ignore
const onHideSwap = function() {
  showStatus.value = false
}

// 监听钱包状态
const watchWalletStatus = async function() {
  // 判断网络是否正确
  const status = wallet.expectNetWork()
  if (status) {
    // 判断钱包地址（用户是否已授权）
    const address = await wallet.getChainAddress()
    if (address) {
      swapDisabled.value = false
      return
    }
  }
  swapDisabled.value = true
}


onMounted(function() {
  wallet = new Wallet(props.chainId)
  wallet.on(EventType.account, watchWalletStatus)
  watchWalletStatus()
})



</script>

<template>
  <div class="inline-block">
    <!-- 先判断是否已安装插件 -->
    <el-button type="primary" class="swap-trigger" :disabled="swapDisabled" @click="onShowSwap">
      <span class="text-sm">交易</span>
    </el-button>
  </div>
  <template v-if="showStatus && !swapDisabled">
    <el-drawer title="" v-model="showStatus" size="400px" direction="rtl" :append-to-body="true" :withHeader="false" :show-close="false" :before-close="onHideSwap" destroy-on-close>
      <SwapTradeSwap :key="uuid(pair)" :chain-id="chainId" :pair="pair"/>
    </el-drawer>
  </template>
</template>

<style scoped lang="scss">
  .swap-trigger {
    @apply min-w-23 text-center inline-block rounded cursor-pointer py-1 px-3;
  }
</style>

