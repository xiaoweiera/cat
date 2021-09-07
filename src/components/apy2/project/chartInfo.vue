<script setup lang="ts">
import {defineProps} from 'vue'
import I18n from '~/utils/i18n/index'
const props=defineProps({
  title:{
    type:String,
    default(){return `APY Top 10 ${I18n.apyIndex.pools}`}
  },
  des:String
})
</script>
<template>
  <div class="font-kdFang mt-8 ">
    <div class="flex justify-between">
      <div>
        <span class="text-kd18px24px text-global-highTitle text-opacity-85 font-medium mr-1">{{title}}</span>
<!--        <span class="text-kd12px16px text-global-highTitle text-opacity-45 ml-1">更新时间: </span>-->
<!--        <span class="text-kd12px16px text-global-highTitle text-opacity-45">xxx分钟前</span>-->
      </div>
  <EchartsDownload class="text-global-highTitle xshidden text-opacity-65 hand" size="16" :title="title"/>
    </div>
    <div class="mt-1.5 text-kd12px16px text-global-highTitle text-opacity-45">{{I18n.apyIndex.description}}</div>
  </div>
</template>