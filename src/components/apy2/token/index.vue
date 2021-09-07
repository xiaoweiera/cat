<script setup lang="ts">
/**
 * @file 币种分析
 * @author svon.me@gmail.com
 */
import { trim, toUpper } from 'ramda'
import { onBeforeMount, computed, toRaw, ref } from 'vue'
import { tokenList } from '~/store/apy2/state'
import { getParam } from '~/utils/router'
import { ready } from '~/logic/apy2/token'
import { TabCategoryData } from '~/logic/apy2/interface'
import { useProvide } from '~/utils/use/state'
import { uuid, equalsIgnoreCase } from '~/utils'
import DBList from '@fengqiaogang/dblist'
import I18n from '~/utils/i18n/index'

// @ts-ignore
const [ date ] = useProvide('uiDate')

const search = ref<string>('')


// 获取
const getActiveTokenId = function(): string | number {
  const value = getParam<string | number>('symbol')
  if (value) {
    return value as string
  }
  const list = tokenList.value
  const [ first ] = list
  return first?.name
}

const getTabList = function() {
  const db = new DBList(toRaw(tokenList.value), 'name')
  const symbol = db.selectOne<any>({ name: getActiveTokenId() })
  if (symbol && symbol.category && symbol.category.length > 0) {
    const tab = new DBList([
      {
        id: TabCategoryData.mining,
        name: I18n.apyIndex.tokenMining,
        followed: 'mining_followed'
      }, {
        id: TabCategoryData.lend,
        name: I18n.apyIndex.tokenLending,
        followed: 'lend_followed'
      }
    ], 'id')
    return tab.select({ id: symbol.category })
  }
  return []
}

// @ts-ignore
const tabList = computed(getTabList)

// @ts-ignore
const contentKey = computed(function() {
  const id = getActiveTokenId()
  const query = { ...getParam(), id }
  return uuid(JSON.stringify(query))
})

// @ts-ignore
const isRouterActive = function(data: string) {
  const value = getActiveTokenId()
  if (value) {
    return equalsIgnoreCase(value as string, data);
  }
  return false
}

const menuList = computed(function(){
  const list = toRaw(tokenList.value)
  const name = trim(search.value)
  if (name) {
    const db = new DBList(list)
    return db.like({ name: toUpper(name) })
  }
  return list
})

onBeforeMount(ready)

</script>

<template>
  <UiLayoutMenu>
    <template #menu>
      <el-container class="h-full text-kdFang">
        <el-header height="initial" class="p-0">
          <div class="pt-5">
            <el-input class="search-box" :placeholder="I18n.apy.token.search" v-model="search">
              <template #prefix>
                <i class="el-input__icon el-icon-search"></i>
              </template>
            </el-input>
          </div>
        </el-header>
        <el-main class="p-0 overflow-auto showY">
          <div class="pt-3 pb-10" v-if="tokenList.length > 0">
            <template v-for="(item, index) in menuList" :key="index">
              <div class="cursor-pointer">
                <router-link class="flex items-center p-1.5" :to="item.href" :class="{'menu-active': isRouterActive(item.name)}">
                  <span class="inline-flex">
                    <IconFont rounded :type="item.icon" size="24"></IconFont>
                  </span>
                  <span class="ml-1.5">
                    <span class="text-sm text-global-highTitle">{{ item.name }}</span>
                  </span>
                </router-link>
              </div>
            </template>
          </div>
        </el-main>
      </el-container>
    </template>
    <template #content>
      <div class="md:p-8 p-4" v-if="tabList.length > 0 && getActiveTokenId()">
        <Apy2TokenContent :key="contentKey" :symbol="getActiveTokenId()" :category="tabList"/>
      </div>
    </template>
  </UiLayoutMenu>

</template>

<style scoped lang="scss">
.search-box {
  border-bottom: 1px solid rgba(#033666, 0.06);
  ::v-deep(input) {
    border: 0;
    background: none;
  }
}
.menu-active {
  @apply bg-global-highTitle bg-opacity-6 rounded;
}

.el-button--small {
  @apply rounded-md text-global-highTitle text-opacity-85;
  &.is-plain {
    padding-top: 4px !important;
    padding-bottom: 4px !important;
  }
}
</style>
