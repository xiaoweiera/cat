<script setup lang="ts">
import { defineProps, ref, computed } from 'vue'
import { setFollow } from '~/logic/apy2/follow'
import { isEmpty } from '~/utils'
import { messageError, messageSuccess } from '~/lib/tool'
import safeGet from '@fengqiaogang/safe-get'
import getProps from '~/components/apy2/base/follow/props'

const props = defineProps(getProps())

const follow = ref<any>('')

const getActiveValue = function(): boolean {
  if (isEmpty(follow.value)) {
    return props.status
  }
  return follow.value
}
// @ts-ignore
const active = computed<boolean>(getActiveValue)

// @ts-ignore
const onClick = async function() {
  const query: any = {
    pool: props.pool,
    value: props.value,
    type: props.type,
  }
  try {
    await setFollow(query)
    follow.value = !follow.value;
    messageSuccess('已收藏')
  } catch (e) {
    const message = safeGet(e, 'message') || '收藏失败，请稍后再试'
    messageError(message)
  }
}

</script>

<template>
  <span class="inline-block cursor-pointer" v-login @click.stop.prevent="onClick">
    <IconFont class="follow-button" :class="{ 'active': active }" :type="active ? 'icon-star-xuanzhong' : 'icon-star-weixuanzhong'" size="16"/>
    <slot></slot>
  </span>
</template>

<style lang="scss" scoped>
.follow-button {
  &.active {
    @apply text-global-primary;
  }
}
</style>
