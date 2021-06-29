<script lang="ts" setup>
import * as R from 'ramda'
import { defineProps, computed } from 'vue'
import I18n from '~/utils/i18n/index'
import TaskType from '~/logic/growthpad/tasktype'
import Task from '~/logic/growthpad/task'
// @ts-ignore
import { MissionStatus } from '~/store/growthpad/props'
import message from '~/utils/message'
import { getMax } from './task'
import { ProjectKey } from '~/logic/growthpad/config'

const store = Task()

const props = defineProps({
  data: {
    type: Object,
  },
})
// @ts-ignore
const buttonValue = computed((): string => {
  let text: string
  switch (props.data?.type) {
  case TaskType.share:
  case TaskType.vip:
    text = I18n.growthpad.button.invite // 去邀请
    break
  case TaskType.sushiswap:
  case TaskType.uniswap:
  case TaskType.pancake:
    text = I18n.growthpad.button.checking // 资质检测
    break
  default:
    text = I18n.growthpad.button.testing // 去检测
    break
  }
  return text
})

// @ts-ignore
const compsName = computed((): string => {
  const name = props.data?.type
  const first = R.toUpper(name[0])
  const value = `GrowthpadTaskSub${first}${name.slice(1)}`
  return value
})
// @ts-ignore
const validityValue = computed<string>((): string | string[] => {
  const begin = store?.dashboard?.begin
  const end = store?.dashboard?.end
  const value = []
  if (begin) {
    value.push(begin)
  }
  if (end) {
    value.push(end)
  }
  return value
})


// 信息填写正确后
// @ts-ignore
const onUpdated = function(): void {
  if (store.getNickName() !== ProjectKey.chainwallet) {
    return void 0;
  }
  // 当前任务等于 chainwallet 时执行
  const reward = getMax(props.data?.reward || 0)
  const token = R.toUpper(store.token)
  const title = I18n.template(I18n.growthpad.address.checkMessage, { reward, token })
  const html = `<div class="text-center font-kdFang">
    <pre class="whitespace-pre-line text-green-600 text-base">${title}</pre>
    <p class="pt-3 pb-2 text-sm text-global-default text-opacity-85">${ I18n.common.message.checking24h }</p>
  </div>`
  message.custom('', html)
}

</script>

