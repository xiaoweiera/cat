<script setup lang="ts">
import { defineProps } from 'vue'
import { MenuItem } from '~/logic/topic/props'
import { menuList } from '~/logic/topic/menu'
import DBList from '@fengqiaogang/dblist'
import { router } from '~/utils/directive/router'

const props = defineProps({
  data: {
    type: Object
  },
})

// @ts-ignore
const isChild = function(item: MenuItem) {
  if (item && item.children) {
    if (item.children.length > 0) {
      return false
    }
  }
  return true
}

// @ts-ignore
const makeQuery = function(item: MenuItem) {
  const db = new DBList([], 'mid', 'pid', '-1')
  const list = db.flatten(menuList.value, 'children')
  db.insert(list)
  const parent = db.parent<MenuItem>(item)
  const value = router({
    path: '/topic',
    query: {
      tagID: parent ? parent.id : 'item',
      topicID: item.id
    }
  })
  return value
}
</script>

<template>
  <router-link v-if="isChild(data)" :to="makeQuery(data)" >
    <slot></slot>
  </router-link>
  <label v-else>
    <slot></slot>
  </label>
</template>



