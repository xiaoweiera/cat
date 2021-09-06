<script setup lang="ts">/**
 * @file 币种多选收藏
 */
import { ref, defineProps, defineEmits } from 'vue'
import { symbolList, setFollow } from '~/logic/apy2/follow'
import { SymbolType } from '~/logic/apy2/interface'
import { map } from '~/utils'
import I18n from '~/utils/i18n/index'
import getProps from '~/components/apy2/base/follow/props'
import { messageError, messageSuccess } from '~/lib/tool'
import safeGet from '@fengqiaogang/safe-get'

const props = defineProps(getProps())

const emitEvent = defineEmits(['success'])

// @ts-ignore
const title = ref<string>(I18n.apy.tips.addTokenLp)
// @ts-ignore
const subTitle = ref<string>(I18n.common.button.selected)
// @ts-ignore
const radios = [
  { label: I18n.apy.token.pool.token, value: SymbolType.Token },
  { label: I18n.apy.token.pool.lp, value: SymbolType.Lp }
]


const list = ref<any[]>([])
const followeds = ref<any[]>([])

const getSymbolList = async function(query: object = {}) {
  return symbolList({
    type: props.type,
    ...query
  })
}

const upData = async function(query: object = {}) {
  const value = await getSymbolList(query)
  list.value = value
  return value
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
    messageSuccess(I18n.apy.pool.added)
    emitEvent('success')

    return upData()

  } catch (e) {
    const message = safeGet<string>(e, 'message')
    if (message) {
      messageError(message)
    }
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
