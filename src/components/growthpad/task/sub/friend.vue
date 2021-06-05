<script setup lang="ts">
import { ref, computed } from 'vue'
import I18n from '~/utils/i18n/index'
import Task from '~/logic/growthpad/task'
const store = Task()

const pictures = ref<string[]>([])

const picSize = computed<number>((): number => {
  const list = pictures.value
  return list.length || 0
})

// 替换图片
const onChange = function(src: string, index: number): void {
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

const onSubmit = async function(): Promise<void> {
  const list: string[] = [].concat(pictures.value)
  try {
    await store.setFriendPicture<string[]>(list)
  } catch (e) {
    console.log(e)
    // todo
  }
}

const shareImg = ref<string>(
  'https://res.ikingdata.com/static/share/growth.jpg',
)
</script>

<template>
  <div class="flex font-kdFang">
    <h2 class="whitespace-nowrap text-sm leading-6 pr-1">
      1. {{ I18n.growthpad.growthpad.label.picture }}
    </h2>
    <div>
      <p class="text-xs desc leading-6">
        {{ I18n.growthpad.growthpad.tips.active }}
      </p>
      <div class="mt-3">
        <a v-router="shareImg" class="inline-block" target="_blank">
          <img class="inline-block" :src="shareImg" />
        </a>
      </div>
      <div class="mt-3">
        <a v-router="shareImg" class="inline-block" target="_blank">
          <el-button type="primary" round size="small">
            {{ I18n.growthpad.growthpad.button.save }}
          </el-button>
        </a>
      </div>
    </div>
  </div>
  <div class="flex mt-6">
    <div class="leading-6 flex-1">
      <h2 class="inline whitespace-nowrap text-sm leading-6 pr-1">
        2. {{ I18n.growthpad.growthpad.label.content }}
      </h2>
      <p
        class="inline flex-1 text-xs desc link-box"
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
  <div class="mt-6 leading-6">
    <h2 class="inline whitespace-nowrap text-sm pr-1">
      3. {{ I18n.growthpad.growthpad.label.friends }}
    </h2>
    <p class="inline text-xs desc">
      <span>1.{{ I18n.growthpad.growthpad.tips.uploadMax }}</span>
      <span class="ml-2">2.{{ I18n.growthpad.growthpad.tips.portrait }}</span>
    </p>
  </div>
  <!-- 已上传 -->
  <div v-if="store.friendPicture.value.length > 0" class="mt-3">
    <div class="flex flex-wrap">
      <template v-for="(src, index) in store.friendPicture.value" :key="index">
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
      <div class="inline-block ml-3">
        <el-button type="primary" round size="small" @click="onSubmit">
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
