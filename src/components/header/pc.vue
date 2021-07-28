<script setup lang="ts">
// @ts-ignore
import { menu } from '~/logic/menu'
// @ts-ignore
import I18n from '~/utils/i18n/index'
// @ts-ignore
import { headerTag } from '~/store/header/login'
</script>
<template>
  <UiNav>
    <template #reference>
      <div class="flex items-center cursor-pointer px-2.5">
        <IconFont class="mb-1" type="nav-more" size="xl"></IconFont>
      </div>
    </template>
    <template #content>
      <div class="font-kdFang flex menu-list">
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
                class="
                  mt-5
                  flex
                  items-center
                  relative
                  whitespace-pre-line
                  hoverHover
                "
              >
                <img :src="child.icon" alt="" />
                <div class="flex flex-col ml-2.5">
                  <div class="flex items-center">
                    <span class="childName relative inline-block whitespace-pre-line">{{child.name }}
                      <img v-if="child.badge" class="w-13 absolute -top-5 -right-11" :src="I18n.nav.soonLine"/>
                      <img v-if="child.beta" class="w-9 absolute -top-5 -right-6.5" :src="child.beta"/>
                    </span>
                    <img class="w-3 ml-1 imgShow" src="https://res.ikingdata.com/nav/navRight.jpg" alt=""/>
                  </div>
                  <span class="desc">{{ child.desc }}</span>
                </div>
              </a>
            </template>
          </div>
        </template>
      </div>
    </template>
  </UiNav>
</template>

<style scoped lang="scss">
.menu-list {
  min-width: 768px;
}

img {
  max-width: none !important;
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
