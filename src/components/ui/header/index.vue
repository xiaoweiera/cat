<script setup lang="ts">
import { computed } from 'vue'
import { env } from '~/lib/process'
import { headers } from '~/logic/menu'
import { config } from '~/utils/router'
import DBList from '@fengqiaogang/dblist'
import { getLocation } from '~/utils/router'
import { toArray, forEach, map, toBoolean } from '~/utils'

const primaryKey = 'id'
const foreignKey = 'pid'
const foreignKeyValue = '0'

// 查找匹配的数据
const getActiveValue = function($router: any, db: DBList, key: string) {
  let path: string = $router.path || window.location.pathname
  if (path === '' || path === '/') {
    path = config.topic
  }
  // 缩小查找范围
  const result = db.childrenDeepFlatten({ [primaryKey]: key })
  const temp = new DBList([], primaryKey, foreignKey, foreignKeyValue)
  temp.insert(result)
  const list = temp.like<any>({ href: path })
  return list.length > 0 ? list[list.length - 1] : undefined
}

const menus = computed(function() {
  const $router = getLocation()
  const db = new DBList([], primaryKey, foreignKey, foreignKeyValue)
  db.insert(db.flatten(headers, 'children'))

  forEach(function(item: any){
    const key = item[primaryKey]
    // 获取匹配的菜单
    const value = getActiveValue($router, db, key)
    let ids: string[]
    if (value) {
      const list = db.parentDeepFlatten(value)
      ids = map((d: any) => d[primaryKey], list)
    } else {
      const list = db.childrenDeepFlatten(item)
      ids = map((d: any) => d[primaryKey], list)
    }
    // 修改自身与子级所有菜单选中状态
    const active = toBoolean(value)
    db.update({ [primaryKey]: ids }, { active })

  }, db.select({ [foreignKey]: foreignKeyValue }))

  return db.childrenDeep()
})

</script>

<template>
  <div class="ui-header">
    <div class="bg-global-darkblue px-6 flex justify-between">
      <div class="flex items-center">
        <a class="inline-block" v-router="env.dashboard">
          <img class="min-w-28" src="https://res.ikingdata.com/common/logo-white.svg">
        </a>
        <div class="ml-10">
          <!-- 导航菜单 -->
          <UiHeaderMenu :menus="menus"/>
        </div>
      </div>
      <!-- 右侧用户相关内容 -->
      <UiHeaderUser/>
    </div>
    <div>
      <!-- 占位符, 实际内容在 UiHeaderMenu 呈现 -->
      <UiHeaderSub></UiHeaderSub>
    </div>
  </div>
</template>


<style scoped lang="scss">
.ui-header {
  @apply sticky top-0 z-1000;
}
</style>
