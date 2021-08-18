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
  },
  {
    name:'ETH',
    project:'Coinwind',
    type:'pair',
    projectLogo:'bsc',
    projectType:'f',
    like:false,
    des:'COW 策略',
    tvl:'300万 USDT',
    tvlNumDes:'$15578  (20%)',
    dan:'3.54%(COW) + 50%(BTC)',
    fu:'3.54%(COW) + 50%(BTC)',
    apy:34.33,
    apyDes:'3x 杠杆',
  },
  {
    name:'ETH',
    project:'Coinwind',
    type:'pair',
    projectLogo:'bsc',
    projectType:'f',
    like:false,
    des:'COW 策略',
    tvl:'300万 USDT',
    tvlNumDes:'$15578  (20%)',
    dan:'3.54%(COW) + 50%(BTC)',
    fu:'3.54%(COW) + 50%(BTC)',
    apy:15,
    apyDes:'3x 杠杆',
  }
]
</script>
<template>
<div>
  <el-table :header-cell-style="getHeaderClass()" :data="tableData" style="width: 100%;border-top:1px solid rgba(3, 54, 102, 0.06);">
    <el-table-column prop="pool" label="矿池">
      <template #default="scope">
      <Apy2MiningTablePool :type="scope.row.type" :logo="scope.row.logo" :name="scope.row.name" :like="scope.row.like" :plat="scope.row.project" :chain="scope.row.projectLogo" :platType="scope.row.projectType" :des="scope.row.des" :data="scope.row"/>
      </template>
    </el-table-column>
    <el-table-column prop="tvlNumber" label="TVL/可投额度">
      <template #default="scope">
        <Apy2MiningTableTvlNumber :tvl="scope.row.tvl" :des="scope.row.tvlNumDes"/>
      </template>
    </el-table-column>
    <el-table-column prop="apyGroup" label="APY 构成" >
      <template #default="scope">
        <Apy2MiningTableApyGroup :value0="scope.row.dan" :value1="scope.row.fu"/>
      </template>
    </el-table-column>
    <el-table-column prop="apy" label="APY" width="140px"   sortable>
      <template #default="scope">
        <Apy2MiningTableApy :apy="scope.row.apy" :des="scope.row.apyDes"/>
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
