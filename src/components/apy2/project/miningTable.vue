<script setup lang="ts">
import {ref, defineProps} from 'vue'
import I18n from '~/utils/i18n/index'
import {formatDefaultTime} from '~/lib/tool'
const props=defineProps(
    {
      data:Object,
    }
)
const getHeaderClass=()=>'font-family: PingFang SC;font-weight:400; font-size: 14px;line-height: 18px;color: rgba(3, 54, 102, 0.65);font-weight:400px;'
</script>
<template>
<!--  big-->
  <div class="xshidden">
    <el-table :header-cell-style="getHeaderClass()" :data="data" style="width: 100%;border-top:1px solid rgba(3, 54, 102, 0.06);">
      <el-table-column prop="pool" :label="I18n.apyIndex.pools">
        <template #default="scope">
          <Apy2PoolDialog type="mining" :id="scope.row.id">
            <template #reference>
              <Apy2MiningTablePool class="hand" :isNew="scope.row.new"   :id="scope.row.id" :followed="scope.row.followed" :type="scope.row.symbol_type" :logo="scope.row.symbol_logo" :name="scope.row.symbol" :like="scope.row.followed"  :des="scope.row.strategy" />
            </template>
          </Apy2PoolDialog>
        </template>
      </el-table-column>
      <el-table-column prop="tvlNumber" :label="`TVL/${I18n.apyIndex.hasMoney}`">
        <template #default="scope">
          <Apy2PoolDialog type="mining" class="hand" :id="scope.row.id">
            <template #reference>
              <Apy2MiningTableTvlNumber :name="scope.row.symbol" :tvl="scope.row.tvl" :remainTvl="scope.row.quota_remain" :tvlRate="scope.row.quota_remain_percent"/>
            </template>
          </Apy2PoolDialog>
        </template>
      </el-table-column>
      <el-table-column prop="apyGroup" :label="I18n.apyIndex.apyGroup" >
        <template #default="scope">
          <Apy2PoolDialog type="mining" class="hand" :id="scope.row.id">
            <template #reference>
              <Apy2MiningTableApyGroup :value0="scope.row.single_apy_detail" :value1="scope.row.compound_detail"/>
            </template>
          </Apy2PoolDialog>
        </template>
      </el-table-column>
      <el-table-column prop="apy" label="APY" width="140px"   sortable>
        <template #default="scope">
          <Apy2PoolDialog type="mining" class="hand" :id="scope.row.id">
            <template #reference>
              <Apy2MiningTableLever  :apy="scope.row.apy" :des="scope.row.lever"/>
            </template>
          </Apy2PoolDialog>
        </template>
      </el-table-column>
      <el-table-column prop="tool" :label="I18n.apyIndex.operate" width="75px">
        <template #default="scope">
          <Apy2MiningTableTool :id="scope.row.id" :tokenName="scope.row.symbol_alias" :project_url="scope.row.project_url"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
<!--  small-->
  <div class="mdhidden">
    <el-table :header-cell-style="getHeaderClass()" :data="data" style="width: 100%;border-top:1px solid rgba(3, 54, 102, 0.06);">
      <el-table-column prop="pool" fixed width="170px" :label="I18n.apyIndex.pools">
        <template #default="scope">
          <Apy2PoolDialog type="mining" :id="scope.row.id">
            <template #reference>
              <Apy2MiningTablePool class="hand" width="200px" :isNew="scope.row.new"   :id="scope.row.id" :followed="scope.row.followed" :type="scope.row.symbol_type" :logo="scope.row.symbol_logo" :name="scope.row.symbol" :like="scope.row.followed"  :des="scope.row.strategy" />
            </template>
          </Apy2PoolDialog>
        </template>
      </el-table-column>
      <el-table-column prop="tvlNumber" width="200px" :label="`TVL/${I18n.apyIndex.hasMoney}`">
        <template #default="scope">
          <Apy2PoolDialog type="mining" class="hand" :id="scope.row.id">
            <template #reference>
              <Apy2MiningTableTvlNumber :name="scope.row.symbol" :tvl="scope.row.tvl" :remainTvl="scope.row.quota_remain" :tvlRate="scope.row.quota_remain_percent"/>
            </template>
          </Apy2PoolDialog>
        </template>
      </el-table-column>
      <el-table-column prop="apyGroup" width="200px" :label="I18n.apyIndex.apyGroup" >
        <template #default="scope">
          <Apy2PoolDialog type="mining" class="hand" :id="scope.row.id">
            <template #reference>
              <Apy2MiningTableApyGroup :value0="scope.row.single_apy_detail" :value1="scope.row.compound_detail"/>
            </template>
          </Apy2PoolDialog>
        </template>
      </el-table-column>
      <el-table-column prop="apy" label="APY" width="140px"   sortable>
        <template #default="scope">
          <Apy2PoolDialog type="mining" class="hand" :id="scope.row.id">
            <template #reference>
              <Apy2MiningTableLever  :apy="scope.row.apy" :des="scope.row.lever"/>
            </template>
          </Apy2PoolDialog>
        </template>
      </el-table-column>
      <el-table-column prop="tool" :label="I18n.apyIndex.operate" width="75px">
        <template #default="scope">
          <Apy2MiningTableTool :id="scope.row.id" :tokenName="scope.row.symbol_alias" :project_url="scope.row.project_url"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style scoped lang="scss">

</style>
