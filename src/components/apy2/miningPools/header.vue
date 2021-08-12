<script setup lang="ts">
import { ref, defineProps } from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
const tagList=['关注矿池','热门矿池','最新矿池']
const typeList=['全部','单币','LP']
const project=ref('all')
const vLisit=ref([
  {name:'全部项目',key:'all'},
  {name:'项目1',key:'1'},
  {name:'项目2',key:'2'},
  {name:'项目3',key:'3'},
  {name:'项目4',key:'4'},
])
const searchTxt=ref('')
</script>
<template>
  <div class="flex items-center font-kdFang flex-wrap justify-between">
    <Apy2MiningPoolsSelectTag  :list="tagList"   class="mr-10"/>
    <div class="flex">
      <Apy2MiningPoolsFliter class="mr-3"  :list="typeList" />
      <div class="apyProject mr-3">
        <el-select filterable :popper-append-to-body="false" v-model="project"   size="small" >
          <el-option v-for="item in vLisit" :key="item.key" :label="item.name" :value="item.key">
          </el-option>
        </el-select>
      </div>
      <div class="apySearch mr-3 px-4 py-2 rounded-kd6px  flex items-center h-9" >
        <IconFont type="icon-sousuo-da1" class="mr-2 text-global-highTitle text-opacity-45" size="12"></IconFont>
        <el-input v-model="searchTxt" placeholder="搜索币种/项目"></el-input>
      </div>
    </div>

  </div>
</template>
<style  lang="scss">
.apyProject{
  @apply  bg-global-white;
  .el-input__inner{
    border: 1px solid rgba(3, 54, 102, 0.06) !important;
    background: none;
    padding-left:4px !important;
    @apply text-kd14px18px font-medium  text-global-highTitle text-opacity-85 w-30 text-center h-9 flex items-center  text-kd14px18px ;
  }
  .el-icon-arrow-up{
    @apply mt-0.5;
  }
}
.apySearch{
  border: 1px solid rgba(3, 54, 102, 0.06);
  .el-input__inner{
    border: none;
    background: none;
    padding-left:0px !important;
    @apply text-kd14px18px text-global-highTitle text-opacity-45;
  }
}
</style>
