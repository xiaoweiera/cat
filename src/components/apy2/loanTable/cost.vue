
<script setup lang="ts">
import { defineProps } from 'vue'
const props=defineProps({
  value:Number
})
</script>
<template>
    <div :class="value>=0?'text-global-numGreen':'text-global-numRed'" class="text-kd26px26px font-bold">{{value}}%</div>
</template>
