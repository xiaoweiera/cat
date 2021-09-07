<script setup lang="ts">
/**
 * @file 设置页面标题
 */
import { defineProps, onBeforeMount } from 'vue'
import { setInject } from '~/utils/use/state'

const setTitle = setInject('headerTitle')

const props = defineProps({
  // 页面标题
  value: {
    type: String,
    required: true
  }
})

onBeforeMount(function() {
  setTitle(props.value)
})

</script>

<template>
  <i class="hidden"></i>
</template>
