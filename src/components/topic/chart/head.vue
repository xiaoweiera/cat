<script setup lang="ts">
/**
 * @file 图表表头信息
 * @author svon.me@gmail.com
 */
import { toBoolean } from '~/utils'
import { defineProps, onMounted, ref, watch } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  full: {
    type: Boolean,
    default () {
      return false
    }
  }
})

const followed = ref<boolean>(false)

watch(props.data, function(data: any) {
  followed.value = toBoolean(data.followed)
})

onMounted(function() {
  followed.value = toBoolean(props.data.followed)
})

// @ts-ignore
const saveChart = function(e: Event) {
  const id = `j-big-${props.data.chartId}`
  const canvas: any = document.querySelector(`.${id} canvas`)
  const strDataURI = canvas.toDataURL("image/png")
  const image = strDataURI.replace("image/png", "image/octet-stream")
  const name = `${props.data.name}.png`
  const downlink = document.createElement('a')
  downlink.setAttribute('download', name)
  downlink.download = name
  downlink.href = image;
  downlink.click();
}

</script>

<template>
  <div class="text-kdFang">
    <!--手机端样式-->
    <div class="block md:hidden">
      <div class="flex items-center">
        <div class="flex-1 w-1">
          <div class="inline-block max-w-full">
            <h4 class="font-bold text-global-highTitle">
              <span class="inline-block max-w-full truncate">{{ data.name }}</span>
            </h4>
          </div>
        </div>
        <div class="flex items-center text-global-time text-xs whitespace-nowrap ml-2">
          <div class="inline-block leading-6">
            <slot name="timeEnd"></slot>
          </div>
          <TopicFollow :class="{'ml-3': !followed}" :id="data.chartId" v-model:status="followed">
          <span class="bg-global-primary follow-btn small">
            <IconFont type="icon-plus" class="text-white"></IconFont>
            <span class="ml-1">关注</span>
          </span>
          </TopicFollow>
        </div>
      </div>
      <div>
        <TopicRate :data="data"></TopicRate>
      </div>
    </div>
    <!-- PC端样式 -->
    <div class="hidden md:block">
      <!-- 大屏模式 -->
      <template v-if="full">
        <div class="flex justify-between items-start">
          <!-- 左侧标题 -->
          <div class="flex-auto w-1 mr-2 md:flex items-center">
            <div class="font-bold text-global-highTitle h-6 leading-6">
              <span class="inline-block max-w-full truncate">{{ data.name }}</span>
            </div>
            <div class="md:ml-3">
              <TopicRate :data="data"></TopicRate>
            </div>
          </div>
          <div class="text-global-time text-xs whitespace-nowrap">
            <div class="inline-block">
              <div class="flex flex-wrap items-center flex-col-reverse md:flex-row">
                <div class="mr-3">
                  <slot name="time"></slot>
                </div>
                <div class="inline-flex items-center justify-end">
                  <!-- 保存 -->
                  <a class="btn-border cursor-pointer" @click="saveChart">
                    <IconFont type="icon-download"/>
                  </a>
                  <!-- 缩放按钮 -->
                  <span class="btn-border ml-3">
                    <FullZoom/>
                  </span>
                </div>
                <div class="mb-3 md:mb-0 md:ml-3 inline-flex items-center">
                  <!-- 关注按钮 -->
                  <div class="inline-block mr-3" v-if="!followed">
                    <TopicFollow :id="data.chartId" v-model:status="followed">
                      <span class="bg-global-primary follow-btn">
                        <IconFont type="icon-plus" class="text-white"></IconFont>
                        <span class="ml-1">关注</span>
                      </span>
                    </TopicFollow>
                  </div>
                  <div>
                    <el-popover placement="bottom" :width="300" trigger="hover">
                      <template #reference>
                        <div class="message cursor-pointer">
                          <IconFont type="icon-message" class="text-white"/>
                          <span class="ml-1">时时接收数据异动</span>
                        </div>
                      </template>
                      <div>
                        <p class="text-center text-lg font-normal pb-2">指标异动订阅</p>
                        <AppDownTips/>
                      </div>
                    </el-popover>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <!-- 正常模式 -->
      <template v-else>
        <div class="flex justify-between items-start">
          <!-- 左侧标题 -->
          <div class="flex-auto w-1 mr-2">
            <!-- 标题名称 -->
            <div class="font-bold text-global-highTitle h-6 leading-6">
              <span class="inline-block max-w-full truncate">{{ data.name }}</span>
            </div>
            <!-- 涨浮概率 -->
            <div>
              <TopicRate :data="data"></TopicRate>
            </div>
          </div>
          <!-- 右侧功能 -->
          <div>
            <div class="flex items-center">
              <div class="inline-block leading-6">
                <slot name="timeEnd"></slot>
              </div>
              <TopicFollow :class="{'ml-3': !followed}" :id="data.chartId" v-model:status="followed">
                <span class="bg-global-primary follow-btn small">
                  <IconFont type="icon-plus" class="text-white"></IconFont>
                  <span class="ml-1">关注</span>
                </span>
              </TopicFollow>
            </div>
            <div class="leading-8 hidden lg:flex lg:items-center lg:justify-end">
              <FullZoom/>
            </div>
          </div>
        </div>
      </template>
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
