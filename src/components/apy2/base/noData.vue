<script setup lang="ts">
import {defineProps, ref,onMounted } from 'vue'
import I18n from '~/utils/i18n/index'
const props=defineProps({
  type:String,
})
</script>
<template>
  <div class="h-60  flex items-center justify-center borderClass font-kdFang">
    <div class="text-center">
      <div class="text-global-highTitle text-opacity-85 text-kd16px24px">您未添加自选</div>
      <div v-if="type==='mining'">
        <span class="mt-2 text-kd12px16px text-global-highTitle text-opacity-45">
          请点击下方
          <span class="text-global-primary">"添加币种 & LP"</span>
          按钮添加你关注的币种或 LP
        </span>
      </div>
      <div v-if="type==='lend'">
        <span class="mt-2 text-kd12px16px text-global-highTitle text-opacity-45">
          请点击下方
          <span class="text-global-primary">"添加币种"</span>
          按钮添加你关注的币种
        </span>
      </div>
    </div>
  </div>
</template>
<style scoped lang="postcss">
.borderClass{
  border:1px solid #EBEBEB;
}
</style>
