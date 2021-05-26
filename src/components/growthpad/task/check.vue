<script lang="ts" setup>
import * as R from 'ramda'
import { defineProps, computed } from 'vue'
import TaskType from '~/logic/growthpad/tasktype'
import Task from '~/logic/growthpad/task'
import { userData } from '~/logic/user/login'

const store = Task()

const props = defineProps({
  data: {
    type: Object,
  },
})

const buttonValue = computed((): string => {
  let text: string
  switch (props.data?.type) {
  case TaskType.share:
    text = '去邀请'
    break
  case TaskType.vip:
    text = '去邀请'
    break
  case TaskType.sushiswap:
  case TaskType.uniswap:
  case TaskType.pancake:
    text = '资质验证'
    break
  default:
    text = '去检测'
    break
  }
  return text
})

const compsName = computed((): string => {
  const name = props.data?.type
  const first = R.toUpper(name[0])
  const value = `GrowthpadTaskSub${first}${name.slice(1)}`
  return value
})

const validityValue = computed<string>((): string => {
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
</script>

<template>
  <div>
    <template v-if="data.type === TaskType.vip">
      <template v-if="userData.is_vip">
        <IconFont type="success"></IconFont>
      </template>
      <GrowthpadTaskSubVip v-else :data="data">
        <span v-validity.begin.end="validityValue" class="button">{{
          buttonValue
        }}</span>
      </GrowthpadTaskSubVip>
    </template>
    <template v-else-if="data.type === TaskType.telegram">
      <!-- 判断是否填写了 telegram id -->
      <IconFont v-if="store.mission.telegram_group" type="success"></IconFont>
      <GrowthpadTaskSubTelegram v-else :data="data">
        <span v-login>
          <span v-validity.begin.end="validityValue" class="button">{{
            buttonValue
          }}</span>
        </span>
      </GrowthpadTaskSubTelegram>
    </template>
    <template v-else-if="data.type === TaskType.twitter">
      <!-- 判断是否关注 twitter -->
      <IconFont v-if="store.mission.follow_twitter" type="success"></IconFont>
      <GrowthpadTaskSubTwitter v-else :data="data">
        <span v-login>
          <span v-validity.begin.end="validityValue" class="button">{{
            buttonValue
          }}</span>
        </span>
      </GrowthpadTaskSubTwitter>
    </template>
    <template v-else-if="data.type === TaskType.retwitter">
      <!-- 判断是否转发 twitter -->
      <IconFont v-if="store.mission.retweet" type="success"></IconFont>
      <GrowthpadTaskSubRetwitter v-else :data="data">
        <span v-login>
          <span v-validity.begin.end="validityValue" class="button">{{
            buttonValue
          }}</span>
        </span>
      </GrowthpadTaskSubRetwitter>
    </template>
    <template v-else-if="data.type === TaskType.pancake">
      <!-- 判断pancake验资是否通过 -->
      <IconFont v-if="store.mission.pancake" type="success"></IconFont>
      <GrowthpadTaskSubPancake v-else :data="data">
        <span v-login>
          <span v-validity.begin.end="validityValue" class="button">{{
            buttonValue
          }}</span>
        </span>
      </GrowthpadTaskSubPancake>
    </template>
    <template v-else-if="data.type === TaskType.uniswap">
      <!-- 判断uniswap验资是否通过 -->
      <IconFont v-if="store.mission.uniswap" type="success"></IconFont>
      <GrowthpadTaskSubUniswap v-else :data="data">
        <span v-login>
          <span v-validity.begin.end="validityValue" class="button">{{
            buttonValue
          }}</span>
        </span>
      </GrowthpadTaskSubUniswap>
    </template>
    <template v-else-if="data.type === TaskType.sushiswap">
      <!-- 判断sushiswap验资是否通过 -->
      <IconFont v-if="store.mission.sushiswap" type="success"></IconFont>
      <GrowthpadTaskSubSushiswap v-else :data="data">
        <span v-login>
          <span v-validity.begin.end="validityValue" class="button">{{
            buttonValue
          }}</span>
        </span>
      </GrowthpadTaskSubSushiswap>
    </template>
    <template v-else-if="data.type === TaskType.share">
      <GrowthpadTaskSubShare :data="data">
        <span v-login>
          <span v-validity.begin.end="validityValue" class="button">{{
            buttonValue
          }}</span>
        </span>
      </GrowthpadTaskSubShare>
    </template>
  </div>
</template>

<style scoped lang="scss">
.button {
  display: inline-block;
  background: #2b8dfe;
  border-radius: 14px;
  padding: 6px 12px;
  font-weight: 500;
  font-size: 12px;
  color: #fff;
  user-select: none;
  cursor: pointer;
  white-space: nowrap;
  word-break: keep-all;
}
</style>
