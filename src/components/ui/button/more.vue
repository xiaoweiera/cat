<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { isFunction } from '~/utils'
import I18n from '~/utils/i18n/index'

const props = defineProps({
  request: {
    type: Function,
    required: true,
  }
})

const loading = ref<boolean>(false)

const onClick = async function() {
  if (loading.value) {
    return false
  }
  loading.value = true
  if (props.request && isFunction(props.request)) {
    try {
      await Promise.all([
        props.request()
      ])
    } catch (e) {
      // todo
    }
    finally {
      loading.value = false
    }
  }
}
</script>

<template>
  <div v-login class="inline-block w-50 h-8.5 rounded bg-global-highTitle bg-opacity-6 text-center cursor-pointer" @click="onClick">
    <div class="h-full flex items-center justify-center">
      <IconFont v-if="loading" type="loading" suffix="png" size="18"/>
      <span v-else class="text-global-highTitle text-opacity-65 text-sm leading-5">{{ I18n.common.button.more }}</span>
    </div>
  </div>
</template>

<style scoped>
</style>
