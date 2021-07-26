<script setup lang="ts">
import { ref, reactive, onBeforeMount, watch } from 'vue'
// @ts-ignore
import { param, onReady } from '~/logic/topic/router'
// @ts-ignore
import { menuList, syncMenuList, menuCurrent } from '~/logic/topic/menu'
// @ts-ignore
import { MenuType } from '~/logic/topic/props'

import { uuid } from '~/utils/index'
import { setScrollTop } from '~/utils/event/scroll'

// @ts-ignore
const search = ref<string>('')

const charBoxKey = ref<string>(uuid())

// @ts-ignore
const current = reactive({
  data: {}
})

const makeCharBoxKey = function() {
  const data = {
    // @ts-ignore
    topId: current.data.topicID,
    search: search.value
  }
  charBoxKey.value = uuid(JSON.stringify(data))
}


const setCurrent = function() {
  search.value = '' // 清空搜索内容
  const data = menuCurrent() || {}
  current.data = data
  makeCharBoxKey()
}

watch(param, setCurrent, {
  deep: true
})

// 搜索
// @ts-ignore
const onSearch = function() {
  setScrollTop()
  makeCharBoxKey()
}


onBeforeMount(async () => {
  onReady()
  makeCharBoxKey()
  // 获取菜单列表数据
  await syncMenuList()
  // 设置当前选中的菜单数据
  setCurrent()
})
</script>

<template>
  <div class="w-full flex">
    <div class="w-72 hidden md:block">
      <div class="fixed -bottom-0 -left-0 -top-0 w-72 pt-16 z-10">
        <div class="pt-2 w-full h-full">
          <div class="menu-box w-full h-full overflow-y-auto overflow-x-hidden bg-white">
            <div class="search-box h-14 flex items-center" v-login>
              <el-input v-model="search" placeholder="搜索" @change="onSearch">
                <template #prefix>
                  <IconFont type="icon-sousuo" class="ml-1.5 text-base"></IconFont>
                </template>
              </el-input>
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
          <!-- 精选推荐广告位 -->
          <template v-if="current.data.type && current.data.type === MenuType.recommend">
            <TopicRecommend :menu="current.data"/>
          </template>
          <!-- 图表列表 -->
          <TopicChart :key="charBoxKey" :menu="current.data" :query="search"/>
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
