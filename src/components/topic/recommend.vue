<script setup lang="ts">
/**
 * @file 精选推荐
 */
import { onMounted, defineProps } from 'vue'
import { adsList, requestAdsList } from '~/logic/topic/ads'

defineProps({
  menu: {
    type: Object
  }
})

onMounted(requestAdsList)

</script>

<template>
  <div class="whitespace-pre-wrap">
    <!-- 大屏 -->
    <div class="-mx-1.5 hidden md:block">
      <div class="flex flex-wrap">
        <template v-for="(item, index) in adsList" :key="index">
          <div class="w-1/3 lg:w-1/4 xl:w-1/5 px-1.5 pb-3">
            <ApyAd :url="item.url" :image="item.image"></ApyAd>
          </div>
        </template>
      </div>
    </div>
    <!-- 移动端 -->
    <div class="block md:hidden">
      <UiBanner :list="adsList" :autoplay="true">
        <template #item="scope">
          <ApyAd :url="scope.data.url" :image="scope.data.image"></ApyAd>
        </template>
      </UiBanner>
    </div>
  </div>
</template>

