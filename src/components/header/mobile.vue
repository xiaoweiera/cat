<script setup lang="ts">
import { ref } from 'vue'
import I18n from '~/utils/i18n/index'

// @ts-ignore
import menuData from '~/logic/menu'
// @ts-ignore
const inputMenu = ref<boolean>(false)

const download = ref<string>('https://www.kingdata.com/download')
</script>

<template>
  <input
    id="nav-mobile-menu"
    v-model="inputMenu"
    class="nav-menu-status"
    name="nav-mobile-menu"
    type="checkbox"
  />
  <label class="icon-box inline-flex items-center justify-center mt-2" for="nav-mobile-menu">
    <IconFont class="text-kd24px36px more-button" type="icon-gengduo" size="3xl" ></IconFont>
    <IconFont class="close-button" type="close" size="2xl"></IconFont>
  </label>
  <div class="nav-menu-box">
    <div class="nav-menu-main pt-4 px-4" @scroll.stop.prevent="scroll">
      <HeaderNavitem :list="menuData" index="0"></HeaderNavitem>
    </div>
    <div class="operation flex font-kdFang">
      <a class="flex-1 h-full flex items-center justify-center" :href="download" target="_blank">
        <IconFont type="mobile" size="2xl"></IconFont>
        <span class="text-base ml-2">{{ I18n.common.nav.download }}</span>
      </a>
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
      background: #fafafa;
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
  $operationHeight: 64px;
  padding-bottom: $operationHeight;
  .operation {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: $operationHeight;
    color: rgba(37, 62, 111, 0.85);
    background: #fff;
  }
  &:after {
    content: none;
    position: absolute;
    left: 50%;
    bottom: $operationHeight / 2;
    width: 1px;
    height: 16px;
    background: rgba(37, 62, 111, 0.16);
    transform: translate(-50%, 50%);
  }
}
</style>
