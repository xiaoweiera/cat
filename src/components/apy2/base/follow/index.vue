<script setup lang="ts">
import { defineProps, ref, computed } from 'vue'
import { setFollow } from '~/logic/apy2/follow'
import { isEmpty } from '~/utils'
import { messageError, messageSuccess } from '~/lib/tool'
import safeGet from '@fengqiaogang/safe-get'
import getProps from './props'
import I18n from '~/utils/i18n/index'

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

let flag = false

// @ts-ignore
const onClick = async function() {
  if (flag) {
    return
  }
  flag = true
  const query: any = {
    pool: props.pool,
    value: props.value,
    type: props.type,
  }
  try {
    await setFollow(query)
    follow.value = !getActiveValue();
    if (follow.value) {
      messageSuccess(I18n.apy.pool.added)
    } else {
      messageSuccess(I18n.apy.pool.cancel)
    }
    
  } catch (e) {
    const message = safeGet<string>(e, 'message')
    if (message) {
      messageError(message)
    }
  } finally {
    setTimeout(() => {
      flag = false
    }, 300)
  }
}

</script>

<template>
  <span class="inline-block cursor-pointer" v-login @click.stop.prevent="onClick">
    <span class="flex items-center">
      <IconFont class="follow-button" :class="{ 'active': active }" :type="active ? 'icon-star-xuanzhong' : 'icon-star-weixuanzhong'" size="16"/>
      <slot></slot>
    </span>
  </span>
</template>

<style lang="scss" scoped>
.follow-button {
  &.active {
    @apply text-global-primary;
  }
}
</style>
