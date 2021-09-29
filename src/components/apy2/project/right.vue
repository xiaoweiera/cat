<script setup lang="ts">
import {ref, defineProps } from 'vue'
import { getInject} from '~/utils/use/state'
import I18n from '~/utils/i18n/index'
import hmt from '~/lib/hmt'
const props = defineProps({
  projectId:Object,
  origin:String
})

const projectInfo = getInject('projectInfo')

const pool_type = ref('mining')
const tagKey = ref(0)

const tags = [
  {name: I18n.apyIndex.miningPool, key: 'mining',watch:'project_click_farm'},
  {name: I18n.apyIndex.loanPool, key: 'lend',watch:'project_click_borrow'},
  {name: I18n.apyIndex.projectData, ke: 'all',watch:'project_click_data'},
]
const selectName = (key: string,name:string,watch:string) => {
  console.log(name)
  hmt.event(`点击${name}`,watch)
  pool_type.value = key
  tagKey.value++
}
const baidu=(name:string)=>{

}
</script>
<template>
  <div class="font-kdFang">
    <Apy2ProjectInfo class="xshidden" :projectId="projectId"/>
    <Apy2ProjectInfoMobile class="mdhidden" :projectId="projectId"/>
    <div v-if="projectInfo[0]?.id"  class="flex items-center mt-8 bottomBorderGang">
      <template v-for="item in tags">
        <div  v-if="(projectInfo[0]?.is_lend && item.key==='lend') || item.key!=='lend'"  @click="selectName(item.key,item.name,item.watch)" :class="pool_type===item.key?'pool_type':'name'" class="pool_type mr-8 hand" name="mining">
          {{ item.name }}
        </div>
      </template>
    </div>
<!--    <div class="h-400 border-1">fffff</div>-->
    <Apy2ProjectMining v-if="pool_type==='mining'" :pool_type="pool_type" :projectId="projectId"  />
    <Apy2ProjectLoan v-else-if="pool_type==='lend'"   :pool_type="pool_type" :projectId="projectId" />
    <Apy2ProjectDataMain v-else  :pool_type="pool_type" :projectId="projectId"/>

  </div>
</template>
<style scoped lang="scss">
.pool_type {
  border-bottom: 2px solid #2B8DFE;
  @apply text-global-primary text-kd18px24px font-medium pb-1.5 hand;
}

.name {
  border-bottom: 2px solid rgba(43, 141, 254, 0);
  @apply text-global-highTitle text-opacity-45 text-kd18px24px font-medium pb-1.5 hand;
}

.bottomBorder {
  border-bottom: 1px solid #2B8DFE;
}

.bottomBorderGang {
  border-bottom: 1px solid rgba(3, 54, 102, 0.06);
}
</style>



