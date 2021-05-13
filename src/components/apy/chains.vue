<script setup lang="ts">
import { defineProps, toRefs,ref } from 'vue'

const props = defineProps({
  chains: Object,
})
const { data: outerChains } = toRefs(props.chains)
const clickItem = (chain) => {
  outerChains.value = outerChains.value.map((i) => {
    i.select = i.name === chain.name
    return i
  })
}
</script>
<template>
<!--  utm_source=https://apy.kingdata.com-->
  <div class="flex  w-full justify-center">
    <a  class="hand" @click="clickItem(item)" v-for="(item, index) in outerChains" :class="item.select?'selectTag tag':'tag'" :key="index">
      <img class="md:w-8 md:h-8 md:mr-1.4 w-6 h-6 mr-1" :src="item.img" alt="">
      <div :class="item.select?'selectTxt':'txt'">{{
          item.name
        }}
      </div>
    </a>
  </div>
</template>

<style scoped lang="postcss">
.tag {
  @apply text-global-default     rounded-md  flex mt-3 py-1.25 px-1 md:mt-4 md:mr-11.1  md:py-1.25 md:px-3.75 items-center justify-center;
}
.txt{
  @apply text-kd14px20px md:text-kd24px150 text-global-default opacity-65 font-normal  ;
}
.selectTxt{
  @apply text-kd14px20px md:text-kd24px150 text-global-primary;
}
.selectTag {
  @apply bg-global-primary  bg-opacity-8;
}
</style>
