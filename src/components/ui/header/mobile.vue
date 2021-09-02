<script setup lang="ts">
import I18n from '~/utils/i18n/index'
import { defineProps } from 'vue'
import { env } from '~/lib/process'

defineProps({
  menus: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="ui-mobile-menu">
    <input class="menu-active hidden" type="checkbox" name="ui-header-mobile" id="ui-header-mobile">
    <label class="flex cursor-pointer select-none" for="ui-header-mobile">
      <IconFont class="icon-btn-on" type="icon-gengduo1" size="24"/>
      <IconFont class="icon-btn-off text-white" type="icon-xClose" size="24"/>
    </label>
    <div class="wrap-ui-mobile top-header">
      <el-container direction="vertical" class="h-full w-full">
        <el-main class="p-0">
          <UiHeaderMobilelist :menus="menus"></UiHeaderMobilelist>
        </el-main>
        <el-footer height="initial" class="p-0">
          <div class="px-4 pb-4 text-kdFang text-white">
            <a class="flex items-center justify-center h-16 bg-global-darkblue rounded-xl" v-router="env.appDownload">
              <IconFont class="flex" type="icon-shouji" size="24"></IconFont>
              <span class="text-base ml-2 text-base ">{{ I18n.common.nav.download }}</span>
            </a>
          </div>
        </el-footer>
      </el-container>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ui-mobile-menu {
  .icon-btn-on {
    @apply flex;
  }
  .icon-btn-off {
    @apply hidden;
  }
}
.wrap-ui-mobile {
  @apply fixed left-0 right-0 bottom-0 z-1000 hidden;
  background-color: #0056C3;
}
.menu-active {
  &:checked {
    & ~ label {
      .icon-btn-on {
        @apply hidden;
      }
      .icon-btn-off {
        @apply flex;
      }
    }
    & ~ .wrap-ui-mobile {
      @apply block;
    }
  }
}
</style>
