<script setup lang="ts">
import * as ethereum from '~/utils/ethereum/index'
import { onMounted, ref } from 'vue'

const address = ref<string>('')

// 更新钱包地址
const updateAddress = function() {
  const value = ethereum.getAddress()
  address.value = value
}

// 链接钱包
const open = async function() {
  const value = ethereum.getAddress()
  if (value) {
    updateAddress()
  } else {
    try {
      await ethereum.enableEthereum()
    } catch (e) {
      // todo
      console.log(e)
    }
  }
}

const ready = function() {
  // 用户账户信息变化
  ethereum.onChangeAccount(function(accounts: string[]) {
    updateAddress()
  })
  // 用户断开链接
  ethereum.onDisconnect(function() {
    updateAddress()
  })
}

onMounted(function() {
  ready()
  updateAddress()
})

</script>

<template>
  <div class="py-2.5 px-3 bg-global-primary inline-block rounded cursor-pointer" @click="open">
    <IconFont type="icon-wallet" class="text-white text-base"></IconFont>
    <template v-if="address">
      <span class="text-white ml-1">{{ address }}</span>
    </template>
    <template v-else>
      <span class="text-white ml-1">链接钱包</span>
    </template>
  </div>
</template>

<style scoped>

</style>
