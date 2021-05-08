<script setup lang="ts">
  // 广告位数据
  import { list } from '~/logic/apy/ads'
</script>

<template>
  <div class="max-w-full" v-show="list.length">
    <div class="pb-12">
      <div class="grid grid-cols-5 gap-6">
        <div v-for="(item, index) in list" :key="index">
          <ApyAd :url="item.url" :image="item.image"></ApyAd>
        </div>
      </div>
    </div>
  </div>
</template>
