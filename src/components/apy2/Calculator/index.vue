<script setup lang="ts">
import {ref} from 'vue'
const rate=ref(40)
const marks=ref({
  0: '0°C',
  8: '8°C',
  37: '37°C',
  50: {
    style: {
      color: '#1989FA'
    },
    label: '50%'
  }
})
const getColor=(v:number)=>v>=0?'text-global-numGreen':'text-global-numRed'
</script>
<template>
<div class="font-kdFang cal w-120  p-4  bg-global-white rounded-kd4px">
  <div class="text-kd18px24px text-global-highTitle text-opacity-85 font-medium">真实利率计算器</div>
  <div class="borderGang mt-4"></div>
  <div>
    <div class="mt-4 h-11  flex items-center ">
      <div class="selectLabel mr-3 w-14.5">借贷平台</div>
      <div class="h-11 flex-1 rounded-kd6px borSelect"></div>
    </div>
    <div class="mt-4 h-11  flex items-center ">
      <div class="selectLabel mr-3 w-14.5">抵押币种</div>
      <div class="h-11 flex-1 rounded-kd6px borSelect"></div>
    </div>
    <div class="mt-4 h-11  flex items-center ">
      <div class="selectLabel mr-3 w-14.5">抵押率</div>
      <div class="h-11 flex-1">
        <el-slider v-model="rate" ></el-slider>
      </div>
    </div>
    <div class="mt-4 h-11  flex items-center ">
      <div class="selectLabel mr-3 w-14.5">借出币种</div>
      <div class="h-11 flex-1 rounded-kd6px borSelect"></div>
    </div>
  </div>
  <div class="w-full  text-center">
    <IconFont type="icon-arrow-down" size="24" class="my-4 text-global-highTitle text-opacity-35"/>
  </div>

  <div class="bg-global-primary bg-opacity-4 py-3 rounded-kd6px px-3">
    <div class="flex items-center justify-between mb-4">
      <div class="desLabel">抵押收益：</div>
      <div class="font-kdExp">
        <span :class="getColor(33.4)" class="mr-1.5 text-kd20px20px font-bold ">33.4%</span>
        <span class="text-global-highTitle text-opacity-65 text-kd12px16px">25% USDC + 5% LHB</span>
      </div>
    </div>
    <div class="flex items-center justify-between mb-4">
      <div class="desLabel">借款成本：</div>
      <div class="font-kdExp">
        <span :class="getColor(-33.4)" class="mr-1.5 text-kd20px20px font-bold ">-33.4%</span>
        <span class="text-global-highTitle text-opacity-65 text-kd12px16px">25% USDC + 5% LHB</span>
      </div>
    </div>
    <div class="flex items-center justify-between mb-4">
      <div class="desLabel">当前抵押率：</div>
      <div class="font-kdExp">
        <span :class="getColor(33.4)" class="mr-1.5 text-kd20px20px font-bold ">33.4%</span>
        <span class="text-global-highTitle text-opacity-65 text-kd12px16px">25% USDC + 5% LHB</span>
      </div>
    </div>
    <div class="borderGang mb-4"></div>
    <div class="flex items-center justify-between h-7 ">
      <div class="desLabel">真实利率：</div>
      <div class="font-kdExp">
        <span :class="getColor(33.4)" class="mr-1.5 text-kd28px28px font-bold ">33.4%</span>
        <span class="text-global-highTitle text-opacity-65 text-kd12px16px">25% USDC + 5% LHB</span>
      </div>
    </div>
  </div>

</div>
</template>
<style scoped lang="scss">
.cal{
  .borderGang{
    border:0.5px solid rgba(0, 0, 0, 0.04);
  }
  .selectLabel{
    @apply text-kd14px18px text-global-highTitle text-opacity-65;
  }
  .borSelect{
    border:1px solid rgba(3, 54, 102, 0.06);
  }
  .desLabel{
    @apply text-kd12px16px text-global-highTitle text-opacity-45;
  }
}
</style>