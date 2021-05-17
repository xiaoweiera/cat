<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { defineProps } from 'vue'
const { t } = useI18n()
const props = defineProps({
  // 是否是简约footer
  small: {
    type: Boolean,
  },
})
</script>
<template>
  <div v-if="!small">
    <div class="text-center mt-15 md:mt-20">
      <div class="why-us i8n-font-Barlow font-semibold">{{ t('feature.title') }}</div>
      <div class="grid sm:grid-cols-1 gap-6  md:gap-7 mt-8  md:grid-cols-2 xl:grid-cols-3 ">
        <div class="flex-1 min-w-min288px ">
          <img src="/assets/growthpad/feature1.svg" alt="" class="w-35 md:w-43.75 mx-auto">
          <div class="mt-3 text-kd16px24px md:text-kd18px27px text-global-highTitle font-kdFang font-normal i8n-font-Barlow font-medium">{{ t('feature.feature1.title') }}</div>
          <div class="text-global-default text-kd12px16px md:text-kd14px18px  opacity-85  mt-1.5">
            <p class="i8n-font-inter">{{ t('feature.feature1.desc1') }}</p>
            <p class="i8n-font-inter">{{ t('feature.feature1.desc2') }}</p>
          </div>
        </div>

        <div class="flex-1 min-w-min288px">
          <img src="/assets/growthpad/feature2.svg" alt="" class="w-35 md:w-43.75 mx-auto">
          <div class="mt-3 text-kd16px24px md:text-kd18px27px text-global-highTitle font-kdFang font-normal i8n-font-Barlow font-medium">{{ t('feature.feature2.title') }}</div>
          <div class="text-global-default text-kd12px16px md:text-kd14px18px  opacity-85  mt-1.5">
            <p class="i8n-font-inter">{{ t('feature.feature2.desc1') }}</p>
          </div>
        </div>

        <div class="flex-1 min-w-min288px">
          <img src="/assets/growthpad/feature3.svg" alt="" class="w-35 md:w-43.75 mx-auto">
          <div class="mt-3 text-kd16px24px md:text-kd18px27px text-global-highTitle font-kdFang font-normal i8n-font-Barlow font-medium">{{ t('feature.feature3.title') }}</div>
          <div class="text-global-default text-kd12px16px md:text-kd14px18px  opacity-85  mt-1.5">
            <p class="i8n-font-inter">{{ t('feature.feature3.desc1') }}</p>
            <p class="i8n-font-inter">{{ t('feature.feature3.desc2') }}</p>
          </div>
        </div>
      </div>
    </div>
    <GrowthpadCompany />
  </div>
  <div class="join-mobile-us mt-12 mb-15 mdhidden">
    <a class="w-full h-full rounded " href="http://ikingdata.mikecrm.com/kbZDdCb"><img
      class="rounded w-full h-full shadowImg"
      :src="t('imgList.mobileImg')"

      alt=""
    >
    </a>
  </div>
  <div
    style=" max-width: 1200px;
  margin-top: 80px;
  margin-bottom:40px;
  background-size: contain;
  background-repeat: no-repeat;"
    class="join-us xshidden   relative flex  items-center"
  >
    <a class="w-full shadowImg rounded" href="http://ikingdata.mikecrm.com/kbZDdCb" target="_blank">
      <img class="w-full " :src="t('imgList.footImg')" alt="">
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
  @apply text-global-default text-kd12px16px md:text-kd14px18px  opacity-85  mt-1.5;
}

.shadowImg {
  box-shadow: 0px 26px 66px -18px rgba(43, 141, 255, 0.6);
}
.join-us {
  max-width: 1200px;
  margin-top: 80px;
  margin-bottom:40px;
  background-size: contain;
  background-repeat: no-repeat;
}

.join-mobile-us {
  width: 100%;
}
</style>
