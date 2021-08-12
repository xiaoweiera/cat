<script setup lang="ts">
import { ref, defineProps } from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
const tagList=['关注矿池','热门矿池','最新矿池']
const typeList=['全部','单币','LP']
</script>
<template>
  <div class="flex items-center">
    <Apy2MiningPoolsSelectTag  :list="tagList" />
    <Apy2MiningPoolsFliter  :list="typeList" class="ml-10" />
    <IconFont type="icon-shuaxin" size="60"/>
  </div>
</template>
<style scoped lang="scss">

</style>
