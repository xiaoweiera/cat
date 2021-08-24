<script setup lang="ts">
import { useWatch } from '~/utils/use/state'
import eventName from './eventname'
import { computed, ref } from 'vue'
import { toBoolean } from '~/utils'

const opened = ref<boolean>(false)

const watch = function() {
  opened.value = false
}

const [ statusDialog, set ] = useWatch(eventName.triggerStatusEvent, watch, true)

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
            <Apy2PoolDetail id="20" type="loan"/>
          </slot>
        </div>
      </el-dialog>
    </template>
  </div>
</template>

