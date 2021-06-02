<script setup lang="ts">
import { defineProps } from 'vue'
import { footList } from '~/logic/growthpad/index'
import I18n from '~/utils/i18n'
</script>
<template>
  <div>
    <div class="text-center mt-10 md:mt-20">
      <div class="why-us i8n-font-en-Barlow font-semibold">
        {{ I18n.growthpadShow.footProject.title }}
      </div>
      <div
        class="
          grid
          sm:grid-cols-1
          gap-6
          md:gap-7
          mt-8
          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        <template v-for="item in footList">
          <div class="flex-1 min-w-min288px">
            <img :src="item.img" alt="" class="w-35 md:w-43.75 mx-auto" />
            <div class="feature-title i8n-font-Barlow font-medium">
              {{ item.title }}
            </div>
            <div class="feature-detail">
              <p class="i8n-font-inter max-w-66">{{ item.des }}</p>
            </div>
          </div>
        </template>
      </div>
    </div>
    <GrowthpadCompany />
  </div>
  <div class="join-mobile-us mt-12 mb-15 mdhidden">
    <a
      class="w-full h-full rounded"
      href="http://ikingdata.mikecrm.com/kbZDdCb"
    ><img
      class="rounded w-full h-full shadowImg"
      :src="I18n.growthpadShow.mobileFooter"
      alt=""
    />
    </a>
  </div>
  <div class="join-us xshidden relative flex items-center">
    <a
      class="w-full shadowImg rounded"
      href="http://ikingdata.mikecrm.com/kbZDdCb"
      target="_blank"
    >
      <img class="w-full" :src="I18n.growthpadShow.pcFooter" alt="" />
    </a>
  </div>
</template>

<style scoped lang="postcss">
.imgVisit {
  width: 179px;
  height: 34px;
  @apply absolute right-19;
}

.imgVisitImg {
  width: 179px;
  height: 34px;
}

.why-us {
  @apply font-medium font-kdFang  text-kd24px150 text-global-highTitle;
}

.feature-title {
  @apply mt-3 text-kd16px24px md:text-kd18px27px text-global-highTitle font-kdFang font-normal;
}

.feature-detail {
  @apply text-global-default text-kd12px16px md:text-kd14px18px flex  justify-center  opacity-85 font-kdFang  mt-1.5;
}

.shadowImg {
  box-shadow: 0px 26px 66px -18px rgba(43, 141, 255, 0.6);
}

.join-us {
  max-width: 1200px;

  margin-top: 80px;
  background-size: contain;
  background-repeat: no-repeat;
  @apply mb-10;
}

.join-mobile-us {
  width: 100%;
}
</style>
