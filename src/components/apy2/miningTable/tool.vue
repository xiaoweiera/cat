<script setup lang="ts">
import { defineProps,reactive } from 'vue'
import I18n from '~/utils/i18n/index'
import hmt from '~/lib/hmt'
//@ts-ignore
const props=defineProps({ project_url:String, tokenName:String, id:Number | String ,page:String})
const pcTip=reactive({value:false})
const lookChart=`/apy/token?symbol=${props.tokenName}`
const baidu=()=>{
  let name=''
  let key=''
  if(props.page==='mining'){
    name='底部榜单点击去挖矿'
  }else if(props.page==='project_farm_all'){
    name='挖矿池子全部池子点击去挖矿'
  }else if(props.page==='token_farm_all'){
    name='挖矿池子全部池子点击去挖矿'
  }
  hmt.event(name,`${props.page}_deposit`)
}
</script>
<template>
  <div class="text-kd12px16px  text-global-primary  text-right font-medium font-kdFang">
    <a  @click="baidu()"  v-router.blank="project_url"  class="hand block">{{I18n.apyIndex.miningFarm}}</a>
    <Apy2PoolDialog class="xshidden" type="mining"  :id="id" >
      <template #reference>
        <div    class="mt-1 hand block">{{I18n.apyIndex.viewChart}}</div>
      </template>
    </Apy2PoolDialog>
    <div    class="mt-1 hand block mdhidden"  @click="pcTip.value=true">{{I18n.apyIndex.viewChart}}</div>
  </div>
  <UiDialogPcTip   :pcTip="pcTip"/>
</template>
<style scoped lang="scss">
</style>