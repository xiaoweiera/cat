<script setup lang="ts">
import { toUpper } from 'ramda'
import { isAfter } from '~/utils/time'
import { defineProps, computed } from 'vue'
import { toNumberCashFormat, toArray, map, dateFormat, size } from '~/utils'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const chainNames = computed<string>(function() {
  const chains = props.data?.chains || []
  const list = map(function(item: any) {
    return toUpper(item.name)
  }, toArray(chains))
  return list.join('、')
})

</script>

<template>
  <div class="border-0 border-t border-solid border-global-highTitle border-opacity-6">
    <div class="py-4 flex text-global-highTitle text-opacity-45">
      <div class="flex-1 w-1">
        <p class="text-14-18">当前价格</p>
        <div class="text-global-numGreen mt-1">
          <IconFont :type="data.price_unit"/>
          <span class="text-26 font-bold text-number mx-1">{{ data.price }}</span>
          <span class="text-12-18">{{ toUpper(data.price_unit) }}</span>
        </div>
      </div>
      <div class="flex-1 w-1 line">
        <p class="text-14-18">发行数量</p>
        <div class="mt-1">
          <p class="text-26 font-bold text-number text-global-highTitle">
            <span>{{ toNumberCashFormat(data.issue_volume, '') }}</span>
          </p>
        </div>
      </div>
      <div class="flex-1 w-1 line">
        <p class="text-14-18">所在公链</p>
        <div class="text-12-18 text-global-highTitle mt-1">
          <span class="text-26 font-bold text-number">{{ size(data.chains) }}</span>
          <span class="mx-0.5">条</span>
          <span>({{ chainNames }})</span>
        </div>
      </div>
    </div>
  </div>
  <div class="border-0 border-t border-b border-solid border-global-highTitle border-opacity-6">
    <div class="py-4">
      <div class="flex flex-wrap text-14-18">
        <div class="w-1/3 pr-8">
          <div class="flex items-center">
            <span class="pr-3 min-w-17 inline-block text-global-highTitle text-opacity-45">官网地址</span>
            <span class="truncate flex-1 inline-block">
              <a class="underline text-global-darkblue" v-router.blank="data.website">{{ data.website }}</a>
            </span>
          </div>
        </div>

        <div class="w-1/3">
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
        </div>

        <div class="w-1/3">
          <div class="flex items-center">
            <span class="pr-3 min-w-17 inline-block text-global-highTitle text-opacity-45">社交媒体</span>
            <template v-if="size(data.medias) > 0">
              <template v-for="(media, key) in data.medias" :key="key">
                <a v-router.blank="media.project_media_url" class="mr-3 flex" v-if="media">
                  <IconFont class="text-base" :type="key" bright/>
                </a>
              </template>
            </template>
            <template v-else>
              <span>-</span>
            </template>
          </div>
        </div>

        <div class="w-1/3 mt-3">
          <div class="flex items-center">
            <span class="pr-3 min-w-17 inline-block text-global-highTitle text-opacity-45">上线时间</span>
            <span class="text-global-highTitle">{{ dateFormat(data.online_time, 'YYYY.MM.DD HH:mm') }}</span>
          </div>
        </div>

        <div class="w-1/3 mt-3">
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
  </div>
</template>

<style lang="scss" scoped>
.line {
  border-left-width: 1px;
  @apply pl-6;
  @apply border-solid border-global-highTitle border-opacity-10;
}
</style>
