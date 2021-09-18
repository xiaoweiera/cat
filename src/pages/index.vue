<script lang="ts" setup>
import I18n from '~/utils/i18n/index'
</script>
<template>
  <DappRank />
  <div class="hidden">
    <UiWechatShare :title="I18n.dapp.page.title" :content="I18n.dapp.page.content"/>

    <UiHeaderTitle :value="I18n.dapp.page.title"/>
    <UiHeaderMeta name="keywords" :content="I18n.dapp.page.meta"/>
    <UiHeaderMeta name="description" :content="I18n.dapp.page.meta"/>
  </div>
</template>


// @formatter:off
<route lang="yaml">
meta:
  layout: all
</route>
// @formatter:off
