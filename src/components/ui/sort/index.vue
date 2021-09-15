<script setup lang="ts">
import { ref, defineProps, onMounted, defineEmits, inject } from 'vue'
import safeSet from '@fengqiaogang/safe-set'
import { isEmpty, uuid, forEach, isFunction } from '~/utils'
import safeGet from '@fengqiaogang/safe-get'

const emitEvent = defineEmits(['change'])

const props = defineProps({
  title: {
    type: String,
    default: () => ''
  },
  name: {
    type: String,
    default: () => ''
  },
  sort: {
    type: String,
    default: () => '',
    validator: (value: string) => {
      if (isEmpty(value)) {
        return true
      }
      return value === 'asc' || value === 'desc';
    }
  }
})

const getSortStatus = function(status: string) {
  if (status && status === 'asc') {
    return ''
  } else if (status && status === 'desc') {
    return 'asc'
  } else {
    return 'desc'
  }
}


const status = ref<string>('')

const setGroup = inject<any>('setSortGroup')
const group = inject<any>('getSortGroup')

onMounted(function() {
  if (setGroup && isFunction(setGroup)) {
    const reset = function() {
      status.value = ''
    }
    setGroup(reset)
  }
  status.value = props.sort
})

const onChangeSort = () => {
  const value = getSortStatus(status.value)
  if (group) {
    // 重置其它排序
    forEach(function(reset: any) {
      if (reset && isFunction(reset)) {
        reset()
      }
    }, group.value)
  }
  // 设置当前分组的排序状态
  status.value = value

  if (props.name) {
    const data = {}
    safeSet(data, 'sort_field', props.name)
    safeSet(data, 'sort_type', value)
    emitEvent('change', data)
  } else {
    emitEvent('change', {
      sort: value
    })
  }
}
</script>

<template>
  <div class="flex items-center cursor-pointer" @click="onChangeSort">
    <div class="mr-1 select-none">
      <slot>
        <span>{{ title }}</span>
      </slot>
    </div>
    <template v-if="status === 'asc'">
      <IconFont type="icon-paixu-shang" size="15"/>
    </template>
    <template v-else-if="status === 'desc'">
      <IconFont type="icon-paixu-xia" size="15"/>
    </template>
    <template v-else>
      <IconFont type="icon-paixu" size="15"/>
    </template>
  </div>
</template>

<style scoped lang="scss">
</style>
