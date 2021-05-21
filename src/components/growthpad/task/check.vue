<script lang="ts" setup>
import * as R from 'ramda'
import { defineProps, computed } from 'vue'
import { TaskType } from '~/logic/growthpad/examples'
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
  console.log(value)
  return value
})
</script>

<template>
  <div>
    <template v-if="data.type === TaskType.vip">
      <GrowthpadTaskSubVip
        :data="data"
      >
        <span v-login class="button">{{
          buttonValue
        }}</span>
      </GrowthpadTaskSubVip>
    </template>
    <template v-else-if="data.type === TaskType.telegram">
      <GrowthpadTaskSubTelegram
        :data="data"
      >
        <span v-login class="button">{{
          buttonValue
        }}</span>
      </GrowthpadTaskSubTelegram>
    </template>
    <template v-else-if="data.type === TaskType.twitter">
      <GrowthpadTaskSubTwitter
        :data="data"
      >
        <span v-login class="button">{{
          buttonValue
        }}</span>
      </GrowthpadTaskSubTwitter>
    </template>
    <template v-else-if="data.type === TaskType.retwitter">
      <GrowthpadTaskSubTwitter
        :data="data"
      >
        <span v-login class="button">{{
          buttonValue
        }}</span>
      </GrowthpadTaskSubTwitter>
    </template>
    <template v-else-if="data.type === TaskType.pancake">
      <GrowthpadTaskSubPancake
        :data="data"
      >
        <span v-login class="button">{{
          buttonValue
        }}</span>
      </GrowthpadTaskSubPancake>
    </template>
    <template v-else-if="data.type === TaskType.uniswap">
      <GrowthpadTaskSubUniswap
        :data="data"
      >
        <span v-login class="button">{{
          buttonValue
        }}</span>
      </GrowthpadTaskSubUniswap>
    </template>
    <template v-else-if="data.type === TaskType.sushiswap">
      <GrowthpadTaskSubSushiswap
        :data="data"
      >
        <span v-login class="button">{{
          buttonValue
        }}</span>
      </GrowthpadTaskSubSushiswap>
    </template>
    <template v-else-if="data.type === TaskType.share">
      <GrowthpadTaskSubShare
        :data="data"
      >
        <span v-login class="button">{{
          buttonValue
        }}</span>
      </GrowthpadTaskSubShare>
    </template>
  </div>
</template>

<style scoped lang="scss">
.button {
  display: inline-block;
  background: #2b8dfe;
  border-radius: 12px;
  padding: 4px 12px;
  font-weight: 500;
  font-size: 12px;
  color: #fff;
  user-select: none;
  cursor: pointer;
  white-space: nowrap;
  word-break: keep-all;
}
</style>
