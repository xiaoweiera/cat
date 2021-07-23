<script setup lang="ts">
import { defineProps,ref,onMounted} from 'vue'
import I18n from '~/utils/i18n/index'
import {newData} from '~/logic/webTip'
import {isShow} from '~/store/webTip/state'
const state=()=>{
  return true
}
const selectNameIndex=ref(0)
const stateValue=ref(false)
onMounted(()=>stateValue.value=isShow())
</script>

<template>
  <div class="text-kdFang  relative">
    <ElDialog :width="820" v-model="stateValue" custom-class="pcTips" :append-to-body="false">
      <div class="h-140 border-1">
        <template v-for="(item,i) in newData">
          <div v-if="i===selectNameIndex" class="h-full flex">
            <UiDialogWebNewTipLeft />
            <UiDialogWebNewTipRight  :data="item"/>
          </div>
        </template>
      </div>
      <img @click="stateValue=false" class="w-6 absolute top-4 right-4 cursor-pointer" src="https://res.ikingdata.com/liquidity/closeWebTip.png" alt="">
    </ElDialog>
  </div>
</template>

<style  scoped>

.webTip{
  background: red;
  backdrop-filter: blur(80px);
}
::v-deep(.el-dialog .el-dialog__body){
  padding: 0px !important;
}
::v-deep(.el-dialog__header){
  display: none;
}
.pcTips{
  position: absolute;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.04);
  border-radius: 6px;
  left:0;
  right:0;
  filter: drop-shadow(0px 4px 24px rgba(0, 0, 0, 0.1));
}
</style>

