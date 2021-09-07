<script setup lang="ts">
import {wxShare} from '~/lib/wxShare'
import {defineProps, onMounted, watch} from 'vue'

const props = defineProps({
  // 分享标题
  title: {
    type: String,
    required: true
  },
  // 分享内容
  content: {
    type: String,
    required: true
  }
})
const shareFun = () => wxShare(props.title, props.content)
watch(props, shareFun)
onMounted(shareFun)
</script>
<template>
  <i class="hidden"></i>
</template>
