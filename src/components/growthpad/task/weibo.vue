<script setup lang="ts">
import { reactive, ref, toRaw, computed } from 'vue'
import I18n from '~/utils/i18n/index'
import Task from '~/logic/growthpad/task'
import { messageSuccess } from '~/lib/tool'
import { Project } from '~/api/growtask'

const store = Task()

const data = computed(() => {
  // @ts-ignore
  if (store.projectName === Project.mdx) {
    return {
      title: I18n.growthpad.mdx.weibo.label,
      description: I18n.growthpad.mdx.weibo.description,
    }
  }
  // @ts-ignore
  if (store.projectName === Project.channels) {
    return {
      title: I18n.growthpad.channels.weibo.label,
      description: I18n.growthpad.channels.weibo.description,
    }
  }
  // @ts-ignore
  if (store.projectName === Project.coinwind) {
    return {
      title: I18n.growthpad.coinwind.weibo.label,
      description: I18n.growthpad.coinwind.weibo.description,
    }
  }
  return {
    title: '',
    description: '',
  }
})

const rewardValue = computed<number>((): number => {
  const number = parseInt(store.article_reward.value)
  if (isNaN(number)) {
    return 0
  }
  return number
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
  article_url: [
    {
      required: true,
      trigger: ['change', 'blur'],
      message: I18n.growthpad.weibo.articlePlaceholder,
    },
  ],
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
      <template v-if="data.description" #desc>
        <span class="block pt-2">{{ data.description }}</span>
      </template>
    </GrowthpadTaskTitle>
    <el-form
      ref="formRef"
      class="mt-3 pb-5"
      :model="formdata"
      label-width="100px"
      :rules="rules"
      autocomplete="off"
      @submit.stop.prevent="submit"
    >
      <template v-if="rewardValue">
        <el-form-item :label="I18n.growthpad.weibo.article">
          <template v-if="store.article_url.value === 'undefined'">
            <span>-</span>
          </template>
          <template v-else-if="store.article_url.value">
            <a :href="store.article_url.value" target="_blank">{{
              store.article_url.value
            }}</a>
          </template>
          <template v-else>
            <span>-</span>
          </template>
        </el-form-item>
        <el-form-item :label="I18n.growthpad.weibo.articleImg">
          <div class="avatar-uploader relative">
            <img class="preview" :src="store.article_image.value" />
          </div>
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item
          :label="I18n.growthpad.weibo.article"
          required
          prop="article_url"
        >
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
          <div class="md:flex md:items-center">
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
            <div class="upload-tips md:pl-3 text-xs mt-3 md:mt-0">
              <span>{{ I18n.growthpad.weibo.notify1 }}</span>
              <span>{{ I18n.growthpad.weibo.notify2 }}</span>
            </div>
          </div>
        </el-form-item>
        <el-form-item style="margin-bottom: 0">
          <div class="md:flex md:items-center">
            <div v-login>
              <el-button type="primary" round size="small" native-type="submit">
                <span>{{ I18n.common.button.submit }}</span>
              </el-button>
            </div>
            <!--有上传文章后显示-->
            <template v-if="store.article_image.value">
              <p class="md:ml-3 text-xs submit-tips mt-3 md:mt-0">
                {{ I18n.growthpad.weibo.tips }}
              </p>
            </template>
          </div>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>
<style scoped lang="scss">
a {
  color: #2b8dfe;
}
.upload-tips {
  line-height: 24px;
  color: rgba(37, 62, 111, 0.65);
  span {
    display: block;
  }
}

.avatar-uploader {
  min-width: 120px;
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

.submit-tips {
  color: #e9592d;
}
</style>
