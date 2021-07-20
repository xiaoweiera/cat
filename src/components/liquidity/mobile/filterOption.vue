<script lang="ts" setup>
import { ref,reactive} from 'vue'
const pcTip=reactive({value:false})
const open=()=>pcTip.value=true
</script>
<template>
  <div @click="open()" class="flex mt-4 items-center justify-between text-kdFang ">
    <div class="flex items-center">
      <div class="text-kd12px16px font-medium text-global-default  text-opacity-35">选择时间:</div>
      <div class="text-kd12px16px font-medium text-global-default  text-opacity-85 ml-1">近7天</div>
      <IconFont class="iconjiantou ml-2" type="icon-xialaxiao"></IconFont>
    </div>
    <div class="flex items-center">
      <div class="text-kd12px16px font-medium text-global-default  text-opacity-35">时间粒度:</div>
      <div class="text-kd12px16px font-medium text-global-default  text-opacity-85 ml-1">1H</div>
      <IconFont class="iconjiantou ml-2" type="icon-xialaxiao"></IconFont>
    </div>
  </div>
  <UiDialogPcTip :pcTip="pcTip"/>
</template>