<script setup lang="ts">
import { ref, defineProps,computed } from 'vue'
import {chainsIcon} from '~/logic/apy2/config'
import {tolocaleUpperCase} from '~/lib/tool'
const props=defineProps({
  data:Object
})
</script>
<template>
    <div>
      <span class="font-kdFang  text-kd12px16px text-global-highTitle text-opacity-45">单利收益: </span>
      <span class="font-kdExp text-kd12px16px text-global-highTitle text-opacity-85">{{data.dan}}</span>
    </div>
    <div class="font-kdFang  ">
      <span class="font-kdFang  text-kd12px16px text-global-highTitle text-opacity-45">复利收益: </span>
      <span class="font-kdExp text-kd12px16px text-global-highTitle text-opacity-85">{{data.fu}}</span>
    </div>
</template>
<style scoped lang="scss">
</style>