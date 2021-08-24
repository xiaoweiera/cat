<script setup lang="ts">
import { useWatch } from '~/utils/use/state'
import eventName from './eventname'
import { computed, ref, defineProps } from 'vue'
import { toBoolean } from '~/utils'

defineProps({
  type: {
    type: String,
    required: true,
    default: () => 'mining',
    validator: function(value: string) {
      // 类型为挖矿与借贷
      return value === 'mining' || value === 'loan';
    }
  },
  id: {
    type: [String, Number],
    required: true,
  }
})


const opened = ref<boolean>(false)

const watch = function() {
  opened.value = false
}

const [ statusDialog, set ] = useWatch(eventName.triggerStatusEvent, watch, false)

// @ts-ignore
const onShow = function() {
  opened.value = true
}

// @ts-ignore
const onClose = function() {
  set(false)
  return true
}

// @ts-ignore
const status = computed<boolean>(function() {
  const [ value ] = statusDialog?.value
  return toBoolean(value)
})
// @ts-ignore
const onClick = function() {
  set(true)
}

</script>


<template>
  <div>
    <div @click="onClick">
      <slot name="reference"></slot>
    </div>
    <template v-if="status">
      <el-dialog top="0" v-model="status" custom-class="screen-dialog" :show-close="false" :lock-scroll="true" :append-to-body="true" @opened="onShow" @close="onClose">
        <div class="w-full h-full" v-if="opened">
          <slot name="content" :status="status">
            <Apy2PoolDetail :id="id" :type="type"/>
          </slot>
        </div>
      </el-dialog>
    </template>
  </div>
</template>

