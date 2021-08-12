<script setup lang="ts">
import { ref, defineProps } from 'vue'
import I18n from '~/utils/i18n/index'
import SwiperCore, { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
// 广告位数据
// @ts-ignore
// 引入 swiper 样式
import 'swiper/swiper-bundle.css'
// 装载 swiper 组件
SwiperCore.use([Pagination])
const list=[
  {url:'https://www.baidu.com',img:'https://res.ikingdata.com/nav/chainalysis.jpg'},
  {url:'https://www.baidu.com',img:'https://res.ikingdata.com/nav/nomics.jpg'},
  {url:'https://www.baidu.com',img:'https://res.ikingdata.com/nav/assetdash.png'},
  {url:'https://www.baidu.com',img:'https://res.ikingdata.com/nav/debank.jpg'},
  {url:'https://www.baidu.com',img:'https://res.ikingdata.com/nav/chainalysis.jpg'},
  {url:'https://www.baidu.com',img:'https://res.ikingdata.com/nav/nomics.jpg'},
  {url:'https://www.baidu.com',img:'https://res.ikingdata.com/nav/assetdash.png'},
  {url:'https://www.baidu.com',img:'https://res.ikingdata.com/nav/debank.jpg'},
  {url:'https://www.baidu.com',img:'https://res.ikingdata.com/nav/chainalysis.jpg'},
  {url:'https://www.baidu.com',img:'https://res.ikingdata.com/nav/nomics.jpg'},
  {url:'https://www.baidu.com',img:'https://res.ikingdata.com/nav/assetdash.png'},
  {url:'https://www.baidu.com',img:'https://res.ikingdata.com/nav/debank.jpg'},
  {url:'https://www.baidu.com',img:'https://res.ikingdata.com/nav/chainalysis.jpg'},
  {url:'https://www.baidu.com',img:'https://res.ikingdata.com/nav/nomics.jpg'},
  {url:'https://www.baidu.com',img:'https://res.ikingdata.com/nav/assetdash.png'},
  {url:'https://www.baidu.com',img:'https://res.ikingdata.com/nav/debank.jpg'},
  {url:'https://www.baidu.com',img:'https://res.ikingdata.com/nav/chainalysis.jpg'},
  {url:'https://www.baidu.com',img:'https://res.ikingdata.com/nav/nomics.jpg'},
  {url:'https://www.baidu.com',img:'https://res.ikingdata.com/nav/assetdash.png'},
  {url:'https://www.baidu.com',img:'https://res.ikingdata.com/nav/debank.jpg'},
]
// 获取数据
</script>
<template>
  <div v-show="list.length" class="max-w-full h-80 mainContainer" >
    <UiBanner :list="list" :autoplay="true" bottomType="line" class="mainContainer h-full w-full" >
      <template #item="scope">
        <ApyAd :url="scope.data.url" class="h-full pb-0 mb-0" :image="scope.data.img" ></ApyAd>
      </template>
    </UiBanner>
  </div>
</template>
<style scoped lang="postcss">
.mainContainer{
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.06), 0px 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
}
</style>