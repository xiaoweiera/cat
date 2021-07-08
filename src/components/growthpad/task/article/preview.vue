<script setup lang="ts">
import { defineProps } from 'vue'
// @ts-ignore
import I18n from '~/utils/i18n/index'
// @ts-ignore
import { isEmpty } from '~/utils/index'

defineProps({
  link: {
    type: String,
  },
  picture: {
    type: String
  }
})
</script>

<template>
  <el-form>
    <div>
      <!--文章链接-->
      <UiTableItem :label="I18n.growthpad.weibo.article">
        <el-form-item>
          <template v-if="!isEmpty(link, true)">
            <a class="text-global-primary" :href="link" target="_blank">{{ link }}</a>
          </template>
          <template v-else>
            <span>-</span>
          </template>
        </el-form-item>
      </UiTableItem>
      <!--文章截图-->
      <UiTableItem :label="I18n.growthpad.weibo.articleImg" >
        <el-form-item class="mb-0">
          <!-- 图片为空 -->
          <span v-if="isEmpty(picture)">-</span>
          <!-- 图片存在 -->
          <Upload :src="picture" :preview="true"></Upload>
        </el-form-item>
      </UiTableItem>
    </div>
    <div>
      <slot name="after"></slot>
    </div>
  </el-form>
</template>
