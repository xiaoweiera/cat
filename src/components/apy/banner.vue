<script setup lang="ts">
  import { onBeforeMount } from 'vue'
  import SwiperCore, { Pagination } from 'swiper'
  // 引入 swiper vue 组件
  import { Swiper, SwiperSlide } from 'swiper/vue'
  // 广告位数据
  import { list, requestMediaList } from '~/logic/apy/media'
  // 引入 swiper 样式
  import 'swiper/swiper-bundle.css'
  // 装载 swiper 组件
  SwiperCore.use([Pagination])
  // 获取数据
  onBeforeMount(() => {
    requestMediaList()
  })

</script>

<template>
  <div class="max-w-full" v-show="list.length">
    <Swiper class="swiper" :pagination="{ clickable: true }" slidesPerView="auto" :spaceBetween="12" :freeMode="true" :resizeObserver="true">
      <SwiperSlide v-for="(item, index) in list" :key="index">
        <ApyAd :url="item.url" :image="item.image"></ApyAd>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped lang="postcss">
  .swiper {
    padding-bottom: 50px;
  }
  .swiper-slide {
    width: 38%;
  }
  .swiper >>> .swiper-pagination-bullet {
    width: 12px;
    height: 3px;
    background: rgba(37, 62, 111, 0.1);
    border-radius: 2px;
    opacity: 1;
  }
  .swiper >>> .swiper-pagination-bullet.swiper-pagination-bullet-active {
    background-color: #2B8DFE;
  }
</style>
