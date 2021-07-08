<script lang="ts" setup>
// @ts-ignore
import {unitDatas} from '~/logic/liquidity/dataCofig'

console.log(unitDatas['单位时间内流动性添加总量'])

</script>
<template>
</template>
<style>
.animal{
  //height: calc( 100vh - 75px);
  //position: absolute;
  background: red;
  //top:75px;
  //bottom:0;
  transition: all 1s;
  //transform: translate(10px, 0);
  //margin-left:50%;
}
.animal:hover{
  font-size: 100px;
  background: white;
  @apply w-50 h-50;
}
</style>
// @formatter:off
<route lang="yaml">
meta:
 layout: liquidityLayout
</route>
// @formatter:off
