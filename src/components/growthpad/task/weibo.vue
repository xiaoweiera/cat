<script setup lang="ts">
import { reactive, ref, toRaw } from 'vue'
import Task from '~/logic/growthpad/task'
import { messageSuccess } from '~/lib/tool'

const store = Task()

const data = {
  title:
    '根据粉丝数获得奖励：<br/>0-49999粉丝奖励 15MDX；49999-99999粉丝奖励100MDX；大于99999粉丝奖励200MDX.',
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
  }
  filereader.readAsDataURL(file)
}

const onUpload = async function(file: File): Promise<boolean> {
  const value = file.raw
  formdata.article_image = value
  preview(value)
  return false
}

const formRef = ref<any>(null)

const submit = async function() {
  const form = toRaw(formRef).value
  const data = new FormData()
  data.append('article_url', formdata.article_url)
  data.append('article_image', formdata.article_image)
  try {
    await form.validate()
    await store.setWeiboContent(data)
    messageSuccess('图片上传成功')
    // 清空表单
    form.resetField()
    // 清除验证结果
    form.clearValidate()
  } catch (e) {
    // todo
  }
}

const rules: any = {
  article_image: [
    {
      required: true,
      trigger: ['change'],
      message: '请上传图片',
    },
  ],
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
      ref="formRef"
      class="mt-3"
      :model="formdata"
      label-width="95px"
      :rules="rules"
      autocomplete="off"
      @submit.stop.prevent="submit"
    >
      <el-form-item label="文章链接：">
        <el-input
          v-model="formdata.article_url"
          placeholder="输入文章链接"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="上传图片：" required prop="article_image">
        <div class="flex items-center">
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
            <template v-if="previewSrc">
              <img class="preview" :src="previewSrc" />
            </template>
            <IconFont
              v-else
              class="preview"
              type="plus"
              suffix="png"
            ></IconFont>
          </el-upload>
          <div class="upload-tips pl-3">
            <span>* 截图内容请包含主流媒体主页</span>
            <span>* 图片格式为JPG/PNG/GIF,上传大小不超过5M</span>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" round size="small" native-type="submit">
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style scoped lang="scss">
.upload-tips {
  line-height: 24px;
  color: rgba(37, 62, 111, 0.65);
  span {
    display: block;
  }
}

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
