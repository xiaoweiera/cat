<script lang="ts" setup>
import {defineProps} from 'vue'
const props=defineProps({title:String})
</script>
<template>
  <div class="flex items-center">
    <div class='text-kd22px22px font-semibold md:text-kd32px32px text-global-highTitle '>{{props.title}}</div>
    <div  class='flex hand items-center justify-center px-3 py-1.5 md:px-4 md:py-2 bg-global-primary whitespace-nowrap w-fit rounded-kd34px ml-3 '>
      <IconFont size='16' class='text-global-white' type='icon-shangchuan'/>
      <span class='text-kd12px16px md:text-kd14px18px text-global-white ml-1'>提交新项目</span></div>
  </div>
</template>



