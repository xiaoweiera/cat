<script setup lang="ts" >
import {defineProps} from 'vue'
const props=defineProps({
  item:Object,
  i:Number
})
</script>
<template>
  <div class="h-14.5 item  bg-global-white mt-3 px-3 flex items-center">
    <div class="exp text-kd14px20px txt85 w-10.5  text-center">{{i}}</div>
  </div>
</template>
<style scoped lang="scss">
.item:hover{
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.06), 0px 8px 24px rgba(0, 0, 0, 0.1);
}
</style>



