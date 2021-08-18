<script setup lang="ts">
import { ref, defineProps } from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import {useProvide,  setInject, getInject } from '~/utils/use/state'
const [tag,]=useProvide('tag')
const [filterType,]=useProvide('filterType')
</script>
<template>
  <div class="pb-15">
    <!--表格数据-->
    <Apy2BaseTable/>
  </div>
  <div>
    <Apy2MiningPoolsHeader />
    <Apy2MiningTableMain class="mt-3"/>
  </div>
</template>
<style  lang="scss">

</style>
