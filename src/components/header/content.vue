<script setup lang="ts">
// @ts-ignore
import { menu } from '~/logic/menu'
import { config } from '~/utils/router'
// @ts-ignore
import I18n from '~/utils/i18n/index'
import DBList from '@fengqiaogang/dblist'

// @ts-ignore
const getActive = function(item: any) {
  let path: string = window.location.pathname
  // 首页默认为数据图表
  if (path === '' || path === '/') {
    path = config.topic
  }
  const db = new DBList([])
  db.insert(db.flatten(item.children, 'children'))
  const [temp] = db.like<any>({ href: path }, 1)
  if (temp) {
    const [ parent ] = db.parentDeepFlatten(temp)
    return parent
  }
}

</script>

<template>
  <div class="flex font-normal h-full items-center">
    <template v-for="(item, i) in menu" :key="i">
      <UiNav>
        <template #reference>
          <img v-if="item.newTip" class="w-4  absolute  right-3 bottom-4" src="https://res.ikingdata.com/liquidity/newRedTip.png" alt="">
          <template v-if="getActive(item)">
            <div class="flex items-center cursor-pointer text-base menu-title active">
              <span>{{ getActive(item).name }}</span>
              <IconFont class="ml-1.5" type="icon-xiajiantou"/>
            </div>
          </template>
          <template v-else>
            <div class="flex items-center cursor-pointer text-base menu-title">
              <span>{{ item.name }}</span>
              <IconFont class="ml-1.5" type="icon-xiajiantou"/>
            </div>
          </template>
        </template>
        <template #content v-if="item.children">
          <div class="flex font-kdFang">
            <div class="flex flex-col">
              <template v-for="child in item.children">
                <a v-router="child.href" target="_blank" class="cursor-pointer flex items-center menu-item">
                  <IconFont :type="child.icon" size="40"/>
                  <div class="relative ml-2.5">
                    <img v-if="child.badge" class="w-13 absolute -top-4 -right-6" :src="I18n.nav.soonLine"/>
                    <img v-if="child.beta" class="w-9 absolute -top-4 -right-3" :src="child.beta"/>
                    <div class="flex items-center">
                      <span class="child-name whitespace-nowrap">{{ child.name }}</span>
                      <img class="w-3 ml-1 img-show" src="https://res.ikingdata.com/nav/navRight.jpg"/>
                    </div>
                    <span class="desc whitespace-nowrap">{{child.desc }}</span>
                  </div>
                </a>
              </template>
            </div>
          </div>
        </template>
      </UiNav>
    </template>
  </div>
</template>

<style scoped lang="scss">
.menu-title {
  &.active {
    @apply text-global-primary;
  }
}

.nav-main {
  @apply ml-8;
  &:first-child {
    @apply ml-0;
  }
}

img {
  max-width: none !important;
}

.img-show {
  display: none;
}

.desc {
  @apply text-global-default opacity-65 text-kd12px16px font-normal;
}

.name {
  @apply text-global-default opacity-65 text-kd14px18px;
}

.child-name {
  @apply text-global-default opacity-85 text-kd15px150;
}
.menu-item {
  margin-top: 20px;
  &:first-child {
    @apply mt-0;
  }
  &:hover {
    @apply text-global-primary font-medium;

    .img-show {
      display: block;
    }
    .child-name {
      @apply text-global-primary font-medium;
    }
  }
}


</style>
