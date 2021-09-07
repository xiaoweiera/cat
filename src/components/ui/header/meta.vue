<script setup lang="ts">
import { defineProps, onBeforeMount } from 'vue'
import { setInject, getInject } from '~/utils/use/state'

const setMeta = setInject('headerMeta')
const state = getInject('headerMeta')

const props = defineProps({
  // 名称
  name: {
    type: String,
    required: true
  },
  // 内容
  content: {
    type: String,
    required: true
  }
})

onBeforeMount(function() {
  const meta = state.value
  const index = meta ? meta.length : 0
  const data = {
    name: props.name,
    content: props.content
  }
  setMeta(data, index)
})

</script>

<template>
  <i class="hidden"></i>
</template>
