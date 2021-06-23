<script setup lang="ts">
import I18n from '~/utils/i18n'
</script>
<template>
  <div class="mt-15 md:mt-20 flex flex-col items-center">
    <div class="font-medium text-kd24px150 text-global-highTitle i8n-font-Barlow font-semibold">
      {{ I18n.growthpadShow.partners }}
    </div>
    <div class="pt-8">
      <img class="hidden md:block w-full" src="https://res.ikingdata.com/image/growthpad-pc.png"/>
      <img class="block md:hidden w-full" src="https://res.ikingdata.com/image/growthpad-moblie.png"/>
    </div>
  </div>
</template>
