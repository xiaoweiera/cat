<script setup lang="ts">
import { ref } from 'vue'
import { telPlats } from '~/logic/growthpad/index'

import I18n from '~/utils/i18n'
const qr = ref(false)
const showQr = () => {
  qr.value = true
}

const closeQr = () => {
  qr.value = false
}
</script>
<template>
  <div class="telContainer mt-10 md:mt-0">
    <div class="xshidden join-in md:mt-kd32px mt-kd35px w-40">
      <a
        class="mr-8"
        href="http://ikingdata.mikecrm.com/kbZDdCb"
        target="_blank"
      ><img
        class="applyImg"
        :src="I18n.growthpadShow.applyImg"
        alt=""
      /></a>
    </div>
    <div class="mdhidden text-global-default opacity-65 text-kd14px22px">
      {{ I18n.growthpadShow.contact }}
    </div>
    <div class="flex mt-2.7 ml-8 relative">
      <template v-for="item in telPlats">
        <a class="mr-8" :href="item.aUrl" target="_blank">
          <img
            class="platImg"
            :src="item.img"
            alt=""
          /></a>
      </template>
      <img
        class="platImg mr-8"
        src="https://res.ikingdata.com/nav/Kwechat.png"
        alt=""
        @mouseenter="showQr()"
        @mouseleave="closeQr()"
      />
      <img
        v-if="qr"
        class="w-29 h-29 z-99 absolute bottom-12 -right-3"
        src="https://res.ikingdata.com/nav/growthQRcode.png"
        alt=""
      />
    </div>
  </div>
</template>
<style scoped>
.telContainer {
  @apply flex flex-col md:flex-row md:justify-start justify-center items-center;
}
.applyImg {
  box-shadow: 5px 5px 10px rgb(43 141 254 / 20%), -5px -5px 10px #ffffff;
  border-radius: 32px;
}
.platImg {
  @apply w-6 h-6;
}
</style>
