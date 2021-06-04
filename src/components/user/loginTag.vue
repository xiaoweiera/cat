<script setup lang="ts">
import { onMounted, ref } from 'vue'
import I18n from '~/utils/i18n/index'
import { loginTypeStatus } from '~/store/header/login'

const tags = ref([])
const changeLoginType = (typeName: string) => {
  loginTypeStatus.type = typeName
}
const getLoginText = () => {
  if (loginTypeStatus.name === 'login') {
    tags.value = [
      {
        key: 'tel',
        name: I18n.common.phone,
      },
      {
        key: 'email',
        name: I18n.common.email,
      },
    ]
  } else if (loginTypeStatus.name === 'register') {
    tags.value = [
      {
        key: 'tel',
        name: I18n.common.phoneCreate,
      },
      {
        key: 'email',
        name: I18n.common.emailCreate,
      },
    ]
  } else {
    tags.value = [
      {
        key: 'tel',
        name: I18n.common.phoneForget,
      },
      {
        key: 'email',
        name: I18n.common.emailForget,
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
        :class="loginTypeStatus.type === item.key ? 'selectStatus' : 'status'"
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
