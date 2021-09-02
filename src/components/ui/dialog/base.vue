<script setup lang="ts">
import {ref,defineProps} from 'vue'
const props=defineProps({data:Object,customClass:String})
const oepnDialog=ref(false)
const open=()=>{
  oepnDialog.value=true
}
</script>
<template>
<div class="openDialog" >
  <div @click="open">
    <slot  name="title"></slot>
  </div>
  <el-dialog custom-class="dialogClass" v-model="oepnDialog" :width="customClass">
    <div >
      <IconFont @click="oepnDialog=false" size="20" class="text-global-highTitle absolute right-4 top-4.5 hand text-opacity-65" type="icon-xClose"/>
      <slot name="content"></slot>
    </div>

  </el-dialog>
</div>
</template>
<style lang="scss">
.openDialog{
  .el-dialog__header{
    display: none;
  }
  .el-dialog .el-dialog__body {
    padding: 0px 40px 0px 0px !important;
  }
}
</style>