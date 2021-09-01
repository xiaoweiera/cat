<script setup lang="ts">
import { env } from '~/lib/process'

const menus = [
  {
    label: 'Dapp',
    list: [
        'DeFi 排行榜', 'NFT 排行榜', 'GameFi 排行榜', 'DeFi 新项目', 'NFT 新项目', 'GameFi 新项目'
    ]
  }, {
    label: 'DeFi',
    list: [
      '挖矿 APY', '借贷 APR', 'DEX 聪明钱'
    ]
  }, {
    label: '数据',
    list: [
      '数据图表', '数据监控', '数据研报告'
    ]
  }, {
    label: '相关服务',
    list: [
      'GrowthPad 收录', 'APY 大全收录', '数据指标收录', '数据研报服务', '数据导航收录'
    ]
  }
]

</script>

<template>
  <div class="w-full wrap-footer-box">
    <div class="wrap-footer">
      <div class="text-global-highTitle text-opacity-65">
        <ul class="flex justify-between">
          <template v-for="(data, index) in menus" :key="index">
            <li>
              <label class="menu-label">{{ data.label }}</label>
              <div class="pt-6">
                <template v-for="(item, idx) in data.list" :key="`${index}-${idx}`">
                  <div class="menu-item text-sm">{{ item }}</div>
                </template>
              </div>
            </li>
          </template>

          <li class="w-27">
            <label class="menu-label">App 下载</label>
            <div class="pt-6">
              <a class="block border border-solid border-global-highTitle border-opacity-25 rounded menu-item">
                <div class="py-1.5 px-2.5 flex items-center">
                  <IconFont class="flex" type="icon-apple" size="24"/>
                  <div class="ml-2 whitespace-nowrap">
                    <p class="block download"></p>
                    <p class="block text-xs">App Store</p>
                  </div>
                </div>
              </a>
              <a class="block border border-solid border-global-highTitle border-opacity-25 rounded menu-item">
                <div class="py-1.5 px-2.5 flex items-center">
                  <IconFont class="flex" type="icon-android" size="24"/>
                  <div class="ml-2 whitespace-nowrap">
                    <p class="block download"></p>
                    <p class="block text-xs">Android</p>
                  </div>
                </div>
              </a>
              <a class="block border border-solid border-global-highTitle border-opacity-25 rounded menu-item">
                <div class="py-1.5 px-2.5 flex items-center">
                  <IconFont class="flex" type="icon-testflight" size="24"/>
                  <div class="ml-2 whitespace-nowrap">
                    <p class="block download"></p>
                    <p class="block text-xs">TestFlight</p>
                  </div>
                </div>
              </a>
            </div>
          </li>
        </ul>
      </div>

      <div class="pt-8">
        <div class="pb-8 border-t border-solid border-global-highTitle border-opacity-6"></div>
      </div>

      <div class="flex items-end justify-between text-global-highTitle text-opacity-65">
        <a class="flex items-end" v-router="env.dashboard">
          <div class="inline-block">
            <img class="min-w-28" src="https://res.ikingdata.com/common/logo.svg">
          </div>
          <div class="inline-block ml-6">
            <span class="text-sm">数据赋能 DeFi，快人一步遇见财富</span>
          </div>
        </a>
        <div class="flex items-center">
          <IconFont type="icon-email" class="ml-6 cursor-pointer"/>
          <IconFont type="icon-telegram" class="ml-6 cursor-pointer"/>
          <IconFont type="icon-twitter" class="ml-6 cursor-pointer"/>
          <IconFont type="icon-wechat" class="ml-6 cursor-pointer"/>
          <IconFont type="icon-weibo1" class="ml-6 cursor-pointer"/>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.wrap-footer-box {
  background-color: #F6F9FC;
  @apply py-16;
}

.wrap-footer {
  @screen xl {
    @apply w-300 mx-auto;
  }

  .menu-label {
    @apply text-global-highTitle text-lg font-medium;
  }
  .download {
    @apply h-2.5;
    $url: "https://res.ikingdata.com/common/downloadfrom.png";
    background: url($url) no-repeat center / contain;
  }
  .menu-item {
    @apply mb-4;
    &:last-child {
      @apply mb-0;
    }
  }
}
</style>
