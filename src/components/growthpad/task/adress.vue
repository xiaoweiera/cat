<script setup lang="ts">
import { reactive, computed, ref, toRaw } from 'vue'
import I18n from '~/utils/i18n/index'
import Task from '~/logic/growthpad/task'
import Message from '~/utils/message'
import activity from '~/logic/growthpad/activity'
import { ProjectKey } from '~/logic/growthpad/config'
import { TimeStatus, getTimeStatus } from '~/components/growthpad/task/task'

const store = Task()

const addressRef = ref<any>(null)

// 判断项目是否结束
// @ts-ignore
const isClosure = computed<boolean>((): boolean => {
  const status = getTimeStatus(store)
  if (status === TimeStatus.closure) {
    return true
  }
  return false
})

// @ts-ignore
const getToken = function(): string {
  if (store?.info.bsc) {
    return store.info.bsc
  }
  return ''
}
// @ts-ignore
const tokenIsNull = computed<boolean>((): boolean => {
  if (store?.info.bsc) {
    return true
  }
  return false
})
// @ts-ignore
const placeholder = computed<string>((): string => {
  const value = store.address.placeholder
  return value || I18n.growthpad.mdx.address.placeholder
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

const isNull = function(address?: string): boolean {
  if (address && address.trim()) {
    return false
  }
  return true
}

// 校验规则
// @ts-ignore
const rules: any = {
  address: [
    {
      required: true,
      message: I18n.growthpad.address.placeholder,
      trigger: ['blur', 'change'],
    },
    {
      trigger: ['blur', 'change'],
      validator(
        rule: any,
        value: string,
        callback: (message?: string) => void,
      ) {
        if (isNull(value)) {
          callback(placeholder())
        } else {
          callback()
        }
      },
    },
  ],
}

// 地址
const formdata = reactive({
  address: '',
})

// 绑定地址
// @ts-ignore
const bindAddress = async function(): Promise<void> {
  const form = toRaw(addressRef).value
  try {
    await form.validate()
    // 判断活动时间
    let status = activity(store)
    // 在活动时间范围内
    if (status) {
      // 提示地址确认
      status = await Message(I18n.growthpad.address.confirm, {
        value: formdata.address,
        warn: I18n.growthpad.address.tips,
      })
    }
    // 地址无误情况下提交地址
    if (status) {
      await store.setAdress(formdata.address)
    }
  } catch (e) {
    // todo
  }
}
</script>

<template>
  <div class="pb-15 font-kdFang">
    <div v-if="tokenIsNull" class="flex-1">
      <h2 class="pb-4 text-base font-medium address">
        <span>{{ I18n.growthpad.address.reward }}</span>
        <span class="reward">{{ store.reward.value }}</span>
        <template v-if="store.projectName === ProjectKey.channels">
          <span class="ml-1" style="color: #e9592d">{{
            I18n.growthpad.channels.address.tips
          }}</span>
        </template>
        <template v-else>
          <span class="reward ml-1">{{ store.token }}</span>
        </template>
        <span v-if="isClosure" class="ml-1 reward" style="color: #e9592d">{{ I18n.growthpad.reward.send }}</span>
      </h2>
      <div>
        <p class="text-sm address">
          {{ I18n.growthpad.address.iCard }}{{ getToken() }}
        </p>
      </div>
      <div class="pt-1.5 text-xs">
        <p class="tips">{{ I18n.growthpad.address.notify2 }}</p>
      </div>
    </div>
    <div v-else>
      <h2 class="pb-4 text-base font-medium address">
        <span>{{ I18n.growthpad.register }}</span>
      </h2>
      <div class="w-full">
        <el-form
          ref="addressRef"
          label-width="0px"
          :show-message="false"
          :model="formdata"
          :rules="rules"
          @submit.stop.prevent="bindAddress"
        >
          <div class="flex">
            <div class="flex-1">
              <el-form-item
                prop="address"
                class="address-content w-full block"
                style="margin-bottom: 0"
              >
                <ElInput v-model="formdata.address" :placeholder="placeholder">
                  <template v-if="isNull(formdata.address)" #suffix>
                    <span class="pr-3 text-sm tips">{{
                      I18n.growthpad.address.invalid
                    }}</span>
                  </template>
                </ElInput>
              </el-form-item>
            </div>
            <div v-validity.end="validityValue" class="ml-4">
              <ElButton v-login type="primary" native-type="submit">
                <span>{{ I18n.growthpad.submit }}</span>
              </ElButton>
            </div>
          </div>
        </el-form>
      </div>
      <div class="pt-1.5 text-xs">
        <p class="tips">{{ I18n.growthpad.address.notify1 }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.reward {
  color: #2b8dfe;
}
.address {
  color: #033666;
}
.tips {
  color: #e9592d;
}
.address-content {
  .tips {
    display: none;
  }
  &.is-error {
    :deep(.tips) {
      display: inline-block;
    }
  }
}
</style>
