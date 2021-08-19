<script setup lang="ts">
/**
 * @file APY 表格统计
 * @author svon.me@gmail.com
 */
import { forEach } from '~/utils'
import { defineProps, onMounted, ref } from 'vue'
import { getTableList, getTableExpandList } from '~/logic/apy2/table'
import DBList from '@fengqiaogang/dblist'
import safeSet from '@fengqiaogang/safe-set'

const db = new DBList([], 'uuid', 'pid')

defineProps({
  type: {
    type: String,
    required: true,
    validator: function(value: string) {
      // 类型为挖矿与借贷
      return value === 'mining' || value === 'loan';
    }
  },
  groupId:Number,
  tableType:String
})

const getTableDataList = function() {
  const array: any[] = []

  const append = function(item: any) {
    const data = {}
    safeSet(data, '0', item)
    forEach(function(apy: any, index: number) {
      safeSet(data, `${index + 1}`, apy)
    }, db.select({ pid: item.uuid, type: 'apy' }))
    array.push(data)
  }
  const symbolList = db.select({type: 'symbol'})
  for(let i = 0, len = symbolList.length; i < len; i++) {
    const item: any = symbolList[i]
    append(item)
    forEach(function(token: any) {
      append(token)
    }, db.select({ pid: item.uuid, type: 'children' }))
  }
  return array
}

const rankValue = ref<number>(0)
const tableData = ref<any[]>([])

const onRowClick = function() {
}


onMounted(async function() {
  await getTableList(db)
  tableData.value = getTableDataList()
  rankValue.value = 10
})


// @ts-ignore
const onExpand = async function(data: any) {
  const where = { uuid: data.uuid }
  const expand = !data.expand
  db.update(where, { expand })
  const children = db.select({ pid: data.uuid, type: 'children' })
  if (children && children.length > 0) {
    forEach(function(item: any) {
      db.remove(item)
    }, children)
  } else {
    await getTableExpandList(db, data.uuid)
  }
  tableData.value = getTableDataList()
}

// @ts-ignore
const getTdUUid = function(scope: any, index: number | string) {
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
  return row['0'].type
}
</script>
<template>
  <el-table class="w-full apy-custom-expand" border :data="tableData" :row-class-name="rowClassName" @row-click="onRowClick">
    <el-table-column :min-width="'200px'" fixed prop="0">
      <template #header="scope">
        <Apy2BaseTableHead :index="0"/>
      </template>
      <template #default="scope">
        <template v-if="scope.row && scope.row['0']">
          <Apy2BaseTableSymbol :key="getTdUUid(scope, 0)" @click="onExpand(scope.row['0'])" :data="scope.row['0']"/>
        </template>
      </template>
    </el-table-column>
    <template v-for="index in rankValue" :key="index">
      <el-table-column :width="200" :prop="`${index}`">
        <template #header="scope">
          <Apy2BaseTableHead :index="index"/>
        </template>
        <template #default="scope">
          <template v-if="scope.row[index]">
            <Apy2BaseTableItem :data="scope.row" :key="getTdUUid(scope, index)"/>
          </template>
        </template>
      </el-table-column>
    </template>
  </el-table>
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
</style>
