<script setup lang="ts">
import {watch, ref, onMounted,defineProps,computed} from 'vue'
import hmt from '~/lib/hmt'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import { colors } from '~/logic/apy2/config'
import {chainsIcon} from '~/logic/apy2/config'
import {formatRulesNumber, getIconType,tolocaleLowerCase} from '~/lib/tool'
const props=defineProps({item:Object,i:Number,pageType:String})
const type=computed((name:string)=>getIconType(name))
</script>
<template>
    <div class=" flex items-center">
      <div  class=" text-kd18px18px text-global-highTitle text-opacity-65 font-kdExp font-bold">{{ i + 1 }}</div>
    </div>
    <div  class="flex flex-col w-full ml-3 ">
      <div class="flex justify-between">
        <div class="flex items-center relative">
          <IconFont  :style="`color:${colors[i]}`"  size="16"  type="icon-Broken_line"></IconFont>
          <span class="ml-1 text-kd14px20px font-kdExp text-global-highTitle">{{ item.symbol }}</span>
        </div>
        <div class="flex items-center">
          <span :class="item.apy>=0?'text-global-numGreen':'text-global-numRed'" class="mr-1  font-bold md:text-kd16px16px  text-kd16px16px font-kdExp">{{ formatRulesNumber(item.apy) }}%</span>
          <div class="flex items-center font-kdFang" @click.stop>
            <a @click="hmt.event('TOP5点击去挖矿',`${pageType}_top5_deposit`)" v-if="props.pageType==='mining'" v-router.blank="item.project_url" class="text-global-primary text-kd12px14px">{{I18n.apyIndex.goMining}}</a>
            <a @click="hmt.event('TOP5点击去借贷',`${pageType}_top5_borrow`)" v-else v-router.blank="item.project_url" class="text-global-primary text-kd12px14px">{{I18n.apyIndex.goLending}}</a>
            <span class="text-global-primary text-kd12px14px ml-1">></span>
          </div>
        </div>
      </div>
      <div class="mt-0 flex items-center flex-wrap justify-between  ">
        <div class="flex items-center">
          <span class="text-kd12px18px font-kdExp text-global-highTitle text-opacity-65">{{ item.project }}</span>
          <IconFont class=" ml-1  flex items-center" size="14"  :type="chainsIcon[tolocaleLowerCase(item.chain)]"/>
          <IconFont class="text-global-highTitle text-opacity-25 ml-1" size="14" :type="getIconType(item?.project_category)"></IconFont>
          <span class="ml-1 px-1 text-kd12px14px text-global-highTitle bg-global-highTitle bg-opacity-6 rounded-kd4px  text-opacity-45 font-kdExp">{{ item.strategy_tags }}</span>
        </div>
        <div v-if="item.tvl" class="h-4.5 flex items-center">
          <span class="text-kd12px18px text-global-highTitle text-opacity-45 font-normal font-kdFang">TVL</span>
          <span class="ml-1 text-kd12px18px text-global-highTitle text-opacity-85 font-kdExp ">${{ formatRulesNumber(item.tvl) }}</span>
        </div>
      </div>
    </div>
</template>
<style scoped lang="scss">
.topBorder {
  border-top: 1px solid rgba(3, 54, 102, 0.06);
}

.tag {
  @apply mr-2  text-kd14px18px text-global-highTitle font-medium  text-opacity-65;
}

.selectedTag {
  border-radius: 6px;
  @apply mr-2 text-kd14px18px text-global-primary font-medium bg-global-primary bg-opacity-8;
}

.btnCount {
  border: 1px solid rgba(43, 141, 254, 0.32);
  border-radius: 4px;
}
</style>
