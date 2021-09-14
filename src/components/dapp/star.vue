<script setup lang="ts">
import { toBoolean, toInteger } from '~/utils'
import { defineProps, ref, onMounted } from 'vue'
import * as API from '~/api/index'
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  value: {
    type: Number
  },
  clouted: {
    type: Boolean
  }
})

const count = ref<number>(0)
const active = ref<boolean>(false)

onMounted(function() {
  count.value = toInteger(props.value)
  active.value = toBoolean(props.clouted)
})

const onClick = async function() {
  try {
    const res = await API.dapp.star(props.id)
    count.value = toInteger(res.clout)
    active.value = !active.value;
  } catch (e) {
    // todo
  }

}

</script>

<template>
  <div v-login class="star flex items-center justify-center" :class="{'active': active}" @click="onClick">
    <div class="text-center">
      <div class="flex">
        <IconFont type="icon-triangle" size="24"/>
      </div>
      <div class="flex justify-center">
        <span class="text-sm">{{ count }}</span>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.star {
  @apply w-14 h-12.5 rounded cursor-pointer;
  @apply bg-white border border-solid;
  @apply border-global-highTitle border-opacity-6;
  &.active {
     @apply select-none;
     @apply text-global-darkblue;
     @apply bg-global-darkblue bg-opacity-8;
     @apply border-global-darkblue border-opacity-8;
  }
}
</style>
