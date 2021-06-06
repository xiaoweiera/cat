<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import I18n from '~/utils/i18n/index'
import Task from '~/logic/growthpad/task'
import { messageSuccess } from '~/lib/tool'
import { checkAddress } from '~/components/growthpad/task/task'
import activity from '~/logic/growthpad/activity'
const store = Task()

const pictures = ref<string[]>([
  // "https://jsdata-dev-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/6/1ec50f286ae33d9d4f1323402533daa3.jpg",
  // "https://jsdata-dev-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/6/favicon.ico",
  // "https://jsdata-dev-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/6/21d85537d0b2f52d2fa85be5729437e4.jpg",
  // "https://jsdata-dev-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/6/77ed36f4b18679ce54d4cebda306117e.jpeg",
  // "https://jsdata-dev-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/6/1ec50f286ae33d9d4f1323402533daa3.jpg",
  // "https://jsdata-dev-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/6/favicon.ico",
  // "https://jsdata-dev-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/6/21d85537d0b2f52d2fa85be5729437e4.jpg",
  // "https://jsdata-dev-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/6/77ed36f4b18679ce54d4cebda306117e.jpeg",
  // "https://jsdata-dev-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/6/1ec50f286ae33d9d4f1323402533daa3.jpg",
  // "https://jsdata-dev-web.oss-cn-hangzhou.aliyuncs.com/media/uploads/2021/6/favicon.ico",
])

watch(store.chatPicture, (arr: string[]) => {
  const list = [].concat(arr)
  pictures.value = list
})

const picSize = computed<number>((): number => {
  const list = pictures.value
  return list.length || 0
})

const getSize = (data: any): number => {
  const list = data.value ? data.value : [].concat(data)
  const size = list?.length || 0
  console.log(data, size)
  return size
}

const onChange = function(src, index): void {
  const list = [].concat(pictures.value)
  list[index] = src
  pictures.value = list
}

const onUpload = function(value) {
  const list = [].concat(pictures.value)
  pictures.value = [].concat(list, value)
}

const onRemove = function(index) {
  const list = [].concat(pictures.value)
  list.splice(index, 1)
  pictures.value = list
}

const onSubmit = async function() {
  let status = checkAddress(store)
  // 判断活动时间
  if (status) {
    status = activity(store)
  }
  if (status) {
    const list: string[] = [].concat(pictures.value)
    try {
      await store.setChatPicture<string[]>(list)
      messageSuccess(I18n.growthpad.weibo.success)
    } catch (e) {
      console.log(e)
      // todo
    }
  }
}
</script>

<template>
  <div class="flex font-kdFang">
    <div class="flex-1">
      <h2 class="inline whitespace-nowrap text-sm leading-6 pr-1">
        {{ I18n.growthpad.growthpad.label.picture }}
      </h2>
      <p
        class="inline text-xs desc leading-6 link-box"
        v-html="
          I18n.template(I18n.growthpad.growthpad.share.link, {
            url: 'https://jinshuju.net/f/vqZlj3',
          })
        "
      ></p>
    </div>
    <div class="ml-3">
      <Copy
        :link="
          I18n.template(I18n.growthpad.growthpad.share.copy, {
            url: 'https://jinshuju.net/f/vqZlj3',
          })
        "
      >
        <el-button type="primary" round size="small">
          {{ I18n.common.button.copy }}
        </el-button>
      </Copy>
    </div>
  </div>
  <div class="mt-2">
    <h2 class="inline-block whitespace-nowrap text-sm leading-6 pr-1">
      {{ I18n.growthpad.growthpad.label.upload }}
    </h2>
    <p class="text-xs desc leading-6 inline-block">
      {{ I18n.growthpad.growthpad.tips.uploadMax }}
    </p>
  </div>
  <!-- 已上传 -->
  <div v-if="store.chatPicture.value.length >= 10" class="mt-3">
    <div class="flex flex-wrap">
      <template v-for="(src, index) in store.chatPicture.value" :key="index">
        <Upload class="mr-6 mb-6" :src="src" size="xs" :preview="true"></Upload>
      </template>
    </div>
    <div>
      <el-button type="info" round plain size="small" disabled>
        <span>{{ I18n.common.button.review }}</span>
      </el-button>
    </div>
  </div>
  <!-- 未上传 -->
  <div v-else class="mt-3 flex flex-wrap">
    <template v-for="(src, index) in pictures" :key="index">
      <Upload
        class="mr-6 mb-6"
        :src="src"
        size="xs"
        @change="onChange($event, index)"
        @remove="onRemove(index)"
      ></Upload>
    </template>
    <div class="flex items-center mb-6">
      <Upload
        v-show="picSize < 10"
        :key="`up-${picSize}`"
        size="xs"
        :remove="false"
        @change="onUpload"
      ></Upload>
      <div v-login class="inline-block ml-3">
        <el-button
          type="primary"
          round
          size="small"
          :disabled="picSize === 0"
          @click="onSubmit"
        >
          {{ I18n.common.button.submit }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
h2 {
  color: #033666;
}
.desc {
  color: rgba(37, 62, 111, 0.65);
}
.link-box {
  :deep(a) {
    display: inline;
    color: #2b8dfe;
  }
}
</style>
