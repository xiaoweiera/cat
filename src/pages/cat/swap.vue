<script lang="ts" setup>
</script>
<template>
  <div class=' w-full containerHeight pt-10'>
    <CatSwap />
  </div>

  <!--  <div class="hidden">-->
  <!--    <UiWechatShare :title="I18n.dapp.rank.page.title" :content="I18n.dapp.rank.page.content"/>-->

  <!--    <UiHeaderTitle :value="I18n.dapp.rank.page.title"/>-->
  <!--    <UiHeaderMeta name="keywords" :content="I18n.dapp.rank.page.meta"/>-->
  <!--    <UiHeaderMeta name="description" :content="I18n.dapp.rank.page.meta"/>-->
  <!--  </div>-->
</template>
<style scoped lang='scss'>
.containerHeight{
  height: calc(100vh - 64px);
  background-image: url("../../public/assets/cat/bgCat.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>

// @formatter:off
<route lang="yaml">
meta:
  layout: project
</route>
// @formatter:off
