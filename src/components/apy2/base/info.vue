<script setup lang="ts">
import { ref,onMounted } from 'vue'
import I18n from '~/utils/i18n/index'
import * as api from '~/api/index'
const data=ref({})
const title=ref()
const getData=async ()=>{
  const result=await api.apy.common.summary_info()
  data.value=result.data
  title.value=I18n.template(I18n.apyIndex.platDes,{chain:data.value.chains_num,project:data.value.projects_num,pool:data.value.pools_num})
}
onMounted(getData())
</script>
<template>
  <div  class="text-kd14px18px text-global-highTitle text-opacity-45 mt-1.5 w-full">{{title}}</div>
</template>
<style scoped lang="postcss">

</style>
