<script setup lang="ts">
import { ref, onMounted } from 'vue'
import I18n from '~/utils/i18n/index'
import { logout, userData } from '~/logic/user/login'
const type = ref(window.screen.width > 768 ? 'hover' : 'click')
</script>

<template>
  <div>
    <el-popover placement="bottom-start" width="auto" :trigger="type">
      <template #reference>
        <div class="flex items-center hand">
          <!-- 已经登录 -->
          <IconFont type="user" size="3xl"></IconFont>
        </div>
      </template>
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
          class="w-7.75 ml-2"
          src="https://res.ikingdata.com/nav/navVip.jpg"
          alt=""
        />
      </div>
      <a
        href="https://www.kingdata.com/topic?utm_source=https://kingdata.com"
        target="_blank"
        class="flex items-center itemMt cursor-pointer"
      >
        <img
          class="w-5 h-5 ml-2"
          src="https://res.ikingdata.com/nav/navChart.jpg"
          alt=""
        />
        <div
          style="color: rgba(68, 90, 132, 1)"
          class="text-kd14px16px ml-2 text-kd14px18px flex"
        >
          {{ I18n.nav.chart }}
        </div>
      </a>
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
    </el-popover>
  </div>
</template>
<style scoped>
.itemMt:nth-child(n + 2) {
  color: blue;
  margin-top: 17px;
}
</style>
