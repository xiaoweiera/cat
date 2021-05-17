<script setup lang="ts">
import { defineProps, ref, toRefs } from 'vue'
import { anchorConfig } from '~/logic/apy/config'

const props = defineProps({
  tableIndex: { type: Number },
  selectedMobileAnchor: { type: String },
  title: { type: String },
})
const { name: changeName } = toRefs(props.selectedMobileAnchor)
const getAnchor = (names: string) => {
  changeName.value = names
}
</script>
<template>
  <div :id="'m'+title" :class="tableIndex===0?'h-5':'h-14'"></div>
  <div class="flex w-full justify-around   relative   items-center">
    <template v-for="(item,index) in anchorConfig">
      <a
        v-if="item.name!=='回到顶部'"
        :href="'#m'+item.key"
        style="height:28px"
        :class="tableIndex===index?'selected tag':'tag'"
        @click="getAnchor(item.name)"
      >{{ item.name }}</a>
    </template>
  </div>
</template>
<style lang="postcss" scoped>
.tag {
  @apply text-kd14px18px text-global-highTitle opacity-65 font-kdFang;
}

.selected {
  border-bottom: 2px solid #2B8DFE;
}
</style>
