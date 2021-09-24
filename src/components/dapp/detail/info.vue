<script setup lang="ts">
import { defineProps } from 'vue'
// @ts-ignore
import { dateFormat, size } from '~/utils'
import { isAfter } from '~/utils/time'

defineProps({
  data: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <div class="flex flex-wrap text-14-18">
    <div class="w-1/3 pr-8">
      <div class="flex items-center">
        <span class="pr-3 min-w-17 inline-block text-global-highTitle text-opacity-45">官网地址</span>
        <span class="truncate flex-1 inline-block">
          <a class="underline text-global-darkblue" v-router.blank="data.website">{{ data.website }}</a>
        </span>
      </div>
      <div class="flex items-center mt-3">
        <span class="pr-3 min-w-17 inline-block text-global-highTitle text-opacity-45">社交媒体</span>
        <template v-if="size(data.medias) > 0">
          <template v-for="(media, key) in data.medias" :key="key">
            <template v-if="media">
              <UiFooterHover v-if="media.is_qrcode && media.project_media_url" :href="media.project_media_url">
                <IconFont class="text-base" :type="key" bright/>
              </UiFooterHover>
              <a v-else v-router.blank="media.project_media_url" class="mr-3 flex" v-if="media">
                <IconFont class="text-base" :type="key" bright/>
              </a>
            </template>
          </template>
        </template>
        <template v-else>
          <span>-</span>
        </template>
      </div>
    </div>

    <div class="w-1/3 pr-8">
      <div class="flex items-center">
        <span class="pr-3 min-w-17 inline-block text-global-highTitle text-opacity-45">审计公司</span>
        <template v-if="size(data.audit_reports) > 0">
          <template v-for="(item, index) in data.audit_reports" :key="index">
            <a class="mr-3 underline text-global-darkblue" v-router.blank="item.report">{{ item.audit }}</a>
          </template>
        </template>
        <template v-else>
          <span>-</span>
        </template>
      </div>
      <div class="flex items-center mt-3">
        <span class="pr-3 min-w-17 inline-block text-global-highTitle text-opacity-45">所在公链</span>
        <template v-if="size(data.chains) > 0">
          <template v-for="(item, index) in data.chains" :key="index">
            <IconFont class="mr-3" :type="item.logo" bright/>
          </template>
        </template>
        <template v-else>
          <span>-</span>
        </template>
      </div>
    </div>

    <div class="w-1/3 pr-8">
      <div class="flex items-center">
        <span class="pr-3 min-w-17 inline-block text-global-highTitle text-opacity-45">上线时间</span>
        <span class="text-global-highTitle">{{ dateFormat(data.online_time, 'YYYY.MM.DD HH:mm') }}</span>
      </div>
      <div class="mt-3">
        <span class="pr-3 min-w-17 inline-block text-global-highTitle text-opacity-45">项目状态</span>
        <template v-if="data.online_time && isAfter(data.online_time)">
          <TimeRed :value="data.online_time"></TimeRed>
        </template>
        <span v-else>
          <span class="text-global-highTitle">进行中</span>
        </span>
      </div>
    </div>
  </div>
</template>
