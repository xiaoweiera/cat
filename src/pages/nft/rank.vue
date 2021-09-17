<script lang="ts" setup>
import I18n from '~/utils/i18n/index'
</script>
<template>
  <NftRank />
  <div class="hidden">
    <UiWechatShare :title="I18n.nft.page.title" :content="I18n.nft.page.content"/>

    <UiHeaderTitle :value="I18n.nft.page.title"/>
    <UiHeaderMeta name="keywords" :content="I18n.nft.page.meta"/>
    <UiHeaderMeta name="description" :content="I18n.nft.page.meta"/>
  </div>
</template>


// @formatter:off
<route lang="yaml">
meta:
  layout: all
</route>
// @formatter:off
