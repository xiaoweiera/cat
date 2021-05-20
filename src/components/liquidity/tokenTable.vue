<script setup lang="ts">
// @ts-ignore
import { ElTable, ElTableColumn } from 'element-plus'
import { testData } from '/mock/liquidity'
const headerTable = () => 'border:1px solid red'
</script>
<template>
  <div class="w-full h-10">
    <el-table
      :data="testData"
      height="600"
      cell-style="border:0"
      :row-style="headerTable"
      style="width: 100%; height: 600px"
    >
      <el-table-column>
        <template #header="scope">
          <div>交易对</div>
        </template>
        <template #default="scope">
          <span>{{ scope.row.token0_symbol }}</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template #header="scope">
          <div>TVL($)</div>
        </template>
        <template #default="scope">
          <span>400</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template #header="scope">
          <div>价格($)</div>
        </template>
        <template #default="scope">
          <span>300</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template #header="scope">
          <div>涨跌幅</div>
        </template>
        <template #default="scope">
          <span>+200</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style lang="postcss" scoped>
.headerTable {
  border: 1px solid red;
}
::v-deep(.el-table td) {
  padding: 8px 0;
}
</style>
