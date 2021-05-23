<script setup lang="ts">
import { reactive, computed, ref, toRaw } from 'vue'
import I18n from '~/utils/i18n/index'
import Task from '~/logic/growthpad/task'
import Message from '~/utils/message'
import { logoForm } from '~/logic/user/login'

const store = Task()

const addressRef = ref<any>(null)

// @ts-ignore
const getToken = function(): string {
  if (store?.user.bsc_token) {
    return store.user.bsc_token
  }
  return ''
}
// @ts-ignore
const tokenIsNull = computed<boolean>((): boolean => {
  if (store?.user.bsc_token) {
    return true
  }
  return false
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
      message: I18n.growthpad.examples.address,
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
          callback(I18n.growthpad.examples.address)
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
    const status = await Message('确认地址', {
      value: formdata.address,
      warn: '地址一旦确认不可修改',
    })
    if (status) {
      await store.setAdress(formdata.address)
    }
  } catch (e) {
    // todo
  }
}
</script>

<template>
  <div class="pb-15">
    <div v-if="tokenIsNull" class="flex-1">
      <h2 class="pb-4 text-base font-semibold address">
        <span>预计活动奖励：</span>
        <span
          class="reward"
        >{{ store.user.reward }}{{ store.getNickName() }}</span>
      </h2>
      <div>
        <p class="text-sm address">您登记的奖励领取地址为：{{ getToken() }}</p>
      </div>
      <div class="pt-1.5 text-xs">
        <p class="tips">
          * 奖励将于活动结束后统一发放到您的奖励接收地址
          ，持仓量相关任务奖励直接发放至验证地址。
        </p>
      </div>
    </div>
    <div v-else>
      <h2 class="pb-4 text-base font-semibold">
        <span>{{ I18n.growthpad.examples.register }}</span>
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
                <ElInput
                  v-model="formdata.address"
                  :placeholder="I18n.growthpad.examples.address"
                >
                  <template v-if="isNull(formdata.address)" #suffix>
                    <span class="pr-3 text-sm tips">地址无效</span>
                  </template>
                </ElInput>
              </el-form-item>
            </div>
            <div class="ml-4">
              <ElButton v-login type="primary" native-type="submit">
                <span>{{ I18n.growthpad.examples.submit }}</span>
              </ElButton>
            </div>
          </div>
        </el-form>
      </div>
      <div class="pt-1.5 text-xs">
        <p class="tips">
          *
          请登记您的领取奖励地址（持仓量相关任务奖励直接发放至验证地址），如未及时登记，则奖励不进行发放。
        </p>
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
