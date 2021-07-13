<script setup lang="ts">
/**
 * @file 图表表头信息
 * @author svon.me@gmail.com
 */
import { toBoolean, dateDiff, dateTime } from '~/utils'
import { defineProps, onMounted, ref, computed } from 'vue'
import safeGet from '@fengqiaogang/safe-get'
import * as time from '~/utils/time/index'
import { dateDiffDay, dateDiffMinute } from '~/utils/time/index'

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
      const [data] = props.xzxis.slice(-1)
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
    <div class="flex justify-between">
      <!-- 标题 -->
      <h4 class="font-bold text-global-highTitle">{{ data.name }}</h4>
      <div class="text-global-time text-xs">
        <!-- 更新时间 -->
        <span v-if="updateLast">
          <span>更新时间:</span>
          <span class="ml-1">2天前</span>
        </span>
        <div v-if="full" class="inline-block">
          <div class="flex items-center">
            <span class="btn-border">
              <IconFont type="icon-download"/>
            </span>

            <!-- 缩放按钮 -->
            <span class="btn-border ml-3">
              <FullZoom/>
            </span>

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
        <div v-else class="inline-block">
          <div class="flex items-center">
            <span>{{ timeEnd }}</span>
            <TopicFollow class="ml-3" :id="data.chartId" v-model:status="followed">
              <span class="bg-global-primary follow-btn small">
                <IconFont type="icon-plus" class="text-white"></IconFont>
                <span class="ml-1">关注</span>
              </span>
            </TopicFollow>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-between items-center mt-1.5 h-9" v-if="!full">
      <!-- 涨浮比 -->
      <!--
      <span class="flex items-baseline">
        <span class="text-3xl mr-2  block" v-if="detail.value">
          <span v-if="detail.value > 0" class="text-global-numGreen">{{ toNumber(detail.value) }}%</span>
          <span v-else class="text-global-numRed">{{ toNumber(detail.value) }}%</span>
        </span>
        <span class="text-sm block" v-if="detail.change">
          <span v-if="detail.change > 0" class="text-global-numGreen flex items-center">
            <span>+{{ convertNumber(detail.change, 100) }}%</span>
            <IconFont class="ml-1" size="8" type="https://res.ikingdata.com/nav/topicUp.svg"/>
          </span>
          <span v-else class="text-global-numRed flex items-center">
            <span>{{ convertNumber(detail.change, 100) }}%</span>
            <IconFont class="ml-1" size="8" type="https://res.ikingdata.com/nav/topicDown.svg"/>
          </span>
        </span>
      </span>
      -->
      <span>0%</span>

      <span>
        <FullZoom v-show="!full"/> <!-- 缩放按钮 -->
      </span>
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
