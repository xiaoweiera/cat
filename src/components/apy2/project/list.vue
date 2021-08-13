<script setup lang="ts">
import { ref, defineProps } from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import {useProvide,  setInject, getInject } from '~/utils/use/state'
import {chainsIcon} from '~/logic/apy2/config'
import {tolocaleUpperCase} from '~/lib/tool'
const list=[
  {name:'Wjfisj',href:'https://ww.baidu.com',chains:['heco'],projectType:['v','f']},
  {name:'Wdfisj',href:'https://ww.baidu.com',chains:['heco'],projectType:['v','f']},
  {name:'Wjfj',href:'https://ww.baidu.com',chains:['eth'],projectType:['v']},
  {name:'Wqqdj',href:'https://ww.baidu.com',chains:['hoo'],projectType:['v','f']},
]
const orderIcon='icon-shuangxiangjiantou'
// icon-shuangxiangjiantou-up
//icon-shuangxiangjiantou-down
</script>
<template>
  <div>
    <div class="flex my-3 text-kd12px16px font-kdFang text-global-highTitle text-opacity-65 justify-between">
      <div>项目名称</div>
      <div>
        <span>TVL</span>
        <IconFont size="13" class="ml-0.5" :type="orderIcon"/>
      </div>
    </div>
    <div class=" pb-10" v-if="list.length > 0">
      <template v-for="(item, index) in list" >
        <div class="cursor-pointer h-9 mb-0.2 items-cneter">
          <router-link class="flex items-center  relative " :to="item.href">
            <div>
              <IconFont type="icon-NEW" size="24" class="absolute z-1 "/>
              <IconFont type="icon-duoxuan-weixuanzhong" size="24" class="relative left-1.2  top-1.2"/>
            </div>
            <div class="ml-3 mt-1.3 flex items-center  justify-between flex-1">
              <div class="flex items-center">
                <div class="text-kd14px18px  text-global-highTitle font-kdExp mr-1.5">{{item.name}}</div>
                <div class="flex items-center">
                  <template v-for="chain in item.chains">
                    <img class="w-3.5 h-3.5 mr-1.5" :src="chainsIcon[chain]" alt="">
                  </template>
                  <template v-for="type in item.projectType">
                    <IconFont class="mr-1.5" :type="`icon-${tolocaleUpperCase(type)}`" size="14"/>
                  </template>
                </div>
              </div>
              <div class="text-14px18px text-global-highTitle text-opacity-85 font-kdExp">$4335</div>
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



