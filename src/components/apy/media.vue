<script setup lang="ts">
  import { onBeforeMount } from 'vue'
  import { list, requestMediaList } from '~/logic/apy/media'

  onBeforeMount(() => {
    requestMediaList()
  })
</script>

<template>
  <div class="max-w-full pb-12" v-show="list.length">
    <div class="grid grid-cols-5 gap-6">
      <div v-for="(item, index) in list" :key="index">
        <a class="inline-block max-w-full" v-if="item.url" :href="item.url" target="_blank">
          <img class="inline-block" :src="item.image" />
        </a>
        <img v-else class="inline-block max-w-full" :src="item.image" />
      </div>
    </div>
  </div>
</template>
