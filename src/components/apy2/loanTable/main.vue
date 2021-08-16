<script setup lang="ts">
import {ref, defineProps} from 'vue'
import {formatDefaultTime} from '~/lib/tool'
import I18n from '~/utils/i18n/index'
const props=defineProps(
    {
    }
)
const getHeaderClass=()=>'font-family: PingFang SC;font-size: 14px;line-height: 18px;color: rgba(3, 54, 102, 0.65);font-weight:400px;'
const tableData=[
  {
    name:'ETH',
    project:'Coinwind',
    type:'token',
    projectLogo:'bsc',
    projectType:'v',
    like:true,
    des:'COW 策略',
    tvl:'300万 USDT',
    tvlNumDes:'$15578  (20%)',
    dan:'3.54%(COW) + 50%(BTC)',
    fu:'3.54%(COW) + 50%(BTC)',
    apy:12,
    apyDes:'3x 杠杆',
  }
]
</script>
<template>
  <div>
    <el-table :header-cell-style="getHeaderClass()" :data="tableData" style="width: 100%;border-top:1px solid rgba(3, 54, 102, 0.06);">
      <el-table-column prop="pool" label="平台">
        <template #default="scope">
          <Apy2MiningTablePool :data="scope.row"/>
        </template>
      </el-table-column>
      <el-table-column prop="tvlNumber" label="可借额度">
        <template #default="scope">
          <Apy2MiningTableTvlNumber :data="scope.row"/>
        </template>
      </el-table-column>
      <el-table-column prop="apyGroup" label="最低抵押率/清算率" sortable >
        <template #default="scope">
          <Apy2MiningTableApyGroup :data="scope.row"/>
        </template>
      </el-table-column>
      <el-table-column prop="apy" label="抵押收益"   sortable>
        <template #default="scope">
          <Apy2MiningTableApy :data="scope.row"/>
        </template>
      </el-table-column>
      <el-table-column prop="apy" label="借出利率"   sortable>
        <template #default="scope">
          <Apy2MiningTableApy :data="scope.row"/>
        </template>
      </el-table-column>
      <el-table-column prop="apy" label="真实成本(借出金额)"   sortable>
        <template #default="scope">
          <Apy2MiningTableApy :data="scope.row"/>
        </template>
      </el-table-column>
      <el-table-column prop="tool" label="操作" width="75px">
        <template #default="scope">
          <Apy2MiningTableTool :data="scope.row"/>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>
<style scoped lang="scss">

</style>
