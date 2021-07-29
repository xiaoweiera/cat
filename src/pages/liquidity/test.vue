<script lang="ts" setup>
 const headers = [
  { label: '地址', key: 'address' },
  { label: '净添加量', key: 'netAddNumber' },
  { label: '添加总量', key: 'allNumber' },
  { label: '移除总量', key: 'removeNumber' },
  { label: '参与次数', key: 'joinNumber' },
   { label: '添加次数', key: 'addNumber' },
   { label: '移除次数', key: 'removeCount' }
]
 const data=[
   {
     address:'北京',
     netAddNumber:'1000',
     allNumber:'2000',
     removeNumber:'1200',
     joinNumber:'1100',
     addNumber:'888',
     removeCount:'123'
   },
   {
     address:'石家庄',
     netAddNumber:'1300',
     allNumber:'4000',
     removeNumber:'3200',
     joinNumber:'2100',
     addNumber:'688',
     removeCount:'1231'
   }
 ]
const headerBg = () => {
  return 'background: rgba(43, 141, 254, 0.04)'
}
</script>
<template>
<div class="w-300">
  <el-table class="mt-20" :data="data" stripe >
    <template v-for="(item, index) in headers" :key="index">
      <!-- 节点名称 -->
      <el-table-column
          v-if="item.key === 'node_name'"
          :prop="item.key"
          :label="item.label"
      >
        <template #default="scope">
          <div class="flex items-center">

            <p class="whitespace-nowrap">2</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
          v-else
          :prop="item.key"
          :label="item.label"
      >
        <template #default="scope">
          <span class="text-sm whitespace-nowrap"  :class="item.className">{{ scope.row[item.key] }}</span>
        </template>
      </el-table-column>
    </template>
  </el-table>
</div>


</template>
<style>


</style>
// @formatter:off
<route lang="yaml">
meta:
 layout: liquidityLayout
</route>
// @formatter:off
