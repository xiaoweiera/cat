<script setup lang="ts">
import {ref, defineProps} from 'vue'
import {formatDefaultTime} from '~/lib/tool'
import I18n from '~/utils/i18n/index'
import {getInject,setInject } from '~/utils/use/state'
const props=defineProps({data:Object})
const getHeaderClass=()=>'font-family: PingFang SC;font-weight:400;font-size: 14px;line-height: 18px;color: rgba(3, 54, 102, 0.65);font-weight:400px;'
const tableData=[
  {
    plat:'CoinWind',
    platLogo:'https://res.ikingdata.com/apyTwo/hecoChain.jpg',
    platDes:'COW 策略',
    platIcon:'bsc',
    loanAmount:'15578 (20%)',
    mortRate:125.01,
    clearRate:115,
    gainLogo:'https://res.ikingdata.com/apyTwo/hecoChain.jpg',
    gainCoin:'ETH',
    gain:34.33,
    gainDes:'25% USDC + 5% LHB',
    loanLogo:'https://res.ikingdata.com/apyTwo/hecoChain.jpg',
    loanCoin:'ETH',
    loanRate:34.33,
    loanRateDes:'25% USDC + 5% LHB',
    cost:32.19
  },
  {
    plat:'CoinWind',
    platLogo:'https://res.ikingdata.com/apyTwo/hecoChain.jpg',
    platDes:'COW 策略',
    platIcon:'bsc',
    loanAmount:'15578 (20%)',
    mortRate:15.01,
    clearRate:215,
    gainLogo:'https://res.ikingdata.com/apyTwo/hecoChain.jpg',
    gainCoin:'BTC',
    gain:11.33,
    gainDes:'25% USDC + 5% LHB',
    loanLogo:'https://res.ikingdata.com/apyTwo/hecoChain.jpg',
    loanCoin:'BTC',
    loanRate:24.33,
    loanRateDes:'25% USDC + 5% LHB',
    cost:-52.19
  }
]
</script>
<template>
  <div>
    <el-table :header-cell-style="getHeaderClass()" :data="data" style="width: 100%;border-top:1px solid rgba(3, 54, 102, 0.06);">
      <el-table-column prop="palt" width="170px"  label="平台">
        <template #default="scope">
          <Apy2LoanTablePlat :logo="scope.row.project_logo" :chain="scope.row.chain" :name="scope.row.project" :des="scope.row.strategy_tags"/>
        </template>
      </el-table-column>
      <el-table-column prop="loanAmount" width="170px" label="可借额度">
        <template #default="scope">
          <Apy2LoanTableLoanAmount :value="scope.row.quota_remain" :valueRate="scope.row.quota_remain_percent"/>
        </template>
      </el-table-column>
      <el-table-column prop="clearNumber"   label="最低抵押率/清算率" sortable >
        <template #default="scope">
          <Apy2LoanTableClearNumber :value0="scope.row.mortgage_rate" :value1="scope.row.liquidation_rate"/>
        </template>
      </el-table-column>
      <el-table-column prop="gain" label="抵押收益" align="center"  sortable>
        <template #default="scope">
          <Apy2LoanTableGain :logo="scope.row.symbol_logo" :name="scope.row.symbol" :value="scope.row.apy" :des="scope.row.single_apy_detail"/>
        </template>
      </el-table-column>
      <el-table-column prop="loanRate" label="借出利率" align="center"   sortable>
        <template #default="scope">
          <Apy2LoanTableGain :logo="scope.row.lending_symbol_logo" :name="scope.row.lending_symbol_alias" :value="scope.row.lending_apy" :des="scope.row.lending_single_apy_detail"/>
        </template>
      </el-table-column>
      <el-table-column prop="cost" label="真实成本(借出金额)"   sortable>
        <template #default="scope">
         <Apy2LoanTableCost :value="scope.row.real_apy"/>
        </template>
      </el-table-column>
      <el-table-column prop="tool" label="操作" width="110px">
        <template #default="scope">
          <Apy2LoanTableTool :data="scope.row" prop="tool"/>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>
<style scoped lang="scss">

</style>
