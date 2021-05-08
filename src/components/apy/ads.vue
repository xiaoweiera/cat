<script setup lang="ts">
  // 广告位数据
  import { list } from '~/logic/apy/ads'
</script>

<template>
  <div class="max-w-full" v-show="list.length">
    <div class="pb-12">
      <div v-if="list.length < 5" class="flex flex-nowrap justify-center">
        <div class="ad-basis" v-for="(item, index) in list" :class="{'ml-6': index > 0}" :key="index">
          <ApyAd :url="item.url" :image="item.image"></ApyAd>
        </div>
      </div>
      <div v-else class="grid grid-cols-5">
        <div v-for="(item, index) in list" :class="{'ml-6': index > 0}" :key="index">
          <ApyAd :url="item.url" :image="item.image"></ApyAd>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .ad-basis {
    flex-basis: 20%;
    max-width: 20%;
  }
</style>
