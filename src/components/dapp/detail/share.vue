<script setup lang="ts">
import { ref, onMounted } from 'vue'
const link = ref<string>('http://kingdata.com')

const discord = ref<string>('https://discord.gg/c9wTAgeAwz')

onMounted(function() {
  link.value = window.location.href
})
</script>

<template>
  <div>
    <div class="flex items-center">
      <IconFont class="mr-1.5" type="key" size="24" bright/>
      <h3 class="text-global-highTitle text-opacity-85 text-18 font-m">解锁财富密码</h3>
    </div>
    <div class="flex mt-3 text-global-highTitle text-opacity-65">
      <div class="flex-1 pr-6 border-0 border-r border-solid border-global-highTitle border-opacity-6">
        <ul class="flex text-center">
          <li class="flex-1 w-1">
            <div class="line">
              <span>
                <b class="text-16 text-number">1</b>
              </span>
            </div>
            <div class="px-3 text-14-18">
              <span class="block">分享至3个</span>
              <span class="block">任意平台或好友</span>
            </div>
          </li>
          <li class="flex-1 w-1">
            <div class="line">
              <span>
                <b class="text-16 text-number">2</b>
              </span>
            </div>
            <div class="px-3 text-14-18">
              <span class="block">发送分享截图至</span>
              <UiFooterHover :href="discord">
                <span class="flex items-center justify-center">
                  <IconFont type="wechat" bright/>
                  <span class="ml-1 text-global-darkblue">Discard</span>
                </span>
              </UiFooterHover>
            </div>
          </li>
          <li class="flex-1 w-1">
            <div class="line">
              <span>
                <b class="text-16 text-number">3</b>
              </span>
            </div>
            <div class="px-3 text-14-18">
              <span class="block">加入优质项目讨论群</span>
              <span class="block">和行业大佬交流信息</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="w-80 pl-6 flex">
        <div class="flex flex-wrap content-between h-17">
          <div>
            <h5 class="text-14-18">分享</h5>
          </div>
          <div class="flex items-center" v-login>
            <el-input :model-value="link" size="small"/>
            <span class="ml-2 flex" v-copy.message="link">
              <IconFont type="copy"/>
            </span>
          </div>
        </div>
        <div class="ml-3 flex">
          <UiQrcode :value="link" width="68" height="68" border/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
ul {
  li {
    .line {
      @apply mb-2 block;
      @apply relative;
      @apply text-white;
      &:before, &:after {
        content: "";
        height: 1px;
        background-color: rgba(9, 217, 142, 0.24);
        @apply absolute top-1/2 w-1/2 transform -translate-y-1/2;
      }
      &:before {
        @apply left-0;
      }
      &:after {
        @apply right-0;
      }
      span {
        @apply inline-block px-1;
        @apply relative z-1;
        &:before{
          content: "";
          @apply bg-white;
          @apply absolute top-0 bottom-0 -left-3 -right-3;
        }
      }
      b {
        @apply inline-block;
        @apply relative z-2;
        font-weight: normal;
        background: #09D98E;
        border-radius: 40px;
        min-width: 32px;
        height: 22px;
        line-height: 22px;
      }
    }
    &:first-child {
      .line {
        &:before {
          content: none;
        }
      }
    }
    &:last-child {
      .line {
        &:after {
          content: none;
        }
      }
    }
  }
}
</style>
