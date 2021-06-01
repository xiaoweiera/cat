<script setup lang="ts">
import { onMounted, ref, defineProps } from 'vue'
import I18n from '~/utils/i18n/index'
import { loginType } from '~/store/header/login'
const props = defineProps({
  dialogType: String,
})
const tags = ref([])
const changeLoginType = (typeName: string) => {
  loginType.value = typeName
}
const getLoginText = () => {
  if (props.dialogType === 'login') {
    tags.value = [
      {
        key: 'tel',
        name: '手机号登录',
      },
      {
        key: 'mail',
        name: '邮箱登录',
      },
    ]
  } else if (props.dialogType === 'register') {
    tags.value = [
      {
        key: 'tel',
        name: '手机号注册',
      },
      {
        key: 'mail',
        name: '邮箱注册',
      },
    ]
  }
}
onMounted(() => getLoginText())
</script>
<template>
  <div
    class="flex w-48 my-0 mx-auto h-9 items-center justify-between tagContainer"
  >
    <template v-for="item in tags">
      <span
        :class="loginType === item.key ? 'selectStatus' : 'status'"
        @click="changeLoginType(item.key)"
      >{{ item.name }}</span>
    </template>
  </div>
</template>
<style scoped>
.tagContainer {
  border-bottom: 1px solid #ebebeb;
  @apply mb-6 h-12;
}
.selectStatus {
  border-bottom: 2px solid #2b8dfe;
  @apply flex items-center h-full text-global-primary cursor-pointer text-kd16px150 font-kdFang font-medium;
}
.status {
  border-bottom: 2px solid #ffffff;
  @apply flex items-center h-full text-global-noSelect cursor-pointer text-kd16px150 font-kdFang;
}
</style>
