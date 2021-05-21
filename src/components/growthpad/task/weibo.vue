<script setup lang="ts">
import { reactive, ref } from 'vue'
import Task from '~/logic/growthpad/task'

const store = Task()

const data = {
  title:
    '根据粉丝数获得奖励：0-49999粉丝奖励 15MDX；49999-99999粉丝奖励100MDX；大于99999粉丝奖励200MDX.',
  description:
    '主流媒体包括不限于：微博、知乎、头条等。文章发表后只会获得最高奖励。具体奖励数量根据人工审核情况而定',
}

interface FormData {
  article_url?: string
  article_image?: File
}
const previewSrc = ref<string>('')
const formdata = reactive<FormData>({})

const preview = function(file: File) {
  // 读取文件的 base64 值
  const filereader = new FileReader()
  filereader.onload = function(e) {
    // 获取 base64 编码
    const base64 = e.target.result
    previewSrc.value = base64
    console.log(base64)
  }
  filereader.readAsDataURL(file)
}

const onUpload = async function(file: File): Promise<boolean> {
  const value = file.raw
  formdata.article_image = value
  preview(value)
  return false
}

const submit = async function() {
  const data = new FormData()
  data.append('article_url', formdata.article_url)
  data.append('article_image', formdata.article_image)

  try {
    await store.setWeiboContent(data)
  } catch (e) {
    // todo
  }
}
</script>
<template>
  <div>
    <GrowthpadTaskTitle :data="data">
      <template #desc>
        <span class="block pt-3">{{ data.description }}</span>
      </template>
    </GrowthpadTaskTitle>
    <el-form
      class="mt-3"
      :model="formdata"
      label-width="82px"
      @submit.stop.prevent="submit"
    >
      <el-form-item label="文章链接：">
        <el-input
          v-model="formdata.article_url"
          placeholder="输入文章链接"
        ></el-input>
      </el-form-item>
      <el-form-item label="上传图片：">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :multiple="false"
          name="article_image"
          :drag="true"
          :on-change="onUpload"
          :auto-upload="false"
        >
          <template v-if="previewSrc">
            <img class="preview" :src="previewSrc" />
          </template>
          <i v-else class="preview el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          round
          size="small"
          native-type="submit"
        >
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style scoped lang="scss">
.avatar-uploader {
  width: 120px;
  height: 120px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  background: #fff;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  .preview {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 120px;
  }
}
</style>
