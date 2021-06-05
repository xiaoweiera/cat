<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { toNumber } from '~/utils/index'

const props = defineProps({
  list: {
    type: Array,
    default() {
      return []
    },
  },
  index: {
    type: [Number, String],
    default() {
      return 0
    },
  },
})
// @ts-ignore
const zIndex = computed<number>((): number => {
  const index = toNumber(props.index)
  return index + 1
})
// @ts-ignore
const className = computed<string>((): string => {
  const index = toNumber(props.index)
  return `item-content-${index}`
})

// @ts-ignore
const inputName = (value: number): string => {
  const index = toNumber(props.index)
  return `r-${value}-${index}`
}

// @ts-ignore
const isChildren = (data: any): boolean => {
  const index = toNumber(props.index)
  if (index > 0) {
    if (data && data.children && data.children.length > 0) {
      return true
    }
  }
  return false
}
</script>

<template>
  <ul v-for="(item, key) in list" :key="key">
    <li>
      <template v-if="isChildren(item)">
        <input
          :id="inputName(key)"
          class="radio"
          :name="inputName(key)"
          type="checkbox"
        />
        <label
          class="pb-4 font-kdFang nav-item flex justify-between"
          :class="className"
          :for="inputName(key)"
        >
          <a :v-router="item.children ? '' : item.href" class="block">
            <IconFont
              v-if="item.icon"
              :type="item.icon"
              size="2xl"
              class="mr-2 align-middle"
            ></IconFont>
            <span class="align-middle inline-block">{{ item.name }}</span>
          </a>
          <span>
            <IconFont class="icon-down" type="down" size="2xl"></IconFont>
            <IconFont class="icon-up" type="up" size="2xl"></IconFont>
          </span>
        </label>
        <div class="nav-list">
          <HeaderNavitem :list="item.children" :index="zIndex"></HeaderNavitem>
        </div>
      </template>
      <template v-else>
        <div class="pb-4 font-kdFang nav-item" :class="className">
          <a v-router="item.href" class="block">
            <IconFont
              v-if="item.icon"
              :type="item.icon"
              size="2xl"
              class="mr-2 align-middle"
            ></IconFont>
            <span class="align-middle inline-block">{{ item.name }}</span>
          </a>
        </div>
        <HeaderNavitem :list="item.children" :index="zIndex"></HeaderNavitem>
      </template>
    </li>
  </ul>
</template>

<style scoped lang="scss">
%sub {
  font-size: 14px;
  color: rgba(37, 62, 111, 0.65);
  font-weight: normal;
}
%title {
  font-size: 16px;
  color: rgba(37, 62, 111, 0.85);
  font-weight: 500;
}
.item-content-0 {
  @extend %sub;
}
.item-content-1 {
  @extend %title;
}
.item-content-2 {
  @extend %sub;
}
.item-content-3 {
  @extend %sub;
}
.nav-item {
  line-height: 20px;
  & ~ .nav-list {
    margin-left: 32px;
    padding-left: 16px;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 16px;
      width: 1px;
      background: rgba(69, 91, 133, 0.1);
    }
  }
}
.radio {
  display: none;
  & ~ .nav-list {
    display: none;
  }
  & ~ .nav-item {
    .icon-up {
      display: none;
    }
  }
  &:checked {
    & ~ .nav-item {
      .icon-down {
        display: none;
      }
      .icon-up {
        display: block;
      }
    }
    & ~ .nav-list {
      display: block;
    }
  }
}
</style>
