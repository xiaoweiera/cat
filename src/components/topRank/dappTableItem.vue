<script setup lang="ts" >
import {defineProps} from 'vue'
const props=defineProps({
  item:Object,
  i:Number
})
</script>
<template>
  <div class="h-14.5 item  bg-global-white mt-3 px-3 flex items-center rounded-kd6px">
    <div class="exp text-kd14px20px txt85 w-10.5   text-center">{{i}}</div>
    <div class="flex items-center ml-6  w-35">
      <IconFont type="" size="24"/>
      <div class="text-kd14px18px text-global-highTitle ml-1.5 fang">Plooosf</div>
    </div>
    <div class="flex items-center ml-6 w-30 justify-center">
      <div class="text-kd14px18px text-global-highTitle fang">游戏</div>
    </div>
    <div class="flex items-center ml-6  w-40 justify-center">
      <template v-for="item in [1,2,3]">
        <IconFont class="mr-1" type="" size="24"/>
      </template>
    </div>

    <div class="flex flex-col  text-right ml-6  w-40 justify-center">
        <div class="num">8242</div>
        <div class="text-global-numRed text-kd12px12px exp">32.43%</div>
    </div>

    <div class="flex flex-col  text-right ml-6  w-40 justify-center">
      <div class="num">$1.02M</div>
      <div class="text-global-numRed text-kd12px12px exp">32.43%</div>
    </div>
    <div class="flex flex-col  text-right ml-6  w-40 justify-center">
      <div class="num">$1.02B</div>
      <div class="text-global-numRed text-kd12px12px exp">32.43%</div>
    </div>
    <div class="flex flex-col  text-right ml-6  w-40 justify-center">
      <div class="num">$1.02B</div>
      <div class="text-global-numRed text-kd12px12px exp">32.43%</div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.item:hover{
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.06), 0px 8px 24px rgba(0, 0, 0, 0.1);
}
.num{
  @apply text-kd18px18px text-global-highTitle font-kdExp;
}

</style>



