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
      <img class="w-4.5 h-4.5 mr-1" :src="item.img" alt="">
      <div class="text-kd12px20px md:text-kd14px20px text-global-primary  font-normal  font-kdExp">{{
          item.name
        }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.tag {
  @apply rounded-md  flex mt-4 md:mr-1  py-1.25 px-3.75 items-center justify-center;
}

.selectTag {
  @apply bg-global-primary bg-opacity-8;
}
</style>
