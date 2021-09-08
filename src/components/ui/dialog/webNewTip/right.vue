<script setup lang="ts">
import { defineProps} from 'vue'
import I18n from '~/utils/i18n/index'
import { getInject } from '~/utils/use/state'
const data=getInject('data')

</script>

<template>
  <div class="flex flex-col text-kdFang  flex-1 relative bg-global-white imgborRadius BottomRightRadius">
    <img v-if="data[0].img" class="w-full h-84.5 imgborRadius " :src="data[0].img" alt="">
    <div class="flex-1 p-6  bor BottomRightRadius">
        <div class="font-semibold text-kd20px28px text-kdFang  i8n-font-en-Barlow text-global-default text-opacity-85">{{data[0].title}}</div>
        <div class="mt-1.5 ">
          <template v-for="item in data[0].contents">
            <div class="text-global-default i8n-font-en-inter text-opacity-65 text-kd14px24px">{{item}}</div>
          </template>
          <div class="mt-1"></div>
          <template v-for="item in data[0].descs">
            <div class="text-global-default i8n-font-en-inter text-opacity-65 text-kd14px35px">{{item}}</div>
          </template>
        </div>
    <a :href="data[0].href" target="_blank" class="borRaduis bg-global-primary w-27.5 flex items-center py-2.5 absolute -bottom-6 right-6 cursor-pointer   justify-center rounded">
      <span class="text-kd14px18px text-global-white i8n-font-en-barlow font-medium">{{I18n.webTip.go}}</span>
      <img class="w-4 ml-1" style="border-top-right-radius: 100px !important;" src="https://res.ikingdata.com/liquidity/right.png" alt="">
    </a>
    </div>
  </div>
</template>

<style  scoped>
.BottomRightRadius{
  border-bottom-right-radius: 6px !important;
}
.imgborRadius{
  border-top-right-radius: 6px !important;
}
.borRaduis{
  border-radius: 6px !important;
}
.bor{
  border-top:1px solid rgba(0, 0, 0, 0.06);
  backdrop-filter: blur(80px);
}
</style>

