<script setup lang="ts">
import { computed, watch, ref, defineProps, onMounted, defineEmit } from 'vue'
import { useProvide } from '~/utils/use/state'
import { toBoolean, uuid } from '~/utils'

const emitEvent = defineEmit(['change'])

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

watch(fullStatus, function(data: any) {
  const [ value ]: [boolean] = data
  opened.value = false
  screenId.value = uuid()
  emitEvent('change', value)
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
  <slot :status="false" :id="`small-${screenId}`"></slot>
  <div v-if="status">
    <el-dialog top="0" v-model="status" custom-class="screen-dialog" :append-to-body="true" @opened="onShow" @close="onClose">
      <div class="w-full h-full" v-if="opened">
        <slot :status="status" :id="`medium-${screenId}`"></slot>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss">
  .el-dialog.screen-dialog {
    margin: 0 !important;
    width: initial !important;
    @apply absolute;
    @apply left-15 top-15 right-15 bottom-15;
    @apply md:left-30 md:top-20 md:right-30 md:bottom-20;
    .el-dialog__header {
      @apply hidden;
    }
    .el-dialog__body {
      padding: 20px !important;
      @apply h-full;
    }
  }
</style>
