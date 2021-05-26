<script setup lang="ts">
import { reactive, ref, toRaw, computed } from 'vue'
import I18n from '~/utils/i18n/index'
import Task from '~/logic/growthpad/task'
import { messageSuccess } from '~/lib/tool'

const store = Task()

const data = computed(() => {
  return {
    title: I18n.growthpad.weibo.label,
    description: I18n.growthpad.weibo.description,
  }
})

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
    messageSuccess(I18n.growthpad.weibo.success)
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
      message: I18n.growthpad.weibo.placeholder,
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
      <el-form-item :label="I18n.growthpad.weibo.article">
        <el-input
          v-model="formdata.article_url"
          :placeholder="I18n.growthpad.weibo.articlePlaceholder"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        :label="I18n.growthpad.weibo.articleImg"
        required
        prop="article_image"
      >
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
            <span>{{ I18n.growthpad.weibo.notify1 }}</span>
            <span>{{ I18n.growthpad.weibo.notify2 }}</span>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" round size="small" native-type="submit">
          <span>{{ I18n.common.button.submit }}</span>
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
