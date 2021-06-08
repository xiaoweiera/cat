<script setup lang="ts">
import { ref, onMounted } from 'vue'
import I18n from '~/utils/i18n/index'
import { logout, userData } from '~/logic/user/login'
const type = ref(window.screen.width > 768 ? 'hover' : 'click')
</script>

<template>
  <div>
    <div class="userIcon flex items-center hand relative">
      <!-- 已经登录 -->
      <IconFont type="user" size="3xl"></IconFont>
    </div>
    <div
      class="
        hidden
        tipShow
        bg-global-white
        absolute
        right-5
        top-15
        py-4.25
        px-3.25
        loginOut
      "
    >
      <div class="flex items-center itemMt cursor-pointer">
        <img
          class="w-5 h-5 ml-2"
          src="https://res.ikingdata.com/nav/navUser.jpg"
          alt=""
        />
        <div
          style="color: rgba(68, 90, 132, 1)"
          class="text-kd14px16px ml-2 text-kd14px18px flex"
        >
          {{ userData.nickname }}
        </div>
        <img
          v-if="userData.is_vip"
          class="w-7.75 ml-2"
          src="https://res.ikingdata.com/nav/navVip.jpg"
          alt=""
        />
      </div>
      <div class="flex items-center itemMt cursor-pointer" @click="logout()">
        <img
          class="w-5 h-5 ml-2"
          src="https://res.ikingdata.com/nav/navOut.jpg"
          alt=""
        />
        <div
          style="color: rgba(68, 90, 132, 1)"
          class="text-kd14px16px ml-2 text-kd14px18px flex"
        >
          {{ I18n.nav.outLogin }}
        </div>
      </div>
    </div>

    <!--      <a-->
    <!--        href="https://www.kingdata.com/topic?tagID=item&topicID=my?utm_source=https://kingdata.com"-->
    <!--        target="_blank"-->
    <!--        class="flex items-center itemMt cursor-pointer"-->
    <!--      >-->
    <!--        <img-->
    <!--          class="w-5 h-5 ml-2"-->
    <!--          src="https://res.ikingdata.com/nav/navChart.jpg"-->
    <!--          alt=""-->
    <!--        />-->
    <!--        <div-->
    <!--          style="color: rgba(68, 90, 132, 1)"-->
    <!--          class="text-kd14px16px ml-2 text-kd14px18px flex"-->
    <!--        >-->
    <!--          {{ I18n.nav.chart }}-->
    <!--        </div>-->
    <!--      </a>-->
  </div>
</template>
<style scoped>
.userIcon:hover {
  & + .userIcon {
    display: block;
  }
}
.loginOut {
  border-radius: 6px;
  box-shadow: inset 0px -1px 0px rgba(37, 62, 111, 0.06);
}
.itemMt:nth-child(n + 2) {
  color: blue;
  margin-top: 17px;
}
</style>
