<script setup lang="ts">
import { defineProps, toRefs } from 'vue'

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
  <div class="flex ">
    <div
        class="hand" @click="clickItem(item)" v-for="item in outerChains"
        :class="item.select?'selectTag tag':'tag'"
    >
      <img class="w-8 h-8 mr-1.4" :src="item.img" alt="">
      <div :class="item.select?'selectTxt':'txt'">{{
          item.name
        }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.tag {
  @apply text-global-default     rounded-md  flex mt-4 md:mr-11.1  py-1.25 px-3.75 items-center justify-center;
}
.txt{
  @apply text-kd12px20px md:text-kd24px150 text-global-default opacity-65 font-normal  ;
}
.selectTxt{
  @apply text-kd12px20px md:text-kd24px150 text-global-primary;
}
.selectTag {
  @apply bg-global-primary  bg-opacity-8;
}
</style>
