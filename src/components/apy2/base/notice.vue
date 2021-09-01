<script setup lang="ts">
import {ref,onMounted} from 'vue'
import {formatDefaultTime} from '~/lib/tool'
import I18n from '~/utils/i18n/index'
import {waring} from '~/store/apy2/state'
import * as api from '~/api/index'
import * as R from 'ramda'
import {noticType} from '~/logic/apy2/config'
const classList= {top: 'top', announcement: 'notic', tutorial: 'study'}
const data=ref({})
const getData=async ()=>{
  const result=await api.apy.common.announcements()
  data.value=result.data
  waring.value=R.find(item=>item?.type==='warning',result.data)?.content
}
const getClass=(type:string,is_top:boolean)=>classList[is_top?'top':type]
onMounted(getData())
</script>
<template>
  <div class="flex items-center w-full">
    <template  v-for="(item,i) in data">
      <a v-router.blank="item.url" class="flex-1 flex flex-wrap " target="_blank" v-if="i<3" >
          <div class="flex items-center justify-between flex-wrap  relative">
          <div class="flex items-center">
            <div :class="getClass(item.type,item.is_top)" class="hand ">
              <span class="tip">{{noticType[item.type]}}</span>
              <span class="des min-h-10.5 ">{{item.content}}</span>
            </div>
          </div>
          <div  class="mt-0.5  text-kd13px18px text-global-highTitle text-opacity-45">{{formatDefaultTime(item.published_at,'YYYY年M月DD日')}}</div>
        </div>
      </a>
      <img v-if="i<2"  class="h-4 mx-6 " src="https://res.ikingdata.com/apyTwo/huiGang.png" alt="">
    </template>

  </div>

</template>
<style scoped lang="scss">
.top{
  .tip{
    border-radius: 4px;
    @apply px-1 py-0.5 text-kd13px18px text-global-numRed bg-global-numRed bg-opacity-10 font-medium;
  }
  .des {
    @apply ml-1 text-kd13px18px  text-global-numRed text-opacity-85;
  }
}
.notic{
  .tip{
    border-radius: 4px;
    @apply px-1 py-0.5 text-kd13px18px text-global-primary  bg-global-primary bg-opacity-10 font-medium;
  }
  .des {
    @apply ml-1 text-kd13px18px  text-global-highTitle text-opacity-85;
  }
}
.study{
  .tip{
    border-radius: 4px;
    @apply px-1 py-0.5 text-kd13px18px text-global-numGreen  bg-global-numGreen bg-opacity-10 font-medium;
  }
  .des {
    @apply ml-1 text-kd13px18px  text-global-highTitle text-opacity-85;
  }
}
</style>
