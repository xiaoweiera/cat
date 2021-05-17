<script setup lang="ts">
import { defineProps, ref, toRefs, onMounted } from 'vue'
const props = defineProps({
  tags: { type: Object },
  chartIndex: { type: Number },
})
// @ts-ignore
const { selected: selectedTag } = toRefs(props.tags)

// 显示的个数
const showNum = ref(3)

const isShowMore = ref(false)
// @ts-ignore
const showMore = () => isShowMore.value = true
// @ts-ignore
const closeMore = () => isShowMore.value = false
const isMore = ref(true)
// 判断是不是外面三个平台
const getIsMore = (name: string) => {
  // @ts-ignore
  for (let i = 0; i < props.tags.platforms.length - 1; i++) {
    // @ts-ignore
    const item = props.tags.platforms[i]
    if (item === name && i < 3) {
      isMore.value = true
      return false
    }
else {
      isMore.value = false
    }
  }
}

// @ts-ignore
const clickTag = (name: string) => {
  getIsMore(name)
  selectedTag.value = name
  isShowMore.value = false
}

onMounted(() => {
  if (props.chartIndex === 0) {
    showNum.value = 2
  }
})
</script>
<template>
  <div class="flex mt-3 w-full min-h-7 relative  items-center  justify-between ">
    <div class="flex justify-between">
      <template v-for="(item,i) in tags.platforms">
        <span v-if="i<showNum" :class="selectedTag===item?'selectTag tag hand':'tag hand'" @click="clickTag(item)">{{
          item
        }}</span>
      </template>
    </div>
    <div
      v-if="chartIndex!==2 && tags.platforms.length>showNum"
      class="flex items-center mr-3  absolute right-0 mt-1 pb-2 h-10 pl-2  "
      @mouseenter="showMore()"
      @mouseleave="closeMore()"
    >
      <div :class="!isMore?'selectTagDefault selectTag tag':'selectTagDefault'">
        {{ !isMore?selectedTag:'更多' }}
        <img class="w-2 h-1 ml-3" src="https://res.ikingdata.com/nav/apyDown.png" alt="">
      </div>
    </div>
    <div
      v-show="isShowMore"
      id="dialog"
      class="tagBg hand md:mx-10  flex flex-wrap  dropList absolute right-0 md:-right-9  pt-1.5 bg-white  top-9 z-20   "
      @mouseenter="showMore()"
      @mouseleave="closeMore()"
    >
      <div
        class=" grid grid-cols-1  flex-wrap py-1.5 text-kd14px18px  font-normal  "
      >
        <template v-for="(item,i) in tags.platforms">
          <div
            v-if="i>showNum-1"
            :class="selectedTag===item?'  hand moreTag  selectTag ':'hand moreTag' "
            @click="clickTag(item)"
          >
            {{ item }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<style scoped>
.selectTagDefault{
  @apply flex items-center px-2 py-0.5  -mr-2.6 opacity-65   text-kd14px20px;
}
.selectTag {
  @apply text-global-primary  bg-global-primary;
}

.tag {
  @apply rounded-md px-3 py-1 opacity-65  text-kd14px20px bg-opacity-8 ;
}

.moreTag {
  @apply rounded-md px-3 py-1 text-center mb-1.8 bg-opacity-8 ;
}

.tagBg {
  background: #FFFFFF;
  border: 1px solid #F0F0F0;
  box-shadow: 0px 4px 12px rgba(3, 54, 102, 0.08);
  border-radius: 4px;

}
</style>
