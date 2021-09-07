<script setup lang="ts">
import {ref, defineProps} from 'vue'
import {formatDefaultTime} from '~/lib/tool'
import I18n from '~/utils/i18n/index'
const props=defineProps(
    {
      des:{
        type:String,
        default:I18n.apyIndex.warningDes
      }
    }
)
const isShow=ref(true)
const close=()=>isShow.value=!isShow.value
</script>
<template>
  <div v-if="isShow" class="rounded-kd4px bg-global-numRed bg-opacity-6 text-kd12px16px text-global-numRed flex p-2.5 relative flex items-center justify-between">
   <div class="flex items-center">
     <IconFont class="flex text-global-numRed " style="transform: scale(1.3)"  type="icon-Warning" size="base"></IconFont>
     <span class="ml-3">{{props.des}}</span>
   </div>
    <IconFont @click="close()" class="flex text-global-numRed hand"  style="transform: scale(1.5)" type="icon-xClose" size="base"></IconFont>
  </div>

</template>
<style scoped lang="scss">

</style>
