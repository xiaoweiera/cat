<script setup lang="ts">
/**
 * @file 参与方式
 */
import { defineProps } from 'vue'
import { toUpper } from 'ramda'
import I18n from '~/utils/i18n/index';

defineProps({
  data: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <div class="mt-12">
    <div class="flex justify-between">
      <div class="flex items-center">
        <IconFont class="mr-1.5" type="join" size="24" bright/>
        <h3 class="text-global-highTitle text-opacity-85 text-18 font-m">参与方式</h3>
      </div>
      <a v-router.blank="data.website" class="hidden md:inline-flex items-center text-global-darkblue justify-end cursor-pointer">
        <span class="text-14-18">{{ I18n.dapp.website }}</span>
        <IconFont type="icon-right" size="xs"/>
      </a>
    </div>
    <div class="mt-2 text-14-20 text-global-highTitle text-opacity-85">
      <div v-html="data.participation"></div>
    </div>
    <div class="flex items-center mt-3 text-global-highTitle text-opacity-65 text-12">
      <span class="mr-3 text-14">公链使用教程</span>
      <template v-if="data.chains">
        <template v-for="(item, index) in data.chains" :key="index">
          <a class="chain" v-router.blank="item.tutorial">
            <IconFont :type="item.logo" size="16" bright/>
            <span class="ml-1">{{ toUpper(item.name) }}</span>
          </a>
        </template>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title-icon {
  color: #19C4FF;
}
.chain {
  @apply mr-3;
  @apply py-1 px-2;
  @apply flex items-center;
  @apply bg-white;
  @apply border border-solid border-global-highTitle border-opacity-10;
  border-radius: 20px;
  transition: all 0.3s;
  &:last-child {
    @apply mr-0;
  }
  &:hover {
    @apply text-global-darkblue;
    @apply bg-global-darkblue bg-opacity-12;
  }
}
</style>

