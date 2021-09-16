<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { config, getParam } from '~/utils/router'

onBeforeMount(() => {
  const router = useRouter()
  const query: any = getParam<object>()
  router.replace({
    path: `${config.apy}/mining`,
    query: query
  })
})
</script>

<template>
  <div class="min-h-150">
    <Spin :loading="true"></Spin>
  </div>
</template>

<route lang="yaml">
meta:
  layout: all
</route>
