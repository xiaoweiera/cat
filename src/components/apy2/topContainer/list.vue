<script setup lang="ts">
import {watch, ref, onMounted,defineProps} from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import {chain} from '~/store/apy2/state'
import {getMining_rank,getAllRank} from '~/logic/apy2/index'
import {getInject} from '~/utils/use/state'
import {chainsIcon} from '~/logic/apy2/config'
import {project_type} from '~/logic/apy2/config'
import {formatRulesNumber, getIconType,tolocaleLowerCase} from '~/lib/tool'
const props=defineProps({
  type:String,
  project:Boolean,
  token:Boolean,
  paramData:Object,
  header:Boolean,
  tokenItem:Object,
  title:String,
})
const list = ref()
watch(() => props.tokenItem.value, () => getData())
const getData = async () =>{
  let result
  if(!props.project && !props.token){
    if(!props.tokenItem.value) return
    const param={
      chain:chain.value,
      group_id:props.tokenItem.value
    }
    result= await getAllRank(props.type,props.project,props.token,param)
  }else if(props.project && props.type==='mining' ){
    if(!props.paramData.project_id) return
    const param={
      project_id:props.paramData.project_id,
      pools:props.paramData.pools
    }
    result=await getAllRank(props.type,props.project,props.token,param)
  }else if(props.project && props.type==='lend' ){
    if(!props.paramData.project_id) return
    const param={
      project_id:props.paramData.project_id,
      pools:props.paramData.pools
    }
    result=await getAllRank(props.type,props.project,props.token,param)
  }else if(props.token && props.type==='mining'){
    if(!props.paramData.symbol) return
    const param={
      symbol:props.paramData.symbol,
      pools:props.paramData.pools
    }
    result=await getAllRank(props.type,props.project,props.token,param)
  }else if(props.token && props.type==='lend'){
    if(!props.paramData.symbol) return
    const param={
      symbol:props.paramData.symbol,
      pools:props.paramData.pools
    }
    result=await getAllRank(props.type,props.project,props.token,param)
  }
   list.value = result

}
onMounted(() => {

  getData()
})
const tokenUrl=(tokenName:string)=>`/apy/token?symbol=${tokenName}`
</script>
<template>
  <div class="font-kdFang w-full p-4  font-kdExp relative ke  bgShadow ">
    <div class="text-kd14px18px font-medium text-global-highTitle mb-2">{{title}}</div>
    <div class=" overflow-hidden h-74 overflow-y-auto showY">
    <template v-for="(item,i) in list">
      <Apy2PoolDialog v-if="props.type==='mining'" type="mining" :id="item.id">
        <template #reference>
          <el-popover placement="top" :width="350" trigger="hover">
            <template #reference>
              <div  class="flex topBorder  items-center w-full p-2">
                <Apy2TopContainerItem  :item="item" :i="i"/>
              </div>
            </template>
            <div class="min-w-70  p-1.3 ">
              <Apy2TopListMiningTip class="absolute " v-if="props.type==='mining'" :data="item"/>
              <Apy2TopListLoanTip v-else :data="item"/>
            </div>
          </el-popover>
<!--          <UiPopover v-if="i<5"  class="inline-block   w-full">-->
<!--            <template #reference>-->
<!--              <div  class="flex topBorder  items-center w-full p-2">-->
<!--                <Apy2TopContainerItem  :item="item" :i="i"/>-->
<!--              </div>-->
<!--            </template>-->
<!--            <template #content>-->
<!--              <div class="min-w-70 relative p-1.3 ">-->
<!--                <Apy2TopListMiningTip :data="item"/>-->
<!--              </div>-->
<!--            </template>-->
<!--          </UiPopover>-->
        </template>
      </Apy2PoolDialog>
      <div v-else>
        <a  v-router.blank="tokenUrl(item.symbol_alias)" >
          <el-popover placement="top" :width="350" trigger="hover">
            <template #reference>
              <div  class="flex topBorder  items-center w-full p-2">
                <Apy2TopContainerItem  :item="item" :i="i"/>
              </div>
            </template>
            <div class="min-w-70  p-1.3 ">
              <Apy2TopListMiningTip class="absolute " v-if="props.type==='mining'" :data="item"/>
              <Apy2TopListLoanTip v-else :data="item"/>
            </div>
          </el-popover>

        </a>
      </div>
    </template>
    </div>
  </div>
</template>
<style scoped lang="scss">
.ke::before{
  position: absolute;
  content: '';
  width: 0;
  height: 0;
  left: 0%;
  top: 46%;
  border-top: 12px solid transparent;
  border-right: 19px solid white;
  border-bottom: 12px solid transparent;
  transform: translateX(-100%);
}
.bgShadow{
 box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.08);
}
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
