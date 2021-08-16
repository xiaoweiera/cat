<script setup lang="ts">
import {ref, defineProps} from 'vue'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
import {useProvide, setInject, getInject} from '~/utils/use/state'
import {chainsIcon} from '~/logic/apy2/config'
import {tolocaleUpperCase} from '~/lib/tool'


</script>
<template>
  <div class="font-kdFang">
  <Apy2ProjectChartInfo />
  </div>
</template>
<style scoped lang="scss">

</style>



