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
      <div class="text-center">
        <p class="text-xs desc">扫码下载 APP 接收全部异动</p>
        <div class="py-4">
          <img class="w-40 h-40 inline-table" src="https://res.ikingdata.com/nav/topicDown.png">
        </div>
        <div>
          <div class="w-56 px-0.5 inline-block" @click="folloed = false">
            <el-button class="w-full" type="primary">确定</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>


<style scoped lang="scss">
  .title {
    color: #272c33;
  }
  .desc {
    color: #989898;
  }
  .follow-btn {
    border-radius: 34px;
    border: 1px solid #2b8dff;
    color: #2b8dff;
    @apply text-xs inline-block;
    @apply py-1.5 px-2;
  }
</style>
