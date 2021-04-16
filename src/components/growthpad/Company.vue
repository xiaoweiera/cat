<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
<template>
  <div class="mt-15 md:mt-20 flex flex-col items-center">
    <div class="font-medium text-kd24px150 barlow font-semibold">{{ t('Partners') }}</div>
    <img class="mdhidden w-full mt-8" src="https://res.ikingdata.com/nav/mobileCompany.png" alt="">
    <img class="xshidden w-full mt-8" src="https://res.ikingdata.com/nav/pcCompany.png" alt=""></div>
</template>