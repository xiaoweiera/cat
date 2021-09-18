<script setup lang="ts">
import {defineProps,computed} from 'vue'
import {formatRulesNumber,getNumberColor} from '~/lib/tool'
const props=defineProps({
  headerData:Object,
  item:Object,
  i:Number,
  sortName:String,
  is_Compare:Boolean,
  zIndex:Number
})
//@ts-ignore wei
const bgWidth=computed(()=> props.is_Compare?(props.item[props.sortName]/props.item.max_stat[props.sortName])*100+'%':'')
</script>
<template>
  <a  v-if='headerData' v-router.blank='item.website'   class=" item relative   hand relative   px-3 py-1.5 bg-global-white mt-1.5 flex items-center rounded-kd6px" :style="`--wv:${bgWidth}; z-index:${zIndex+100}`">
    <div class='relative z-2  flex items-center w-full  '>
      <!--      排名-->
      <div :class='headerData[0].width' class="exp  text-kd14px20px txt85 md:order-0  whitespace-nowrap   text-center">{{i+1}}</div>
      <!--     名称-->
      <div :class='headerData[1].width' class="flex  w-full items-center justify-left  ml-3 md:order-1    truncate  md:ml-6 ">
        <IconFont :type="item.logo" size="24"/>
        <div class="text-kd14px18px text-global-highTitle ml-1.5 fang w-fit i8n-font-inter  truncate">{{item.name}}</div>
      </div>
      <!--      类别-->
      <div :class='headerData[2].width' class="flex items-center   whitespace-nowrap ml-3 md:ml-6 order-8 md:order-2  justify-center">
        <template v-for='(typeName,i) in item.categories'>
          <span :class='i===item.categories.length-1?"":"mr-1"' class="text-kd14px18px  text-global-highTitle fang i8n-font-inter">{{typeName}}</span>
        </template>

      </div>
      <!--      公链-->
      <div :class='headerData[3].width' class="flex  items-center ml-3  md:ml-6 order-9 md:order-3 justify-center">
        <template v-for="(t,i) in item.chains">
          <IconFont :class='i===item.chains.length-1?"":"mr-1"' :type="t.logo" size="16"/>
        </template>
      </div>
      <!--      用户/变化率-->
      <div :class='headerData[4].width' class="flex flex-col  md:text-right whitespace-nowrap text-center ml-3 md:ml-6 order-2 md:order-4  justify-center">
        <div class="num">{{formatRulesNumber(item.users)}}</div>
        <div  class=" text-kd12px12px exp mt-1">
        <span v-if='item.user_change_percent' :class='getNumberColor(item.user_change_percent)'>{{formatRulesNumber(item.user_change_percent)}}%</span>
          <span v-else>-</span>
        </div>
      </div>
      <!--      balance-->
      <div :class='headerData[5].width' class="flex flex-col   md:text-right  whitespace-nowrap text-center ml-3 order-3 md:order-5 md:ml-6  justify-center">
        <div v-if='item.balance' class="num">${{formatRulesNumber(item.balance)}}</div>
      </div>
      <!--      volume-->
      <div :class='headerData[6].width' class="flex flex-col   md:text-right  whitespace-nowrap text-center ml-3 order-4 md:order-6 md:ml-6  justify-center">
        <div class="num">${{formatRulesNumber(item.volume)}}</div>
      </div>

      <!--      收入/变化率-->
<!--      <div :class='headerData[5].width' class="flex flex-col pr-2   md:text-right  whitespace-nowrap text-center ml-3 md:ml-6 order-7 md:order-5    justify-center">-->
<!--        <div class="num">{{formatRulesNumber(item.revenue)}}</div>-->
<!--        <div class="text-global-numRed text-kd12px12px exp">{{formatRulesNumber(item.revenue_change_percent)}}%</div>-->
<!--      </div>-->
      <!--      TVL/变化率-->
      <div :class='headerData[7].width' class="flex flex-col   md:text-right  whitespace-nowrap text-center ml-3 md:ml-6 order-5   md:order-8 justify-center">
        <div class="num">${{formatRulesNumber(item.tvl)}}</div>
        <div class=" text-kd12px12px exp mt-1">
          <span v-if='item.tvl_change_percent' :class='getNumberColor(item.tvl_change_percent)'>{{formatRulesNumber(item.tvl_change_percent)}}%</span>
          <span v-else>-</span>
        </div>
      </div>
      <!--      MCap/TVL-->
      <div :class='headerData[8].width' class="flex flex-col   md:text-right  whitespace-nowrap text-center ml-3 order-6 md:order-9 md:ml-6  justify-center">
        <div class="num">${{formatRulesNumber(item.mcap_tvl)}}</div>
      </div>
      <!--      marketcap-->
      <div :class='headerData[6].width' class="flex flex-col   md:text-right  whitespace-nowrap text-center ml-3 order-7 md:order-7 md:ml-6  justify-center">
        <div class="num">${{formatRulesNumber(item.marketcap)}}</div>
      </div>

    </div>

  </a>
</template>
<style scoped lang="scss">
.item:hover{
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.06), 0px 8px 24px rgba(0, 0, 0, 0.1);
}
.num{
  @apply text-kd16px16px text-global-highTitle font-kdExp;
}
.item::before{
  content: '';
  background: rgba(9, 217, 142, 0.32);
  position: absolute;
  z-index: 1;
  top:0;
  left:0;
  bottom:0;
  width: var(--wv);
  @apply rounded-kd6px;
}
</style>



