<script setup lang="ts">
import { ref, computed } from 'vue'
import I18n from '~/utils/i18n/index'
import Task from '~/logic/growthpad/task'
import { messageError, messageSuccess } from '~/lib/tool'
import { checkAddress } from '~/components/growthpad/task/task'
import activity from '~/logic/growthpad/activity'
const store = Task()

const picture = ref<string>('')

const onUpload = function(value) {
  picture.value = value
}

const onSubmit = async function(): Promise<void> {
  let status = checkAddress(store)
  // 判断活动时间
  if (status) {
    status = activity(store)
  }
  if (status) {
    const list: string[] = [picture.value]
    try {
      await store.setFriendPicture(list)
      messageSuccess(I18n.growthpad.weibo.success)
    } catch (e) {
      // todo
      const { message = '' } = e || {}
      if (message) {
        messageError(message)
      }
    }
  }
}
// @ts-ignore
const shareImg = ref<string>(I18n.growthpad.growthpad.share.image)
// @ts-ignore
const shareUrl = `${window.location.origin}${window.location.pathname}`
</script>

<template>
  <div class="font-kdFang md:flex">
    <div class="inline-block">
      <h2 class="whitespace-nowrap text-sm leading-6 pr-1 inline">
        1. {{ I18n.growthpad.growthpad.label.picture }}
      </h2>
      <p class="text-xs desc leading-6 inline md:hidden">
        {{ I18n.growthpad.growthpad.tips.active }}
      </p>
    </div>
    <div>
      <p class="text-xs desc leading-7 hidden md:block">
        {{ I18n.growthpad.growthpad.tips.active }}
      </p>
      <div class="mt-3">
        <a v-router="shareImg" class="hidden md:inline-block" target="_blank">
          <img class="share-img inline-block" :src="shareImg" />
        </a>
        <a v-router="shareImg" class="block md:hidden w-full" target="_blank">
          <img class="inline-block w-full" :src="shareImg" />
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
            url: shareUrl,
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
    <div class="flex items-center">
      <Upload
        :src="picture"
        size="xs"
        :remove="true"
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
.share-img {
  width: 210px;
  max-width: 210px;
}
.link-box {
  :deep(a) {
    display: inline;
    color: #2b8dfe;
  }
}
</style>
