<script setup lang="ts">
import {ref, defineProps} from 'vue'
import {formatDefaultTime} from '~/lib/tool'
import hmt from '~/lib/hmt'
import I18n from '~/utils/i18n/index'
import {getInject,setInject } from '~/utils/use/state'
const props=defineProps({data:Object,pageType:Boolean})
const lookChartUrl=(name:string)=>`/apy/token?symbol=${name}`
const getHeaderClass=()=>'font-family: PingFang SC; font-weight:400;font-size: 14px;line-height: 18px;color: rgba(3, 54, 102, 0.65);font-weight:400px;'
</script>
<template>
  <div>
<!--    大屏-->
    <el-table class="xshidden"  :header-cell-style="getHeaderClass()" align="center" header-align="center" :data="data" style="width: 100%;border-top:1px solid rgba(3, 54, 102, 0.06);">
      <el-table-column prop="palt" width="170px"  :label="I18n.apyIndex.plat">
        <template #default="scope">
          <a v-router.blank="lookChartUrl(scope.row.symbol_alias)">
            <Apy2LoanTablePlat class="hand"  :isNew="scope.row.new" :logo="scope.row.project_logo" :chain="scope.row.chain" :name="scope.row.project" :des="scope.row.strategy_tags"/>
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="loanAmount" width="150px" :label="I18n.apyIndex.borrowAmount">
        <template #default="scope">
          <a v-router.blank="lookChartUrl(scope.row.symbol_alias)">
            <Apy2LoanTableLoanAmount class="hand"  :value="scope.row.quota_remain" :valueRate="scope.row.quota_remain_percent"/>
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="clearNumber"  :width="pageType==='tokenLending'?'140px':'200px'"  :label="`${I18n.apyIndex.lowestLtv}/${I18n.apyIndex.clearRatio}`" sortable >
        <template #default="scope">
          <a v-router.blank="lookChartUrl(scope.row.symbol_alias)">
            <Apy2LoanTableClearNumber class="hand"  :value0="scope.row.mortgage_rate" :value1="scope.row.liquidation_rate"/>
          </a>
        </template>
      </el-table-column>
      <el-table-column  prop="gain" align="center" :label="I18n.apyIndex.mortgageInterest" :align="I18n.apyIndex.mortgage"  sortable>
        <template #default="scope">
<!--          <a v-router.blank="lookChartUrl(scope.row.symbol_alias)">-->
            <Apy2PoolDialog type="lend" :id="scope.row.lending_id">
              <template #reference>
                <Apy2LoanTableGain  @click='hmt.click("借贷最佳路径打开抵押池子详情","lend_list_supply_info")' class='hand' :logo="scope.row.lending_symbol_logo" :name="scope.row.lending_symbol" :value="scope.row.lending_apy" :des="scope.row.lending_apy_detail"/>
              </template>
            </Apy2PoolDialog>
<!--          </a>-->
        </template>
      </el-table-column>
      <el-table-column prop="loanRate" :label="I18n.apyIndex.borrowApy" align="center"   sortable>
        <template #default="scope">
<!--          <a v-router.blank="lookChartUrl(scope.row.symbol_alias)">-->
          <Apy2PoolDialog type="lend" :id="scope.row.loaning_id">
            <template #reference>
              <Apy2LoanTableGain @click='hmt.click("借贷最佳路径打开借出池子详情","lend_list_borrow_info")' class='hand' :logo="scope.row.symbol_logo" :name="scope.row.symbol" :value="scope.row.apy" :des="scope.row.apy_detail"/>
            </template>
          </Apy2PoolDialog>
<!--          </a>-->
        </template>
      </el-table-column>
      <el-table-column prop="cost"  :label="I18n.apyIndex.cost"   sortable>
        <template #default="scope">
          <a v-router.blank="lookChartUrl(scope.row.symbol_alias)">
            <Apy2LoanTableCost :value="scope.row.real_apy"/>
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="tool" align="right"  :label="I18n.apyIndex.operate" width="110px">
        <template #default="scope">
          <Apy2LoanTableTool  page='lend_Best_operate' type='lend' :data="scope.row" />
        </template>
      </el-table-column>
    </el-table>
<!--    小屏-->
    <el-table class="mdhidden" :header-cell-style="getHeaderClass()" align="center" header-align="center" :data="data" style="width: 100%;border-top:1px solid rgba(3, 54, 102, 0.06);">
      <el-table-column fixed prop="palt" width="170px"  :label="I18n.apyIndex.plat">
        <template #default="scope">
          <a v-router.blank="lookChartUrl(scope.row.symbol_alias)">
            <Apy2LoanTablePlat :isNew="scope.row.new" :logo="scope.row.project_logo" :chain="scope.row.chain" :name="scope.row.project" :des="scope.row.strategy_tags"/>
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="loanAmount" width="200px" :label="I18n.apyIndex.borrowAmount">
        <template #default="scope">
          <a v-router.blank="lookChartUrl(scope.row.symbol_alias)">
            <Apy2LoanTableLoanAmount :value="scope.row.quota_remain" :valueRate="scope.row.quota_remain_percent"/>
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="clearNumber"  width="200px"    :label="`${I18n.apyIndex.lowestLtv}/${I18n.apyIndex.clearRatio}`" sortable >
        <template #default="scope">
          <a v-router.blank="lookChartUrl(scope.row.symbol_alias)">
            <Apy2LoanTableClearNumber :value0="scope.row.mortgage_rate" :value1="scope.row.liquidation_rate"/>
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="gain"  width="200px"  :label="I18n.apyIndex.mortgageInterest" align="center"    sortable>
        <template #default="scope">
          <a v-router.blank="lookChartUrl(scope.row.symbol_alias)">
            <Apy2LoanTableGain @click='hmt.click("借贷最佳路径打开抵押池子详情","lend_list_supply_info")' :logo="scope.row.lending_symbol_logo" :name="scope.row.lending_symbol" :value="scope.row.lending_apy" :des="scope.row.lending_single_apy_detail"/>
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="loanRate"  width="200px"  :label="I18n.apyIndex.borrowApy" align="center"   sortable>
        <template #default="scope">
          <a v-router.blank="lookChartUrl(scope.row.symbol_alias)">
            <Apy2LoanTableGain @click='hmt.click("借贷最佳路径打开借出池子详情","lend_list_borrow_info")' :logo="scope.row.symbol_logo" :name="scope.row.symbol" :value="scope.row.apy" :des="scope.row.apy_detail"/>
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="cost"  width="200px"   :label="I18n.apyIndex.cost"   sortable>
        <template #default="scope">
          <a v-router.blank="lookChartUrl(scope.row.symbol_alias)">
            <Apy2LoanTableCost :value="scope.row.real_apy"/>
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="tool" align="right" :label="I18n.apyIndex.operate" width="110px">
        <template #default="scope">
          <Apy2LoanTableTool  :data="scope.row" />
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>
<style scoped lang="scss">

</style>
