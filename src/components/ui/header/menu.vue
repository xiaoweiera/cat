<script setup lang="ts">
import { defineProps, reactive } from 'vue'

const props = defineProps({
  menus: {
    type: Array,
    default: () => []
  }
})

// 空格式
const moreData = reactive<object>({
  name: '',
  children: props.menus,
  subHeader: true
})

</script>

<template>
  <div class="text-kdFang text-white">
    <div class="wrap-menu-box flex font-medium">
      <!-- 更多菜单 -->
      <UiHeaderMenucontent class="wrap-menu-item menu-more" :data="moreData">
        <template #label>
          <span class="px-1.5 flex">
            <IconFont class="flex" type="icon-gengduo1" size="24"></IconFont>
          </span>
        </template>
        <template #children="scope">
          <div class="menu-children px-6">
            <UiHeaderMore :list="scope.list"></UiHeaderMore>
          </div>
        </template>
      </UiHeaderMenucontent>

      <!-- 快捷菜单 -->
      <template v-for="(data, index) in menus" :key="index">
        <UiHeaderMenucontent class="wrap-menu-item" :data="data">
          <template #children="scope">
            <div class="menu-children">
              <UiHeaderSub :list="scope.list"></UiHeaderSub>
            </div>
          </template>
        </UiHeaderMenucontent>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">

%active {
  /* 通过 theme 获取 tailwind 中定义的颜色值 */
  --menu-content-bg: theme('colors.global.darkblue');
  --menu-content-text: theme('colors.white');
  &:before, &:after {
    $bg: "/assets/ui/header/menu.png?r=1";
    @apply absolute h-full w-14.5 top-0;
    background-image: url($bg);
    background-position: left bottom;
    background-repeat: no-repeat;
    background-size: contain;
    content: "";
    @apply opacity-0 invisible cursor-pointer;
  }
  &:before {
    left: -25.5px;
  }
  &:after {
    right: -25px;
    transform: rotateY(180deg);
  }
  .menu-children {
    @apply fixed top-15 left-0 right-0 opacity-0 invisible z-1000;
  }
  &.menu-more {
    /* 更多菜单背景图 */
    &:before, &:after {
      $bg: "/assets/ui/header/darkmenu.png?r=1";
      background-image: url($bg);
    }
  }
}

%animation {
  --menu-content-bg: theme('colors.white');
  --menu-content-text: theme('colors.global.primary');
  &:before, &:after {
    @apply visible opacity-100;
  }
  .menu-children {
    visibility: visible;
    opacity: 1;
  }
  &.menu-more{
    --menu-content-bg: #0056C3;
    .menu-children {
      background-color: var(--menu-content-bg);
    }
  }
}

.wrap-menu-box {
  @apply h-full;
  .wrap-menu-item {
    @extend %active;
  }
  &:not(:hover) {
    .wrap-menu-item {
      &.active {
        @extend %animation;
      }
    }
  }
  &:hover {
    .wrap-menu-item {
      &:hover {
        @extend %animation;
      }
    }
  }
}
</style>
