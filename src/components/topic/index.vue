<script setup lang="ts">
import { ref, reactive, onBeforeMount, computed, watch } from 'vue'
// @ts-ignore
import { param, onReady } from '~/logic/topic/router'
// @ts-ignore
import { menuList, syncMenuList, menuCurrent } from '~/logic/topic/menu'
// @ts-ignore
import { MenuType } from '~/logic/topic/props'

// @ts-ignore
const search = ref<string>('')

// @ts-ignore
const current = reactive({
  data: {}
})

const setCurrent = function() {
  const data = menuCurrent() || {}
  current.data = data
}

watch(param, setCurrent, {
  deep: true
})

// @ts-ignore
const onSearch = function(e: Event) {
  console.log(e)
}


onBeforeMount(async () => {
  onReady()
  await syncMenuList()
  setCurrent()
})
</script>

<template>
  <div class="w-full flex">
    <div class="w-72 hidden md:block">
      <div class="fixed -bottom-0 -left-0 -top-0 w-72 pt-16 z-10">
        <div class="pt-2 w-full h-full">
          <div class="menu-box w-full h-full overflow-y-auto overflow-x-hidden bg-white">
            <div class="search-box h-14 flex items-center">
              <el-input v-model="search" placeholder="搜索" prefix-icon="el-icon-search" @change="onSearch"/>
            </div>
            <template v-if="menuList.length > 0">
              <TopicMenu :list="menuList" icon-size="2xl"></TopicMenu>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-auto w-1" v-if="menuList.length > 0">
      <div class="max-w-full" v-if="current.data.topicID">
        <TopicTitle :menu="current.data"/>
        <div>
          <p>{{ current.type }}</p>
          <template v-if="current.data.type && current.data.type === MenuType.recommend">
            <TopicRecommend :menu="current.data"/>
          </template>

          <TopicChart :menu="current.data" :key="current.data.topicID"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .menu-box {
    box-shadow: 4px 0 12px rgb(44 140 248 / 8%);
  }
  .search-box {
    border-bottom: 1px solid rgba(37,62,111,.04);
    ::v-deep(input) {
      border: 0;
      background: none;
    }
  }
</style>
