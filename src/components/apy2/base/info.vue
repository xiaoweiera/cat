<script setup lang="ts">
import { ref,onMounted } from 'vue'
import I18n from '~/utils/i18n/index'
import * as api from '~/api/index'
const data=ref({})
const getData=async ()=>{
  const result=await api.apy.common.summary_info()
  data.value=result.data

}
onMounted(getData())
</script>
<template>
  <span  class="text-kd13px18px text-global-highTitle text-opacity-45 mt-1.5">
    {{data.chains_num}} 条公链，{{data.projects_num}} 个项目，{{data.pools_num}} 个池子，收录最全，支持跨链对比，历史趋势，APP 提醒。
  </span>
</template>
<style scoped lang="postcss">

</style>
