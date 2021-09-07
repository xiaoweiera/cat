<script setup lang="ts">
import { wxShare } from '~/lib/wxShare'
import { defineProps, onMounted } from 'vue'

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
onMounted(() => {
  // 设置微信分享
  wxShare(props.title, props.content)
})

</script>

<template>
<i class="hidden"></i>
</template>
