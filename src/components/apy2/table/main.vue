<script setup lang="ts">
import {ref, defineProps} from 'vue'
import {formatDefaultTime} from '~/lib/tool'
import I18n from '~/utils/i18n/index'
const props=defineProps(
    {

    }
)
const header=['矿池','TVL/可投额度','APY 构成','APY','操作']
const getHeaderClass=()=>'font-family: PingFang SC;font-size: 14px;line-height: 18px;color: rgba(3, 54, 102, 0.65);font-weight:400px;'
const tableData=[
  {
    name:'ETH',
    project:'Coinwind',
    type:'token',
    projectLogo:'bsc',
    projectType:'v',
    like:true,
    des:'COW策略'
  }
]
</script>
<template>
<div>
  <el-table :header-cell-style="getHeaderClass()" :data="tableData" style="width: 100%;border-top:1px solid rgba(3, 54, 102, 0.06);">
    <el-table-column
        prop="pool"
        label="矿池"
      >
      <template #default="scope">
      <Apy2TablePool :data="scope.row"/>
      </template>
    </el-table-column>
    <el-table-column
        prop="tvlNumber"
        label="TVL/可投额度"
>
      <template #default="scope">
        <span style="margin-left: 10px">222</span>
      </template>
    </el-table-column>
    <el-table-column
        prop="apyGroup"
        label="APY 构成">
      <template #default="scope">
        <span style="margin-left: 10px">333</span>
      </template>
    </el-table-column>
    <el-table-column
        prop="apy"
        label="APY">
      <template #default="scope">
        <span style="margin-left: 10px">4444</span>
      </template>
    </el-table-column>
    <el-table-column
        prop="address"
        label="地址">
      <template #default="scope">
        <span style="margin-left: 10px" class="border-1">555</span>
      </template>
    </el-table-column>
    <el-table-column
        prop="tool"
        label="操作" width="100px">
      <template #default="scope">
        <span style="margin-left: 10px">555</span>
      </template>
    </el-table-column>

  </el-table>
</div>

</template>
<style scoped lang="scss">

</style>