<template>
  <div>
    <template v-if="data.type === TaskType.vip">
      <template v-if="store.mission.invited === MissionStatus.success">
        <IconFont type="success"/>
      </template>
      <GrowthpadTaskSubShare v-else :data="data">
        <span v-validity.begin.end="validityValue" class="button">{{ buttonValue }}</span>
      </GrowthpadTaskSubShare>
    </template>
    <template v-else-if="data.type === TaskType.telegram">
      <!-- 判断是否填写了 telegram id -->
      <GrowthpadTaskSubText
        :data="data"
        :name="TaskType.telegram"
        :placeholder="I18n.growthpad.form.placeholderTelegram" @updated="onUpdated"
      >
        <span v-login class="inline-flex">
          <span v-validity.begin.end="validityValue" class="button">{{ buttonValue }}</span>
        </span>
      </GrowthpadTaskSubText>
    </template>
    <template v-else-if="data.type === TaskType.twitter">
      <!-- 判断是否关注 twitter -->
      <GrowthpadTaskSubText
        :data="data"
        :name="TaskType.twitter"
        :placeholder="I18n.growthpad.form.twitter" @updated="onUpdated"
      >
        <span v-login class="inline-flex">
          <span v-validity.begin.end="validityValue" class="button">{{buttonValue }}</span>
        </span>
      </GrowthpadTaskSubText>
    </template>
    <template v-else-if="data.type === TaskType.retwitter">
      <!-- 判断是否转发 twitter -->
      <GrowthpadTaskSubText
        :data="data"
        :name="TaskType.retwitter"
        :placeholder="I18n.growthpad.form.retwitter" @updated="onUpdated"
      >
        <span v-login class="inline-flex">
          <span v-validity.begin.end="validityValue" class="button">{{buttonValue }}</span>
        </span>
      </GrowthpadTaskSubText>
    </template>
    <template v-else-if="data.type === TaskType.pancake">
      <!-- 判断pancake验资是否通过 -->
      <GrowthpadTaskSubText
        :data="data"
        :name="TaskType.pancake"
        :placeholder="I18n.growthpad.form.placeholderBsc"
        :confirm="true" @updated="onUpdated"
      >
        <span v-login class="inline-flex">
          <span v-validity.begin.end="validityValue" class="button">{{buttonValue }}</span>
        </span>
      </GrowthpadTaskSubText>
    </template>
    <template v-else-if="data.type === TaskType.uniswap">
      <!-- 判断uniswap验资是否通过 -->
      <GrowthpadTaskSubText
        :data="data"
        :name="TaskType.uniswap"
        :placeholder="I18n.growthpad.form.placeholderETH"
        :confirm="true" @updated="onUpdated"
      >
        <span v-login class="inline-flex">
          <span v-validity.begin.end="validityValue" class="button">{{buttonValue }}</span>
        </span>
      </GrowthpadTaskSubText>
    </template>
    <template v-else-if="data.type === TaskType.sushiswap">
      <!-- 判断sushiswap验资是否通过 -->
      <GrowthpadTaskSubText
        :data="data"
        :name="TaskType.sushiswap"
        :placeholder="I18n.growthpad.form.placeholderETH"
        :confirm="true" @updated="onUpdated"
      >
        <span v-login class="inline-flex">
          <span v-validity.begin.end="validityValue" class="button">{{buttonValue }}</span>
        </span>
      </GrowthpadTaskSubText>
    </template>
    <template v-else-if="data.type === TaskType.share">
      <GrowthpadTaskSubShare :data="data">
        <span v-login class="inline-flex">
          <span v-validity.begin.end="validityValue" class="button">{{buttonValue }}</span>
        </span>
      </GrowthpadTaskSubShare>
    </template>
    <template v-else-if="data.type === TaskType.sina">
      <!-- 判断 sina 验资是否通过 -->
      <GrowthpadTaskSubText
        :data="data"
        :name="TaskType.sina"
        :placeholder="I18n.growthpad.form.sina" @updated="onUpdated"
      >
        <span v-login class="inline-flex">
          <span v-validity.begin.end="validityValue" class="button">{{buttonValue }}</span>
        </span>
      </GrowthpadTaskSubText>
    </template>

    <template v-else-if="data.type === TaskType.venus">
      <!-- 判断 venus 验资是否通过 -->
      <GrowthpadTaskSubText
        :data="data"
        :name="TaskType.venus"
        :placeholder="I18n.growthpad.form.placeholderBsc"
        :confirm="true" @updated="onUpdated"
      >
        <span v-login class="inline-flex">
          <span v-validity.begin.end="validityValue" class="button">{{buttonValue }}</span>
        </span>
      </GrowthpadTaskSubText>
    </template>

    <template v-else-if="data.type === TaskType.cream">
      <!-- 判断 cream 验资是否通过 -->
      <GrowthpadTaskSubText
        :data="data"
        :name="TaskType.cream"
        :placeholder="I18n.growthpad.form.placeholderBsc"
        :confirm="true" @updated="onUpdated"
      >
        <span v-login class="inline-flex">
          <span v-validity.begin.end="validityValue" class="button">{{buttonValue }}</span>
        </span>
      </GrowthpadTaskSubText>
    </template>

    <template v-else-if="data.type === TaskType.compound">
      <!-- 判断 compound 验资是否通过 -->
      <GrowthpadTaskSubText
        :data="data"
        :name="TaskType.compound"
        :placeholder="I18n.growthpad.form.placeholderBsc"
        :confirm="true" @updated="onUpdated"
      >
        <span v-login class="inline-flex">
          <span v-validity.begin.end="validityValue" class="button">{{buttonValue }}</span>
        </span>
      </GrowthpadTaskSubText>
    </template>

    <template v-else-if="data.type === TaskType.autofarm">
      <!-- 判断 compound 验资是否通过 -->
      <GrowthpadTaskSubText
        :data="data"
        :name="TaskType.autofarm"
        :placeholder="I18n.growthpad.form.placeholderBsc"
        :confirm="true" @updated="onUpdated"
      >
        <span v-login class="inline-flex">
          <span v-validity.begin.end="validityValue" class="button">{{buttonValue }}</span>
        </span>
      </GrowthpadTaskSubText>
    </template>

    <template v-else-if="data.type === TaskType.beltfit">
      <!-- 判断 compound 验资是否通过 -->
      <GrowthpadTaskSubText
        :data="data"
        :name="TaskType.beltfit"
        :placeholder="I18n.growthpad.form.placeholderBsc"
        :confirm="true" @updated="onUpdated"
      >
        <span v-login class="inline-flex">
          <span v-validity.begin.end="validityValue" class="button">{{buttonValue }}</span>
        </span>
      </GrowthpadTaskSubText>
    </template>

    <template v-else-if="data.type === TaskType.bunny">
      <!-- 判断 compound 验资是否通过 -->
      <GrowthpadTaskSubText
        :data="data"
        :name="TaskType.bunny"
        :placeholder="I18n.growthpad.form.placeholderBsc"
        :confirm="true" @updated="onUpdated"
      >
        <span v-login class="inline-flex">
          <span v-validity.begin.end="validityValue" class="button">{{buttonValue }}</span>
        </span>
      </GrowthpadTaskSubText>
    </template>


    <template v-else-if="data.type === TaskType.chainwallet">
      <!-- 判断 chainwallet 验资是否通过 -->
      <GrowthpadTaskSubText
          :data="data"
          :name="TaskType.chainwallet"
          :placeholder="I18n.growthpad.form.placeholderBsc"
          :confirm="true" @updated="onUpdated"
      >
        <span v-login class="inline-flex">
          <span v-validity.begin.end="validityValue" class="button">{{ buttonValue }}</span>
        </span>
      </GrowthpadTaskSubText>
    </template>
  </div>
</template>

<style scoped lang="scss">
.button {
  display: inline-block;
  background: #2b8dfe;
  border-radius: 12px;
  padding-left: 12px;
  padding-right: 12px;
  height: 24px;
  line-height: 24px;
  font-weight: 500;
  font-size: 12px;
  color: #fff;
  user-select: none;
  cursor: pointer;
  white-space: nowrap;
  word-break: keep-all;
}
</style>
