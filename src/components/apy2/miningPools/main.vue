<script setup lang="ts">
import { ref, defineProps } from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import {useProvide,  setInject, getInject } from '~/utils/use/state'
const [tag,]=useProvide('tag')
const [filterType,]=useProvide('filterType')
</script>
<template>
  <div>
    {{tag[0]}}
    {{filterType}}
  <Apy2MiningPoolsHeader />
  </div>
</template>
<style  lang="scss">

</style>
