<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { env } from '~/lib/process'
import { headers } from '~/logic/menu'
import { config } from '~/utils/router'
import DBList from '@fengqiaogang/dblist'
import { getLocation } from '~/utils/router'
import { forEach, map, toBoolean, isString, toArray } from '~/utils'
import safeGet from '@fengqiaogang/safe-get'
import { useRoute } from 'vue-router'

const primaryKey = 'id'
const foreignKey = 'pid'
const foreignKeyValue = '0'

const match = function(data: any | any[], value: string): boolean {
  let status: boolean = false
  const list = toArray(data)
  for (let i = 0, len = list.length; i < len; i++) {
    const router = list[i]
    let reg: RegExp
    if (isString(router)) {
      reg = new RegExp(router, 'i')
    } else {
      reg = router as any
      reg.lastIndex = 0
    }
    if (reg.test(value)) {
      status = true
      break
    }
  }
  return status
}

// 查找匹配的数据
const getActiveValue = function($router: any, db: DBList, key: string) {
  let path: string = $router.path || window.location.pathname
  if (path === '' || path === '/') {
    path = `${config.dapp}/rank`
  }
  // 缩小查找范围
  const result = db.childrenDeepFlatten<any>({ [primaryKey]: key })
  let value: any
  for(let index = result.length - 1; index >= 0; index--) {
    const href = safeGet<string>(result[index], 'href')
    const router = safeGet<string>(result[index], 'router')
    if (router) {
      if (match(router, path)) {
        value = result[index]
        break
      }
    }
    if (href) {
      if (href === path || path.includes(href) || href.includes(path)) {
        value = result[index]
        break
      }
    }
  }
  return value
}

const init = function() {
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

    const sub = db.select({ header: true, [foreignKey]: key })

    db.update(item, { subHeader: sub.length > 0 })

  }, db.select({ [foreignKey]: foreignKeyValue }))

  return db.childrenDeep()
}

const menus = ref<any[]>(init())

watch(useRoute(), function() {
  const value = init()
  menus.value = value
})

const isShowSub = computed<boolean>(function(): boolean{
  const list = menus.value
  let status = false
  for(let i = 0, len = list.length; i < len; i++) {
    const item = list[i]
    if (item.subHeader) {
      if (item && item.active && item.children) {
        status = true
        break
      }
    }
  }
  return status
})

</script>

<template>
  <div class="ui-header" :class="{'sub-header': isShowSub}">
    <div class="bg-global-darkblue px-6 flex justify-between fixed top-0 left-0 right-0 z-1000">
      <div class="flex items-center ui-header-menu">
        <!-- 移动端导航 -->
        <UiHeaderMobile class="mr-4 block lg:hidden" :menus="menus"/>

        <a class="inline-block select-none" v-router="env.dashboard">
          <img class="min-w-28" src="https://res.ikingdata.com/common/logo-white.svg">
        </a>

        <!-- PC端导航 -->
        <div class="ml-10 h-full hidden lg:block">
          <!-- 导航菜单 -->
          <UiHeaderMenu class="pt-2.5 h-full" :menus="menus"/>
        </div>
      </div>
      <!-- 右侧用户相关内容 -->
      <UiHeaderUser/>
    </div>
    <div class="extend">
      <!-- 占位符, 实际内容在 UiHeaderMenu 呈现 -->
      <UiHeaderSub></UiHeaderSub>
      <div class="hidden">
        <span class="top-header"></span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
/* 设置导航高度 */
@mixin mainHeaderSpace ($height) {
  height: $height;
  .top-header {
    top: $height;
  }
  & ~ main {
    .top-header {
      top: $height;
    }
  }
}

.ui-header {
  $height: 60px;
  $subHeight: 50px;

  .ui-header-menu {
    height: $height;
  }
  .ui-header-sub {
    height: $subHeight;
  }
  @include mainHeaderSpace($height);

  .extend {
    @apply hidden;
  }
  @screen lg {
    &.sub-header {
      @include mainHeaderSpace($height + $subHeight);
      .extend {
        @apply block;
      }
    }
  }
}
</style>
