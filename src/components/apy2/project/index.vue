<script setup lang="ts">
import { onMounted,ref,watch,reactive,computed } from 'vue'
import { tokenList } from '~/store/apy2/state'
import { ready } from '~/logic/apy2/token'
import { useProvide } from '~/utils/use/state'
import { useRoute } from 'vue-router'
import {chains} from '~/logic/apy2/config'
import * as lang from '~/utils/lang'
import {getProjectList} from '~/logic/apy2/index'
// const projectId=reactive({value:0})
const route = useRoute()
const [chain,setChain]=useProvide('chain','all')
const [projectInfo,]=useProvide('projectInfo',{})
setChain(route.query.chain || 'all')

const projectId=computed(()=>
{
  if(route.query.id) return route.query.id
  if(projectList.value[0]) return projectList.value[0].id
})
const txt=ref('')
const projectList=ref([])
const getData=async ()=>projectList.value=await getProjectList(chain.value[0],txt.value)
watch(()=>[txt.value,chain.value[0]],()=>{
  getData()
})
onMounted(getData())
</script>
<template>
  <div class="bgClass">
  <UiLayoutMenu>
    <template #menu>
      <el-container class="h-full text-kdFang">
        <el-header height="initial" class="p-0">
          <div class="pt-5 flex items-center bottomBor w-full">
            <div class="flex items-center ">
              <IconFont type="icon-quanbu"  size="20" class="w-4.75 text-global-primary  whitespace-nowrap" />
              <div class="allChain ">
                <el-select    size="small" v-model="chain[0]" >
                  <el-option v-for="item in chains" :key="item.key" :label="item.name" :value="item.key">
                  </el-option>
                </el-select>
              </div>
            </div>
            <IconFont type="icon-gang" size="16" class=" relative right-5.5 text-global-highTitle text-opacity-12"/>
            <div class="flex items-center flex-1 -ml-5 ">
              <IconFont type="icon-sousuo-da" class="text-global-highTitle w-6.5  text-opacity-45 " size="16"/>
              <el-input class="search-box" placeholder="搜索项目" v-model="txt" value=""></el-input>
            </div>
          </div>
        </el-header>
        <el-main class="p-0 overflow-auto showY">
         <Apy2ProjectList :projectId="projectId"  :data="projectList" />
        </el-main>
      </el-container>
    </template>

    <template #content>
      <div  class="p-8">
        <Apy2ProjectRight :key="projectId" :projectId="projectId"/>
      </div>
    </template>
  </UiLayoutMenu>
  </div>
</template>

<style scoped lang="scss">
.bgClass{
  background: white;
  height: calc(100vh - 72px);
}
.bottomBor{
  border-bottom: 1px solid rgba(#033666, 0.06);
}
.allChain{
  ::v-deep(.el-input__inner){
    border:none;
    background: none;
    border-radius: 6px;
    font-size:14px;
    padding-left:4px !important;
    width:100px;
    @apply  text-global-highTitle font-medium ;
  }
  ::v-deep(.el-input__suffix){
    right:16px !important;
  }
}
.search-box {
  ::v-deep(input) {
    border: 0;
    padding:0;
    background: none;
  }
  ::v-deep(input::-webkit-input-placeholder) {
    @apply text-global-highTitle font-medium text-opacity-45;
  }
  ::v-deep(input::-ms-input-placeholder) {
    @apply text-global-highTitle font-medium text-opacity-45;
  }

}
.menu-active {
  @apply bg-global-highTitle bg-opacity-6 rounded;
}
.title {
  font-size: 1.75rem;
}
.page-switch {
  @apply inline-block h-9 flex items-center px-3.5 rounded-lg overflow-hidden text-global-highTitle text-opacity-65;
  &.active {
    @apply bg-global-white text-global-primary text-opacity-100;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.1);
  }
}

.el-button--small {
  @apply rounded-md text-global-highTitle text-opacity-85;
  &.is-plain {
    padding-top: 4px !important;
    padding-bottom: 4px !important;
  }
}
</style>
