<script setup lang="ts">
import { ref } from 'vue'
import I18n from '~/utils/i18n/index'

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
      <el-button type="primary" round size="small">
        {{
          I18n.common.button.copy
        }}
      </el-button>
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
  <div class="mt-3 flex flex-wrap">
    <template v-for="(src, index) in uploadImages" :key="index">
      <Upload
        class="mr-6 mb-6"
        :src="src"
        @chnage="onChange($event, index)"
        @remove="onRemove(index)"
      ></Upload>
    </template>
    <div class="flex items-center mb-6">
      <Upload
        v-show="uploadImages.length < 10"
        :key="`up-${uploadImages.length}`"
        size="xs"
        :remove="false"
        @change="onUpload"
      ></Upload>
      <div class="inline-block ml-3">
        <el-button type="primary" round size="small">
          {{
            I18n.common.button.submit
          }}
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
