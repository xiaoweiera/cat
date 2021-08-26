<script setup lang="ts">/**
 * @file 币种多选收藏
 */
import { reactive, ref, onMounted, defineProps, toRaw, defineEmits } from 'vue'
import { symbolList, setFollow } from '~/logic/apy2/follow'
import { SymbolType } from '~/logic/apy2/interface'
import { toBoolean, map } from '~/utils'
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

const Params = reactive<object>({
  query: '',
  symbol_type: SymbolType.Token,
})

const list = ref<any[]>([])

const upData = async function() {
  const result = await symbolList({
    ...toRaw(Params),
    type: props.type,
  })
  const db = new DBList(result)
  const array = db.clone(function(item: any) {
    item.checked = toBoolean(item.followed);
    return item
  })
  list.value = array
  return array
}


// 保存
// @ts-ignore
const onSave = async function(list: any[]) {
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
  <UiTransfer :title="title" :sub-title="subTitle" :radios="radios" :list="list" :onload="upData" @submit="onSave">
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
