<script lang='ts' setup>
import { imgSrc } from '~/logic/cat/config'
</script>
<template>
  <div class='w-82.5 h-58 bg-global-white shadow rounded-kd16px '>
    <div class='text-kd16px24px font-semibold'>Transaction settings</div>
    <div class='mt-4'>
      <span class='text-global-huiBold text-kd16px24px mr-1'>Maximum sold</span>
      <img :src="`${imgSrc}/tip.png`" class='w-3.5 h-3.5' alt=''>
    </div>
  </div>
</template>
<style scoped>
.shadow{
  border: 1px solid #E6E8EC;
  box-sizing: border-box;
  /* 小阴影 */

  box-shadow: 0px 4px 12px rgba(20, 20, 22, 0.06);
}
</style>