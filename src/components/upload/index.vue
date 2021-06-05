<script setup lang="ts">
import { ref, defineProps, defineEmit } from 'vue'
import { uploadImage } from '~/api/res'

defineProps({
  size: {
    type: String,
    default() {
      return ''
    },
  },
  src: {
    type: String,
    default() {
      return ''
    },
  },
  remove: {
    type: Boolean,
    default() {
      return true
    },
  },
})

const emitEvent = defineEmit(['change', 'remove'])

const previewSrc = ref<string>('')

const preview = function(value: File): Promise<string> {
  return new Promise((resolve) => {
    // 读取文件的 base64 值
    const file = new FileReader()
    file.onload = function(e) {
      // 获取 base64 编码
      const base64: string = e.target.result
      resolve(base64)
    }
    file.readAsDataURL(value)
  })
}

const onUpload = async(file: File): Promise<boolean> => {
  const value = file.raw
  // const src = await preview(value)
  const url = await uploadImage(value)
  if (url) {
    emitEvent('change', url)
    previewSrc.value = url
  }
  return false
}

const getStyle = function(value: string): string {
  return `background-image: url(${value});`
}

const onRemove = function() {
  emitEvent('remove')
}
</script>

<template>
  <div class="upload-box relative" :class="size">
    <div v-if="remove" class="delete cursor-pointer" @click="onRemove">
      删除
    </div>
    <div class="upload-main w-full h-full">
      <el-upload
        class="avatar-uploader"
        action=""
        accept="image/*"
        :show-file-list="false"
        :multiple="false"
        name="article_image"
        :drag="true"
        :on-change="onUpload"
        :auto-upload="false"
      >
        <template v-if="src">
          <span
            class="preview picture inline-block"
            :class="size"
            :style="getStyle(src)"
          />
        </template>
        <template v-else-if="previewSrc">
          <span
            class="preview picture inline-block"
            :style="getStyle(previewSrc)"
          />
        </template>
        <IconFont v-else class="preview" type="plus" suffix="png"></IconFont>
      </el-upload>
    </div>
  </div>
</template>

<style scoped lang="scss">
@mixin size($number) {
  min-width: $number;
  width: $number;
  height: $number;
}

.upload-box,
.picture {
  @include size(120px);
  &.xs {
    @include size(72px);
  }
}
.delete {
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(50%, -50%);
  z-index: 2;
}
.upload-main {
  overflow: hidden;
}
.avatar-uploader {
  width: 100%;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.04);
  background: #fff;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  .preview {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 120px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>
