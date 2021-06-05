<script setup lang="ts">
import { ref, onMounted } from 'vue'
import I18n from '~/utils/i18n/index'
import { logout, userData } from '~/logic/user/login'
</script>

<template>
  <div>
    <el-popover placement="bottom-start" width="100px" trigger="hover">
      <template #reference>
        <div class="flex items-center hand">
          <div>{{ userData.nickname }}</div>
          <img
            class="w-3 ml-2"
            src="https://res.ikingdata.com/nav/downTip.png"
            alt=""
          />
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
          {{ I18n.nav.user }}
        </div>
        <img
          class="w-7.75 ml-2"
          src="https://res.ikingdata.com/nav/navVip.jpg"
          alt=""
        />
      </div>

      <div class="flex items-center itemMt cursor-pointer">
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
    </el-popover>
  </div>
</template>
<style scoped>
.itemMt:nth-child(n + 2) {
  color: blue;
  margin-top: 17px;
}
</style>
