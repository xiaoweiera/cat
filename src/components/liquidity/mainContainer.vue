<script lang="ts" setup>
import { platStore } from '~/store/liquidity/state'
</script>
<template>
  <div class="flex flex-1 flex-col">
    {{ platStore }}
    <!--    右侧第一个header-->
    <LiquidityMainHeader />
    <!--    右侧第二个header-->
    <LiquidityMainToken />
    <!--    图表集合-->
    <LiquidityMainChart />
  </div>
</template>
