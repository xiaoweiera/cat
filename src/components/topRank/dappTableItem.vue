<script setup lang="ts" >
import {defineProps} from 'vue'
const props=defineProps({
  headerData:Object,
  item:Object,
  i:Number
})
//@ts-ignore wei
const bgWidth=(100-(20*props.i))+'%'
</script>
<template>
  <div v-if='headerData' class="h-14.5 item  relative overflow-hidden  px-3 bg-global-white mt-3 flex items-center rounded-kd6px" :style="`--wv:${bgWidth}`">
    <div class='relative z-2  flex items-center w-full   '>
<!--      排名-->
      <div :class='headerData[0].width' class="exp text-kd14px20px txt85 md:order-0  whitespace-nowrap   text-center">{{i}}</div>
<!--     名称-->
      <div :class='headerData[1].width' class="flex items-center ml-3 md:order-1  whitespace-nowrap  md:ml-6 ">
        <IconFont type="" size="24"/>
        <div class="text-kd14px18px text-global-highTitle ml-1.5 fang">Plooosf</div>
      </div>
<!--      类别-->
      <div :class='headerData[2].width' class="flex items-center  whitespace-nowrap ml-3 md:ml-6 order-4 md:order-2  justify-center">
        <div class="text-kd14px18px text-global-highTitle fang">游戏</div>
      </div>
<!--      公链-->
      <div :class='headerData[3].width' class="flex items-center ml-3 md:ml-6 order-5 md:order-3 justify-center">
        <template v-for="item in [1,2,3]">
          <IconFont class="mr-1" type="" size="24"/>
        </template>
      </div>
<!--      用户/变化率-->
      <div :class='headerData[4].width' class="flex flex-col  md:text-right whitespace-nowrap text-center ml-3 md:ml-6 order-6 md:order-4  justify-center">
        <div class="num">8242</div>
        <div class="text-global-numRed text-kd12px12px exp">32.43%</div>
      </div>
<!--      收入/变化率-->
      <div :class='headerData[5].width' class="flex flex-col  md:text-right  whitespace-nowrap text-center ml-3 md:ml-6 order-7 md:order-5    justify-center">
        <div class="num">$1.02M</div>
        <div class="text-global-numRed text-kd12px12px exp">32.43%</div>
      </div>
<!--      TVL/变化率-->
      <div :class='headerData[6].width' class="flex flex-col  md:text-right  whitespace-nowrap text-center ml-3 md:ml-6 order-2  md:order-6 justify-center">
        <div class="num">$1.02B</div>
        <div class="text-global-numRed text-kd12px12px exp">32.43%</div>
      </div>
<!--      MCap/TVL-->
      <div :class='headerData[7].width' class="flex flex-col   md:text-right  whitespace-nowrap text-center ml-3 order-3 md:order-7 md:ml-6  justify-center">
        <div class="num">$1.02B</div>
        <div class="text-global-numRed text-kd12px12px exp">32.43%</div>
      </div>
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
.item::before{
  content: '';
  background: rgba(9, 217, 142, 0.32);
  position: absolute;
  z-index: 1;
  top:0;
  left:0;
  bottom:0;
  width: var(--wv);
}
</style>



