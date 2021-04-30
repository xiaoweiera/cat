<script setup lang="ts">
import {defineProps, ref,toRefs} from 'vue'
import {anchorConfig} from '~/logic/apy/config'
const props = defineProps({
  tableIndex: { type: Number },
  selectedMobileAnchor:{type:String},
  title:{type:String}
})
const {name:changeName}=toRefs(props.selectedMobileAnchor)
const getAnchor = (names: string) => {
  changeName.value = names
}
</script>
<template >
  <div class="h-5" :id="'m-'+title"></div>
  <div    class="flex w-full justify-around   relative   items-center">
    <template v-for="(item,index) in anchorConfig">
      <a :href="'#m-'+item.key" @click="getAnchor(item.name)" v-if="item.name!=='回到顶部'"  style="height:28px;"  :class="selectedMobileAnchor.name===item.name?'selected tag':'tag'">{{item.name}}</a>
    </template>
  </div>
</template>
<style lang="postcss" scoped>
.tag{
  @apply  text-kd14px18px text-global-highTitle opacity-65 font-kdFang;
}
.selected{
 border-bottom:2px solid #2B8DFE;
}
</style>
