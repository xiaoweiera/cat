<script setup lang="ts">
import { omit } from 'ramda'
import { reactive, ref, toRaw, computed } from 'vue'
import I18n from '~/utils/i18n/index'
import Task from '~/logic/growthpad/task'
import { messageSuccess, messageError } from '~/lib/tool'
import { ProjectKey } from '~/logic/growthpad/config'
import Message from '~/utils/message'
import { checkAddress } from '~/components/growthpad/task/task'
import activity from '~/logic/growthpad/activity'
import { toNumber } from '~/utils/index'

const store = Task()

const data = computed(() => {
  // @ts-ignore
  if (store.projectName === ProjectKey.mdx) {
    return {
      title: I18n.growthpad.mdx.weibo.label,
      description: I18n.growthpad.mdx.weibo.description,
    }
  }
  // @ts-ignore
  if (store.projectName === ProjectKey.channels) {
    return {
      title: I18n.growthpad.channels.weibo.label,
      description: I18n.growthpad.channels.weibo.description,
    }
  }
  // @ts-ignore
  if (store.projectName === ProjectKey.coinwind) {
    return {
      title: I18n.growthpad.coinwind.weibo.label,
      description: I18n.growthpad.coinwind.weibo.description,
    }
  }
  // @ts-ignore
  if (store.projectName === ProjectKey.chainwallet) {
    return {
      // title: I18n.growthpad.mdx.weibo.label,
      description: I18n.growthpad.mdx.weibo.description,
    }
  }
  return {
    title: '',
    description: '',
  }
})

const rewardValue = computed<number>((): number => {
  return toNumber(store.article_reward.value)
})

const isRegistered = computed<boolean>((): boolean => {
  if (store.image_url.value && store.article_url.value) {
    return true
  }
  return false
})

interface FormData {
  article_url?: string
  image_url?: File
}
const formdata = reactive<FormData>({})

// 图片上传成功
const onUpload = async function(value: string) {
  formdata.image_url = value
}

const formRef = ref<any>(null)

const submit = async function() {
  const form = toRaw(formRef).value
  const data = new FormData()
  data.append('article_url', formdata.article_url)
  data.append('image_url', formdata.image_url)
  try {
    await form.validate()
    // 判断信息登记
    let status = checkAddress(store)
    // 判断活动时间
    if (status) {
      status = activity(store)
    }
    if (status) {
      // 输入内容确认
      status = await Message('', {
        value: I18n.growthpad.weibo.warn,
      })
    }
    if (status) {
      await store.setWeiboContent(data)
      messageSuccess(I18n.growthpad.weibo.success)
      // 清除验证结果
      form.clearValidate()
      // 清空表单
      form.resetFields()
    }
  } catch (e) {
    const err = omit(['code'], e)
    messageError(err)
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
  image_url: [
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
        <span class="block" :class="{'pt-2': data.title }">{{ data.description }}</span>
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
      <template v-if="isRegistered">
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
        <!-- 已审核 -->
        <template v-if="rewardValue">
          <el-form-item
            :label="I18n.growthpad.weibo.articleImg"
            style="margin-bottom: 0"
          >
            <a
              class="avatar-uploader relative block"
              :href="store.image_url.value"
              target="_blank"
            >
              <img class="preview" :src="store.image_url.value" />
            </a>
          </el-form-item>
        </template>
        <!-- 审核中 -->
        <template v-else>
          <el-form-item :label="I18n.growthpad.weibo.articleImg">
            <a
              class="avatar-uploader relative block"
              :href="store.image_url.value"
              target="_blank"
            >
              <img class="preview" :src="store.image_url.value" />
            </a>
          </el-form-item>
          <el-form-item style="margin-bottom: 0">
            <el-button type="info" round plain size="small" disabled>
              <span>{{ I18n.common.button.review }}</span>
            </el-button>
          </el-form-item>
        </template>
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
          prop="image_url"
        >
          <div class="md:flex md:items-center">
            <div>
              <Upload :src="formdata.image_url" size="xs" @change="onUpload"></Upload>
            </div>
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
            <!--            <template v-if="store.image_url.value">-->
            <!--              <p class="md:ml-3 text-xs submit-tips mt-3 md:mt-0">-->
            <!--                {{ I18n.growthpad.weibo.tips }}-->
            <!--              </p>-->
            <!--            </template>-->
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
