<script setup lang="ts">
import { defineProps} from 'vue'
import I18n from '~/utils/i18n/index'
const props=defineProps({
  pcTip:Object
})

const close=()=>{
  props.pcTip.value=false
}
</script>

<template>
  <div class="text-kdFang">
    <ElDialog
        v-model="props.pcTip.value"
        custom-class="pcTip"
        :append-to-body="true">
      <div class="mt-6 w-full text-center flex justify-center  items-center flex-col text-kd16px24px font-kdFang text-global-default text-opacity-85">
        <img class="w-30  " src="https://res.ikingdata.com/nav/pcTip.jpg" alt="">
        <div style="word-break: break-word;" class="mt-6">{{I18n.liquidity.mobile.pcDes1}}</div>
        <div style="word-break: break-word;">{{I18n.liquidity.mobile.pcDes2}}</div>
      </div>
      <div @click="close()" style="border-radius: 4px;" class="h-10 flex items-center justify-center   mt-6 bg-global-primary text-center  text-global-white text-kd16px24px"><span>确定</span></div>
    </ElDialog>
  </div>
</template>

<style  >
.pcTip{
  position: absolute;
  width:300px !important;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  left:0;
  right:0;
  top: 25%; /*偏移*/
  margin:0 auto !important;
}
.help-box {
  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
}
</style>

