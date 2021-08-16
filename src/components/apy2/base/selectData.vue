<script setup lang="ts">
import { defineProps,watch} from 'vue'
import  {setInject, getInject} from '~/utils/use/state'
const props=defineProps({
  placeStr:String
})
const selectTxt=getInject('selectTxt')
const setTxt=setInject('selectTxt')
watch(()=>selectTxt.value[0],(n)=>setTxt(n))
</script>
<template>
  <div class="apy2BaseSelectData px-4 py-2  rounded-kd6px  flex items-center h-9" >
    <IconFont type="icon-sousuo-da1" class="mr-0 text-global-highTitle text-opacity-45" size="12"></IconFont>
    <el-input v-model="selectTxt[0]"  :placeholder="placeStr"></el-input>
  </div>
</template>
<style lang="scss">
.apy2BaseSelectData{
  border: 1px solid rgba(3, 54, 102, 0.06);
  .el-input__inner{
    border: none !important;
    background: none;
    width:180px !important;
    margin-left:5px;
    padding-left:0px !important;
    padding-right: 0px;
    text-align: left !important;
    @apply text-kd14px18px text-global-highTitle text-opacity-45  ;
  }
  input::-webkit-input-placeholder{
    @apply text-global-highTitle font-medium text-opacity-45 text-left;
  }
  input::-webkit-input-placeholder {
    @apply text-global-highTitle font-medium text-opacity-45;
  }

}
</style>



