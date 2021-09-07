<script setup lang="ts">
import { defineProps, onBeforeMount, toRaw, watch } from 'vue'
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

const update = function() {
  const meta = toRaw(state.value)
  const data = {
    name: props.name,
    content: props.content
  }
  if (meta.length === 0) {
    setMeta(data, 0)
  } else {
    let index = 0
    for(let size = meta.length; index < size; index++) {
      const item = meta[index]
      if (item.name === props.name) {
        break
      }
    }
    setMeta(data, index)
  }
}

onBeforeMount(update)
watch(props, update)

</script>

<template>
  <i class="hidden"></i>
</template>
