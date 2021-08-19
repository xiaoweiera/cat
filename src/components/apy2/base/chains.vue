<script setup lang="ts">
import {ref, defineProps,watch,onMounted} from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import {useProvide, setInject, getInject} from '~/utils/use/state'
import {chainsIcon} from '~/logic/apy2/config'
const chain=getInject('chain')
const setChain=setInject('chain')
const chains=[
  {name:'全部公链',key:'all'},
  {name:'ETH',key:'eth'},
  {name:'BSC',key:'bsc'},
  {name:'Heco',key:'heco'},
  {name:'OEC',key:'oec'},
  {name:'Hoo',key:'hoo'},
  {name:'PoS',key:'pos'}
]
watch(()=>chain.value[0],(n)=>setChain(n))


</script>
<template>
  <el-select :popper-append-to-body="false" v-model="chain[0]" size="small">
    <el-option v-for="item in chains" :key="item.key" :label="item.name" :value="item.key">
    </el-option>
  </el-select>
</template>
<style lang="scss">
.projectChart {
  .el-input__inner {
    border: 1px solid rgba(3, 54, 102, 0.06) !important;
    background: none;
    width: 120px !important;
    height: 34px !important;
    padding-left: 4px !important;
    @apply text-kd14px18px font-medium  text-global-highTitle text-opacity-85 w-30 text-center h-9 flex items-center  text-kd14px18px ;
  }

  .el-icon-arrow-up {
    @apply mt-0.5;
  }
}
</style>



