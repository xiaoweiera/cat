<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getHecoDetail } from '~/api/apy'
import { header } from './props'
const datalist = ref<anyp[]>([])

onMounted(async () => {
  const result = await getHecoDetail()
  const { list = [], total = 0 } = result
  datalist.value = list
})
</script>

<template>
  <div class="flex-1" :class="{ max: false }">
    <el-table :data="datalist" stripe class="w-full">
      <template v-for="(item, index) in header" :key="index">
        <el-table-column :prop="item.key" :label="item.label"></el-table-column>
      </template>
    </el-table>
  </div>
</template>

<style scoped></style>
