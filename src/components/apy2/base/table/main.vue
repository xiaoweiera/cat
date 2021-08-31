<script setup lang="ts">
import { uuid } from '~/utils'
import { TabCategoryData } from '~/logic/apy2/interface'
import { defineProps, onMounted, ref,computed } from 'vue'
import {useProvide,  setInject, getInject } from '~/utils/use/state'
import {chain,rankingTag,tableTag,listTag} from '~/store/apy2/state'
import I18n from '~/utils/i18n/index'
defineProps({
  type: {
    type: String,
    default: () => TabCategoryData.mining,
    validator: function(value: string) {
      // 类型为挖矿与借贷
      return value === TabCategoryData.mining || value === TabCategoryData.lend;
    }
  },
})

const [tag,set]=useProvide('tag','my')
const [filterType]=useProvide('filterType','all')
const typeList=ref([{name:I18n.apyIndex.total,key:'all'},{name:I18n.apyIndex.single,key:'single'}])
const tagList=computed(()=>{
  if(tableTag && tableTag.value[0]?.id!=='my'){
    tableTag.value.unshift({id:'my',name:I18n.apyIndex.my})
    set(tableTag.value[1]?.id)
  }
  return tableTag.value
})
const tableKey= computed(function () {
  return uuid(`${tag.value[0]}-${chain.value}-${filterType.value[0]}`)
})
</script>

<template>
  <div class="flex items-center justify-between mb-4">
    <Apy2MiningPoolsSelectTag  :list="tagList"   class="mr-10"/>
    <div class="flex items-center" v-if="type==='mining'">
      <Apy2MiningPoolsFliter class="mr-3"  :list="typeList" />
    </div>
  </div>
  <div v-if="tag[0]" class="pt-4">
    <Apy2BaseTable :type="type" :key="tableKey" :groupId="tag[0]" :chain="chain" :apyType="filterType[0]"/>
  </div>
</template>

<style lang="scss">

</style>
