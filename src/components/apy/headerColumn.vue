<script setup lang="ts">
import {defineProps} from 'vue'
// @ts-ignore
import {toFixedNumber, numColor} from '~/lib/tool'

// @ts-ignore
const props = defineProps({
  headerData: {
    type: Object,
  },
  orderByApy:{type:Function}
})
const orderBy=(type:string)=>{
  props.orderByApy(props.headerData.token_name,type)
}
//@ts-ignore
const getLogo = () => props.headerData.logo ? props.headerData.logo : 'https://res.ikingdata.com/nav/platLogo.jpg'
</script>
<template>
  <div class="flex  w-full items-center mb-1.5">
    <img class="w-6 h-6 mr-1.5" :src="getLogo()"
         alt=""
    >
    <div class="font-normal text-kd14px18px  text-global-highTitle">{{ props.headerData.token_name }}</div>
    <div >
      <img @click="orderBy('up')" class="w-2 h-1 ml-2" src="https://res.ikingdata.com/nav/apyUp.png" alt="">
      <img @click="orderBy('down')" class="w-2 h-1 ml-2 mt-0.5" src="https://res.ikingdata.com/nav/apyDown.png" alt="">
    </div>
  </div>
  <div class="flex  flex-wrap">
    <div class="text-kd14px18px text-global-highTitle font-normal mr-1 5">
      <span :class="props.headerData.price?'':'ml-2'">{{props.headerData.price?'$':'-'}}</span>{{ toFixedNumber(props.headerData.price) }}
    </div>
    <div v-if="props.headerData.change || props.headerData.change===0 " :class="props.headerData.change>=0?'Greem percent':'Red percent'">
      {{ numColor(props.headerData.change) }}<span v-if="props.headerData.change">%</span>
    </div>
  </div>
</template>
<style scoped lang="postcss">

.tag {
  @apply rounded-md  flex mt-4 md:mr-1  py-1.25 px-3.75 items-center justify-center;
}

.Greem {
  @apply text-global-numGreen bg-global-numGreen;
}

.Red {
  @apply text-global-numRed bg-global-numRed;
}

.percent {
  @apply px-1.5 py-0.25 text-kd12px16px  rounded bg-opacity-10 font-bold flex items-center;
}

.selectTag {
  @apply bg-global-primary bg-opacity-8;
}
</style>
