<script setup lang="ts">
import {ref, defineProps} from 'vue'
import {formatDefaultTime} from '~/lib/tool'
import I18n from '~/utils/i18n/index'
const list=[
  {type:'top'},
  {type:'notic'},
  {type:'notic'},
  {type:'study'},
]
const classList= {
  top: 'top',
  notic: 'notic',
  study: 'study'
}
const getClass=(type:string)=>classList[type]
</script>
<template>
  <div class="w-74">
    <template v-for="(item,i) in list">
      <a href="/" >
        <div :class="i===0?'':'mt-4'">
          <div :class="getClass(item.type)" class="hand">
            <span class="tip">公告</span>
            <span class="des">丈夫发烧住院，浙江妈妈带3个孩子回国后确诊 密切接触者达60人</span>
          </div>
          <div  class="mt-0.5 text-kd13px18px text-global-highTitle text-opacity-45">{{formatDefaultTime(1588889281,'YYYY年M月DD日')}}</div>
        </div>
      </a>
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
