<script setup lang="ts">
/**
 * @file 处理图表关注
 * @author svon.me@gmail.com
 */

import { addFollow, unFollow } from '~/logic/topic/follow'
import { defineProps, ref, defineEmit, computed } from 'vue'
import { param } from '~/logic/topic/router'

const props = defineProps({
  id: {
    type: [Number, String],
    required: true
  },
  status: {
    type: Boolean,
    default () {
      return false
    }
  }
})
const emitEvent = defineEmit(['update:status'])

const folloed = ref<boolean>(false)

// @ts-ignore
const isMyfollow = computed<boolean>(function() {
  if (param.topicID === 'my') {
    return true
  }
  return false
})

// 关注
// @ts-ignore
const onClickfollow = async function() {
  const status = await addFollow(props.id)
  folloed.value = status
  emitEvent('update:status', status)
}

// 取消关注
// @ts-ignore
const onClickUnFollow = async function() {
  const status = await unFollow(props.id)
  if (status) {
    folloed.value = false
    emitEvent('update:status', false)
  }
}
</script>

<template>
  <div>
    <div class="cursor-pointer" v-if="!status" @click="onClickfollow">
      <slot></slot>
    </div>
    <div class="cursor-pointer" v-else-if="isMyfollow">
      <span class="ml-3 follow-btn" @click="onClickUnFollow">
        <IconFont type="icon-gou_huaban1"></IconFont>
        <span class="ml-1.5">已关注</span>
      </span>
    </div>
    <el-dialog v-model="folloed" width="320px !important" :append-to-body="true">
      <template #title>
        <p class="text-center text-base font-normal title">关注成功</p>
      </template>
      <!--App 下载提示-->
      <AppDownTips/>
    </el-dialog>
  </div>
</template>


<style scoped lang="scss">
  .title {
    color: #272c33;
  }
  .follow-btn {
    border-radius: 34px;
    border: 1px solid #2b8dff;
    color: #2b8dff;
    @apply text-xs inline-block;
    @apply py-1.5 px-2;
  }
</style>
