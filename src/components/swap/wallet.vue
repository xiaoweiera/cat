<script setup lang="ts">
import { Web3Util } from '~/utils/ethereum/util'
import { onMounted, ref } from 'vue'
import Message from '~/utils/message'
import safeGet from '@fengqiaogang/safe-get'

const address = ref<string>('')

// 链接钱包
// @ts-ignore
const openWallet = async function() {
  if (address.value) {
    return
  }
  const web3 = new Web3Util()
  try {
    await web3.enableEthereum()
  } catch (e) {
    const code = safeGet(e, 'code')
    if (code === -32002) {
      Message.alert('提示', '请先关闭已有的 MetaMask 连接窗口后在试一次')
    } else {
      Message.alert('提示', '请先安装 MetaMask 插件并且登录')
    }
  }
}

const ready = function() {
  const web3 = new Web3Util()
  try {
    // 监听用户钱包地址
    web3.onChangeAccount(function(value: string) {
      if (value) {
        address.value = value.replace(/(\w{3})\w*(\w{4})/,"$1****$2")
      } else {
        address.value = ''
      }
    })
  } catch (e) {
    Message.alert('提示', '请先安装 MetaMask 插件并且登录')
  }
}

onMounted(ready)

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
