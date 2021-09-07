<script setup lang="ts">
/**
 * @file 设置页面标题
 */
import { defineProps, onBeforeMount, watch } from 'vue'
import { setInject } from '~/utils/use/state'

const setTitle = setInject('headerTitle')

const props = defineProps({
  // 页面标题
  value: {
    type: String,
    required: true
  }
})

const update = function(){
  setTitle(props.value)
}

onBeforeMount(update)
watch(props, update)

</script>

<template>
  <i class="hidden"></i>
</template>
