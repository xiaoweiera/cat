<script setup lang="ts">
import { ref, defineProps } from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'

const selectName=ref(0)
const selectTag=(key:string)=>selectName.value=key
</script>
<template>
  <div>
    <div>a</div>
  </div>
</template>
<style scoped lang="postcss">
.tag{
  @apply p-2 text-kd24px24px text-global-highTitle font-medium  text-opacity-65;
}
.selectedTag{
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.06), 0px 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  @apply p-2 text-kd24px24px text-global-primary font-medium;
}
</style>
