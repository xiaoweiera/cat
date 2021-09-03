<script setup lang="ts">
import { defineProps } from 'vue'
import I18n from '~/utils/i18n/index'
import { TabCategoryData } from '~/logic/apy2/interface'

const props= defineProps({
  // 类型
  type: {
    type: String,
  },
  // 分组
  groupId: {
    type: String,
  },
})
</script>
<template>
  <div class="h-60 flex items-center justify-center borderClass font-kdFang">
    <div class="text-center">
      <!-- 自选币种 -->
      <template v-if="groupId === 'my'">
        <div class="text-global-highTitle text-opacity-85 text-kd16px24px">您未添加自选</div>
        <div v-if="type=== TabCategoryData.mining ">
          <span class="mt-2 text-kd12px16px text-global-highTitle text-opacity-45">
            <span>请点击下方</span>
            <span class="text-global-primary">"添加币种 & LP"</span>
            <span>按钮添加你关注的币种或 LP</span>
          </span>
        </div>
        <div v-if="type=== TabCategoryData.lend">
          <span class="mt-2 text-kd12px16px text-global-highTitle text-opacity-45">
            <span>请点击下方</span>
            <span class="text-global-primary">"添加币种"</span>
            <span>按钮添加你关注的币种</span>
          </span>
        </div>
      </template>
      <template v-else>
        <div class="text-global-highTitle text-opacity-85 text-kd16px24px">暂无数据</div>
      </template>
    </div>
  </div>
</template>
<style scoped lang="postcss">
.borderClass{
  border:1px solid #EBEBEB;
}
</style>
