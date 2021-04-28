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
  getIsMore(name)
  selectedTag.value = name
  isShowMore.value = false
}
const isShowMore = ref(false)
//@ts-ignore
const showMore = () => isShowMore.value = true
//@ts-ignore
const closeMore = () => isShowMore.value = false
const isMore=ref(true)
//判断是不是外面三个平台
const getIsMore=(name:string)=>{
  //@ts-ignore
  for(let i=0;i<props.tags.platforms.length-1;i++){
    //@ts-ignore
    let item=props.tags.platforms[i]
    if(item===name && i<3){
      console.log('true')
      isMore.value=true
      return false
    }else{
      console.log('falsefalse')
      isMore.value=false
    }
  }
}
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
         class="flex items-center mr-3  absolute right-0 mt-1 pb-2 h-10 pl-2  ">
      <div class="flex items-center px-2 py-0.5  -mr-2.6 opacity-65   text-kd14px20px selectTag tag">
        {{!isMore?selectedTag:'更多'}}
        <img class="w-2 h-1 ml-3" src="https://res.ikingdata.com/nav/apyDown.png" alt="">
      </div>


    </div>
    <div id="dialog" v-show="isShowMore" @mouseenter="showMore()" @mouseleave="closeMore()"
         class="tagBg hand md:mx-10  flex flex-wrap  dropList absolute -right-9  pt-1.5 bg-white  top-9 z-20   ">
      <div
           class=" grid grid-cols-1  flex-wrap py-1.5 text-kd14px18px  font-normal  ">
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
