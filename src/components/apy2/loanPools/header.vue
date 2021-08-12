<script setup lang="ts">
import { ref, defineProps } from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import {useProvide,  setInject, getInject } from '~/utils/use/state'
const [tag,]=useProvide('tag')
const [filterType,]=useProvide('filterType')

const coin=ref('')
const vLisit=[1,2,3,4]
</script>
<template>
  <div class="loanClass w-full p-4  h-32 flex items-center  bg-global-body rounded-kd4px justify-between ">
    <div>
      <div class="flex">
        <div class="mr-6">
          <span class="selectTxt">抵押币种</span>
          <el-select filterable :popper-append-to-body="false"   size="small" v-model="coin" >
            <el-option v-for="item in vLisit" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </div>
        <div>
          <span class="selectTxt">抵押币种</span>
          <el-select filterable :popper-append-to-body="false"   size="small" v-model="coin" >
            <el-option v-for="item in vLisit" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </div>
      </div>


      <div class="flex mt-3 ml-">
        <div class="mr-6">
          <span class="selectTxt">抵押币种</span>
          <el-select filterable :popper-append-to-body="false"   size="small" v-model="coin" >
            <el-option v-for="item in vLisit" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </div>
        <div>
          <span class="selectTxt">抵押币种</span>
          <el-select filterable :popper-append-to-body="false"   size="small" v-model="coin" >
            <el-option v-for="item in vLisit" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </div>
      </div>

    </div>
    <div class="font-kdFang">
      <div class="btnBorder w-40 text-center rounded-kd6px py-2.25 px-3 mb-4 hand">
        <span class="text-kd16px24px text-global-primary  font-medium">重置</span>
      </div>
      <div class="bg-global-primary  w-40 text-center rounded-kd6px py-2.25 px-3 hand">
        <iconFont type="icon-sousuo-da1" class="text-global-white mr-3" size="16" />
        <span class="text-kd16px24px text-global-white  font-medium">搜索</span>
      </div>
    </div>
  </div>
</template>
<style  lang="scss">

.loanClass{
  .el-input__inner{
    border: 1px solid rgba(3, 54, 102, 0.06)!important;
    background: none;
    border-radius: 6px;
    padding-left:12px !important;
    @apply text-global-highTitle text-opacity-45 h-10.5 w-75 bg-global-white  text-kd14px18px ;
  }
  .btnBorder{
    border:1px solid rgba(43, 141, 254, 0.25);
  }
  .selectTxt{
  @apply mr-3 text-kd14px18px text-global-highTitle text-opacity-85;
  }
  .el-input__suffix{
    @apply flex items-center;
  }
}

</style>
