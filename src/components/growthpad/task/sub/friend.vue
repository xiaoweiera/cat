<script setup lang="ts">
import { ref } from 'vue'

const uploadImages = ref<string[]>([])

const onChange = function(value, index): void {
  console.log(index, value)
}

const onUpload = function(value) {
  uploadImages.value = [].concat(uploadImages.value, value)
}

const onRemove = function(index) {
  const array = [].concat(uploadImages.value)
  array.splice(index, 1)
  uploadImages.value = array
}
</script>

<template>
  <div class="flex font-kdFang">
    <h2 class="whitespace-nowrap text-sm leading-6">1. 海报图片：</h2>
    <div>
      <p class="text-xs desc leading-6">
        在微信中点击保存图片打开大图后手动保存
      </p>
      <div class="mt-3">
        <el-button type="primary" round size="small">保存图片</el-button>
      </div>
    </div>
  </div>
  <div class="flex mt-6">
    <h2 class="whitespace-nowrap text-sm leading-6">2. 活动文案：</h2>
    <div class="flex flex-1 flex-wrap items-center">
      <p class="text-xs desc leading-6 mr-3">
        动动手指，就可瓜分GrowthPad 额外12000USDT空投奖励~
        链接：https://jinshuju.net/f/vqZlj3
      </p>
      <div class="inline-block">
        <el-button type="primary" round size="small">复制</el-button>
      </div>
    </div>
  </div>
  <div class="flex mt-6">
    <h2 class="whitespace-nowrap text-sm leading-6">3. 上传朋友圈截图：</h2>
    <div>
      <p class="text-xs desc leading-6">
        1.上传大小不超过2M
        2.截图包含您的微信头像，完整的活动海报+文案及发布时间间隔。
      </p>
    </div>
  </div>
  <div class="mt-3 flex flex-wrap">
    <template v-for="(src, index) in uploadImages" :key="index">
      <Upload
        class="mr-6 mb-6"
        :src="src"
        @chnage="onChange($event, index)"
        @remove="onRemove(index)"
      ></Upload>
    </template>
    <div class="flex items-center">
      <Upload
        v-show="uploadImages.length < 10"
        :key="`up-${uploadImages.length}`"
        class="mb-6"
        :remove="false"
        @change="onUpload"
      ></Upload>
      <div class="inline-block ml-3">
        <el-button type="primary" round size="small">复制</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  color: #033666;
}
.desc {
  color: rgba(37, 62, 111, 0.65);
}
</style>
