<script setup lang="ts">
const onCheckChange = function(data) {
  console.log(data)
}
</script>

<template>
  <UtilCheck @change="onCheckChange"></UtilCheck>
</template>

// @formatter:off
<route lang="yaml">
meta:
  layout: index
</route>
// @formatter:off
