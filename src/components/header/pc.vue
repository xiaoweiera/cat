<script setup lang="ts">
import { menu } from '~/logic/menu'
</script>
<template>
  <el-popover placement="bottom-start" width="auto" trigger="click">
    <template #reference>
      <div class="ml-12 flex items-center">
        <IconFont type="nav-more" size="xl"></IconFont>
        <span
          class="ml-1.5 mt-1 text-kd16px24px text-global-default opacity-85"
        >产品</span>
        <img
          class="w-3 ml-1.5 mt-2"
          src="https://res.ikingdata.com/nav/navDown.png"
          alt=""
        />
      </div>
    </template>
    <div class="flex p-3 font-kdFang">
      <template v-for="item in menu">
        <div class="twoMl">
          <div class="mb-0.25">{{ item.name }}</div>
          <template v-for="child in item.children">
            <div class="mt-5 flex items-center relative">
              <img :src="child.icon" alt="" />
              <div class="flex flex-col ml-2.5">
                <img
                  v-if="child.badge"
                  class="w-13 absolute -top-4 -right-6"
                  src="https://res.ikingdata.com/nav/navOnLineTip.jpg"
                  alt=""
                />
                <span class="childName">{{ child.name }}</span>
                <span class="desc">{{ child.desc }}</span>
              </div>
            </div>
          </template>
        </div>
      </template>
    </div>
  </el-popover>
</template>

<style scoped lang="scss">
.twoMl:nth-child(n + 2) {
  @apply ml-12;
}
.desc {
  @apply text-global-default opacity-65 text-kd12px16px;
}
.selectName {
  @apply text-global-primary  font-medium text-kd15px150;
}
.name {
  @apply text-global-default opacity-65 text-kd14px18px;
}
.childName {
  @apply text-global-default opacity-85 text-kd15px150;
}
</style>
