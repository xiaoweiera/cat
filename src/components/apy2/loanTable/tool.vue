<script setup lang="ts">
import I18n from '~/utils/i18n/index'
import hmt from '~/lib/hmt'
import { defineProps } from 'vue'
const props=defineProps({
  data:Object,
  page:String,
  type:String
})
const lookChart=`/apy/token?symbol=${props?.data?.symbol_alias}`
const baidu=()=>{
  let name=''
  if(props.type==='lend'){
    name='借贷最佳路径点击去借贷'
  }else if(props.type==='project_borrow_all'){
    name='借贷池子全部池子点击去借贷'
  }
  hmt.event(name,`${props.page}_borrow`)
}
</script>
<template>
  <div class="text-kd12px16px  text-global-primary  text-right font-medium font-kdFang">
    <a @click='baidu()'  v-router.blank="data.project_url"  class="hand block">{{I18n.apyIndex.lendFarm}}</a>
<!--    <a v-router.blank="lookChart"   class="mt-1 hand block">{{I18n.apyIndex.viewChart}}</a>-->
  </div>
</template>
<style scoped lang="scss">
</style>