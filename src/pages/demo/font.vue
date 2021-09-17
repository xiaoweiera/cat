<script setup lang="ts">
import { ref } from 'vue'
/*
'48': ['3rem', '3rem'], // 一级标题
    '32': ['2rem', '2rem'], // 二级标题
    '24': ['1.5rem', '1.5rem'], // 三级标题
    '20': ['1.25rem', '1.25rem'], // 20px 20px行高
    '18': ['18px', '1.5rem'], // 四级标题 24行高
    '16': ['1rem', '1rem'], // 五级标题
    '14': ['0.875rem', '18px'], // 正文
    '14-16': ['0.875rem', '1rem'], // 正文
    '14-20': ['0.875rem', '1.25rem'], // 正文，行高 20px
    '13': ['13px', '18px'],
    '12': ['0.75rem', '1rem'], // 描述文字 12px
 */
const list = ref<any[]>([
  { label: '一级标题', value: 'text-48' },
  { label: '二级标题', value: 'text-32' },
  { label: '三级标题', value: 'text-24' },
  { label: '数字 20', value: 'text-20' },
  { label: '四级标题', value: 'text-18' },
  { label: '五级标题', value: 'text-16' },
  { label: '正文', value: 'text-14' },
  { label: '数字', value: 'text-14-16' },
  { label: '正文(行高20)', value: 'text-14-20' },
  { label: '描述文字', value: 'text-13' },
  { label: '描述文字', value: 'text-12' },
])
</script>

<template>
  <div class="p-10">
    <div>
      <el-table :data="list" border class="w-full">
        <el-table-column prop="label" label="名称" width="120px" class-name="text-14"></el-table-column>
        <el-table-column prop="value" label="字号大小">
          <template #default="scope">
            <div>
              <span class="block text-12">class="{{ scope.row.value }}"</span>
              <span class="block" :class="scope.row.value">{{ scope.row.value }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="value" label="数字(text-number)">
          <template #default="scope">
            <div>
              <span class="block text-12">class="text-number {{ scope.row.value }}"</span>
              <span class="block text-number" :class="scope.row.value">{{ scope.row.value }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="value" label="font-b">
          <template #default="scope">
            <div>
              <span class="block text-12">class="font-b {{ scope.row.value }}"</span>
              <span class="block font-b" :class="scope.row.value">{{ scope.row.value }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="value" label="font-m">
          <template #default="scope">
            <span class="block text-12">class="font-m {{ scope.row.value }}"</span>
            <span class="block font-m" :class="scope.row.value">{{ scope.row.value }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="value" label="font-r">
          <template #default="scope">
            <span class="block text-12">class="font-r {{ scope.row.value }}"</span>
            <span class="block font-r" :class="scope.row.value">{{ scope.row.value }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>



// @formatter:off
<route lang="yaml">
meta:
  layout: all
</route>
// @formatter:off
