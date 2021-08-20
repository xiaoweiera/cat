<script setup lang="ts">
import { ref, defineProps,onMounted } from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import {useProvide,  setInject, getInject } from '~/utils/use/state'
import {chainsIcon} from '~/logic/apy2/config'
import {tolocaleUpperCase,formatRulesNumber} from '~/lib/tool'
import {getProjectList} from '~/logic/apy2/index'
const props=defineProps({
  data:Object
})
const orderIndex=ref(0)
const orderList={
  0:'icon-shuangxiangjiantou',
  1:'icon-shuangxiangjiantou-down',
  2:'icon-shuangxiangjiantou-up'
}
const orderData=()=>{
  if(orderIndex.value===2){
    orderIndex.value=0
    return
  }
  orderIndex.value++
}
</script>
<template>
  <div>
    <div class="flex my-3 text-kd12px16px font-kdFang text-global-highTitle text-opacity-65 justify-between showY">
      <div>项目名称</div>
      <div @click="orderData()" class="hand">
        <span>TVL</span>
        <IconFont size="13" class="ml-0.5" :type="orderList[orderIndex]"/>
      </div>
    </div>
    <div class=" pb-10 showY" v-if="data.length > 0">
      <template v-for="item in data" >
        <div class="cursor-pointer h-9 mb-0.2  ">
          <router-link class="flex items-center  relative " :to="`?id=${item.id}`">
            <div>
              <IconFont v-if="item.is_new" type="icon-NEW" size="24" class="absolute z-1 "/>
              <IconFont :type="item.logo || 'icon-morentoken'" size="24" class="relative left-1.2  top-1.2"/>
            </div>
            <div class="ml-3 mt-1.3 flex items-center  justify-between flex-1">
              <div class="flex items-center">
                <div class="text-kd14px18px  text-global-highTitle font-kdExp mr-1.5">{{item.name}}</div>
                <div class="flex items-center">
                  <template v-for="chain in item.chains">
                    <img class="w-3.5 h-3.5 mr-1.5" :src="chainsIcon[chain]" alt="">
                  </template>
                  <template v-for="type in item.category">
                    <IconFont class="mr-1.5" :type="`icon-${tolocaleUpperCase(R.slice(0,1,type))}`" size="14"/>
                  </template>
                </div>
              </div>
              <div class="text-14px18px text-global-highTitle text-opacity-85 font-kdExp">${{formatRulesNumber(item.tvl,false)}}</div>
            </div>

          </router-link>
        </div>
      </template>
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



