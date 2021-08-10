<script setup lang="ts">
/**
 * @file 币种分析
 * @author svon.me@gmail.com
 */

import { ref } from 'vue'
import { useProvide } from '~/utils/use/state'
const [ date ] = useProvide('uiDate')

const dialogVisible = ref<boolean>(true)
const radio1 = ref<string>('1')
const radio2 = ref<string>('')

const handleClose = function() {
}

</script>

<template>
  <UiLayoutMenu>
    <template #menu>
      <span>左侧菜单</span>
    </template>

    <template #content>
      <div class="p-5">
        <UiDateDay :shortcuts="['7', { value: '30', 'default': true }, '180']"></UiDateDay>
      </div>

      <div>{{ date }}</div>

      <el-dialog custom-class="diy-dialog" title="添加币种 & LP" v-model="dialogVisible" :width="372" :before-close="handleClose">
        <div class="px-5 py-1.5 flex">
          <div class="data-list w-1/2">
            <el-radio-group v-model="radio1" size="small" class="w-full">
              <el-radio-button class="w-1/2" label="1">单币</el-radio-button>
              <el-radio-button class="w-1/2" label="2">LP</el-radio-button>
            </el-radio-group>
            <div class="mt-2">
              <div>
                <el-input class="w-full" size="small" placeholder="请输入内容" value="">
                  <template #prefix>
                    <i class="el-input__icon el-icon-search"></i>
                  </template>
                </el-input>
              </div>
              <div class="h-68 pt-1 overflow-auto">
                <el-radio-group class="block w-full" v-model="radio2">
                  <div class="mt-2 h-5 flex items-center" v-for="i in 20" :key="i">
                    <el-radio :label="i">
                      <span class="text-global-highTitle text-xs font-normal">BTC/ETH</span>
                    </el-radio>
                  </div>
                </el-radio-group>
              </div>
            </div>
          </div>
          <div class="ml-4 flex-1">
            <div class="leading-8">
              <span class="text-global-highTitle text-opacity-85">已选</span>
            </div>
            <div class="h-76 mt-2">
              <div class="h-full border border-global-highTitle border-opacity-6 rounded-md bg-global-bodyTwo">

              </div>
            </div>
          </div>
        </div>
        <template #footer>
          <div class="flex">
            <el-button class="flex-1" @click="dialogVisible = false">取 消</el-button>
            <el-button class="flex-1" type="primary" @click="dialogVisible = false">确 定</el-button>
          </div>
        </template>
      </el-dialog>

    </template>
  </UiLayoutMenu>

</template>

<style scoped lang="scss">
  .data-list {
    ::v-deep(.el-radio-button__inner) {
      @apply inline-block w-full;
    }
  }
</style>
