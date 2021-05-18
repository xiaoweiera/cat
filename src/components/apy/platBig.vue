<script setup lang="ts">
import { defineProps, ref, toRefs } from 'vue'
const props = defineProps({
  tags: { type: Object },
  chartIndex: { type: Number },
})
const isShowMore = ref(false)
// const isMore = ref(true)
// @ts-ignore
const { selected: selectedTag } = toRefs(props.tags)
// @ts-ignore
const clickTag = (name: string) => {
  selectedTag.value = name
  isShowMore.value = false
}

// @ts-ignore
const showMore = () => (isShowMore.value = true)
// @ts-ignore
const closeMore = () => (isShowMore.value = false)
</script>
<template>
  <div class="flex mt-3 w-full min-h-7 relative items-center justify-between">
    <div class="flex flex-wrap">
      <template v-for="(item, i) in tags.platforms">
        <span
          :class="selectedTag === item ? 'selectTag tag hand' : 'tag hand'"
          @click="clickTag(item)"
        >{{ item }}</span>
      </template>
    </div>
  </div>
</template>
<style scoped>
.selectTagDefault {
  @apply flex items-center px-2 py-0.5  -mr-2.6 opacity-65   text-kd14px20px;
}
.selectTag {
  @apply text-global-primary  bg-global-primary;
}

.tag {
  @apply rounded-md px-3 py-1 opacity-65  text-kd14px20px bg-opacity-8;
}

.moreTag {
  @apply rounded-md px-3 py-1 text-center mb-1.8 bg-opacity-8;
}

.tagBg {
  background: #ffffff;
  border: 1px solid #f0f0f0;
  box-shadow: 0px 4px 12px rgba(3, 54, 102, 0.08);
  border-radius: 4px;
}
</style>
