<script setup lang="ts">
import I18n from '~/utils/i18n'
</script>
<template>
  <div class="mt-15 md:mt-20 flex flex-col items-center">
    <div
      class="
        font-medium
        text-kd24px150 text-global-highTitle
        i8n-font-Barlow
        font-semibold
      "
    >
      {{ I18n.growthpadShow.partners }}
    </div>
    <img
      class="mdhidden w-full mt-8"
      src="https://res.ikingdata.com/nav/mobileCompany.png"
      alt=""
    />
    <img
      class="xshidden w-full mt-8"
      src="https://res.ikingdata.com/nav/pcCompany.png"
      alt=""
    />
  </div>
</template>
