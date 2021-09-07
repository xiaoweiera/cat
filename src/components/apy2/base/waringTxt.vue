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
  <div v-if="isShow" class="rounded-kd4px text-kd12px16px text-global-numRed flex p-2.5 relative flex items-center ">
    <div class="flex items-center">
      <IconFont class="flex text-global-numRed " style="transform: scale(1.3)"  type="icon-Warning" size="16"></IconFont>
      <span class="ml-3">{{props.des}}</span>
    </div>
  </div>

</template>

