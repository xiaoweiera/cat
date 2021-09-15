<script lang="ts">
import { ref } from 'vue'
import safeSet from '@fengqiaogang/safe-set'

const getSortStatus = function(status: string) {
  if (status && status === 'asc') {
    return ''
  } else if (status && status === 'desc') {
    return 'asc'
  } else {
    return 'desc'
  }
}

export default {
  name: 'sort',
  props: {
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
        if (value) {
          if (value === 'asc' || value === 'desc') {
            return
          }
          return false
        }
        return true
      }
    }
  },
  mounted() {
    // @ts-ignore
    this.status = this.sort
  },
  setup(props: any, context: any) {
    const status = ref<string>(props.sort)
    const onChangeSort = () => {
      const value = getSortStatus(status.value)
      status.value = value

      if (props.name) {
        const data = {}
        safeSet(data, 'sort_field', props.name)
        safeSet(data, 'sort_type', value)
        context.emit('onChange', data)
      } else {
        context.emit('onChange', {
          sort: value
        })
      }
    }

    return { status, onChangeSort }
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
