<script setup lang="ts">
import {ref,defineProps,computed,onMounted,toRefs} from 'vue'
import {chains} from '~/logic/apy2/config'
import I18n from '~/utils/i18n/index'
import {useProvide} from '~/utils/use/state'
const props = defineProps({show:Object,chain:String})
const [txt,]=useProvide('txt','')
const chain=ref('all')
const {data:value}=toRefs(props.show)
const openSelect=()=>{

  console.log('aaa')
  showParam.value=true
}

</script>
<template>
  <div style='color:red;'>{{chain}}--{{showParam.value}}</div>
  <div @click='openSelect' class="font-kdFang border-1 w-75 " name="select" >
    <div  class="bg-global-highTitle bg-opacity-4 rounded-kd24px py-1 h-9 flex items-center  selectShadow " name="select"  >
      <div class="pl-4 pr-2 flex borer-1 items-center w-full" name="select" >
        <div class="flex items-center w-30 " name="select" >
          <IconFont type="icon-quanbu" name="select"   size="20" class="w-4.75 mr-1 text-global-primary  whitespace-nowrap" />
          <div class="allChain items-center  " name="select" >
            <el-select name="select"    size="small" v-model="chain" >
              <el-option name="select"  v-for="item in chains" :key="item.key" :label="item.name" :value="item.key">
              </el-option>
            </el-select>
          </div>
        </div>
        <IconFont type="icon-gang" name="select"  size="14" class=" relative right-5.8  ml-1 text-global-highTitle text-opacity-12"/>
        <div  class="flex items-center border-1 flex-1 -ml-5.5 search " name="select" >
          <div class='text-global-highTitle text-opacity-45 text-14'>请输入...</div>
        </div>
        <div name="select"  class="bg-global-primary w-7 h-7 flex justify-center items-center ml-3 " style="border-radius: 50%;">
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
