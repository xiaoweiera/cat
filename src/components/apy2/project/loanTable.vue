<script setup lang="ts">
import {ref, defineProps} from 'vue'
import {formatDefaultTime} from '~/lib/tool'
import I18n from '~/utils/i18n/index'
const props=defineProps({data:Object})
const getHeaderClass=()=>'font-family: PingFang SC;font-weight:400; font-size: 14px;line-height: 18px;color: rgba(3, 54, 102, 0.65);font-weight:400px;'
</script>
<template>
  <div>
    <el-table :header-cell-style="getHeaderClass()" :data="data" style="width: 100%;border-top:1px solid rgba(3, 54, 102, 0.06);">
      <el-table-column prop="pool" label="借款币种">
        <template #default="scope">
          <Apy2ProjectTokenTableItem :id="scope.row.id" :followed="scope.row.followed"  :logo="scope.row.symbol_logo" :name="scope.row.symbol_alias" :like="scope.row.followed"  :chain="scope.row.chain" :type="scope.row.project_category"  />
        </template>
      </el-table-column>
      <el-table-column prop="tvlNumber" label="可借金额">
        <template #default="scope">
          <Apy2LoanTableLoanAmount :value="scope.row.quota_remain" :valueRate="scope.row.quota_remain_percent"/>
        </template>
      </el-table-column>
      <el-table-column prop="apyGroup" label="利率 构成" >
        <template #default="scope">
          <Apy2LoanTableDes :value="scope.row.apy_detail"/>
        </template>
      </el-table-column>
      <el-table-column prop="apy" label="借款 APR" width="140px"   sortable>
        <template #default="scope">
          <Apy2MiningTableApy :apy="scope.row.apy" :des="scope.row.lever"/>
        </template>
      </el-table-column>
      <el-table-column prop="tool" label="操作" width="110px">
        <template #default="scope">
          <Apy2LoanTableTool :data="scope.row"/>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>
<style scoped lang="scss">

</style>
