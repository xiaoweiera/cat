<script setup lang="ts">
import { toBoolean } from '~/utils/index'
import { setInject, getInject } from '~/utils/use/state'
import { defineEmit } from 'vue'

const emitEvent = defineEmit(['change'])

const setFullStatus = setInject('fullStatus')
const fullStatus = getInject('fullStatus')

const getStatus = function() {
  const arr = fullStatus?.value || []
  return toBoolean(arr[0])
}

// @ts-ignore
const onFull = function() {
  const status = !getStatus()
  setFullStatus(status)
  emitEvent('change', status)
}
</script>

<template>
  <span class="cursor-pointer" v-login @click="onFull">
    <span :class="{'hidden': getStatus()}">
      <IconFont type="icon-zoom" class="text-white"></IconFont>
    </span>
    <span :class="{ 'hidden': !getStatus() }">
      <IconFont type="icon-suoxiao" class="text-white"></IconFont>
    </span>
  </span>
</template>


