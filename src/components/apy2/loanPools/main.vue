<script setup lang="ts">
import { ref, defineProps } from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import {useProvide,  setInject, getInject } from '~/utils/use/state'
const [tag,]=useProvide('tag')
const [key,]=useProvide('key',0)
const [filterType,]=useProvide('filterType')
</script>
<template>
  <div>
    <div class="font-kdFang font-medium text-kd18px24px text-global-highTitle text-opacity-85">抵押借贷最佳路径</div>
    <Apy2LoanPoolsHeader class="mt-4"/>
    <Apy2LoanTableMain  />
  </div>
</template>
<style  lang="scss">

</style>
