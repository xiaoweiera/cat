<script setup lang="ts">
import * as lang from '~/utils/lang'
</script>

<template>
  <div :class="lang.current.value" class="containerbgs  md:bg-opacity-100 bg-global-white"  >
    <UiHeader/>
    <main>
      <router-view />
    </main>
    <UiFooter/>
  </div>
  <UiLayout>
    <template #footer>
      <UiFooter/>
    </template>
  </UiLayout>
</template>





