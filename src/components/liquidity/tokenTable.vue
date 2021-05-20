<script setup lang="ts">
// @ts-ignore
import { ElTable, ElTableColumn } from 'element-plus'
import { testData } from '/mock/liquidity'
</script>
<template>
  <div class="w-full h-10">
    <el-table :data="testData" height="600" style="width: 100%; height: 600px">
      <el-table-column label="交易对">
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row.token0_symbol }}</span>
        </template>
      </el-table-column>
      <el-table-column label="TVL($)" width="70">
        <template #default="scope">
          <span>800</span>
        </template>
      </el-table-column>
      <el-table-column width="70" label="价格($)">
        <template #default="scope">
          <span>800</span>
        </template>
      </el-table-column>
      <el-table-column width="70" label="涨跌幅">
        <template #default="scope">
          <span>+333%</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
