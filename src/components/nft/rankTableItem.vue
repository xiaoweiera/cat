<script  lang="ts" setup>
import {formatRulesNumber,getNumberColor} from '~/lib/tool'

import {defineProps,computed} from 'vue'

const props=defineProps({
  headerData:Object,
  item:Object,
  i:Number,
  sortName:String,
  is_Compare:Boolean
})
//@ts-ignore wei
const bgWidth=computed(()=> props.is_Compare?(props.item[props.sortName]/props.item.max_stat[props.sortName])*100+'%':'')
const getChainIcon=(chains:any)=>chains.length>0?(chains.logo?chains.logo:'icon-ETH'):'icon-ETH'
</script>
<template>
  <div v-if='headerData' class="h-14.5 item  hand relative overflow-hidden  px-3 bg-global-white mt-3 flex items-center rounded-kd6px" :style="`--wv:${bgWidth}`">
    <div class='relative z-2  flex items-center w-full   '>
      <!--      排名-->
      <div :class='headerData[0].width' class="exp md:min-w-7  text-kd14px20px txt85  whitespace-nowrap   text-center">{{i+1}}</div>
      <!--     名称-->
      <el-tooltip :content="item.name" placement="bottom" effect="light">
        <div :class='headerData[1].width' class="flex  items-center justify-left   ml-3    truncate  md:ml-6 ">
          <IconFont :type="item.logo?item.logo:''" size="24"/>
          <div class="text-kd14px18px text-global-highTitle ml-1.5 fang w-fit  truncate">{{item.name}}</div>
        </div>
      </el-tooltip>

      <!--      类别-->
      <div :class='headerData[2].width' class="flex items-center   whitespace-nowrap ml-3 md:ml-6  justify-center">
        <template v-for='(typeName,i) in item.categories'>
          <span :class='i===item.categories.length-1?"":"mr-1"' class="text-kd14px18px text-global-highTitle fang">{{typeName}}</span>
        </template>

      </div>
      <!--      Volume-->
      <div :class='headerData[3].width' class="content">
        <IconFont size='12' :type='getChainIcon(item.chains)'/>
        <div class="num ">{{formatRulesNumber(item.volume)}}</div>
      </div>
      <!--      24H-->
      <div :class='headerData[4].width' class="content">
        <div :class='getNumberColor(item.h24_volume_change_percent)' class="flex items-center text-kd14px20px exp">
<!--          <span>{{item.h24_volume_change_percent>=0?'+':'-'}}</span>-->
          {{formatRulesNumber(item.h24_volume_change_percent)}}%
        </div>
      </div>
      <!--      7D-->
      <div :class='headerData[5].width' class="content">
        <div :class='getNumberColor(item.d7_volume_change_percent)' class="flex items-center text-kd14px20px exp">
<!--          <span>{{item.h24_volume_change_percent>=0?'+':'-'}}</span>-->
          {{formatRulesNumber(item.d7_volume_change_percent)}}%
        </div>
      </div>
      <!--      Owners-->
      <div :class='headerData[6].width' class="content">
        <div class="num">{{formatRulesNumber(item.owners)}}</div>
      </div>
<!--      Assets-->
      <div :class='headerData[7].width' class="content">
        <div class="num">{{formatRulesNumber(item.assets)}}</div>
      </div>
<!--     Floor Price-->
      <div :class='headerData[8].width' class="content">
        <IconFont size='12' :type='getChainIcon(item.chains)'/>
        <div class="num">{{formatRulesNumber(item.floor_price)}}</div>
      </div>
<!--      Avg Price-->
      <div :class='headerData[9].width' class="content">
        <IconFont size='12' :type='getChainIcon(item.chains)'/>
        <div class="num">{{formatRulesNumber(item.avg_price)}}</div>
      </div>
<!--      MCap-->
      <div :class='headerData[10].width' class="content">
        <IconFont size='12' :type='getChainIcon(item.chains)'/>
        <div class="num">{{formatRulesNumber(item.mcap)}}</div>
      </div>
    </div>

  </div>
</template>
<style scoped lang="scss">
.item:hover{
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.06), 0px 8px 24px rgba(0, 0, 0, 0.1);
}
.num{
  @apply text-kd14px20px  text-global-highTitle  font-kdExp;
}
.content{
  @apply flex items-center pr-0.5  text-right justify-end  md:text-right whitespace-nowrap text-right ml-3 md:ml-6  justify-right;
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
}
</style>



