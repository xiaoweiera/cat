<script setup lang="ts">
import {defineProps} from 'vue'
const props=defineProps({
  title:String,
  des:String
})
</script>
<template>
  <div class="font-kdFang mt-8 ">
    <div class="flex justify-between">
      <div>
        <span class="text-kd18px24px text-global-highTitle text-opacity-85 font-medium mr-1">APY Top 10 池子</span>
        <span class="text-kd12px16px text-global-highTitle text-opacity-45 ml-1">更新时间: </span>
        <span class="text-kd12px16px text-global-highTitle text-opacity-45">xxx分钟前</span>
      </div>
      <IconFont class="text-global-highTitle text-opacity-65 hand" type="icon-download" size="18"/>
    </div>
    <div class="mt-1.5 text-kd12px16px text-global-highTitle text-opacity-45">
      指标描述：展示选定币种/交易对在单位时间内的资金净流入情况，该指标是使用单位时间内主动买入-主动卖出进行计算的，异常的资金变化可能导致行情出现剧烈波动。
    </div>
  </div>
</template>