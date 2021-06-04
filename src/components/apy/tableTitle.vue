<script lang="ts" setup>
import { defineProps } from 'vue'
import I18n from '~/utils/i18n/index'
import * as lang from '~/utils/lang'
const props = defineProps({
  title: { type: String },
  timer: { type: Number },
})
</script>
<template>
  <div class="xshidden flex justify-center items-center">
    <div
      style="font-size: 24px"
      class="text-global-highTitle font-medium mr-1.5"
    >
      {{ title }}
    </div>
    <div
      v-if="lang.current.value === 'cn'"
      class="text-kd14px20px font-normal text-global-default opacity-65"
    >
      ({{ timer }} 秒后更新)
    </div>
    <div
      v-else
      class="text-kd14px20px font-normal text-global-default opacity-65"
    >
      (Update in {{ timer }} s)
    </div>
  </div>
</template>
