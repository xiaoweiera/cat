<script setup lang="ts">
import { reactive, computed } from 'vue'
import safeGet from '@fengqiaogang/safe-get'
import I18n from '~/utils/i18n/index'
import Task from '~/logic/growthpad/task'

const store = Task()

// 地址
const formdata = reactive({
  address: '',
})

const getToken = function(): string {
  if (store?.user.bsc_token) {
    return store.user.bsc_token
  }
  return ''
}

// 提示文案
const tips = computed(() => {
  // 已绑定
  if (getToken()) {
    return '* 奖励将于活动结束后统一发放到您的奖励接收地址 ，持仓量相关任务奖励直接发放至验证地址。'
  }
  // 未绑定前
  return '* 请登记您的领取奖励地址（持仓量相关任务奖励直接发放至验证地址），如未及时登记，则奖励不进行发放。'
})

const isNull = function(address) {
  if (address && address.trim()) {
    return false
  }
  return true
}
// 校验规则
const rules = {
  address: [
    {
      required: true,
      message: I18n.growthpad.examples.address,
      trigger: ['blur', 'change'],
    },
    {
      trigger: ['blur', 'change'],
      validator(rule, value, callback) {
        if (isNull(value)) {
          callback(I18n.growthpad.examples.address)
        } else {
          callback()
        }
      },
    },
  ],
}
// 绑定地址
const bindAddress = async function() {
  try {
    await store.setAdress(formdata.address)
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <div class="pb-15">
    <div v-if="getToken()" class="flex-1">
      <h2 class="pb-4 text-base font-semibold address">
        <span>预计活动奖励：</span>
        <span
          class="reward"
        >{{ store.user.reward }}{{ store.getNickName() }}</span>
      </h2>
      <div>
        <p class="text-sm address">您登记的奖励领取地址为：{{ getToken() }}</p>
      </div>
    </div>
    <div v-else>
      <h2 class="pb-4 text-base font-semibold">
        {{ I18n.growthpad.examples.register }}
      </h2>
      <div class="flex">
        <div class="flex-1">
          <el-form
            label-width="0px"
            :show-message="false"
            :model="formdata"
            :rules="rules"
          >
            <el-form-item
              prop="address"
              class="address-content"
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
          </el-form>
        </div>
        <div class="ml-4">
          <ElButton v-login type="primary" @click="bindAddress">
            {{ I18n.growthpad.examples.submit }}
          </ElButton>
        </div>
      </div>
    </div>
    <div class="pt-1.5 text-xs">
      <p class="tips">{{ tips }}</p>
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
