<script setup lang="ts">
import { watch } from 'vue'
import { toBoolean } from '~/utils'
import { setInject, getInject } from '~/utils/use/state'
import FullEventName from './eventname'

const setFullStatus = setInject('fullStatus')

const triggerFullState = getInject(FullEventName.triggerFullEvent)

watch(triggerFullState, function (data: any) {
  const [ value ] = data
  const status = toBoolean(value)
  setFullStatus(status)
})

</script>
<template>
  <i class="hidden"></i>
</template>