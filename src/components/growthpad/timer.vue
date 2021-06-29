<script setup lang="ts">
  import { defineProps } from 'vue'
  // @ts-ignore
  import I18n from '~/utils/i18n/index'

  defineProps({
    value: {
      type: [Number, String],
    }
  })
</script>

<template>
  <div class="flex items-center" v-if="value">
    <slot name="label">
      <div>{{ label }}</div>
    </slot>
    <TimeCountdown :value="value">
      <template #default="scope">
        <div class="flex items-end font-normal">
          <span class="flex items-end">
            <span class="time-value">{{ scope.day }}</span>
            <span class="time-label">{{ I18n.growthpadShow.day }}</span>
          </span>
            <span class="flex ml-2 items-end">
            <span class="time-value">{{ scope.hour }}</span>
            <span class="time-label">{{ I18n.growthpadShow.hour }}</span>
          </span>
            <span class="flex ml-2 items-end">
            <span class="time-value">{{ scope.minute }}</span>
            <span class="time-label">{{ I18n.growthpadShow.minute }}</span>
          </span>
        </div>
      </template>
    </TimeCountdown>
  </div>
</template>

<style scoped lang="scss">
  .time-label {
    @apply ml-1 text-kd12px18px i8n-font-inter font-normal;
  }
  .time-value {
    @apply text-kd24px110 font-bold font-kdExp;
  }
</style>
