<script setup lang="ts">
import { menu } from '~/logic/menu'
import I18n from '~/utils/i18n/index'
import { headerTag } from '~/store/header/login'
</script>
<template>
  <div class="relative pc-nav-main">
    <div class="ml-12 flex items-center cursor-pointer">
      <IconFont class="mb-1" type="nav-more" size="xl"></IconFont>
      <span
        class="
          ml-1.5
          inline-block
          text-kd16px24px text-global-default
          opacity-85
        "
      >{{ I18n.nav.product }}</span>
      <img
        class="inline-block w-3 ml-1.5"
        src="https://res.ikingdata.com/nav/navDown.png"
        alt=""
      />
    </div>
    <div class="pc-nav-box pt-3">
      <div class="font-kdFang flex p-6 tipContainer">
        <template v-for="item in menu">
          <div class="twoMl flex-1 min-w-50">
            <div
              class="
                mb-0.25
                whitespace-pre-line
                text-global-default
                opacity-65
                text-kd14px18px
              "
            >
              {{ item.name }}
            </div>
            <template v-for="child in item.children">
              <a
                v-router="child.href"
                target="_blank"
                class="mt-5 flex items-center relative hoverHover"
              >
                <img :src="child.icon" alt="" />
                <div class="flex flex-col ml-2.5">
                  <img
                    v-if="child.badge"
                    class="w-13 absolute -top-4 -right-6"
                    :src="I18n.nav.soonLine"
                    alt=""
                  />
                  <div class="flex items-center">
                    <span class="childName inline-block whitespace-pre-line">{{
                      child.name
                    }}</span>
                    <img
                      class="w-3 ml-1 imgShow"
                      src="https://res.ikingdata.com/nav/navRight.jpg"
                      alt=""
                    />
                  </div>
                  <span class="desc">{{ child.desc }}</span>
                </div>
              </a>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  max-width: none !important;
}
.tipContainer {
  border-radius: 6px;
}
.pc-nav-box {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 0;
  min-width: 768px;
  visibility: hidden;
  transition: all 0.3s;
  opacity: 0;
  & > .tipContainer {
    background: #fff;
  }
}
.pc-nav-main {
  &:hover {
    .pc-nav-box {
      visibility: visible;
      opacity: 1;
      z-index: 999;
    }
  }
}

.hoverShow {
  display: block;
}
.imgShow {
  display: none;
}

.twoMl:nth-child(n + 2) {
  @apply ml-12;
}
.desc {
  @apply text-global-default opacity-65 text-kd12px16px font-normal;
}
.selectName {
  @apply text-global-primary  font-medium text-kd15px150;
}
.name {
  @apply text-global-default opacity-65 text-kd14px18px;
}
.childName {
  @apply text-global-default opacity-85 text-kd15px150;
}
.hoverHover:hover {
  .imgShow {
    display: block;
  }
  .childName {
    @apply text-global-primary  font-medium text-kd15px150;
  }
  @apply text-global-primary  font-medium text-kd15px150;
}
</style>
