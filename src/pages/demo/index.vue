
<script lang="ts">
import * as util from '~/utils'

console.log(util.toNumberFormat(123456789101112313, '$'))
console.log(util.toNumberFormat(null, '$'))
console.log(util.toNumberFormat(12.3, '%'))
console.log(util.toNumberFormat(null, '%'))
console.log(util.toNumberCashFormat('123456.78M', '$'))
</script>

<template>
  <div>
    <div v-for="i in 5" :key="i">
      <div>test</div>
    </div>
  </div>
</template>

<style scoped>

</style>

// @formatter:off
<route lang="yaml">
meta:
  layout: all
</route>
// @formatter:off
