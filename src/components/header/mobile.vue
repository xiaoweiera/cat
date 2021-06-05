<script setup lang="ts">
import { ref } from 'vue'
// @ts-ignore
import menuData from '~/logic/menu'
// @ts-ignore
const inputMenu = ref<boolean>(false)
</script>

<template>
  <input
    id="nav-mobile-menu"
    v-model="inputMenu"
    class="nav-menu-status"
    name="nav-mobile-menu"
    type="checkbox"
  />
  <label
    class="icon-box inline-flex items-center justify-center"
    for="nav-mobile-menu"
  >
    <IconFont class="more-button" type="more" size="2xl"></IconFont>
    <IconFont class="close-button" type="close" size="2xl"></IconFont>
  </label>
  <div class="nav-menu-box">
    <div class="nav-menu-main pt-4 px-4" @scroll.stop.prevent="scroll">
      <HeaderNavitem :list="menuData" index="0"></HeaderNavitem>
    </div>
  </div>
</template>

<style scoped lang="scss">
.icon-box {
  width: 26px;
  height: 26px;
}
.nav-menu-status {
  display: none;
  & ~ .icon-box {
    .more-button {
      display: inline-block;
    }
    .close-button {
      display: none;
    }
  }
  &:checked {
    & ~ .icon-box {
      .more-button {
        display: none;
      }
      .close-button {
        display: inline-block;
      }
    }
    & ~ .nav-menu-box {
      visibility: visible;
      opacity: 1;
      transform: translate(0, 0);
      background: #fff;
    }
  }
}

.nav-menu-main {
  width: 100%;
  height: 100%;
  display: block;
  overflow-x: hidden;
  overflow-y: auto;
}

.nav-menu-box {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s;
  transform: translate(-100%, 0);
}
</style>
