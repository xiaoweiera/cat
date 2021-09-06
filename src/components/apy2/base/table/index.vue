<script setup lang="ts">
/**
 * @file APY 表格统计
 * @author svon.me@gmail.com
 */
import { forEach } from '~/utils'
import { defineProps, onMounted, ref } from 'vue'
import { getTableExpandList, getTableList } from '~/logic/apy2/table'
import DBList from '@fengqiaogang/dblist'
import safeSet from '@fengqiaogang/safe-set'
import { SymbolType, TabCategoryData } from '~/logic/apy2/interface'
import I18n from '~/utils/i18n/index'
const db = new DBList([], 'uuid', 'pid')

const props = defineProps({
  type: {
    type: String,
    default: () => TabCategoryData.mining,
    validator: function(value: string) {
      // 类型为挖矿与借贷
      return value === TabCategoryData.mining || value === TabCategoryData.lend;
    }
  },
  // 单利/综合
  apyType: {
    type: String,
    default: () => 'all',
    validator: function(value: string) {
      return value === 'all' || value === 'single';
    }
  },
  // 分组
  groupId: {
    type: String,
    required: true,
  },
  chain: {
    type: String,
    default: () => 'all',
  }
})

const getTableDataList = function() {
  const array: any[] = []
  const append = function(item: any) {
    const data = {}
    safeSet(data, '0', item)
    forEach(function(apy: any, index: number) {
      safeSet(data, `${index + 1}`, apy)
    }, db.select({ pid: item.uuid, [SymbolType.name]: SymbolType.Apy }))
    array.push(data)
  }
  const dataList = db.select({ [SymbolType.name]: [SymbolType.Lp, SymbolType.Token]})
  for(let i = 0, len = dataList.length; i < len; i++) {
    const item: any = dataList[i]
    append(item)
    // 如果当前 symbol 为展开状态
    if (item.expand) {
      forEach(function(token: any) {
        append(token)
      }, db.select({ pid: item.uuid, [SymbolType.name]: SymbolType.Child }))
    }
  }
  return array
}

const page = ref<number>(1)
const loading = ref<boolean>(true)
const nextStatus = ref<boolean>(true)
const rankValue = ref<number>(10)
const tableData = ref<any[]>([])

const updateData = async function() {
  loading.value = true
  try {
    const { maxLength = 0, next } = await getTableList(db, { ...props, page: page.value })
    rankValue.value = maxLength < 6 ? 6 : maxLength
    nextStatus.value = next
    tableData.value = getTableDataList()
  } catch (e) {
    console.log(e)
  }
  loading.value = false
}

// @ts-ignore
const nextList = function() {
  page.value = page.value + 1
  return updateData()
}

onMounted(updateData)

// @ts-ignore
const onExpand = async function(data: any) {
  if (loading.value) {
    return false
  }
  const expand = !data.expand
  db.update({ uuid: data.uuid }, { expand })
  const where = { pid: data.uuid, [SymbolType.name]: SymbolType.Child }
  const children = db.select(where)
  if (children && children.length < 1) {
    loading.value = true
    await getTableExpandList(db, { ...props, uuid: data.uuid })
    loading.value = false
  }
  tableData.value = getTableDataList()
}

// @ts-ignore
const tdKey = function(scope: any, index: number | string) {
  const row = scope.row
  if (row) {
    const data = row[index]
    if (data) {
      return data['uuid']
    }
  }
}
// @ts-ignore
const rowClassName = function(scope: any): string {
  const row = scope.row
  const data: any = row['0']
  return data[SymbolType.name]
}
// @ts-ignore
const isLp = function(scope: any) {
  const data = scope.row['0']
  return !!(data && data[SymbolType.name] === SymbolType.Lp);
}
// @ts-ignore
const isToken = function(scope: any) {
  const data = scope.row['0']
  return !!(data && data[SymbolType.name] === SymbolType.Token);
}

// 重新加载
// @ts-ignore
const reload = function() {
  db.clear() // 清空数据
  page.value = 1
  return updateData()
}
const submitAdd=()=>document.getElementsByClassName('addNew')[0].children[0].children[0].click()
</script>
<template>
  <div v-if="tableData.length > 0">
    <el-table class="w-full apy-custom-expand min-h-60" border :data="tableData" :row-class-name="rowClassName">
      <el-table-column :width="200" fixed prop="0">
        <template #header="scope">
          <Apy2BaseTableHead/>
        </template>
        <template #default="scope">
          <!-- token 数据可以展开 -->
          <Apy2BaseTableSymbolToken v-if="isToken(scope)" :type="type" :key="tdKey(scope, 0)" :data="scope.row['0']" @click="onExpand(scope.row['0'])" />
          <!-- 其它 -->
          <Apy2BaseTableSymbolLp v-else :type="type" :key="tdKey(scope, 0)" :data="scope.row['0']"/>
        </template>
      </el-table-column>
      <template v-for="index in rankValue" :key="index">
        <el-table-column :width="200" :prop="`${index}`">
          <template #header="scope">
            <Apy2BaseTableHead :index="index"/>
          </template>
          <template #default="scope">
            <template v-if="scope.row[index] && TabCategoryData">
              <template v-if="type === TabCategoryData.mining">
                <Apy2BaseTableMiningItem :data="scope.row[index]" :key="tdKey(scope, index)"/>
              </template>
              <template v-else>
                <Apy2BaseTableLendItem :data="scope.row[index]" :key="tdKey(scope, index)"/>
              </template>
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="pt-4 flex">
      <div v-if="groupId === 'my'">
        <Apy2BaseFollowMultiple :type="type" @success="reload"/>
      </div>
      <div class="flex-1 text-center" v-if="nextStatus">
        <span class="inline-block py-2 px-18 bg-global-highTitle bg-opacity-6 rounded cursor-pointer" @click="nextList">
          <span class="text-sm text-global-highTitle bg-opacity-65">{{I18n.apyIndex.more}}</span>
        </span>
      </div>
    </div>
  </div>
  <div v-else>
    <Apy2BaseNoData @submit="submitAdd" :type="props.type" :group-id="groupId"/>
    <div  class="pt-4  addNew"   v-if="groupId === 'my'" >
      <Apy2BaseFollowMultiple    :type="type" @success="reload"/>
    </div>
  </div>
</template>

<style lang="scss">
%reset {
  @apply pt-0 pb-0;
  & > .cell {
    overflow: initial;
    padding: 0 !important;
  }
}
.apy-custom-expand {
  thead {
    th {
      @extend %reset;
    }
  }
  tbody {
    td {
      @extend %reset;
      .apy-item {
        transition: all 03s;
        @apply relative;
        .apy-detail {
          @apply w-65;
          background-color: #EDF0F5;
        }

        &:hover {
          background-color: #EDF0F5;
        }
      }
    }
    /* 去掉背景色 */
    tr {
      --el-table-row-hover-background-color: transparent;
      &.children {
        background-color: #FAFAFA;
      }
    }
  }
}
.apy-hover-detail {
  padding: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  border: 0 !important;
}
</style>
