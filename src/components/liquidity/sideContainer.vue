<script setup lang="ts">
// @ts-ignore
import { ref, reactive } from 'vue'
const tokenInfo = reactive({ address: '0xjjje...3029' })
const selectTag = ref('my')
const tags = [
  { type: 'my', name: '自选' },
  { type: 'token', name: '相关交易对' },
]
const changeTag = (type: string) => (selectTag.value = type)
</script>
<template>
  <div class="w-75 min-w-75 flex flex-col sideContainer">
    <LiquiditySideTop :token-info="tokenInfo" />
    <div class="flex flex-col h-full overflow-hidden bg-white flex-1">
      <div class="p-3">
        <template v-for="item in tags">
          <span
            :class="selectTag === item.type ? 'selectedTag' : 'defaultTag'"
          >{{ item.name }}</span>
        </template>
      </div>
      <LiquidityTokenTable :select-tag="selectTag" />
    </div>
  </div>
</template>
<style scoped lang="postcss">
.defaultTag {
  @apply mr-6 text-kd14px18px font-kdFang text-global-default opacity-65 cursor-pointer;
}
.selectedTag {
  @apply mr-6 text-kd14px18px font-kdFang text-global-primary text-kd14px18px cursor-pointer;
}

.sideContainer {
  background: #ffffff;
  box-shadow: 4px 0px 12px rgba(44, 140, 248, 0.08);
}
</style>
