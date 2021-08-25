<script setup lang="ts">
import { defineProps, ref, computed } from 'vue'
import { TabCategoryData } from '~/logic/apy2/interface'
import * as API from '~/api/index'
import { isEmpty } from '~/utils'
import { messageError, messageSuccess } from '~/lib/tool'
import safeGet from '@fengqiaogang/safe-get'

const props = defineProps({
  // 是否是池子，否则为单币
  pool: {
    type: Boolean,
    default () {
      return false
    }
  },
  // 类型
  type: {
    type: String,
    default: () => TabCategoryData.mining,
    validator: function(value: string) {
      // 类型为挖矿与借贷
      return value === TabCategoryData.mining || value === TabCategoryData.lend;
    }
  },
  // 币种为 symbol name, 池子为 id
  value: {
    type: [String, Number],
    required: true,
  },
  // 是否已收藏, 默认为未收藏
  status: {
    type: Boolean,
    default () {
      return false
    }
  }
})

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
    await API.apy.common.setFollow(query)
    follow.value = !follow.value;
    messageSuccess('已收藏')
  } catch (e) {
    const message = safeGet(e, 'message') || '收藏失败，请稍后再试'
    messageError(message)
  }
}

</script>

<template>
  <IconFont v-login @click.stop.prevent="onClick" class="follow-button cursor-pointer" :class="{ 'active': active }" type="icon-star-weixuanzhong" size="16"/>
</template>

<style lang="scss" scoped>
.follow-button {
  &.active {
    @apply text-global-primary;
  }
  &:not(.active) {
    @apply text-global-highTitle text-opacity-45;
  }
}
</style>
