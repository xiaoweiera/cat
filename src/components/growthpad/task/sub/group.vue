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
    <h2 class="whitespace-nowrap text-sm leading-6">海报图片：</h2>
    <div class="flex flex-1 items-center">
      <p class="text-xs desc leading-6 mr-3 inline-block">
        动动手指，就可瓜分GrowthPad 额外12000USDT空投奖励~
        链接：https://jinshuju.net/f/vqZlj3
      </p>
      <div class="inline-block">
        <el-button type="primary" round size="small">复制</el-button>
      </div>
    </div>
  </div>
  <div class="flex mt-2">
    <h2 class="whitespace-nowrap text-sm leading-6">上传图片：</h2>
    <div class="flex flex-1">
      <p class="text-xs desc leading-6 inline-block">上传大小不超过2M</p>
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
    <Upload
      v-show="uploadImages.length < 10"
      :key="`up-${uploadImages.length}`"
      class="mb-6"
      :remove="false"
      @change="onUpload"
    ></Upload>
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
