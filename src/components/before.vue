<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { defineEmit } from 'vue'
const emitEvent = defineEmit(['confirm'])

const props = defineProps({
  app: {
    type: Function
  },
  content: {
    type: String
  }
})
// @ts-ignore
const visible = ref<boolean>(false)

// @ts-ignore
const onClick = function(e) {
  if (props.app) {
    try {
      const status = props.app()
      if (!status) {
        e.stopPropagation()
        e.preventDefault()
        visible.value = true
      }
    } catch (err) {
    }
  }
}

const onConfirm = function() {
  visible.value = false
  emitEvent('confirm')
}

</script>

<template>
  <template v-if="app">
    <div @click.capture="onClick">
      <slot></slot>
    </div>
    <el-dialog custom-class="diy-dialog hidden-header" v-model="visible" width="280px" :append-to-body="true" :show-close="false">
      <div class="p-4">
        <slot name="content">
          <div class="py-4 text-center">
            <span>{{ content }}</span>
          </div>
        </slot>
        <div class="mt-4 rounded bg-global-primary text-base py-2.5 text-center cursor-pointer" @click="onConfirm">
          <span class="text-white select-none">确定</span>
        </div>
      </div>
    </el-dialog>
  </template>
  <template v-else>
    <slot></slot>
  </template>

</template>

