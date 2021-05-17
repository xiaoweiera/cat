<script setup lang="ts">
// 广告位数据
import { list } from '~/logic/apy/ads'
</script>

<template>
  <div v-show="list.length" class="max-w-full">
    <div v-if="list.length < 5" class="flex flex-nowrap justify-center pb-6.5">
      <div v-for="(item, index) in list" :key="index" class="ad-basis" :class="{'ml-6': index > 0}">
        <ApyAd :url="item.url" :image="item.image"></ApyAd>
      </div>
    </div>
    <div v-else class="grid grid-cols-5 pb-6.5">
      <div v-for="(item, index) in list" :key="index" class="grid-item">
        <ApyAd :url="item.url" :image="item.image"></ApyAd>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
  .ad-basis {
    flex-basis: 20%;
    max-width: 20%;
  }
  .grid {
    margin-left: -12px;
    margin-right: -12px;
  }
  .grid-item {
    padding: 0 12px 0px 12px;
  }
</style>
