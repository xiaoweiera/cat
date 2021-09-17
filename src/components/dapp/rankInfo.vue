<script lang="ts" setup>
import I18n from '~/utils/i18n/index'
import {defineProps} from 'vue'
const apply = 'http://ikingdata.mikecrm.com/jCRg6mX'
const props=defineProps({title:String})
</script>
<template>
  <div class="flex items-center">
    <div class='text-kd22px22px i8n-font-Barlow font-semibold md:text-kd32px32px text-global-highTitle '>{{props.title}}</div>
    <a v-router.blank='apply'  class='flex hand items-center justify-center px-3 py-1.5 md:px-4 md:py-2 bg-global-primary whitespace-nowrap w-fit rounded-kd34px ml-3 '>
      <IconFont size='16' class='text-global-white' type='icon-shangchuan'/>
      <span class='text-kd12px16px md:text-kd14px18px text-global-white ml-1 fang'>{{I18n.dapp.apply}}</span>
    </a>
  </div>
</template>



