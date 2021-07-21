<script setup lang="ts">
// @ts-ignore
import I18n from '~/utils/i18n/index'
// @ts-ignore
import href, { config } from '~/utils/router'
</script>

<template>
  <div class="containerbgs bg-global-body md:bg-opacity-100">
    <HeaderNav>
      <template #nav>
        <div class="flex font-normal text-base items-center whitespace-nowrap router-list">
          <router-link :to="href(config.topic)">
            <span>数据图表</span>
          </router-link>
          <a target="_blank" v-router="config.news">
            <span>7x24小时监控</span>
          </a>
          <a target="_blank" v-router="config.reports">
            <span>研究报告</span>
          </a>
          <a target="_blank" v-router="config.growthpad">
            <span>{{ I18n.growthpad.title }}</span>
          </a>
          <a target="_blank" v-router="config.apy">
            <span>DeFi挖矿收益APY大全</span>
          </a>
        </div>
      </template>
    </HeaderNav>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped lang="scss">
.router-list {
  a {
    @apply ml-8 opacity-85 text-global-default;
    &:first-child {
      @apply ml-0;
    }
  }
  .router-link-active {
    @apply text-global-primary;
  }
}
</style>
