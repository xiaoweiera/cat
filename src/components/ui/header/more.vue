<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  list: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="py-6 wrap-menu-more text-kdFang text-white">
    <!-- 更多菜单左侧空白部分 -->
    <div class="wrap-men-main">
      <ul class="clearfix">
        <li class="items" v-for="(data, index) in list" :key="index">
          <label>{{ data.name }}</label>
          <template v-if="data.children">
            <div class="wrap-item-box" v-for="(item, idx) in data.children" :key="`${index}-${idx}`">
              <a class="clearfix" v-router="item.href" v-if="item.more">
                <div class="float-left pr-2">
                  <IconFont :type="item.icon" size="40"/>
                </div>
                <div class="float-left">
                  <h3 class="flex items-center">
                    <span class="text-sm font-medium">{{ item.name }}</span>
                    <IconFont class="ml-1 arrow" type="icon-a-rightarrow" size="12"></IconFont>
                  </h3>
                  <p class="text-xs text-white text-opacity-65 font-light">{{ item.desc }}</p>
                </div>
              </a>
            </div>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrap-menu-more {
  @screen lg {
    @apply pl-38; /* logo 宽度 w-28 + margin-left 10 */
    .wrap-men-main {
      @apply pl-6;
    }
  }
  @screen xl {
    .wrap-men-main {
      @apply pl-10;
    }
  }
}

.clearfix {
  zoom: 1;
  @apply block;
  &:after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden
  }
}

.items {
  @apply float-left ml-16;
  &:first-child {
    @apply ml-0;
  }

  label {
    border-bottom-width: 1px;
    @apply text-sm font-medium mb-3;
    @apply block pb-3 min-w-39 border-solid border-white border-opacity-25;
  }
  .wrap-item-box {
    @apply mb-5;
    &:last-child {
      @apply mb-0;
    }
    /*
    &.active, &:hover {
      a {
        &[href] {
          h3 {
            @apply text-global-primary;
          }
        }
      }
    }
    */
    .arrow {
      @apply flex opacity-0 invisible;
      transition: all 0.2s;
    }
    &:hover {
      .arrow {
        @apply opacity-100 visible;
      }
    }
  }
}

</style>
