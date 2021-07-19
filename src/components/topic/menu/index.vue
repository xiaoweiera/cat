<script setup lang="ts">
  import { defineProps } from 'vue'
  import { toNumber } from '~/utils/index'
  // @ts-ignore
  import { menuList, isChecked, isChildren } from '~/logic/topic/menu'

  const props = defineProps({
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
    },
    padding: {
      type: Number,
      default () {
        return 0
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

  // 动态计算 class 名称
  // @ts-ignore
  const getClassName = function(item: any) {
    const tmp = {
      '4': 'pl-4',
      '14': 'pl-14',
      '24': 'pl-24',
      '34': 'pl-34',
      '44': 'pl-44'
    }
    let key = 4
    const className = []
    if (props.padding) {
      key += toNumber(props.padding, 0)
    }
    // @ts-ignore
    className.push(tmp[key])
    if (isParent(item)) {
      className.push()
    }

    if (isChecked(item)) {
      className.push('active')
    }
    return className
  }

</script>

<template>
  <template v-for="(item, index) in list" :key="index">
    <div class="menu-item">
      <template v-if="isChildren(item)">
        <!-- 默认选中 -->
        <input class="menu-radio" type="radio" checked :id="item.mid" :name="redioName" v-if="len(item.children)"/>
      </template>
      <template v-else>
        <input class="menu-radio" type="radio" :id="item.mid" :name="redioName" v-if="len(item.children)"/>
      </template>

      <TopicMenuName class="menu-label cursor-pointer pr-4 py-3 font-kdFang block" :class="getClassName(item)" :data="item" :for="item.mid">
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
      <div class="menu-children" v-if="len(item.children)">
        <TopicMenu :list="item.children" :padding="padding + 10" icon-size="base"></TopicMenu>
      </div>
    </div>
  </template>
</template>

<style scoped lang="scss">
  %active {
    color: #2b8dff;
  }
  .menu-children {
    max-height: 0;
    visibility: hidden;
    transition: all 0.3s;
    overflow: hidden;
  }
  .menu-radio {
    visibility: hidden;
    display: none;
    width: 1px;
    height: 1px;
    transform: scale(0.1);
    &:checked {
      & ~ .menu-children {
        visibility: visible;
        height: auto;
        max-height: 300px;
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
    &:hover, &.active {
      @extend %active;
      background: rgba(43,141,255,.12941);
    }
  }

  .dot {
    text-align: center;
    line-height: 20px;
    width: 22px;
    height: 22px;
    display: inline-block;
    color: #2b8dff;
    border-radius: 50%;
    background: rgba(43,141,255,.1);
    border: .5px solid rgba(43,141,255,.1);
  }
</style>

