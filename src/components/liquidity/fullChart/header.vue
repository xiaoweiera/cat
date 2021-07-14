<script setup lang="ts">
import { defineProps,onMounted,ref,reactive } from 'vue'
const props=defineProps({
  chartType:String,
  chartId:String,
  coinType:Object,
})




</script>
<template>
<div>
  {{props.chartType}}
  {{props.chartId}}
  {{props.coinType}}
  {{newCoinType}}
</div>
</template>
<style scoped lang="postcss">

</style>
