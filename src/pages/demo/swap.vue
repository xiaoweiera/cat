<script setup lang="ts">
// @ts-ignore
import { ChainId } from '~/utils/ethereum/chainlist'
import { ref } from 'vue'

// @ts-ignore
const pair = ref<string>('0x6dd2993b50b365c707718b0807fc4e344c072ec2')
</script>

<template>
  <div class="p-5">
    <!-- 默认为 ht 网络 -->
    <SwapWallet :chain-id="ChainId.HT"></SwapWallet>
    <br/>
    <br/>

    <div class="flex w-150 py-10 items-center">
      <div>
        <span>Pair 测试地址:</span>
      </div>
      <div class="flex-1 ml-3">
        <el-input v-model="pair" placeholder="请输入"></el-input>
      </div>
    </div>

    <div>
      <SwapTradeTrigger :chain-id="ChainId.HT" :pair="pair"/>
    </div>
  </div>
</template>

// @formatter:off
<route lang="yaml">
meta:
  layout: index
</route>
// @formatter:off

