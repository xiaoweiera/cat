<script setup lang="ts">
  import { defineProps, computed } from 'vue'
  const props = defineProps({
    url: String,
    image: String,
  })
  const style = computed((): string => {
    return `background-image: url(${props.image});`
  })
</script>

<template>
  <div class="equal-width-height">
    <div class="equal-content">
      <a v-if="url" class="ad-picture inline-block" :href="url" target="_blank" :style="style"></a>
      <span v-else class="ad-picture inline-block" :style="style"></span>
    </div>
  </div>
</template>

<style scoped lang="postcss">
  /* 等宽等高 */
  .equal-width-height {
    width: 100%;
    position: relative;
    border: 1px solid transparent;
  }
  .equal-width-height::before {
     content: '';
     display: block;
     margin-top: 45%;
   }
  .equal-width-height > .equal-content {
    left: -1px;
    top: -1px;
    right: -1px;
    bottom: -1px;
    position: absolute;
  }

  .ad-picture {
    box-shadow: 0px 4px 12px rgba(44, 140, 248, 0.08);
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
</style>
