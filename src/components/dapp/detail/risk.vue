<script setup lang="ts">
import { defineProps } from 'vue'
import I18n from '~/utils/i18n/index'

const props = defineProps({
  value: {
    type: String
  }
})
</script>

<template>
  <span class="risk high" v-if="value === 'high'">
    <IconFont type="icon-gaofengxian" size="14"/>
    <span class="text-12-14 ml-0.5">{{ I18n.common.risk.high }}</span>
  </span>
  <span class="risk medium" v-else-if="value === 'medium'">
      <IconFont type="icon-zhongfengxian" size="14"/>
      <span class="text-12-14 ml-0.5">{{ I18n.common.risk.medium }}</span>
  </span>
  <span class="risk low" v-else-if="value === 'low'">
    <IconFont type="icon-difengxian" size="14"/>
    <span class="text-12-14 ml-0.5">{{ I18n.common.risk.low }}</span>
  </span>
  <span class="risk unknown" v-else>
    <IconFont type="icon-weizhi" size="14"/>
    <span class="text-12-14 ml-0.5">{{ I18n.common.risk.unknown }}</span>
  </span>
</template>

<style scoped lang="scss">
.risk {
  @apply px-2 py-1;
  @apply inline-block;
  @apply flex items-center;
  border-radius: 20px;
  &.high {
    @apply text-global-numRed;
    @apply bg-global-numRed bg-opacity-12;
  }
  &.medium {
    color: #AC9100;
    background-color: rgba(172, 145, 0, 0.12);
  }
  &.low {
    color: #009C56;
    background-color: rgba(0, 180, 100, 0.12);
  }
  &.unknown {
    @apply text-global-highTitle;
    @apply bg-global-highTitle bg-opacity-12;
  }
}
</style>
