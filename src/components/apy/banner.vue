<script setup lang="ts">
import { onBeforeMount } from 'vue'
import SwiperCore, { Pagination } from 'swiper'
// 引入 swiper vue 组件
// @ts-ignore
import { Swiper, SwiperSlide } from 'swiper/vue'
// 广告位数据
// @ts-ignore
import { list, requestMediaList } from '~/logic/apy/ads'
// 引入 swiper 样式
import 'swiper/swiper-bundle.css'
// 装载 swiper 组件
SwiperCore.use([Pagination])
// 获取数据
onBeforeMount(requestMediaList)
</script>

<template>
  <div v-show="list.length" class="max-w-full">
    <div class="mdno carouselContainer">
      <el-carousel ref="carousel" height="160px" :autoplay="autoplay">
        <el-carousel-item v-for="(item, i) in list" :key="i">
          <a :href="item.url" target="_blank">
            <div v-if="item.flag" class="advTip">广告</div>
            <img class="comImg" :src="item.image" alt="" />
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<style scoped lang="postcss">
.swiper {
  padding-bottom: 30px;
}
.swiper-slide {
  width: 38%;
}
.swiper :deep(.swiper-pagination-bullet) {
  width: 12px;
  height: 3px;
  background: rgba(37, 62, 111, 0.1);
  border-radius: 2px;
  opacity: 1;
}
.swiper :deep(.swiper-pagination-bullet.swiper-pagination-bullet-active) {
  background-color: #2b8dfe;
}
</style>
