<script setup lang="ts">
import { computed, defineProps, reactive, ref, toRaw } from 'vue'
// @ts-ignore
import I18n from '~/utils/i18n/index'
import Task from '~/logic/growthpad/task'
const store = Task()

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  button: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  }
})

interface FormData {
  text: string
}

// @ts-ignore
const formdata = reactive<FormData>({
  text: ''
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
  text: [
    {
      required: true,
      message: props.placeholder,
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
          callback(props.placeholder)
        } else {
          callback()
        }
      },
    },
  ],
}

const formBoxRef = ref<any>(null)

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

// 提交
// @ts-ignore
const onSubmit = async function() {
  const form = toRaw(formBoxRef).value
  try {
    await form.validate()
    let promises: any[] = []
    switch (props.name) {
      case 'uid':
        promises.push(store.setUserId(formdata.text))
        break
      case 'address':
        promises.push(store.setAdress(formdata.text))
      break
    }
    await Promise.all(promises)
  } catch (e) {
    // todo
  }
}

</script>

<template>
  <el-form ref="formBoxRef" label-width="0px" :show-message="false" :rules="rules" :model="formdata" @submit.stop.prevent="onSubmit">
    <div class="flex">
      <div class="flex-1">
        <el-form-item prop="text" class="address-content w-full block" style="margin-bottom: 0">
          <ElInput v-model="formdata.text" :placeholder="placeholder"/>
        </el-form-item>
      </div>
      <!-- 判断登录 -->
      <div class="ml-4" v-login>
        <!-- 判断活动时间 -->
        <div v-validity.begin.end="validityValue">
          <ElButton type="primary" native-type="submit">
            <span>{{ button }}</span>
          </ElButton>
        </div>
      </div>
    </div>
    <div class="text-xs pt-1.5">
      <slot name="warn"></slot>
    </div>
  </el-form>
</template>


