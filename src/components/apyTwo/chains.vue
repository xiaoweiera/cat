<script setup lang="ts">
import { ref, defineProps } from 'vue'
import {chains} from '~/logic/apyTwo/mining/config'
import * as R from 'ramda'
import I18n from '~/utils/i18n/index'
const props = defineProps({
  filterData: Object,
  tagType: String,
})

</script>
<template>
<div>
  <template v-for="item in chains">
    <img class="w-4 h-4" :src="item.icon" alt="">
    <div></div>
  </template>
</div>
</template>
<style scoped lang="postcss">

</style>
