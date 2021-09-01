<script setup lang="ts">
import {ref, defineProps} from 'vue'
import I18n from '~/utils/i18n/index'
const props=defineProps({
  title:String
})
</script>
<template>
  <div>
    <div class="flex items-center flex-wrap">
      <span class="mr-3 flex whitespace-nowrap text-kd32px32px text-global-highTitle text-opacity-85 font-semibold">{{props.title}}</span>
      <div class="hand text-kd14px18px items-center bg-global-primary text-global-white py-1.5 px-3 flex w-fit " style="border-radius: 34px;width:fit-content">
        <img class="w-4 h-4" src="https://res.ikingdata.com/apyTwo/apply.png" alt="">
        <a v-router.blank="'http://ikingdata.mikecrm.com/ijyjMFO?utm_source=https://apy.kingdata.com'" class="ml-1 font-medium ">{{I18n.apyIndex.apply}}</a>
      </div>
    </div>
    <Apy2BaseInfo/>
  </div>
</template>
<style scoped lang="postcss">
</style>
