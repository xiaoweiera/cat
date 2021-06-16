<script setup lang="ts">
import {toRefs, defineProps} from 'vue'

const props = defineProps({
  chartType: Object,
})
const typeList = [
  {type: 'flow', name: '流动性分析'},
  {type: 'pay', name: '交易数据分析'},
]
const selectedType = toRefs(props.chartType)
// 改变类型标签  （流动性分析/交易数据分析）
const changeType = (typeName: string) => {
  selectedType.type.value = typeName
}
</script>
<template>
  <div class="flex w-full h-14.5 items-center justify-between px-5 bg-white font-kdFang bottomBorder">
    <!--    类型切换-->
    <div class="flex h-full items-center">
      <template v-for="item in typeList">
        <div :class="selectedType.type.value === item.type ? 'tagSelect' : 'tagDefault'"  @click="changeType(item.type)">
          {{ item.name }}
        </div>
      </template>
    </div>
    <!--    时间筛选-->
    <div class="flex">
<!--      <LiquidityHeaderOption/>-->
    </div>
  </div>
</template>
<style scoped lang="postcss">
.tagDefault {
  border-bottom: 2px solid white;
  @apply kd-16px24px text-global-default opacity-65 mr-6 cursor-pointer;
}

.tagSelect {
  border-bottom: 2px solid rgba(43, 141, 254, 1);
  @apply text-kd16px24px text-global-primary mr-6 cursor-pointer  h-full flex items-center;
}

.bottomBorder {
  border-bottom: 1px solid rgba(37, 62, 111, 0.04);
}
</style>
