<script setup lang="ts">
import {ref, defineProps} from 'vue'
import {formatDefaultTime} from '~/lib/tool'
import I18n from '~/utils/i18n/index'
const props=defineProps(
    {
      data:Object,
    }
)
const getHeaderClass=()=>'font-family: PingFang SC;font-weight:400; font-size: 14px;line-height: 18px;color: rgba(3, 54, 102, 0.65);font-weight:400px;'
</script>
<template>
<div>
<!--  大屏-->
  <el-table class="xshidden" :header-cell-style="getHeaderClass()" :data="data" style="width: 100%;border-top:1px solid rgba(3, 54, 102, 0.06);">
    <el-table-column prop="pool" :label="I18n.apyIndex.pools">
      <template #default="scope">
        <Apy2PoolDialog type="mining" :id="scope.row.id">
          <template #reference>
            <Apy2MiningTablePool class="hand" :id="scope.row.id" :followed="scope.row.followed" :type="scope.row.symbol_type" :logo="scope.row.symbol_logo" :name="scope.row.symbol" :like="scope.row.followed" :project="scope.row.project" :chain="scope.row.chain" :category="scope.row.project_category" :des="scope.row.strategy" />
            </template>
        </Apy2PoolDialog>
      </template>
    </el-table-column>
    <el-table-column prop="tvlNumber" :label="`TVL/${I18n.apyIndex.hasMoney}`">
      <template #default="scope">
        <Apy2PoolDialog type="mining" :id="scope.row.id">
          <template #reference>
            <Apy2MiningTableTvlNumber class="hand" :name="scope.row.symbol" :tvl="scope.row.tvl" :remainTvl="scope.row.quota_remain" :tvlRate="scope.row.quota_remain_percent"/>
          </template>
        </Apy2PoolDialog>
      </template>
    </el-table-column>
    <el-table-column prop="apyGroup" :label="I18n.apyIndex.apyGroup" >
      <template #default="scope">
        <Apy2PoolDialog type="mining" :id="scope.row.id">
          <template #reference>
            <Apy2MiningTableApyGroup class="hand" :value0="scope.row.single_apy_detail" :value1="scope.row.compound_detail"/>
          </template>
        </Apy2PoolDialog>
      </template>
    </el-table-column>
    <el-table-column prop="apy" label="APY" width="140px"   sortable>
      <template #default="scope">
        <Apy2PoolDialog type="mining" :id="scope.row.id">
          <template #reference>
            <Apy2MiningTableLever class="hand" :apy="scope.row.apy" :des="scope.row.lever"/>
          </template>
        </Apy2PoolDialog>
      </template>
    </el-table-column>
    <el-table-column prop="tool" :label="I18n.apyIndex.operate" align="right" width="75px">
      <template #default="scope">
        <Apy2MiningTableTool class="hand" :id="scope.row.id"  :tokenName="scope.row.symbol_alias" :project_url="scope.row.project_url"/>
      </template>
    </el-table-column>
  </el-table>
<!--  小屏-->
  <el-table class="mdhidden" :header-cell-style="getHeaderClass()" :data="data" style="width: 100%;border-top:1px solid rgba(3, 54, 102, 0.06);">
    <el-table-column prop="pool" fixed width="170px" :label="I18n.apyIndex.pools">
      <template #default="scope">
        <Apy2PoolDialog type="mining" :id="scope.row.id">
          <template #reference>
            <Apy2MiningTablePool class="hand" :id="scope.row.id" :followed="scope.row.followed" :type="scope.row.symbol_type" :logo="scope.row.symbol_logo" :name="scope.row.symbol" :like="scope.row.followed" :project="scope.row.project" :chain="scope.row.chain" :category="scope.row.project_category" :des="scope.row.strategy" />
          </template>
        </Apy2PoolDialog>
      </template>
    </el-table-column>
    <el-table-column prop="tvlNumber" width="200px" :label="`TVL/${I18n.apyIndex.hasMoney}`">
      <template #default="scope">
        <Apy2PoolDialog type="mining" :id="scope.row.id">
          <template #reference>
            <Apy2MiningTableTvlNumber class="hand" :name="scope.row.symbol" :tvl="scope.row.tvl" :remainTvl="scope.row.quota_remain" :tvlRate="scope.row.quota_remain_percent"/>
          </template>
        </Apy2PoolDialog>
      </template>
    </el-table-column>
    <el-table-column prop="apyGroup" width="200px" :label="I18n.apyIndex.apyGroup" >
      <template #default="scope">
        <Apy2PoolDialog type="mining" :id="scope.row.id">
          <template #reference>
            <Apy2MiningTableApyGroup class="hand" :value0="scope.row.single_apy_detail" :value1="scope.row.compound_detail"/>
          </template>
        </Apy2PoolDialog>
      </template>
    </el-table-column>
    <el-table-column prop="apy"  label="APY" width="140px"   sortable>
      <template #default="scope">
        <Apy2PoolDialog type="mining" :id="scope.row.id">
          <template #reference>
            <Apy2MiningTableLever class="hand" :apy="scope.row.apy" :des="scope.row.lever"/>
          </template>
        </Apy2PoolDialog>
      </template>
    </el-table-column>
    <el-table-column prop="tool"  :label="I18n.apyIndex.operate" align="right" width="75px">
      <template #default="scope">
        <Apy2MiningTableTool class="hand" :id="scope.row.id" :tokenName="scope.row.symbol_alias" :project_url="scope.row.project_url"/>
      </template>
    </el-table-column>
  </el-table>
</div>

</template>
<style scoped lang="scss">

</style>
