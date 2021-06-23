<script setup lang="ts">
  import { defineProps } from 'vue'

  defineProps({
    list: {
      type: Array,
      default () {
        return []
      }
    },
    iconSize: {
      type: String,
      default () {
        return 'base'
      }
    }
  })

  // @ts-ignore
  const len = function(value?: any[]) {
    if (value) {
      return value.length
    }
    return 0
  }
  // @ts-ignore
  const redioName = 'topic-menu'
  // @ts-ignore
  const isParent = function(item?: any) {
    if (item && item.pid === '-1') {
      return true
    }
    return false
  }
</script>

<template>
  <template v-for="(item, index) in list" :key="index">
    <div class="menu-item">
      <input class="menu-radio" type="radio" :id="item.mid" :name="redioName" v-if="len(item.children)"/>
      <TopicMenuName class="menu-label cursor-pointer px-4 py-3 font-kdFang block" :class="{ 'menu-parent': isParent(item) }" :data="item" :for="item.mid">
        <span class="flex items-center justify-between px-0.5">
          <span class="flex items-center">
            <IconFont class="mr-4 inline-flex" :type="item.icon_image" :size="iconSize"></IconFont>
            <b>{{ item.name }}</b>
            <span class="ml-4 dot text-xs" v-if="len(item.children)">{{ len(item.children) }}</span>
          </span>
          <span>
            <template v-if="len(item.children)">
              <IconFont class="flex" type="up" size="mini" suffix="png"></IconFont>
            </template>
          </span>
        </span>
      </TopicMenuName>
      <div class="menu-children ml-10" v-if="len(item.children)">
        <TopicMenu :list="item.children" icon-size="base"></TopicMenu>
      </div>
    </div>
  </template>
</template>

<style scoped lang="scss">
  %active {
    color: #2b8dff;
  }
  .menu-children {
    display: none;
  }
  .menu-radio {
    display: none;
    width: 1px;
    height: 1px;
    transform: scale(0.1);
    &:checked {
      & ~ .menu-children {
        display: block;
      }
      & ~ .menu-label {
        @extend %active;
      }
    }
  }
  .menu-label {
    transition: all 0.3s;
    color: rgba(37,62,111,.65);
    b {
      font-size: 14px;
      font-weight: normal;
    }
    &.menu-parent {
      color: rgba(37,62,111,.85);
      b {
        font-size: 16px;
      }
    }
    &:hover {
      @extend %active;
      background: rgba(43,141,255,.12941);
    }
  }
</style>

