<script setup lang="ts">
import { ref,onMounted } from 'vue'
import I18n from '~/utils/i18n/index'
import {project_summary} from '~/api/apy2'
const getData=async ()=>{
  const data=await project_summary()
  console.log(data)
}
onMounted(getData())
</script>
<template>
  <span id="info" name="select" class="text-kd13px18px text-global-highTitle text-opacity-45 mt-1.5">
    5 条公链，77 个项目，446 个池子，收录最全，支持跨链对比，历史趋势，APP 提醒。
  </span>
</template>
<style scoped lang="postcss">

</style>
