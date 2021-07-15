<script setup lang="ts">
import { getInject } from '~/utils/use/state'
const coinType=getInject('coinType')
const interval=getInject('interval')
const timeParam=getInject('timeParam')
const pairData=getInject('pairData')
const tokenData=getInject('tokenData')
</script>
<template>
  <div>数据</div>
  <div>{{coinType}}</div>
  <div>{{interval}}</div>
  <div>{{timeParam}}</div>
  <div>{{tokenData}}</div>
  <div>{{pairData}}</div>
</template>
<style scoped lang="postcss">

</style>
