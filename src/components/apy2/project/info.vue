<script setup lang="ts">
import {ref, defineProps} from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import {useProvide, setInject, getInject} from '~/utils/use/state'
import {chainsIcon} from '~/logic/apy2/config'
import {tolocaleUpperCase} from '~/lib/tool'
</script>
<template>
  <div class="font-kdFang">
    <div>
      <div class="flex items-center relative">
        <div class="relative">
          <IconFont class="absolute" size="30" type="icon-NEW"/>
          <img class="w-15 h-15" src="https://res.ikingdata.com/apyTwo/testLogo.png" alt="">
        </div>
        <div class="ml-3">
          <div class="flex items-center">
            <div class="text-kd28px28px font-kdExp font-bold text-global-highTitle text-opacity-85">Coinwind</div>
            <template v-for="tip in ['借贷','机枪池','Swap']">
              <span class="ml-2 bg-global-highTitle bg-opacity-6 rounded-kd4px px-1 py-0.5 text-global-highTitle text-kd12px14px text-opacity-45">{{ tip }}</span>
            </template>
          </div>
          <div class="flex items-center mt-2 font-kdExp">
            <img class="w-5 h-5 mr-1" src="https://res.ikingdata.com/apyTwo/testLogo.png" alt="">
            <span class="mr-1 text-global-highTitle text-kd14px18px">COW</span>
            <span class="mr-1 text-global-highTitle text-kd14px18px">$21312.2</span>
            <span class="bg-global-numRed  bg-opacity-20 rounded-kd4px px-1 py-0.5 text-kd12px14px text-global-numRed">-3.23%</span>
            <IconFont class="text-global-highTitle text-opacity-10 px-2" type="icon-gang"/>
            <a class="text-global-primary flex items-center font-kdExp">
              <IconFont class="mr-1" size="20" type="icon-info2"/>
              <span class="text-kd14px18px">访问官网</span>
            </a>
            <IconFont class="text-global-highTitle text-opacity-10 px-2" type="icon-gang"/>
            <div class="text-global-primary flex items-center">
              <IconFont class="mr-2" size="20" type="icon-info2"/>
            </div>
            <template v-for="item in ['北京链安','雾漫科技']">
              <a class="text-global-primary mr-2 hand flex items-center font-kdFang text-kd14px18px" style="border-bottom:1px solid #2B8DFE;">{{ item }}</a>
            </template>
          </div>
        </div>
        <span class="text-global-white bg-global-primary px-3 py-2  flex items-center absolute right-0 rounded-kd4px">
      <IconFont type="icon-jiaocheng" size="16"/>
      <span class="ml-1 text-kd14px18px font-medium">项目教程</span>
    </span>
      </div>
      <!--  数字-->
      <div class="tbBorder py-4 mt-4">
        <div class="min-h-12 flex font-kdFang ">
          <div class="flex-1 rightBorder">
            <div class="titleTxt mr-6">项目总 TVL (多链)</div>
            <div class="font-kdExp font-bold text-kd26px26px text-global-highTitle text-opacity-85 mt-1">$23914.12</div>
          </div>
          <div class="flex-1 rightBorder ml-6 ">
            <div class="titleTxt">用户总收益 (多链)</div>
            <div class="font-kdExp font-bold text-kd26px26px text-global-highTitle text-opacity-85 mt-1">$23914.12</div>
          </div>
          <div class="flex-1 rightBorder ml-6 ">
            <div class="titleTxt">支持公链</div>
            <div class="font-kdExp font-bold text-kd26px26px text-global-highTitle text-opacity-85 mt-1">
              <span>3</span>
              <span class="text-kd12px18px font-medium font-kdFang text-global-highTitle ml-0.8 ">条 (
        <template v-for="(item,i) in ['HECO','BSC','ETH']">
        <span>{{ item }}</span>
          <span v-if="i<2">、</span>
        </template>
        )
      </span>
            </div>
          </div>
          <div class="flex-1  ml-6 ">
            <div class="titleTxt">池子个数</div>
            <div class="font-kdExp font-bold text-kd26px26px text-global-highTitle text-opacity-85 mt-1">
              <span>3</span>
              <span class="mr-3 text-kd12px18px font-medium font-kdFang text-global-highTitle ml-0.8 ">单币</span>
              <span>4</span>
              <span class="text-kd12px18px font-medium font-kdFang text-global-highTitle ml-0.8 ">LP</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 项目描述-->
      <div class="font-kdFang text-kd14px18px py-4 bottomBorder">
        <div class="text-global-highTitle text-opacity-65">项目描述</div>
        <div class="text-global-highTitle mt-1">近日，美国史密斯菲尔德、泰森等多家肉类加工厂因新冠病毒接连关闭，食品供应链面临断裂。史密斯菲尔德CEO在宣布工厂停工时曾警告说，美国的肉类供应将受到“严重甚至是灾难性的影响”。</div>
      </div>
      <!-- 公告-->
      <template v-for="item in [1,2]">
        <div class="flex items-center mt-4 ">
          <span class="flex items-center bg-global-primary bg-opacity-10 rounded-kd4px px-1 py-0.5">
            <IconFont type="icon-laba" class="text-global-primary" size="16" ></IconFont>
            <span class="ml-1 text-kd12px16px text-global-primary">公告</span>
          </span>
          <span class="ml-1.5 text-kd13px18px text-global-highTitle text-opacity-85">丈夫发烧住院，浙江妈妈带3个孩子回国后确诊密切接触者达60人</span>
        </div>
      </template>
      <Apy2BaseWarnTip class="mt-4" des="风险提示：本站数据来源于各平台的公开数据，本站井未对收录内容做安全审计，内容不构成投资建议，请注意风险。" />

    </div>

  </div>
</template>
<style scoped lang="scss">
.tbBorder {
  border-top: 1px solid rgba(3, 54, 102, 0.06);
  border-bottom: 1px solid rgba(3, 54, 102, 0.06);
}
.bottomBorder {
  border-bottom: 1px solid rgba(3, 54, 102, 0.06);
}
.rightBorder {
  border-right: 1px solid rgba(3, 54, 102, 0.06);
}

.titleTxt {
  @apply text-kd14px18px text-global-highTitle  text-opacity-65;
}
</style>



