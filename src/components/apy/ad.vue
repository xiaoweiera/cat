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
      <a
        v-if="url"
        class="ad-picture inline-block"
        :href="url"
        target="_blank"
        :style="style"
      ></a>
      <span v-else class="ad-picture inline-block" :style="style"></span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.equal-width-height {
  &:before {
    margin-top: 45%;
  }
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
