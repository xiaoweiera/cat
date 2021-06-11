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
const isMore = ref(false)
const headerBg = () => {
  return 'background: rgba(43, 141, 254, 0.04)'
}
</script>

<template>
  <div class="flex-1">
    <div class="relative heco-list" :class="{ more: isMore }">
      <el-table :data="datalist" stripe :header-cell-style="headerBg">
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
