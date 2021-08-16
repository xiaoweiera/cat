<script setup lang="ts">
import {ref, defineProps} from 'vue'
import {formatDefaultTime} from '~/lib/tool'
import I18n from '~/utils/i18n/index'
const props=defineProps(
    {

    }
)
const getHeaderClass=()=>'font-family: PingFang SC;font-weight:400; font-size: 14px;line-height: 18px;color: rgba(3, 54, 102, 0.65);font-weight:400px;'
const tableData=[
  {
    logo:'https://res.ikingdata.com/apyTwo/testLogo.png',
    name:'ETH',
    like:false,
    chain:'bsc',
    type:'v',
    amountMoney:'15578 (20%)',
    rateGroup:'USDC -25%  + LHB 5%',
    apr:34.33,
    aprDes:'3x 杠杆'
  },
  {
    logo:'https://res.ikingdata.com/apyTwo/testLogo.png',
    name:'ETH',
    like:false,
    chain:'bsc',
    type:'v',
    amountMoney:'15578 (20%)',
    rateGroup:'USDC -25%  + LHB 5%',
    apr:34.33,
    aprDes:'3x 杠杆'
  }
]
</script>
<template>
  <div>
    <el-table :header-cell-style="getHeaderClass()" :data="tableData" style="width: 100%;border-top:1px solid rgba(3, 54, 102, 0.06);">
      <el-table-column prop="pool" label="借款币种">
        <template #default="scope">
          <Apy2ProjectTokenTableItem  :logo="scope.row.logo" :name="scope.row.name" :like="scope.row.like"  :chain="scope.row.chain" :type="scope.row.type"  />
        </template>
      </el-table-column>
      <el-table-column prop="tvlNumber" label="可借金额">
        <template #default="scope">
          <Apy2LoanTableLoanAmount :value="scope.row.amountMoney"/>
        </template>
      </el-table-column>
      <el-table-column prop="apyGroup" label="利率 构成" >
        <template #default="scope">
          <Apy2LoanTableLoanAmount :value="scope.row.rateGroup"/>
        </template>
      </el-table-column>
      <el-table-column prop="apy" label="借款 APR" width="140px"   sortable>
        <template #default="scope">
          <Apy2MiningTableApy :apy="scope.row.apr" :des="scope.row.aprDes"/>
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
