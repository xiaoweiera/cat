<script setup lang="ts">
import {watch,defineProps} from 'vue'
import I18n from '~/utils/i18n/index'
import {rankingTag,chain} from '~/store/apy2/state'
import {useProvide, setInject, getInject} from '~/utils/use/state'
const group_id=getInject('group_id')
const props=defineProps({type:String})
watch(()=>rankingTag.value,()=>group_id.value[0]=rankingTag.value[0].id)
const changeTag=(id:number)=>group_id.value[0]=id
</script>
<template>
  <div class="font-kdFang w-93.25 ">
    <div class="flex justify-between items-center">
      <span v-if="props.type==='mining'" class="text-kd25px28px font-medium text-global-highTitle  text-opacity-85">挖矿收益榜单</span>
      <span v-else class="text-kd18px24px font-medium text-global-highTitle  text-opacity-85">借贷利率榜</span>
      <UiDialogBase  customClass="480px">
        <template #title>
          <div v-if="props.type==='loan'" class="flex items-center btnCount py-1 px-2 hand">
            <img class="w-4 h-4" src="https://res.ikingdata.com/apyTwo/count.jpg" alt="">
            <span class="ml-0.5 text-global-primary text-kd14px18px">真实利率计算器</span>
          </div>
        </template>
        <template #content>
          <Apy2Calculator />
        </template>
      </UiDialogBase>

    </div>
    <div class="flex items-center mt-3">
      <template v-for="(item,i) in rankingTag">
        <div @click="changeTag(item.id)" :class="group_id[0]===item.id?'selectedTag':'tag'" class="hand px-2 py-1">{{item.name}}</div>
      </template>
    </div>
  </div>
</template>
<style scoped lang="postcss">
.tag{
  @apply mr-2  text-kd14px18px text-global-highTitle font-medium  text-opacity-65;
}
.selectedTag{
  border-radius: 6px;
  @apply mr-2 text-kd14px18px text-global-primary font-medium bg-global-primary bg-opacity-8;
}
.btnCount{
  border: 1px solid rgba(43, 141, 254, 0.32);
  border-radius: 4px;
}
</style>
