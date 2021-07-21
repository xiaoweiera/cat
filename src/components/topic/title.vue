<script setup lang="ts">
/**
 * @file 内容标题
 */
import { defineProps, ref } from 'vue'

defineProps({
  menu: {
    type: Object,
    required: true
  },
  sub: {
    type: Boolean,
    default () {
      return false
    }
  }
})

const visible = ref<boolean>(false)

</script>

<template>
  <div class="page-title" :class="{'sub': sub}">
    <span class="flex items-center">
      <IconFont class="mr-2 inline-flex text-2xl" :type="menu.icon_image" size="2xl"></IconFont>
      <b class="inline-block leading-6 text-lg">{{ menu.title || menu.name }}</b>
    </span>
    <div class="followed" :class="`type-${menu.tagId}`">
      <el-popover placement="bottom-end" v-model:visible="visible" :width="300" trigger="click" :show-arrow="false">
        <template #reference>
          <div class="flex items-center cursor-pointer">
            <IconFont class="text-2xl mr-1" type="icon-message"></IconFont>
            <span class="text-base">订阅专题相关异动</span>
          </div>
        </template>
        <div>
          <p class="text-center text-lg font-normal pb-2">关注成功</p>
          <AppDownTips @click="visible = false"/>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .page-title {
    @apply flex justify-between items-center px-5 h-14;
    &:not(.sub) {
      color: #445a84;
      box-shadow: 0 4px 12px rgba(44,140,248, 0.08);
      @apply bg-white;
    }
    .type-item {
      @apply hidden;
    }
  }
  .followed {
    color: #445a84;
  }
</style>
