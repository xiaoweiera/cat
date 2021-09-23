<script setup lang="ts">
import { ref, defineProps, reactive } from 'vue'
import I18n from '~/utils/i18n/index'
const props=defineProps({
  title:String
})
const pcTip = reactive({value: false})
</script>
<template>
  <div>
      <div class="flex items-center flex-wrap">
        <span class="md:mr-3 mr-1.5 flex i8n-font-Barlow font-kdExp   text-kd24px24px md:text-kd32px32px text-global-highTitle text-opacity-85 font-semibold">{{props.title}}</span>
        <div @click='pcTip.value=true' class='mdhidden hand bg-global-primary w-7.5 h-7.5  flex items-center justify-center rounded-full'>
          <IconFont class='text-global-white' type='icon-sousuo-da' size='14'/>
        </div>
      </div>
      <Apy2BaseInfo />
      <UiDialogPcTip :pcTip='pcTip' />
  </div>

</template>
