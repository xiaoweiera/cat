<script setup lang="ts">

import {defineProps, ref, toRefs} from 'vue'

const props = defineProps({
  tags: {type: Object},
  chartIndex: {type: Number}
})
//@ts-ignore
const {selected: selectedTag} = toRefs(props.tags)
//@ts-ignore
const clickTag = (name: string) => {
  selectedTag.value = name
  isShowMore.value = false
}
const isShowMore = ref(false)
//@ts-ignore
const showMore = () => isShowMore.value = true
//@ts-ignore
const closeMore = () => isShowMore.value = false
</script>
<template>
  <div class="flex mt-3 w-full min-h-7 relative  items-center  justify-between ">
    <div class="flex justify-between">
      <template v-for="(item,i) in tags.platforms">
        <span @click="clickTag(item)" v-if="i<3" :class="selectedTag===item?'selectTag tag hand':'tag hand'">{{
            item
          }}</span>
      </template>
    </div>
    <div v-if="chartIndex!==2 && tags.platforms.length>3" @mouseenter="showMore()" @mouseleave="closeMore()"
         class="flex items-center mr-3  absolute right-0 mt-1 pb-2 pl-2  ">
      <div class="px-2 py-0.5 text-global-default mr-1.5 opacity-65 text-kd14px20px">更多</div>
      <img class="w-2 h-1" src="https://res.ikingdata.com/nav/apyDown.png" alt="">
    </div>
    <div id="dialog" v-show="isShowMore"
         class="tagBg md:mx-10  flex flex-wrap w-full dropList absolute top-5.5 pt-1.5 bg-white  top-5 z-20   ">
      <div @mouseenter="showMore()" @mouseleave="closeMore()"
           class=" grid grid-cols-4   mx-auto flex-wrap  py-1.5 text-kd14px18px  font-normal  ">
        <template v-for="(item,i) in tags.platforms">
          <div @click="clickTag(item)" v-if="i>2"
               :class="selectedTag===item?'  hand moreTag  selectTag ':'hand moreTag' ">{{ item }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<style scoped>
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
