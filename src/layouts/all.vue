<script setup lang="ts">
</script>

<template>
  <div class="containerbgs md:bg-opacity-100 bg-global-white"  >
    <UiHeader/>
    <main>
      <router-view />
    </main>
    <UiFooter/>
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




