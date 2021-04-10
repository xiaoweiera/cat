<script setup lang="ts">
import { useHead } from '@vueuse/head'
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'KingData',
  meta: [
    {
      name: 'description',
      content: 'Opinionated Vite Starter Template',
    },
  ],
})
</script>

<template>
  <router-view/>
</template>
<style>
@media screen and (max-width: 768px) {
  .xshidden{
    display: none !important;
  }

}

@media screen and (min-width: 768px) {
  .mdhidden{
    display: none !important;
  }
}
</style>