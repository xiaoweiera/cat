<script setup lang="ts">
import {ref, defineProps} from 'vue'
import I18n from '~/utils/i18n/index'
import {formatDefaultTime} from '~/lib/tool'
const props=defineProps({data:Object})
const getHeaderClass=()=>'font-family: PingFang SC;font-weight:400; font-size: 14px;line-height: 18px;color: rgba(3, 54, 102, 0.65);font-weight:400px;'
</script>
<template>
<!--  big-->
  <div class="xshidden">
    <el-table :header-cell-style="getHeaderClass()" :data="data" style="width: 100%;border-top:1px solid rgba(3, 54, 102, 0.06);">
      <el-table-column prop="pool" :label="I18n.apyIndex.loanMoneyCoin">
        <template #default="scope">
          <Apy2ProjectTokenTableItem :id="scope.row.id" :followed="scope.row.followed"  :logo="scope.row.symbol_logo" :name="scope.row.symbol_alias" :like="scope.row.followed"  :chain="scope.row.chain" :type="scope.row.project_category"  />
        </template>
      </el-table-column>
      <el-table-column prop="tvlNumber" :label="I18n.apyIndex.borrowMoney">
        <template #default="scope">
          <Apy2LoanTableLoanAmount :value="scope.row.quota_remain" :valueRate="scope.row.quota_remain_percent"/>
        </template>
      </el-table-column>
      <el-table-column prop="apyGroup" :label="I18n.apyIndex.interestGroup" >
        <template #default="scope">
          <Apy2LoanTableDes :value="scope.row.apy_detail"/>
        </template>
      </el-table-column>
      <el-table-column prop="apy" :label="I18n.apyIndex.loanApr" width="140px"   sortable>
        <template #default="scope">
          <Apy2MiningTableLever  :apy="scope.row.apy" :des="scope.row.lever"/>
        </template>
      </el-table-column>
      <el-table-column prop="tool" :label="I18n.apyIndex.operate" width="110px">
        <template #default="scope">
          <Apy2LoanTableTool :data="scope.row"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
<!--  small-->
  <div class="mdhidden">
    <el-table :header-cell-style="getHeaderClass()" :data="data" style="width: 100%;border-top:1px solid rgba(3, 54, 102, 0.06);">
      <el-table-column prop="pool" fixed width="170px" :label="I18n.apyIndex.loanMoneyCoin">
        <template #default="scope">
          <Apy2ProjectTokenTableItem :id="scope.row.id" :followed="scope.row.followed"  :logo="scope.row.symbol_logo" :name="scope.row.symbol_alias" :like="scope.row.followed"  :chain="scope.row.chain" :type="scope.row.project_category"  />
        </template>
      </el-table-column>
      <el-table-column prop="tvlNumber" width="200px" :label="I18n.apyIndex.borrowMoney">
        <template #default="scope">
          <Apy2LoanTableLoanAmount :value="scope.row.quota_remain" :valueRate="scope.row.quota_remain_percent"/>
        </template>
      </el-table-column>
      <el-table-column prop="apyGroup" width="200px" :label="I18n.apyIndex.interestGroup" >
        <template #default="scope">
          <Apy2LoanTableDes :value="scope.row.apy_detail"/>
        </template>
      </el-table-column>
      <el-table-column prop="apy" :label="I18n.apyIndex.loanApr" width="140px"   sortable>
        <template #default="scope">
          <Apy2MiningTableApy :apy="scope.row.apy" :des="scope.row.lever"/>
        </template>
      </el-table-column>
      <el-table-column prop="tool" :label="I18n.apyIndex.operate" width="110px">
        <template #default="scope">
          <Apy2LoanTableTool :data="scope.row"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style scoped lang="scss">

</style>
