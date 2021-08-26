<script setup lang="ts">
import {ref,defineProps} from 'vue'
const props=defineProps({data:Object})
const oepnDialog=ref(false)
const open=()=>{
  oepnDialog.value=true
}
</script>
<template>
<div class="openDialog">
  <div @click="open">

  <slot  name="content"></slot>
  </div>
  <el-dialog
      custom-class="dialogClass"
      v-model="oepnDialog"
      width="480px">
    <IconFont @click="oepnDialog=false" size="20" class="text-global-highTitle absolute right-4 top-4.5 hand text-opacity-65" type="icon-xClose"/>
    <Apy2Calculator/>
  </el-dialog>
</div>
</template>
<style lang="scss">
.openDialog{
  .el-dialog__header{
    display: none;
  }
  .el-dialog__body{
    padding:0px !important;
    padding-left:0px;
  }
}
</style>