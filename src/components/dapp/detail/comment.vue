<script setup lang="ts">
/**
 * @file 项目点评论
 */
import { defineProps } from 'vue'
import I18n from '~/utils/i18n/index'

defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="mt-12" v-show="data.comment">
    <div class="text-global-highTitle text-opacity-85">
      <div class="flex items-center">
        <IconFont class="mr-1.5" type="safe" size="24" bright/>
        <h3 class="text-18 font-m">{{ I18n.dapp.comment.title }}</h3>
      </div>
      <p class="text-14-20 mt-1.5">{{ data.comment }}</p>
    </div>
  </div>
</template>


