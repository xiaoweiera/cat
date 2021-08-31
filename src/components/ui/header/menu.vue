<script setup lang="ts">
import { computed } from 'vue'
import { headers } from '~/logic/menu'
import { toArray, map } from '~/utils'
import DBList from '@fengqiaogang/dblist'
const getChildren = function(list: any[]) {
  const db = new DBList(toArray(list))
  return db.select({ header: true })
}

const menus = computed(function() {
  return map(function(data: any) {
    data.children = getChildren(data.children)
    return data
  }, headers)
})

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
      <template v-for="(data, index) in menus" :key="index">
        <template v-if="data.children.length > 0">
          <div class="wrap-menu-item" :class="{'active': index === 1}">
            <div class="menu-content">
              <span>{{ data.name }}</span>
            </div>
            <div class="menu-children">
              <UiHeaderSub :list="data.children"></UiHeaderSub>
            </div>
          </div>
        </template>
        <template v-else>
          <a class="wrap-menu-item" :class="{'active': index === 1}" v-router="data.href">
            <div class="menu-content">
              <span>{{ data.name }}</span>
            </div>
            <div class="menu-children">
              <UiHeaderSub :list="[]"></UiHeaderSub>
            </div>
          </a>
        </template>
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
    transition: all 0.3s;
    @apply fixed top-15 left-0 right-0 opacity-0 invisible z-1000;
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
