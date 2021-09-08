<script setup lang="ts">
import {ref,onMounted} from 'vue'
import I18n from '~/utils/i18n/index'
import {webTipData} from '~/logic/webTip'
import {isShow} from '~/store/webTip/state'
import { useProvide } from '~/utils/use/state'
import {  setInject, getInject } from '~/utils/use/state'
const setTitle=setInject('title')
const coinType=getInject('coinType')
import * as lang from '~/utils/lang'

const selectNameIndex=ref(0)
const stateValue=ref(false)
const [selectData, ] = useProvide('data',webTipData.newData[0])
onMounted(()=>stateValue.value=isShow(lang.current.value))
</script>

<template>
  <div class="text-kdFang  relative">
    <ElDialog :width="820" v-model="stateValue" custom-class="pcTips" :append-to-body="false">
      <div class="h-fit">
          <div  class="h-full flex ">
            <UiDialogWebNewTipLeft class="borLeft " />
            <UiDialogWebNewTipRight  class="borLeft pb-10  min-h-150" />
          </div>
      </div>
      <img @click="stateValue=false" class="w-6 absolute top-4 right-4 cursor-pointer" src="https://res.ikingdata.com/liquidity/closeWebTip.png" alt="">
    </ElDialog>
  </div>
</template>

<style  scoped>
.borLeft{
  border-top-left-radius: 6px !important;
  border-bottom-left-radius: 6px !important;
}
.webTip{
  background: red;
  backdrop-filter: blur(80px);
}
::v-deep(.el-dialog .el-dialog__body){
  padding: 0px !important;
}
::v-deep(.el-dialog){
  border-radius: 6px !important;
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

