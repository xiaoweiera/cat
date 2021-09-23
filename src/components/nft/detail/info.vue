<script setup lang="ts">
import { toUpper } from 'ramda'
</script>

<template>
  <div class="border-0 border-t border-solid border-global-highTitle border-opacity-6">
    <div class="py-4 flex text-global-highTitle text-opacity-45">
      <div class="flex-1 w-1">
        <p class="text-14-18">当前价格</p>
        <div class="text-global-numGreen mt-1">
          <IconFont type="eth"/>
          <span class="text-26 font-bold text-number mx-1">0.01</span>
          <span class="text-12-18">{{ toUpper('eth') }}</span>
        </div>
      </div>
      <div class="flex-1 w-1 line">
        <p class="text-14-18">发行数量</p>
        <div class="mt-1">
          <p class="text-26 font-bold text-number text-global-highTitle">7,777</p>
        </div>
      </div>
      <div class="flex-1 w-1 line">
        <p class="text-14-18">所在公链</p>
        <div class="text-12-18 text-global-highTitle mt-1">
          <span class="text-26 font-bold text-number">3</span>
          <span class="mx-0.5">条</span>
          <span>(HECO、BSC、ETH)</span>
        </div>
      </div>
    </div>
  </div>
  <div class="border-0 border-t border-b border-solid border-global-highTitle border-opacity-6">
    <div class="py-4">
      <div class="flex flex-wrap text-14-18">
        <div class="w-1/3">
          <div class="flex items-center">
            <span class="pr-3 min-w-17 inline-block text-global-highTitle text-opacity-45">官网地址</span>
            <a class="underline text-global-darkblue">https://kingdata.com</a>
          </div>
        </div>

        <div class="w-1/3">
          <div class="flex items-center">
            <span class="pr-3 min-w-17 inline-block text-global-highTitle text-opacity-45">审计公司</span>
            <a class="mr-3 underline text-global-darkblue">北京链安</a>
            <a class="mr-3 underline text-global-darkblue">北京链安</a>
          </div>
        </div>

        <div class="w-1/3">
          <div class="flex items-center">
            <span class="pr-3 min-w-17 inline-block text-global-highTitle text-opacity-45">社交媒体</span>
            <IconFont class="mr-3" type="telegram" bright/>
            <IconFont class="mr-3" type="discord" bright/>
            <IconFont class="mr-3" type="twitter" bright/>
            <IconFont class="mr-3" type="wechat" bright/>
          </div>
        </div>

        <div class="w-1/3 mt-3">
          <div class="flex items-center">
            <span class="pr-3 min-w-17 inline-block text-global-highTitle text-opacity-45">上线时间</span>
            <span class="text-global-highTitle">2021.09.01 11:00</span>
          </div>
        </div>

        <div class="w-1/3 mt-3">
          <span class="pr-3 min-w-17 inline-block text-global-highTitle text-opacity-45">项目状态</span>
          <span>
          <span class="text-global-highTitle">进行中</span>
        </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.line {
  border-left-width: 1px;
  @apply pl-6;
  @apply border-solid border-global-highTitle border-opacity-10;
}
</style>
