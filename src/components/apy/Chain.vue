<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  tagSelect: {
    type: String,
  },
  tagList: {
    type: Array,
  },
  filterTableData: {
    type: Function,
  },
})
const change = (name: String) => {
  props.filterTableData(name)
}
</script>
<template>
  <!--  链上集合-->
  <div class="flex">
    <div
      v-for="item in tagList"
      class="hand"
      :class="item.key === tagSelect ? 'selectTag tag' : 'tag'"
      @click="change(item.key)"
    >
      <img class="w-4.5 h-4.5 mr-1" :src="item.img" alt="" />
      <div
        class="
          text-kd12px20px
          md:text-kd14px20px
          text-global-primary
          font-normal font-kdExp
        "
      >
        {{ item.name }}
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
