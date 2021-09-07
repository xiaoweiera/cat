<script setup lang="ts">
import * as lang from '~/utils/lang'
</script>

<template>
  <div :class="lang.current.value" class="containerbgs md:bg-opacity-100 bg-global-white">
    <slot name="header">
      <UiHeader/>
    </slot>
    <main>
      <slot name="body">
        <router-view />
      </slot>
    </main>
    <slot name="footer">
    </slot>
  </div>
</template>

<style lang="scss">
html,
body {
  background-color: white !important;
}
.router-list {
  a {
    @apply ml-8 opacity-85 text-global-default;
    &:first-child {
      @apply ml-0;
    }
  }
  .router-link-active {
    @apply text-global-primary;
  }
}
</style>
