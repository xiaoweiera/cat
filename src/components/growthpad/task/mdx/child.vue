<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import { TaskType } from '~/logic/growthpad/examples'

const props = defineProps({
  data: {
    type: Object,
  },
})
const buttonValue = computed((): string => {
  let text: string
  switch (props.data?.type) {
  case TaskType.vip:
    text = '去邀请'
    break
  case TaskType.sushiswap:
  case TaskType.uniswap:
  case TaskType.pancake:
    text = '资质验证'
    break
  default:
    text = '去检测'
    break
  }
  return text
})
</script>
<template>
  <GrowthpadTaskTitle :data="data">
    <template #right>
      <span class="button">{{ buttonValue }}</span>
    </template>
  </GrowthpadTaskTitle>
</template>
<style scoped lang="scss">
.button {
  background: #2b8dfe;
  border-radius: 12px;
  padding: 4px 12px;
  font-weight: 500;
  font-size: 12px;
  color: #fff;
}
</style>
