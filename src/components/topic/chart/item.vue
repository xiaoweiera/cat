<script setup lang="ts">
import { defineProps, onMounted } from 'vue'
import { getChartDetail } from '~/logic/topic/chart'

const props = defineProps({
  multiple: {
    type: Boolean
  },
  id: {
    type: Array
  }
})

const getData = async function() {
  await getChartDetail(props.multiple, props.id)
}

onMounted(getData)

</script>

<template>
  <span>multiple = {{ multiple }}</span>
  <span> - </span>
  <span>ids = {{ id }}</span>
</template>

<style scoped>

</style>
