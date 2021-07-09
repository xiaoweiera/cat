<script setup lang="ts">
import {defineProps} from 'vue'
const props=defineProps({
  data:Object
})
</script>
<template>
  <div class="flex items-center mb-3">
    <div class="font-kdFang text-kd20px24px text-global-default text-opacity-85 font-semibold mr-1.5">{{data.title}}</div>
    <div class="font-kdFang text-kd13px19px text-global-default text-opacity-45 font-normal">{{data.des}}</div>
  </div>
</template>
<style scoped lang="postcss">

</style>
