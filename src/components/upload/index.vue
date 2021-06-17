<script setup lang="ts">
import { defineProps, defineEmit } from 'vue'
import { uploadImage } from '~/api/res'
import { messageError } from '~/lib/tool'

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
  preview: {
    type: Boolean,
    default() {
      return false
    },
  },
})

const emitEvent = defineEmit(['change', 'remove'])

// const previewSrc = ref<string>('')
//
// const preview = function(value: File): Promise<string> {
//   return new Promise((resolve) => {
//     // 读取文件的 base64 值
//     const file = new FileReader()
//     file.onload = function(e) {
//       // 获取 base64 编码
//       const base64: string = e.target.result
//       resolve(base64)
//     }
//     file.readAsDataURL(value)
//   })
// }

// @ts-ignore
const onUpload = async(file: any): Promise<boolean> => {
  const value = file.raw
  try {
    const url = await uploadImage(value)
    if (url) {
      emitEvent('change', url)
    }
  } catch (e) {
    if (e?.message) {
      messageError(e.message)
    }
  }
  return false
}

// @ts-ignore
const getStyle = function(value: string): string {
  return `background-image: url(${value});`
}

// @ts-ignore
const onRemove = function() {
  emitEvent('remove')
}
</script>

<template>
  <div v-if="preview" class="upload-box relative" :class="size">
    <a v-router="src" class="avatar-uploader cursor-pointer" target="_blank">
      <span
        class="preview picture inline-block"
        :class="size"
        :style="getStyle(src)"
      />
    </a>
  </div>
  <div v-else v-login class="upload-box relative" :class="size">
    <template v-if="src">
      <div v-if="remove" class="delete cursor-pointer" @click="onRemove">
        <IconFont type="remove"></IconFont>
      </div>
    </template>
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
