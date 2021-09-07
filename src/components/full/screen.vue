<script setup lang="ts">
import { computed, watch, ref, defineProps, onMounted, defineEmits } from 'vue'
import { useProvide } from '~/utils/use/state'
import { toBoolean, uuid } from '~/utils'

const emitEvent = defineEmits(['change'])

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
    <el-dialog top="0" v-model="status" custom-class="screen-dialog" :show-close="false" :lock-scroll="true" :append-to-body="true" @opened="onShow" @close="onClose">
      <div class="w-full h-full" v-if="opened">
        <slot :status="status" :id="`medium-${screenId}`"></slot>
      </div>
    </el-dialog>
  </div>
</template>
