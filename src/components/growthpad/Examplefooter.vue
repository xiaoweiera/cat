<script setup lang="ts">
import {useI18n} from 'vue-i18n'
const {t} = useI18n()
</script>
<template>
  <div class="text-center mt-15 md:mt-20">
    <div class="join-mobile-us mt-15 mb-15 mdhidden">
      <a class="w-full h-full rounded " href="http://ikingdata.mikecrm.com/kbZDdCb"><img class="rounded w-full h-full shadowImg"
                                                                                         :src="t('imgList.mobileImg')"
                                                                                         alt=""
      >
      </a>
    </div>
    <div class="join-us xshidden   relative flex  items-center">
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

  @apply text-global-default text-kd12px16px md:text-kd14px18px  opacity-85 font-kdFang  mt-1.5;
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
