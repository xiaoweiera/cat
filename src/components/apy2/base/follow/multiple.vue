<script setup lang="ts">/**
 * @file 币种多选收藏
 */
import { ref, defineProps, defineEmits, toRaw } from 'vue'
import { symbolList, setFollow } from '~/logic/apy2/follow'
import { SymbolType } from '~/logic/apy2/interface'
import { toBoolean, map, uuid } from '~/utils'
import DBList from '@fengqiaogang/dblist'
import getProps from '~/components/apy2/base/follow/props'
import { messageError, messageSuccess } from '~/lib/tool'
import safeGet from '@fengqiaogang/safe-get'

const props = defineProps(getProps())

const emitEvent = defineEmits(['success'])

// @ts-ignore
const title = ref<string>('添加币种 & LP')
// @ts-ignore
const subTitle = ref<string>('已选')
// @ts-ignore
const radios = [
  { label: '单币', value: SymbolType.Token },
  { label: 'LP', value: SymbolType.Lp }
]


const list = ref<any[]>([])
const followeds = ref<any[]>([])

const getSymbolList = async function(query: object = {}) {
  const result = await symbolList({
    type: props.type,
    ...query
  })
  const db = new DBList(map(function(item: any) {
    item.id = uuid(item.id || item.name)
    return item
  }, result))
  return  db.clone(function(item: any) {
    item.checked = toBoolean(item.followed);
    return item
  })
}

const getFollowedList = async function() {
  const list = toRaw(followeds.value)
  if (list.length > 0) {
    return list
  }
  const result = await getSymbolList({
    followed: true
  })
  followeds.value = result
  return result
}

const upData = async function(query: object = {}) {
  const [list1, list2] = await Promise.all([
    getFollowedList(),
    getSymbolList(query)
  ])
  const db = new DBList()
  db.insert(list1)
  db.insert(list2)
  const array = db.clone()
  list.value = array
  return array
}


const onChange = function(data: any) {
  upData({
    query: data.search,
    symbol_type: data.radioValue
  })
}

// 保存
// @ts-ignore
const onSave = async function(list: any[]) {
  followeds.value = []
  const query = {
    ...props,
    multiple: true,
    value: map((item: any) => item.name, list)
  }
  try {
    await setFollow(query)
    messageSuccess('已收藏')

    emitEvent('success')

    return upData()

  } catch (e) {
    const message = safeGet(e, 'message') || '收藏失败，请稍后再试'
    messageError(message)
  }
}

</script>

<template>
  <UiTransfer :title="title" :sub-title="subTitle" :radios="radios" :list="list" :onload="upData" @changeParam="onChange" @submit="onSave">
    <template #content>
      <el-button v-login type="primary" size="medium">
        <div class="py-1.5 px-7">{{ title }}</div>
      </el-button>
    </template>
    <template #item="{ data }">
      <div>
        <span class="text-global-highTitle text-xs">{{ data.name }}</span>
      </div>
    </template>
    <template #result="{ data }">
      <div>
        <span class="text-global-highTitle text-xs">{{ data.name }}</span>
      </div>
    </template>
  </UiTransfer>
</template>
