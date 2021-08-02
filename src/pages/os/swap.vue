<script setup lang="ts">
// @ts-ignore
import { ChainId } from '~/utils/ethereum/chainlist'
</script>

<template>
  <div class="p-5">
    <!-- 默认为 ht 网络 -->
    <SwapWallet :chain-id="ChainId.HT"></SwapWallet>
    <br/>
    <br/>
    <div>
      <SwapTradeTrigger :chain-id="ChainId.HT" pair="0x6dd2993b50b365c707718b0807fc4e344c072ec2"/>
    </div>
  </div>
</template>

// @formatter:off
<route lang="yaml">
meta:
  layout: index
</route>
// @formatter:off

