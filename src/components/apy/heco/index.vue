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
const isMore = ref(false)
const headerBg = () => {
  return 'background: rgba(43, 141, 254, 0.04)'
}
</script>

<template>
  <div class="flex-1">
    <div class="relative heco-list" :class="{ more: isMore }">
      <el-table :data="datalist" stripe :header-cell-style="headerBg">
        <template v-for="(item, index) in header" :key="index">
          <el-table-column
            :prop="item.key"
            :label="item.label"
          ></el-table-column>
        </template>
      </el-table>
      <div
        @click="isMore = true"
        class="
          text-global-primary text-kd16px24px text-center
          mt-4
          hand
          j-more-btn
        "
      >
        展开查看更多
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tableHeight {
  @apply w-full md:max-h-48;
}
.tableAllHeight {
  @apply w-full;
}
::v-deep(.el-table--striped .el-table__body tr.el-table__row--striped td) {
  background: rgba(43, 141, 254, 0.04);
}
::v-deep(.el-table td) {
  border: none;
  //border-color: rgba(0, 0, 0, 0.02);
}
::v-deep(.el-table th.is-leaf, .el-table td) {
  border: none;
}
::v-deep(.el-table td, .el-table th.is-leaf) {
  border: none;
}

.heco-list {
  &.more {
    .j-more-btn {
      display: none;
    }
  }
  &:not(.more) {
    max-height: 100px;
    overflow: hidden;
  }
}

.j-more-btn {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
}
</style>
