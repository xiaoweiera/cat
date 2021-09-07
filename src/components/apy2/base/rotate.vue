<script setup lang="ts">
import { ref, onMounted } from 'vue'
import I18n from '~/utils/i18n/index'
import SwiperCore, { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import * as api from '~/api/index'
import 'swiper/swiper-bundle.css'
SwiperCore.use([Pagination])
const list=ref([])
const getData=async ()=>{
  const result=await api.apy.common.commercial()
  list.value=result?.data
}
onMounted(getData())


</script>
<template>
  <div v-show="list.length"  class="max-w-full h-80 mainContainer" >
    <UiBanner :list="list" :autoplay="true" bottomType="line" class="mainContainer h-full w-full" >
      <template #item="scope">
        <ApyAd :url="scope.data.url" class="h-full pb-0 mb-0" :image="scope.data.image" ></ApyAd>
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