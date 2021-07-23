<script setup lang="ts">
import { defineProps} from 'vue'
import I18n from '~/utils/i18n/index'
const props=defineProps({
  data:Object
})


</script>

<template>
  <div class="flex flex-col text-kdFang flex-1 relative bg-global-white bor">
    <img class="w-full h-84.5" :src="data.img" alt="">
    <div class="flex-1 p-6  bor">
        <div class="font-medium text-kd14px18px text-global-default text-opacity-85">{{data.title}}</div>
        <div class="mt-2.5">
          <template v-for="item in data.descs">
            <div class="text-global-default text-opacity-65 text-kd12px20px">{{item}}</div>
          </template>
        </div>
    <a :href="data.href" target="_blank" class="bg-global-primary w-27.5 flex items-center py-2.5 absolute bottom-6 right-6 cursor-pointer   justify-center rounded">
      <span class="text-kd14px18px text-global-white font-medium">立即体验</span>
      <img class="w-4 ml-1" src="https://res.ikingdata.com/liquidity/right.png" alt="">
    </a>
    </div>
  </div>
</template>

<style  scoped>
.bor{
  border-top:1px solid rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(80px);
}
</style>

