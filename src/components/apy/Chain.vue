<script setup lang="ts">
import {defineProps} from 'vue'

const props = defineProps({
  tagSelet:{
    type:String
  },
  tagList: {
    type: Array,
  },
  filterTableData:{
    type:Function
  }
})
const change=(name)=>{
  props.filterTableData(name)
}
</script>
<template>
  <!--  链上集合-->
  <div class="flex ">
    <div class="hand" @click="change(item.key)" v-for="item in tagList"
         :class="item.key===tagSelet?'selectTag tag':'tag'">
      <img class="w-4.5 h-4.5 mr-1" :src='item.img' alt="">
      <div class="text-kd12px20px md:text-kd14px20px text-global-primary  font-normal  font-kdExp">{{
          item.name
        }}
      </div>
    </div>
  </div>
</template>
<style scoped>

.tag {
  @apply rounded-md  flex mt-4 md:mr-1  py-1.25 px-3.75 items-center justify-center;
}

.selectTag {
  @apply bg-global-primary bg-opacity-8;
}
</style>