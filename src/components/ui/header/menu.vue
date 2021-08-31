<script setup lang="ts">
import { headers } from '~/logic/menu'
</script>

<template>
  <div class="text-kdFang text-white h-15 pt-2.5">
    <div class="wrap-menu-box flex font-medium">
      <div class="wrap-menu-item menu-more">
        <div class="menu-content">
          <span class="px-1.5 flex items-center">
            <IconFont class="default" type="icon-gengduo1" size="24"></IconFont>
            <IconFont class="active" type="icon-gengduo" size="24"></IconFont>
          </span>
        </div>
        <div class="menu-children px-6">
          <UiHeaderMore></UiHeaderMore>
        </div>
      </div>
      <template v-for="(data, index) in headers" :key="index">
        <div class="wrap-menu-item" :class="{'active': index === 1}">
          <div class="menu-content">
            <span>{{ data.name }}</span>
          </div>
          <div class="menu-children">
            <UiHeaderSub :list="data.children"></UiHeaderSub>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">

%active {
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
    @apply -left-6.5
  }
  &:after {
    @apply -right-6.5;
    transform: rotateY(180deg);
  }
  .menu-children {
    @apply fixed top-15 left-0 right-0 opacity-0 invisible z-100;
    transition: all 0.3s;
  }
  &.menu-more {
    .active {
      @apply hidden;
    }
    .default {
      @apply flex;
    }
    &:before, &:after {
      $bg: "/assets/ui/header/darkmenu.png?r=1";
      background-image: url($bg);
    }
  }
}

%animation {
  &:before, &:after {
    @apply visible opacity-100;
  }
  .menu-content {
    @apply bg-white text-global-primary;
  }
  .menu-children {
    visibility: visible;
    opacity: 1;
  }

  &.menu-more{
    .default {
      @apply hidden;
    }
    .active {
      @apply flex;
    }
    .menu-content, .menu-children {
      background-color: #0056C3;
    }
  }
}

.wrap-menu-box {
  @apply h-full;
  .wrap-menu-item {
    @extend %active;
    @apply h-full px-8 relative;
    min-width: 104px;
    .menu-content {
      @apply h-full flex items-center text-base cursor-pointer;
    }
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
