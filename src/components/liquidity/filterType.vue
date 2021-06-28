<script setup lang="ts">
import { ref, defineProps } from 'vue'
import * as R from 'ramda'
import { paramChart } from '~/store/liquidity/state'
const props = defineProps({
  filterData: Object,
  tagType: String,
})
const changeTag = (tag: any) => {
  paramChart[props.tagType] = tag.value
  R.forEach((item) => {
    if (item.name === tag.name) {
      item.selected = true
    } else {
      item.selected = false
    }
  }, props.filterData)
}
</script>
<template>
  <div class="flex ml-3.5">
    <div class="flex h-7.8 items-center timeFilter">
      <template v-for="item in filterData">
        <div  :class="item.selected ? 'timeTagSelected' : 'timeTag'" @click="changeTag(item)">
          {{ item.name }}
        </div>
      </template>
    </div>
  </div>
</template>
<style scoped lang="postcss">
.timeTag {
  border-radius: 2px;
  cursor: pointer;
  @apply px-2 py-1 text-kd14px18px text-global-default opacity-65 min-w-12 text-center;
}
.timeTagSelected {
  cursor: pointer;
  border-radius: 2px;
  @apply px-2 py-1 text-kd14px18px text-global-primary bg-white min-w-12 text-center;
}
.timeFilter {
  padding: 2px;
  background: rgba(43, 141, 254, 0.08);
  border-radius: 4px;
}
</style>
