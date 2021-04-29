<script setup lang="ts">
import {ref} from 'vue'
import {anchorConfig} from '~/logic/apy/config'
const selectedAnchor=ref('机枪池APY')
const getAnchor = (name: string) => {
  selectedAnchor.value = name
}
</script>
<template >
  <div  class="flex w-full justify-around  relative  py-2 mt-5 items-center">
    <template v-for="item in anchorConfig">
      <a :href="'#'+item.key" @click="getAnchor(item.name)" v-if="item.name!=='回到顶部'"  style="height:28px;"  :class="selectedAnchor===item.name?'selected tag':'tag'">{{item.name}}</a>
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
