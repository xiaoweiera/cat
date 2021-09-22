<script setup lang="ts">
import {ref,defineProps,computed,onMounted,toRefs} from 'vue'
import {chains} from '~/logic/apy2/config'
import I18n from '~/utils/i18n/index'
import {useProvide,getInject} from '~/utils/use/state'
const props = defineProps({show:Object,chain:String})
const txt=getInject('txt')
const {state:propsShow}=toRefs(props.show)
const openSelect=()=>{
  propsShow.value=true
}
const chainName=computed(()=>{
  const item=chains.find(item=>item.key===props.chain)
  return item.name
})
</script>
<template>
  <div  @click='openSelect()' class="font-kdFang absolute right-0 w-75 hand   " name="select" >
<!--    <div style='color:red;'>{{propsShow}}</div>-->
    <div   class="bg-global-highTitle bg-opacity-4 rounded-kd24px  h-9  flex items-center  selectShadow " name="select"  >
      <div class="pl-4 pr-2 flex borer-1 items-center w-full h-full" name="select" >
        <div class="flex items-center w-30 " name="select" >
          <IconFont type="icon-quanbu" name="select"   size="20" class="w-4.75 mr-1 text-global-primary  whitespace-nowrap" />
          <div name="select" class='text-global-highTitle text-kd14px18px'>{{chainName}}</div>
          <IconFont name="select" class='text-global-default text-opacity-35  ml-1.5' size='10' type='icon-arrow-down'/>
        </div>
        <IconFont type="icon-gang" name="select"  size="14" class=" relative right-6  ml-1 text-global-highTitle text-opacity-12"/>
        <div  class="flex items-center flex-1 -ml-5.5 search w-full h-full " name="select" >
          <div name="select"  class='text-global-highTitle text-opacity-45 text-14'>{{txt[0]?txt[0]:'请输入...'}}</div>
        </div>
        <div name="select"  class="bg-global-primary w-7 h-7 flex justify-center items-center ml-3 " style="border-radius: 50%;">
          <div name='select' class=' absolute w-6 h-6'></div>
          <IconFont name="select"  type="icon-sousuo-da" class="text-global-white" size="14"/>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">

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
    flex:1;
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
