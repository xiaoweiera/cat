<script setup lang="ts">
import { ref } from 'vue'
import I18n from '~/utils/i18n/index'
// @ts-ignore
import { logout, userData } from '~/logic/user/login'

const showTip = ref(false)
const optionShow = () => {
  showTip.value = true
}
const optionClose = () => {
  showTip.value = false
}
</script>
<template>
  <div>
    <div class="userIcon h-full flex justify-center items-center hand relative" @mousemove="optionShow" @mouseleave="optionClose">
      <IconFont class="flex" type="icon-yonghu1" size="22"/>
      <div class="tipShow" v-show="showTip" >
        <div class="loginOut">
          <div class="flex items-center itemMt cursor-pointer">
            <img class="w-5 h-5" src="https://res.ikingdata.com/nav/navUser.jpg" alt=""/>
            <div style="color: rgba(68, 90, 132, 1)" class="text-kd14px16px ml-2 text-kd14px18px flex whitespace-nowrap">
              {{ userData.nickname }}
            </div>
            <img v-if="userData.is_vip" class="w-7.75 ml-2" src="https://res.ikingdata.com/nav/navVip.jpg" alt=""/>
          </div>
          <div class="flex items-center itemMt cursor-pointer" @click="logout()">
            <img class="w-5 h-5" src="https://res.ikingdata.com/nav/navOut.jpg" alt=""/>
            <div style="color: rgba(68, 90, 132, 1)" class="text-kd14px16px ml-2 text-kd14px18px flex">
              {{ I18n.nav.outLogin }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
img {
  max-width: none !important;
}
.loginOut {
  @apply py-4.25 px-3 bg-global-white;
  border-radius: 6px;
  box-shadow: inset 0px -1px 0px rgba(37, 62, 111, 0.06);
}
.itemMt:nth-child(n + 2) {
  color: blue;
  margin-top: 17px;
}
.tipShow {
  @apply absolute right-0 top-full pt-2.5 z-50;
}
</style>
