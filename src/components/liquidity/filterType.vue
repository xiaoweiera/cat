<script setup lang="ts">
import { ref, defineProps } from 'vue'
import * as R from 'ramda'
import { paramChart } from '~/store/liquidity/state'
import I18n from '~/utils/i18n/index'
const props = defineProps({
  filterData: Object,
  tagType: String,
})
const changeTag = (tag: any) => {
  if(tag.value==='1H') return
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
        <div v-login v-if="item.name==='1H'" class="noSelected">
          <el-tooltip :hide-after="10" :content="I18n.liquidity.noData" placement="bottom" effect="light">
            <span class="txtSmall text-kd14px18px text-global-default opacity-65">{{item.name}}</span>
          </el-tooltip>
        </div>
        <div v-else v-login :class="item.selected ? 'timeTagSelected' : 'timeTag'" @click="changeTag(item)">
          {{ item.name }}
        </div>
      </template>
    </div>
  </div>
</template>
<style scoped lang="postcss">
.noSelected{
  border-radius: 2px;
  @apply px-2 py-1 text-kd14px18px text-global-default opacity-35 min-w-12 text-center;
}
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
