<script setup lang="ts">
import { defineProps } from 'vue'
import { size } from '~/utils'
const props = defineProps({
  list: {
    type: Array,
    default() {
      return []
    },
  },
})
</script>

<template>
  <ul class="block">
    <template v-for="(item, index) in list" :key="index">
      <template v-if="item.children && size(item.children) > 0">
        <li class="block pt-3" v-if="item.more">
          <input type="checkbox" :name="item.id" :id="item.id">
          <label class="flex items-center justify-between" :for="item.id">
            <span class="flex items-center">
              <IconFont v-if="item.icon" class="flex mr-2" :type="item.icon" size="32"/>
              <span class="text-14-18 hidden">{{ item.name }}</span>
              <span class="text-16-24">{{ item.name }}</span>
            </span>
            <IconFont class="arrow" type="icon-arrow-down" size="24"/>
          </label>
          <div class="menu-sub-list">
            <UiHeaderMobilesub :list="item.children"/>
          </div>
        </li>
      </template>
      <template v-else>
        <li class="block pt-3" v-if="item.more">
          <a class="flex items-center" v-router="item.href">
            <IconFont v-if="item.icon" class="flex mr-2" :type="item.icon" size="32"/>
            <span class="text-14-18 hidden">{{ item.name }}</span>
            <span class="text-16-24">{{ item.name }}</span>
          </a>
        </li>
      </template>
    </template>
  </ul>
</template>

<style scoped lang="scss">
.menu-sub-list {
  @apply hidden;
  @apply pl-4 ml-8 relative;
  @at-root .menu-sub-list & {
    @apply ml-3.5;
  }
  &:after {
    @apply absolute;
    @apply top-3 bottom-1 left-0;
    @apply bg-white bg-opacity-24;
    content: "";
    width: 1px;
  }

  .text-14-18 {
    @at-root .menu-sub-list & {
      @apply block;
      & ~ .text-16-24 {
        @apply hidden;
      }
    }
  }
}



.arrow {
  transition: all 0.3s;
}
input {
  @apply hidden;
  &:checked {
    & ~ label {
      .arrow {
        transform: rotate(180deg);
      }
    }
    & ~ .menu-sub-list {
      @apply block;
    }
  }
}
</style>
