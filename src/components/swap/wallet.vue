<script setup lang="ts">
import { Web3Util } from '~/utils/ethereum/util'
import { onMounted, ref, defineEmit } from 'vue'
import Message from '~/utils/message'
import safeGet from '@fengqiaogang/safe-get'

const emitEvent = defineEmit(['change'])

const address = ref<string>('')

// @ts-ignore
let web3: Web3Util

const onWatchAddress = function() {
  try {
    // 监听用户钱包地址
    web3.onChangeAccount(function(value: string) {
      if (value) {
        address.value = value.replace(/(\w{3})\w*(\w{4})/,"$1****$2")
      } else {
        address.value = ''
      }
      emitEvent('change', value)
    })
  } catch (e) {
  }
}


// 链接钱包
// @ts-ignore
const openWallet = async function() {
  if (address.value) {
    return
  }
  try {
    await web3.enableEthereum()
    onWatchAddress()
  } catch (e) {
    const code = safeGet(e, 'code')
    if (code === -32002) {
      Message.alert('提示', '请先关闭已有的 MetaMask 连接窗口后在试一次')
    } else if (code === 4001) {
      Message.alert('提示', '连接失败，请重试')
    } else {
      Message.alert('提示', '请先安装 MetaMask 插件并且登录')
    }
  }
}

onMounted(function() {
  web3 = new Web3Util('')
  onWatchAddress()
})

</script>

<template>
  <div class="py-2.5 px-3 bg-global-primary inline-block rounded cursor-pointer" @click="openWallet">
    <IconFont type="icon-wallet" class="text-white text-base"></IconFont>
    <template v-if="address">
      <span class="text-white ml-1">{{ address }}</span>
    </template>
    <template v-else>
      <span class="text-white ml-1">链接钱包</span>
    </template>
  </div>
</template>
