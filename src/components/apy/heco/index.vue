<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getHecoDetail } from '~/api/apy'
// @ts-ignore
import { header, mobileHeader, transform } from '~/logic/apy/heco'
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
  <div class="flex-1 px-4 font-kdFang hec-main">
    <div class="pt-4">
      <div class="text-center">
        <span class="text-2xl inline-block title">HECO 节点竞选</span>
        <div class="inline-block ml-1 md:hidden">
          <UiPopover>
            <template #reference>
              <IconFont class="flex" type="help" size="base"></IconFont>
            </template>
            <template #content>
              <p class="leading-loose">
                <span class="block">
                  1 投票方式：用户通过质押 HT 的方式向候选人投票，1HT代表1票，仅能投给一个候选人，本次竞选开放11个主节点，11个备选节点；HT质押量排名前11的候选人为主节点，第12-22名为备选节点。
                </span>
                <span class="block">2 投票周期：节点排名根据用户投票数更新，奖励每6小时发放。</span>
                <span class="block">3 退出机制：投票用户可随时退出节点投票并取回HT，取回的HT锁定大约3天后到账。</span>
              </p>
            </template>
          </UiPopover>
        </div>
      </div>
    </div>
    <div class="pt-2 text-sm desc text-center ">
      <span>本轮投票总票数：</span>
      <span class="ml-1">3,642,110 HT</span>
    </div>
    <div class="relative heco-list mt-4" :class="{ more: isMore }">
      <!-- pc -->
      <el-table class="hidden md:block" :data="datalist" stripe :header-cell-style="headerBg">
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
                <p class="whitespace-nowrap">{{ scope.row[item.key] }}</p>
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
      <!-- 移动 -->
      <el-table class="block md:hidden" :data="datalist" stripe :header-cell-style="headerBg">
        <el-table-column
          type="index"
          width="50"
          header-align="center"
        ></el-table-column>
        <template v-for="(item, index) in mobileHeader" :key="index">
          <!-- 节点名称 -->
          <el-table-column
            v-if="item.key === 'node_name'"
            :prop="item.key"
            :label="item.label"
            :fixed="item.fixed"
          >
            <template #default="scope">
              <div class="flex items-center">
                <IconFont
                  v-if="scope.row.icon_url"
                  :type="scope.row.icon_url"
                  class="mr-2"
                  size="2xl"
                ></IconFont>
                <p class="whitespace-nowrap">{{ scope.row[item.key] }}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-else
            :prop="item.key"
            :label="item.label"
            :fixed="item.fixed"
          ></el-table-column>
        </template>
      </el-table>
      <div class="text-global-primary text-kd16px24px j-more-btn flex items-center justify-center">
        <span class="cursor-pointer" @click="isMore = true">展开查看更多</span>
      </div>
      <div class="pt-4 pb-4 rule-desc">
        <h4 class="text-base">投票规则:</h4>
        <p class="pt-1.5 text-xs whitespace-pre-wrap">
          <span class="block">
            1 投票方式：用户通过质押 HT 的方式向候选人投票，1HT代表1票，仅能投给一个候选人，本次竞选开放11个主节点，11个备选节点；HT质押量排名前11的候选人为主节点，第12-22名为备选节点。
          </span>
          <span class="block">2 投票周期：节点排名根据用户投票数更新，奖励每6小时发放。</span>
          <span class="block">3 退出机制：投票用户可随时退出节点投票并取回HT，取回的HT锁定大约3天后到账。</span>
        </p>
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

.title {
  color: #033666;
}

.desc {
  color: rgba(37, 62, 111, 0.65);
}

.hec-main {
  background: #fff;
}

.heco-list {

  &.more {
    .j-more-btn {
      display: none;
    }
  }
  &:not(.more) {
    max-height: 244px; /* 最多展示三行 */
    overflow: hidden;
    .rule-desc {
      display: none;
    }
  }

}


.j-more-btn {
  height: 50px;
  background: #fff;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
}
</style>
