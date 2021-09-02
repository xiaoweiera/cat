<script setup lang="ts">
import { env } from '~/lib/process'
import { footers } from '~/logic/menu'
import { ref } from 'vue'

const weChat = ref<string>('https://u.wechat.com/MAbomlcLpQlWPJTAdyhgEPo')
const telegram = ref<string>('https://t.me/KingDataCN')
const twitter = ref<string>('https://twitter.com/KingData_com')
const weibo = ref<string>('https://weibo.com/u/5553600723')

</script>

<template>
  <div class="w-full wrap-footer-box">
    <div class="wrap-footer">
      <div class="text-global-highTitle text-opacity-65">
        <ul class="lg:flex lg:justify-between">
          <template v-for="(data, index) in footers" :key="index">
            <li class="menu-list-box">
              <div class="menu-label hidden lg:block">
                <span class="text-lg">{{ data.label }}</span>
              </div>
              <template v-if="index > 0">
                <input class="menu-active hidden" :id="`footer-menu-${index}`" type="checkbox" name="`footer-menu-${index}`">
              </template>
              <template v-else>
                <input class="menu-active hidden" :id="`footer-menu-${index}`" type="checkbox" checked name="`footer-menu-${index}`">
              </template>
              <label class="menu-label cursor-pointer block lg:hidden" :for="`footer-menu-${index}`">
                <span class="select-none w-full flex justify-between items-center">
                  <span class="text-base">{{ data.label }}</span>
                  <IconFont class="arrow" type="icon-arrow-down" size="16"/>
                </span>
              </label>
              <div class="pt-6 menu-content">
                <template v-for="(item, idx) in data.children" :key="`${index}-${idx}`">
                  <template v-if="item.href">
                    <a class="menu-item text-sm hover:text-global-primary" v-router="item.href">{{ item.name }}</a>
                  </template>
                  <template v-else-if="item.qrcode">
                    <div class="menu-item">
                      <UiFooterHover :href="item.qrcode" :desc="item.desc">
                        <span class="text-sm">{{ item.name }}</span>
                      </UiFooterHover>
                    </div>
                  </template>
                  <template v-else>
                    <span class="menu-item text-sm">{{ item.name }}</span>
                  </template>
                </template>
              </div>
            </li>
          </template>

          <li class="menu-list-box">
            <div class="menu-label hidden lg:block">
              <span class="text-lg">App 下载</span>
            </div>
            <input class="menu-active hidden" id="footer-menu-download" type="checkbox" name="footer-menu-download">
            <label class="menu-label cursor-pointer block lg:hidden" for="footer-menu-download">
              <span class="select-none w-full flex justify-between items-center">
                <span class="text-base ">App 下载</span>
                <IconFont class="arrow" type="icon-arrow-down" size="16"/>
              </span>
            </label>
            <div class="pt-6 w-27 menu-content">
              <div class="menu-item">
                <UiFooterHover :href="env.appDownload" desc="扫码下载APP">
                  <div class="border border-solid border-global-highTitle border-opacity-25 rounded">
                    <div class="py-1.5 px-2.5 flex items-center">
                      <IconFont class="flex" type="icon-android" size="24"/>
                      <div class="ml-2 whitespace-nowrap">
                        <p class="block download"></p>
                        <p class="block text-xs">App Store</p>
                      </div>
                    </div>
                  </div>
                </UiFooterHover>
              </div>

              <div class="menu-item">
                <UiFooterHover :href="env.appDownload" desc="扫码下载APP">
                  <div class="border border-solid border-global-highTitle border-opacity-25 rounded">
                    <div class="py-1.5 px-2.5 flex items-center">
                      <IconFont class="flex" type="icon-android" size="24"/>
                      <div class="ml-2 whitespace-nowrap">
                        <p class="block download"></p>
                        <p class="block text-xs">Android</p>
                      </div>
                    </div>
                  </div>
                </UiFooterHover>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="pt-0 lg:pt-8">
        <div class="pb-4 lg:pb-8 border-t border-solid border-global-highTitle border-opacity-6"></div>
      </div>

      <div class="lg:flex lg:items-end lg:justify-between text-global-highTitle text-opacity-65">
        <div>
          <a class="md:flex md:items-end" v-router="env.dashboard">
            <div>
              <img class="min-w-28" src="https://res.ikingdata.com/common/logo.svg">
            </div>
            <div class="md:ml-6">
              <span class="text-sm">数据赋能 DeFi，快人一步遇见财富</span>
            </div>
          </a>
        </div>
        <div class="flex items-center mt-5 lg:mt-0">
<!--          <a class="cursor-pointer" href="mailto:kingdata@jinse.com">-->
<!--            <IconFont type="icon-email" class="cursor-pointer"/>-->
<!--          </a>-->

          <div class="flex">
            <UiFooterHover :href="telegram" desc="扫码加入电报群">
              <IconFont type="icon-telegram" class="flex"/>
            </UiFooterHover>
          </div>


          <a class="inline-block ml-6" v-router.blank="twitter">
            <IconFont type="icon-twitter" class="flex"/>
          </a>

          <div class="flex ml-6">
            <UiFooterHover :href="weChat" desc="扫码加入微信群">
              <IconFont type="icon-wechat" class="flex"/>
            </UiFooterHover>
          </div>

          <a class="inline-block ml-6" v-router.blank="weibo">
            <IconFont type="icon-weibo1" class="flex"/>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.wrap-footer-box {
  background-color: #F6F9FC;
  @apply pt-4 pb-8;
  @screen xl {
    @apply py-16;
  }
}

.wrap-footer {
  @apply max-w-300 px-4;
  @screen lg {
    @apply min-w-lg mx-auto;
  }
  @screen xl {
    @apply px-0;
  }


  .download {
    @apply h-2.5;
    $url: "https://res.ikingdata.com/common/downloadfrom.png";
    background: url($url) no-repeat center / contain;
  }
  .menu-item {
    @apply mb-4 block;
    &:last-child {
      @apply mb-0;
    }
  }

  .menu-list-box {
    @apply mb-4;

    .menu-label {
      @apply text-global-highTitle font-medium;
      .arrow {
        @apply flex;
        transition: all 0.3s;
      }
    }

    .menu-content {
      @apply hidden lg:block;
    }
    .menu-active {
      &:checked {
        & ~ .menu-label {
          .arrow {
            transform: rotate(180deg);
          }
        }
        & ~ .menu-content {
          @apply block;
        }
      }
    }
  }
}
</style>
