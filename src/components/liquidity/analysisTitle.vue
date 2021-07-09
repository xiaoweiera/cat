<script setup lang="ts">
import {defineProps} from 'vue'
const props=defineProps({
  data:Object
})

</script>
<template>
  <div class="mb-3">
    <div class="font-kdFang text-kd22px28px text-global-default text-opacity-85 font-semibold">{{data.title}}</div>
    <div class="mt-1.5 font-kdFang text-kd13px19px text-global-default text-opacity-45 font-normal">{{data.des}}</div>
  </div>

</template>
<style scoped lang="postcss">

</style>
