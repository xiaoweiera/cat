<script setup lang="ts">
import { ref, defineProps,onMounted } from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import {useProvide,  setInject, getInject } from '~/utils/use/state'
import {chainsIcon} from '~/logic/apy2/config'
import {formatRulesNumber,tolocaleLowerCase} from '~/lib/tool'
import {getProjectList} from '~/logic/apy2/index'
const props=defineProps({
  data:Object,
  projectId:Number
})
const orderIndex=ref(0)
</script>
<template>
  <div>
    <div class="flex my-3 px-1.5 text-kd12px16px font-kdFang text-global-highTitle text-opacity-65 justify-between showY">
      <div>{{I18n.apyIndex.project}}</div>
      <div class="hand">
        <span>TVL</span>
      </div>
    </div>
    <div class=" pb-10 showY " v-if="data.length > 0">
      <template v-for="item in data" >
        <div :class="item.id==projectId?'itemSelected':''" class="cursor-pointer h-9  item   " >
          <router-link class="flex items-center  relative px-1.5  h-full" :to="`?id=${item.id}`">
            <div>
              <IconFont v-if="item.is_new" type="icon-NEW" size="20" class="absolute z-1 "/>
              <IconFont style="border-radius: 50%;" :type="item.logo || 'icon-morentoken'" size="20" class="relative left-1.2  "/>
            </div>
            <div class="ml-3  flex items-center  justify-between flex-1 ">
              <div class="flex items-center flex-wrap">
                <div class="text-kd13px18px  text-global-highTitle font-kdExp mr-1.5">{{item.name}}</div>
                <div class="flex items-center  relative m-1.4">
                  <template v-for="(chain,i) in item.chains">
                    <div :class="`-z-${i}`" class=" flex items-center justify-center relative -ml-2.5  "  style="border-radius: 50%;background:#F0F3F6;width:20px;height:20px;">
                      <div class="w-full h-full flex items-center justify-center relative items-center" style="border-radius: 50%;background:white;width:18px;height:18px;">
                        <img :src="chainsIcon[tolocaleLowerCase(chain)]" class="   " style="border-radius:1px;background:white;width:12px;height:12px;" alt="">
                      </div>
                    </div>
<!--                    <IconFont class=" mr-1.5 bg-global-white" size="14"  :type="chainsIcon[chain]"/>-->
                  </template>
                </div>
              </div>
              <div class="text-kd13px18px text-global-highTitle text-opacity-85 font-kdExp">${{formatRulesNumber(item.tvl,false)}}</div>
            </div>
          </router-link>
        </div>
      </template>
    </div>
  </div>

</template>
<style scoped  lang="scss">
.item:hover{
  @apply bg-global-highTitle bg-opacity-6 rounded-kd4px;
}
.itemSelected{
  @apply bg-global-highTitle bg-opacity-6 rounded-kd4px;
}
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



