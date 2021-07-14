<script setup lang="ts">
/**
 * @file 图表表头信息
 * @author svon.me@gmail.com
 */
import { toBoolean, dateDiff, dateTime } from '~/utils'
import { defineProps, onMounted, ref, computed } from 'vue'
import safeGet from '@fengqiaogang/safe-get'
import * as time from '~/utils/time/index'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  xzxis: {
    type: Array,
    default() {
      return []
    }
  },
  full: {
    type: Boolean,
    default () {
      return false
    }
  }
})

const followed = ref<boolean>(false)

// @ts-ignore
const timeEnd = computed(function() {
  const data = props.data
  const last = safeGet<number>(data, 'last')
  if (last) {
    const value = dateTime(last)
    const day = time.dateDiffDay(value)
    if (day > 0) {
      return `${day}天前`
    }
    const hour = time.dateDiffHour(value)
    if (hour > 0) {
      return `${hour}小时前`
    }
    const minute = time.dateDiffMinute(value)
    if (minute > 0) {
      return `${minute}分钟前`
    }
    return '1分钟'
  } else {
    if (props.xzxis?.length > 0) {
      const [ data ]: any[] = props.xzxis.slice(-1)
      const { time } = data
      return `${dateDiff(time)}前`
    }
  }
  return ''
})

onMounted(function() {
  followed.value = toBoolean(props.data.followed)
})

</script>

<template>
  <div class="text-kdFang">
    <div class="flex justify-between items-start whitespace-nowrap">
      <!-- 标题 -->
      <div :class="{'md:flex': full}">
        <h4 class="font-bold text-global-highTitle h-7.5 inline-flex items-center">
          <span>{{ data.name }}</span>
        </h4>
        <div class="h-7.5 flex items-center" :class="{'md:ml-3': full}">
          <span>1%</span>
          <span>1%</span>
        </div>
      </div>
      <div class="text-global-time text-xs whitespace-nowrap">
        <!-- 更新时间 -->
        <span v-if="updateLast">
          <span>更新时间:</span>
          <span class="ml-1">2天前</span>
        </span>
        <div v-if="full" class="inline-block">
          <div class="flex flex-wrap flex-col-reverse md:flex-row">
            <div class="inline-flex items-center justify-end">
              <span class="btn-border">
                <IconFont type="icon-download"/>
              </span>

                <!-- 缩放按钮 -->
                <span class="btn-border ml-3">
                <FullZoom/>
              </span>
            </div>

            <div class="mb-3 md:mb-0 md:ml-3 inline-flex items-center">
              <!-- 关注按钮 -->
              <div class="inline-block">
                <TopicFollow :id="data.chartId" v-model:status="followed">
                <span class="bg-global-primary follow-btn">
                  <IconFont type="icon-plus" class="text-white"></IconFont>
                  <span class="ml-1">关注</span>
                </span>
                </TopicFollow>
              </div>

              <div class="message ml-3 cursor-pointer">
                <IconFont type="icon-message" class="text-white"/>
                <span class="ml-1">时时接收数据异动</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="block">
          <div class="flex items-center">
            <span>{{ timeEnd }}</span>
            <TopicFollow class="ml-3" :id="data.chartId" v-model:status="followed">
              <span class="bg-global-primary follow-btn small">
                <IconFont type="icon-plus" class="text-white"></IconFont>
                <span class="ml-1">关注</span>
              </span>
            </TopicFollow>
          </div>
          <div class="flex items-center justify-end h-7.5">
            <FullZoom/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.follow-btn {
  border-radius: 34px;
  @apply text-xs text-white inline-block;
  &:not(.small) {
    @apply py-1.5 px-2
  }
}
.follow-btn {
  &.small {
    @apply py-1 px-1.5;
  }
}


.message {
  background: #09d98e;
  @extend .follow-btn;
}
.btn-border {
  border: 1px solid #e7e7e7;
  @apply rounded w-7.5 h-7.5 inline-flex justify-center items-center;
}
</style>
