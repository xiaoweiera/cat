<script lang="ts" setup>
// @ts-ignore

</script>
<template>
<div   class="w-30 h-30  border-1 animal">aaa</div>
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
