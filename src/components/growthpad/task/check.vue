<script lang="ts" setup>
import * as R from 'ramda'
import { defineProps, computed } from 'vue'
import I18n from '~/utils/i18n/index'
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
      <GrowthpadTaskSubShare v-else :data="data">
        <span v-validity.begin.end="validityValue" class="button">{{
          buttonValue
        }}</span>
      </GrowthpadTaskSubShare>
    </template>
    <template v-else-if="data.type === TaskType.telegram">
      <!-- 判断是否填写了 telegram id -->
      <!--      <IconFont v-if="store.mission.telegram_group" type="success"></IconFont>-->
      <GrowthpadTaskSubText
        :data="data"
        name="telegram"
        :placeholder="I18n.growthpad.form.placeholderTelegram"
      >
        <span v-login class="inline-flex">
          <span v-validity.begin.end="validityValue" class="button">{{
            buttonValue
          }}</span>
        </span>
      </GrowthpadTaskSubText>
    </template>
    <template v-else-if="data.type === TaskType.twitter">
      <!-- 判断是否关注 twitter -->
      <!--      <IconFont v-if="store.mission.follow_twitter" type="success"></IconFont>-->
      <GrowthpadTaskSubText
        :data="data"
        name="twitter"
        :placeholder="I18n.growthpad.form.twitter"
      >
        <span v-login class="inline-flex">
          <span v-validity.begin.end="validityValue" class="button">{{
            buttonValue
          }}</span>
        </span>
      </GrowthpadTaskSubText>
    </template>
    <template v-else-if="data.type === TaskType.retwitter">
      <!-- 判断是否转发 twitter -->
      <!--      <IconFont v-if="store.mission.retweet" type="success"></IconFont>-->
      <GrowthpadTaskSubText
        :data="data"
        name="retwitter"
        :placeholder="I18n.growthpad.form.retwitter"
      >
        <span v-login class="inline-flex">
          <span v-validity.begin.end="validityValue" class="button">{{
            buttonValue
          }}</span>
        </span>
      </GrowthpadTaskSubText>
    </template>
    <template v-else-if="data.type === TaskType.pancake">
      <!-- 判断pancake验资是否通过 -->
      <!--      <IconFont v-if="store.mission.pancake" type="success"></IconFont>-->
      <GrowthpadTaskSubText
        :data="data"
        name="pancake"
        :placeholder="I18n.growthpad.form.placeholderBsc"
        :confirm="true"
      >
        <span v-login class="inline-flex">
          <span v-validity.begin.end="validityValue" class="button">{{
            buttonValue
          }}</span>
        </span>
      </GrowthpadTaskSubText>
    </template>
    <template v-else-if="data.type === TaskType.uniswap">
      <!-- 判断uniswap验资是否通过 -->
      <!--      <IconFont v-if="store.mission.uniswap" type="success"></IconFont>-->
      <GrowthpadTaskSubText
        :data="data"
        name="uniswap"
        :placeholder="I18n.growthpad.form.placeholderETH"
        :confirm="true"
      >
        <span v-login class="inline-flex">
          <span v-validity.begin.end="validityValue" class="button">{{
            buttonValue
          }}</span>
        </span>
      </GrowthpadTaskSubText>
    </template>
    <template v-else-if="data.type === TaskType.sushiswap">
      <!-- 判断sushiswap验资是否通过 -->
      <!--      <IconFont v-if="store.mission.sushiswap" type="success"></IconFont>-->
      <GrowthpadTaskSubText
        :data="data"
        name="sushiswap"
        :placeholder="I18n.growthpad.form.placeholderETH"
        :confirm="true"
      >
        <span v-login class="inline-flex">
          <span v-validity.begin.end="validityValue" class="button">{{
            buttonValue
          }}</span>
        </span>
      </GrowthpadTaskSubText>
    </template>
    <template v-else-if="data.type === TaskType.share">
      <GrowthpadTaskSubShare :data="data">
        <span v-login class="inline-flex">
          <span v-validity.begin.end="validityValue" class="button">{{
            buttonValue
          }}</span>
        </span>
      </GrowthpadTaskSubShare>
    </template>
    <template v-else-if="data.type === TaskType.sina">
      <!-- 判断 sina 验资是否通过 -->
      <!--      <IconFont v-if="store.mission.follow_weibo" type="success"></IconFont>-->
      <GrowthpadTaskSubText
        :data="data"
        name="sina"
        :placeholder="I18n.growthpad.form.sina"
      >
        <span v-login class="inline-flex">
          <span v-validity.begin.end="validityValue" class="button">{{
            buttonValue
          }}</span>
        </span>
      </GrowthpadTaskSubText>
    </template>

    <template v-else-if="data.type === TaskType.venus">
      <!-- 判断 venus 验资是否通过 -->
      <!--      <IconFont v-if="store.mission.venus" type="success"></IconFont>-->
      <GrowthpadTaskSubText
        :data="data"
        name="venus"
        :placeholder="I18n.growthpad.form.placeholderBsc"
        :confirm="true"
      >
        <span v-login class="inline-flex">
          <span v-validity.begin.end="validityValue" class="button">{{
            buttonValue
          }}</span>
        </span>
      </GrowthpadTaskSubText>
    </template>

    <template v-else-if="data.type === TaskType.cream">
      <!-- 判断 cream 验资是否通过 -->
      <!--      <IconFont v-if="store.user.cream_token" type="success"></IconFont>-->
      <GrowthpadTaskSubText
        :data="data"
        name="cream"
        :placeholder="I18n.growthpad.form.placeholderBsc"
        :confirm="true"
      >
        <span v-login class="inline-flex">
          <span v-validity.begin.end="validityValue" class="button">{{
            buttonValue
          }}</span>
        </span>
      </GrowthpadTaskSubText>
    </template>

    <template v-else-if="data.type === TaskType.compound">
      <!-- 判断 compound 验资是否通过 -->
      <!--      <IconFont v-if="store.mission.compound" type="success"></IconFont>-->
      <GrowthpadTaskSubText
        :data="data"
        name="compound"
        :placeholder="I18n.growthpad.form.placeholderBsc"
        :confirm="true"
      >
        <span v-login class="inline-flex">
          <span v-validity.begin.end="validityValue" class="button">{{
            buttonValue
          }}</span>
        </span>
      </GrowthpadTaskSubText>
    </template>

    <template v-else-if="data.type === TaskType.autofarm">
      <!-- 判断 compound 验资是否通过 -->
      <!--      <IconFont v-if="store.mission.autofarm" type="success"></IconFont>-->
      <GrowthpadTaskSubText
        :data="data"
        name="autofarm"
        :placeholder="I18n.growthpad.form.placeholderBsc"
        :confirm="true"
      >
        <span v-login class="inline-flex">
          <span v-validity.begin.end="validityValue" class="button">{{
            buttonValue
          }}</span>
        </span>
      </GrowthpadTaskSubText>
    </template>

    <template v-else-if="data.type === TaskType.beltfit">
      <!-- 判断 compound 验资是否通过 -->
      <!--      <IconFont v-if="store.mission.belt" type="success"></IconFont>-->
      <GrowthpadTaskSubText
        :data="data"
        name="beltfit"
        :placeholder="I18n.growthpad.form.placeholderBsc"
        :confirm="true"
      >
        <span v-login class="inline-flex">
          <span v-validity.begin.end="validityValue" class="button">{{
            buttonValue
          }}</span>
        </span>
      </GrowthpadTaskSubText>
    </template>

    <template v-else-if="data.type === TaskType.bunny">
      <!-- 判断 compound 验资是否通过 -->
      <!--      <IconFont v-if="store.mission.bunny" type="success"></IconFont>-->
      <GrowthpadTaskSubText
        :data="data"
        name="bunny"
        :placeholder="I18n.growthpad.form.placeholderBsc"
        :confirm="true"
      >
        <span v-login class="inline-flex">
          <span v-validity.begin.end="validityValue" class="button">{{
            buttonValue
          }}</span>
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
