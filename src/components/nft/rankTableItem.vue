<script  lang="ts" setup>
import {formatRulesNumber,getNumberColor} from '~/lib/tool'

import {defineProps,computed} from 'vue'

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
const getChainIcon=(chains:any)=>chains.length>0?(chains.logo?chains.logo:'icon-ETH'):'icon-ETH'
</script>
<template>
  <a  v-if='headerData' v-router='item.external_url'  class="px-3 py-1.5 item  relative hand relative   bg-global-white mt-1.5 flex items-center rounded-kd6px" :style="`--wv:${bgWidth};z-index:${zIndex+100}`">
    <div class='relative z-2  flex items-center w-full   '>
      <!--      排名-->
      <div :class='headerData[0].width' class="exp md:min-w-7   text-kd14px20px txt85  whitespace-nowrap   text-center">{{i+1}}</div>
      <!--     名称-->
      <div :class='headerData[1].width' class="flex  items-center  justify-left   ml-3    truncate  md:ml-6 ">
        <IconFont :type="item.logo?item.logo:''" size="24"/>
        <div class="text-kd14px18px text-global-highTitle ml-1.5 fang w-fit  truncate">{{item.name}}</div>
      </div>

      <!--      类别-->
      <div :class='headerData[2].width' class="flex items-center  order-10 md:order-2   whitespace-nowrap ml-3 md:ml-6  justify-center">
        <template v-for='(typeName,i) in item.categories'>
          <span :class='i===item.categories.length-1?"":"mr-1"' class="text-kd14px18px text-global-highTitle fang">{{typeName}}</span>
        </template>

      </div>
      <!--      Volume-->
      <div :class='headerData[3].width' class="content order-2 ml-3 md:ml-6 md:order-3">
        <IconFont size='12' :type='getChainIcon(item.chains)'/>
        <div class="num ">{{formatRulesNumber(item.volume)}}</div>
      </div>
      <!--      24H-->
      <div :class='headerData[4].width' class="content order-3  md:order-4 ml-3 md:ml-6">
        <div  class="flex items-center text-kd14px20px exp">
<!--          <span>{{item.h24_volume_change_percent>=0?'+':'-'}}</span>-->
          <div v-if='item.h24_volume_change_percent' :class='getNumberColor(item.h24_volume_change_percent)'>{{formatRulesNumber(item.h24_volume_change_percent)}}%</div>
          <div v-else>-</div>
        </div>
      </div>
      <!--      7D-->
      <div :class='headerData[5].width' class="content  order-4 md:order-5 ml-3 md:ml-6">
        <div  class="flex items-center text-kd14px20px exp">
<!--          <span>{{item.h24_volume_change_percent>=0?'+':'-'}}</span>-->
         <div v-if='item.d7_volume_change_percent' :class='getNumberColor(item.d7_volume_change_percent)' >{{formatRulesNumber(item.d7_volume_change_percent)}}%</div>
          <div v-else>-</div>
        </div>
      </div>
      <!--      Owners-->
      <div :class='headerData[6].width' class="content  order-5 md:order-6 ml-3 md:ml-6">
        <div class="num">{{formatRulesNumber(item.owners)}}</div>
      </div>
<!--      Assets-->
      <div :class='headerData[7].width' class="content order-6 md:order-7 ml-3 md:ml-6">
        <div class="num">{{formatRulesNumber(item.assets)}}</div>
      </div>
<!--     Floor Price-->
      <div :class='headerData[8].width' class="content order-7 md:order-8 ml-3 md:ml-6">
        <IconFont size='12' :type='getChainIcon(item.chains)'/>
        <div class="num">{{formatRulesNumber(item.floor_price)}}</div>
      </div>
<!--      Avg Price-->
<!--      <div v-if='headerData[9].width' :class='headerData[9].width' class="content order-8 ml-3 md:ml-6 md:order-9">-->
<!--        <IconFont size='12' :type='getChainIcon(item.chains)'/>-->
<!--        <div class="num">{{formatRulesNumber(item.avg_price)}}</div>-->
<!--      </div>-->
<!--      MCap-->
      <div :class='headerData[9].width' class="content order-9  md:order-10 ml-3 md:ml-6">
        <IconFont size='12' :type='getChainIcon(item.chains)'/>
        <div class="num">{{formatRulesNumber(item.mcap)}}</div>
      </div>
    </div>

  </a>
</template>
<style scoped lang="scss">
.item:hover{
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.06), 0px 8px 24px rgba(0, 0, 0, 0.1);
}
.num{
  @apply text-kd14px20px  text-global-highTitle  font-kdExp;
}
.content{
  @apply flex items-center pr-0.5  text-right justify-end  md:text-right whitespace-nowrap text-right  justify-right;
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



