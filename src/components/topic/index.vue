<script setup lang="ts">
  import { onBeforeMount } from 'vue'
  // @ts-ignore
  import { menuList, syncMenuList } from '~/logic/topic/menu'

  onBeforeMount(syncMenuList)
</script>

<template>
  <div class="w-full flex">
    <div class="w-72 hidden md:block">
      <div class="fixed -bottom-0 -left-0 -top-0 w-72 pt-16">
        <div class="pt-2 w-full h-full">
          <div class="menu-box w-full h-full overflow-y-auto overflow-x-hidden">
            <TopicMenu :list="menuList" icon-size="2xl"></TopicMenu>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1">
      <p>content</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .menu-box {
    box-shadow: 4px 0 12px rgb(44 140 248 / 8%);
  }
</style>
