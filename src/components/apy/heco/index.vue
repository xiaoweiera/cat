<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getHecoDetail } from '~/api/apy'
// @ts-ignore
import { header, transform } from '~/logic/apy/heco'
const datalist = ref<anyp[]>([])

onMounted(async () => {
  const result = await getHecoDetail()
  const { list = [], total = 0 } = result
  datalist.value = transform(list)
})
</script>

<template>
  <div class="flex-1" :class="{ max: false }">
    <el-table :data="datalist" stripe class="w-full">
      <el-table-column
        type="index"
        width="50"
        header-align="center"
      ></el-table-column>
      <template v-for="(item, index) in header" :key="index">
        <!-- 节点名称 -->
        <el-table-column
          v-if="item.key === 'node_name'"
          :prop="item.key"
          :label="item.label"
        >
          <template #default="scope">
            <div class="flex items-center">
              <IconFont
                v-if="scope.row.icon_url"
                :type="scope.row.icon_url"
                class="mr-2"
                size="2xl"
              ></IconFont>
              <p>{{ scope.row[item.key] }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :prop="item.key"
          :label="item.label"
        ></el-table-column>
      </template>
    </el-table>
  </div>
</template>

<style scoped></style>
