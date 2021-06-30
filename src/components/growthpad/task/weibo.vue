<script setup lang="ts">
import { omit } from 'ramda'
import { reactive, ref, toRaw, computed } from 'vue'
import I18n from '~/utils/i18n/index'
import Task from '~/logic/growthpad/task'
import { messageSuccess, messageError } from '~/lib/tool'
import Message from '~/utils/message'
import { checkAddress } from '~/components/growthpad/task/task'
import activity from '~/logic/growthpad/activity'
import { toNumber } from '~/utils/index'
import safeGet from '@fengqiaogang/safe-get'

const store = Task()
// @ts-ignore
const data = computed(() => {
  // @ts-ignore
  const weibo = store.words.weibo
  return {
    title: safeGet<string>(weibo || {}, 'label'),
    description: safeGet<string>(weibo || {}, 'desc'),
  }
})

// 获取文章奖励金额
const getArticleReward = function(): number {
  return toNumber(store.article_reward.value)
}

// @ts-ignore
const rewardValue = computed<number>(getArticleReward)


const ArticleStatus = {
  init: 'init',
  check: 'check',
  fail: 'fail',
  success: 'success'
}


// @ts-ignore
const articleStatus = computed<string>((): string => {
  // 奖励金额
  const reward = getArticleReward()
  // 如果奖励金额大于 0， 则表示已审核通过
  if (reward > 0) {
    return ArticleStatus.success
  }
  // 特殊处理，奖励金额为 -1， 则表示审核失败
  if (reward === -1) {
    return ArticleStatus.fail
  }
  // 判断文章截图与文章链接是否存在, 存在则表示已填写正在审核中
  if (store.image_url.value && store.article_url.value) {
    return ArticleStatus.check
  }
  // 默认为待填写状态
  return ArticleStatus.init
})

interface FormData {
  article_url?: string
  image_url?: File
}
const formdata = reactive<FormData>({})

// 图片上传成功
// @ts-ignore
const onUpload = async function(value: string) {
  // @ts-ignore
  formdata.image_url = value
}

const formRef = ref<any>(null)

// @ts-ignore
const submit = async function() {
  const form = toRaw(formRef).value
  const data = new FormData()
  // @ts-ignore
  data.append('article_url', formdata.article_url)
  // @ts-ignore
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
// @ts-ignore
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
        <span class="block" :class="{'pt-2': !!data.title }">{{ data.description }}</span>
      </template>
    </GrowthpadTaskTitle>

    <!-- 审核通过 -->
    <template v-if="articleStatus === ArticleStatus.success">
      <GrowthpadTaskArticlePreview :link="store.article_url.value" :picture="store.image_url.value">
        <template #after>
          <UiTableItem class="pt-5">
            <el-form-item class="mb-0">
              <el-button type="success" round size="small">
                <span>{{ I18n.common.button.success }}</span>
              </el-button>
            </el-form-item>
          </UiTableItem>
        </template>
      </GrowthpadTaskArticlePreview>
    </template>

    <!-- 审核中 -->
    <template v-else-if="articleStatus === ArticleStatus.check">
      <GrowthpadTaskArticlePreview :link="store.article_url.value" :picture="store.image_url.value">
        <template #after>
          <UiTableItem class="pt-5">
            <el-form-item class="mb-0">
              <el-button type="info" round size="small" disabled>
                <span>{{ I18n.common.button.review }}</span>
              </el-button>
            </el-form-item>
          </UiTableItem>
        </template>
      </GrowthpadTaskArticlePreview>
    </template>

    <!-- 审核失败 -->
    <template v-else-if="articleStatus === ArticleStatus.fail">
      <GrowthpadTaskArticlePreview :link="store.article_url.value" :picture="store.image_url.value">
        <template #after>
          <div class="pt-5 text-sm text-kdFang">
            <p class="text-global-numRed">{{ I18n.growthpad.weibo.fail }}</p>
          </div>
        </template>
      </GrowthpadTaskArticlePreview>
    </template>

    <!-- 填写内容 -->
    <el-form v-else ref="formRef" class="mt-3 pb-5" :model="formdata" label-width="0px" :rules="rules" autocomplete="off" @submit.stop.prevent="submit">
      <UiTableItem :label="I18n.growthpad.weibo.article" >
        <el-form-item required prop="article_url">
          <el-input v-model="formdata.article_url" :placeholder="I18n.growthpad.weibo.articlePlaceholder" autocomplete="off" />
        </el-form-item>
      </UiTableItem>
      <UiTableItem :label="I18n.growthpad.weibo.articleImg">
        <el-form-item required prop="image_url">
          <div class="md:flex md:items-center">
            <div>
              <Upload :src="formdata.image_url" @change="onUpload" />
            </div>
            <div class="text-global-default text-opacity-50 leading-6 md:pl-3 text-xs mt-3 md:mt-0">
              <span class="block">{{ I18n.growthpad.weibo.notify1 }}</span>
              <span class="block">{{ I18n.growthpad.weibo.notify2 }}</span>
            </div>
          </div>
        </el-form-item>
      </UiTableItem>
      <UiTableItem>
        <el-form-item class="mb-0">
          <div class="md:flex md:items-center">
            <div v-login>
              <el-button type="primary" round size="small" native-type="submit">
                <span>{{ I18n.common.button.submit }}</span>
              </el-button>
            </div>
          </div>
        </el-form-item>
      </UiTableItem>
    </el-form>
  </div>
</template>
