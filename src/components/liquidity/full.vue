<script setup lang="ts">
import { defineProps,onMounted,ref,reactive,watch } from 'vue'

</script>
<template>
  <FullScreen>
    <template #default="scope">
      <el-container v-if="scope.status">
        <el-header>Header - <FullZoom/></el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
      <div class="flex" v-else>
        <FullZoom/>
      </div>
    </template>
  </FullScreen>
</template>
<style scoped lang="postcss">

</style>
