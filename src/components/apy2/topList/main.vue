<script setup lang="ts">
import { ref,reactive, defineProps } from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import {useProvide, setInject, getInject} from '~/utils/use/state'
const props=defineProps({type:String})
const groupId=reactive({value:''})
useProvide('group_id')

</script>
<template>
  <div>
  <Apy2TopListHeader :type="props.type" :groupId="groupId" class="mb-3.8"/>
    <slot name="item"></slot>
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
