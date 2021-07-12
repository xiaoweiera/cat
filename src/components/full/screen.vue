<script setup lang="ts">
import { computed, watch, ref, defineProps, onMounted } from 'vue'
import { useProvide } from '~/utils/use/state'
import { toBoolean, uuid } from '~/utils'

const props = defineProps({
  status: {
    type: Boolean,
    default () {
      return false
    }
  }
})

const screenId = ref<string>(uuid())
const opened = ref<boolean>(false)

const [ fullStatus, set ] = useProvide('fullStatus', false)

watch(fullStatus, function() {
  opened.value = false
  screenId.value = uuid()
})

// @ts-ignore
const status = computed<boolean>(function() {
  const [ value ] = fullStatus?.value
  return toBoolean(value)
})

// @ts-ignore
const onShow = function() {
  opened.value = true
}

// @ts-ignore
const onClose = function() {
  set(false)
  return true
}

onMounted(function() {
  set(props.status)
})


</script>

<template>
  <slot :status="false" :id="screenId"></slot>
  <div v-if="status">
    <el-dialog top="0" v-model="status" custom-class="screen-dialog" :append-to-body="true" @opened="onShow" @close="onClose">
      <div class="w-full h-full" v-if="opened">
        <slot :status="status" :id="screenId"></slot>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss">
  .el-dialog.screen-dialog {
    margin: 0 !important;
    width: initial !important;
    @apply absolute;
    @apply left-30 top-20 right-30 bottom-20;
    .el-dialog__header {
      @apply hidden;
    }
    .el-dialog__body {
      padding: 20px !important;
      @apply h-full;
    }
  }
</style>
