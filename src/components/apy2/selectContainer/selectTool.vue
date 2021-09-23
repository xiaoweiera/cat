<script setup lang="ts">
import {ref,defineProps,reactive,onMounted,toRefs} from 'vue'
import {chains} from '~/logic/apy2/config'
import I18n from '~/utils/i18n/index'
import {useRoute} from 'vue-router'
import {useProvide} from '~/utils/use/state'
const props = defineProps({
  type:String
})

const [txt,]=useProvide('txt','')
const chain=ref('all')
const show=reactive({state:false})
const tokenLoad=reactive({state:true,number:0})
const poolLoad=reactive({state:true,number:0})
const pageType=ref('')
const changePageType=(type:string)=>pageType.value=type
const route = useRoute()

window.addEventListener('click',function(a){
  //@ts-ignore
  const name=a.target.attributes?.name?.value
  if(name!=='select') show.state=false
});
const focusTxt=()=>show.state=true
onMounted(()=>{
  if(route.path.indexOf('mining')>=0){
    pageType.value='mining'
  }else{
    pageType.value='lend'
  }
})
</script>
<template>
  <Apy2SelectContainerSelectModel v-if='!show.state' :show='show' :chain='chain' />
  <div v-else class="font-kdFang " name="select" >
    <div class="bg-global-white rounded-kd24px   selectShadow " name="select"  >
      <div class="pl-4 pr-2 h-9 flex borer-1 items-center w-full" name="select" >
        <div class="flex items-center " name="select" >
          <IconFont type="icon-quanbu" name="select"   size="20" class="w-4.75 mr-1 text-global-primary  whitespace-nowrap" />
          <div class="allChain items-center  " name="select" >
            <el-select name="select"    size="small" v-model="chain" >
              <el-option name="select"  v-for="item in chains" :key="item.key" :label="item.name" :value="item.key">
              </el-option>
            </el-select>
          </div>
        </div>
        <IconFont type="icon-gang" name="select"  size="14" class=" relative right-5.8  ml-1 text-global-highTitle text-opacity-12"/>
        <div  class="flex items-center flex-1 -ml-5.5 search " name="select" >
          <el-input name="select"  @focus="focusTxt()" class="search-box" :placeholder="I18n.apyIndex.search" v-model="txt[0]" value=""></el-input>
        </div>
        <div name="select"  class="bg-global-primary w-7 h-7 flex justify-center items-center ml-3 " style="border-radius: 50%;">
          <IconFont name="select"  type="icon-sousuo-da" class="text-global-white" size="14"/>
        </div>
      </div>
      <div name="select"  v-if="txt[0] && show.state"  class="h-auto showY mt-1 pl-4 pr-2 pb-2 min-h-35  flex flex-col ">
        <div name="select"  class="bottomBorder"></div>
        <div name="select" class='flex items-center mt-4'>
          <div @click='changePageType("mining")' name="select" :class='pageType==="mining"?"typeTaged":"typeTag"' class='mr-4'>{{I18n.apyIndex.miningApy}}</div>
          <div @click='changePageType("lend")' name="select" :class='pageType==="lend"?"typeTaged":"typeTag"'>{{I18n.apyIndex.loanApr}}</div>
        </div>
          <div >
            <Apy2SelectContainerToken :chain="chain" :load='tokenLoad' :pageType="pageType" name="select" />
            <Apy2SelectContainerPool :chain="chain" :load='poolLoad' :pageType="pageType" name="select" />
          </div>
        <div v-if='!tokenLoad.state && !poolLoad.state && !tokenLoad.number && !poolLoad.number ' class='text-kd14px18px text-global-highTitle text-opacity-45  flex-1 flex items-center justify-center'>{{I18n.apyIndex.noData}}</div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.typeTag{
  @apply   text-kd14px18px font-medium text-global-highTitle text-opacity-45  rounded-kd36px cursor-pointer;
}
.typeTaged{
  @apply  text-kd14px18px font-medium text-global-primary  rounded-kd36px cursor-pointer;
}
.bottomBorder{
  border-bottom:1px solid rgba(37, 62, 111, 0.08);
}
.selectShadow{
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.06), 0px 0px 4px rgba(0, 0, 0, 0.1);
}
.allChain{
  ::v-deep(.el-input__inner){
    border:none;
    background: none;
    border-radius: 6px;
    font-size:14px;
    padding-left:4px !important;
    display: inherit;
    width:100px;
    @apply  text-global-highTitle font-medium ;
  }
  ::v-deep(.el-input__suffix){
    right:17px !important;
  }
}
.search{
  ::v-deep(.el-input__inner){
    border:none;
    background: none;
    border-radius: 6px;
    font-size:14px;
    display: inherit;
    padding-left:4px !important;
    width:100%;
    @apply  text-global-highTitle font-medium ;
  }
  ::v-deep(.el-input__suffix){
    right:17px !important;
  }
}


::v-deep(input) {
  border: 0;
  padding:0;
  background: none;
}
::v-deep(input::-webkit-input-placeholder) {
  font-weight: 400;
  @apply text-global-highTitle text-kd16px24px text-opacity-45;
}
::v-deep(input::-ms-input-placeholder) {
  font-weight: 400;
  @apply text-global-highTitle text-opacity-45;
}
</style>
