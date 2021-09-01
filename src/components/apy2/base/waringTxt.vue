<script setup lang="ts">
import {ref, defineProps} from 'vue'
import {formatDefaultTime} from '~/lib/tool'
import I18n from '~/utils/i18n/index'
const props=defineProps(
    {
      des:{
        type:String,
        default:'风险提示：本站数据来源于各平台的公开数据，本站井未对收录内容做安全审计，内容不构成投资建议，请注意风险。'
      }
    }
)
const isShow=ref(true)
const close=()=>isShow.value=!isShow.value
</script>
<template>
  <div v-if="isShow" class="rounded-kd4px text-kd12px16px text-global-numRed flex p-2.5 relative flex items-center justify-between">
    <div class="flex items-center">
      <IconFont class="flex text-global-numRed " style="transform: scale(1.3)"  type="icon-Warning" size="16"></IconFont>
      <span class="ml-3">{{props.des}}</span>
    </div>
    <IconFont @click="close()" class="flex text-global-numRed hand"   type="icon-xClose" size="16"></IconFont>
  </div>

</template>

