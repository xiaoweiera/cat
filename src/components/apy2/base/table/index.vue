<script setup lang="ts">
/**
 * @file APY 表格统计
 * @author svon.me@gmail.com
 */
import { defineProps, onMounted, ref } from 'vue'
import { getTableList } from '~/logic/apy2/table'

defineProps({
  type: {
    type: String,
    required: true,
    validator: function(value: string) {
      // 类型为挖矿与借贷
      return value === 'mining' || value === 'loan';
    }
  }
})

const rankValue = ref<number>(0)
const tableData = ref<any[]>([])

const onRowClick = function() {
}

onMounted(async function() {
  const { list, rank } = await getTableList()
  tableData.value = list
  rankValue.value = rank
})

</script>

<template>
  <el-table class="w-full apy-custom-expand" border :data="tableData" @row-click="onRowClick">
    <el-table-column :width="200" fixed prop="0">
      <template #header="scope">
        <Apy2BaseTableHead :index="0"/>
      </template>
      <template #default="scope">
        <Apy2BaseTableSymbol :data="scope.row"/>
      </template>
    </el-table-column>
    <template v-for="index in rankValue" :key="index">
      <el-table-column :width="200" :prop="`${index}`">
        <template #header="scope">
          <Apy2BaseTableHead :index="index"/>
        </template>
        <template #default="scope">
          <Apy2BaseTableItem :data="scope.row" v-if="scope.row[index]"/>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<style lang="scss">
%reset {
  @apply pt-0 pb-0;
  & > .cell {
    @apply pl-0 pr-0;
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
  }
}
</style>
