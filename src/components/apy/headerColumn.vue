<script setup lang="ts">
import {defineProps} from 'vue'

const props = defineProps({
  headerData: {
    type: Object,
  }
})
</script>
<template>
  <div class="flex items-center mb-1.5"><img class="w-6 h-6 mr-1.5" src="https://res.ikingdata.com/nav/apyHeco.png" alt="">
    <div class="font-normal text-kd14px18px text-global-highTitle">{{props.headerData.token_name}}</div>
  </div>
  <div class="flex">
    <div class="text-kd14px18px text-global-highTitle font-normal mr-1 5">${{props.headerData.token_price}}</div>
    <div class="px-1.5 py-0.25 text-kd12px16px bg-global-numGreen text-global-numGreen rounded bg-opacity-10 font-bold flex items-center">
      +{{props.headerData.change}}
    </div>
  </div>
</template>
<style scoped>

.tag {
  @apply rounded-md  flex mt-4 md:mr-1  py-1.25 px-3.75 items-center justify-center;
}

.selectTag {
  @apply bg-global-primary bg-opacity-8;
}
</style>