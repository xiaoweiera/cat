<script setup lang="ts">
/**
 * @file 参与方式
 */
import { ref } from 'vue'
import { toUpper } from 'ramda'
import I18n from '~/utils/i18n/index';
const website = ref<string>('http://kingdata.com')

</script>

<template>
  <div>
    <div class="flex justify-between">
      <div class="flex items-center">
        <IconFont class="mr-1.5" type="join" size="24" bright/>
        <h3 class="text-global-highTitle text-opacity-85 text-18 font-m">参与方式</h3>
      </div>
      <a v-router.blank="website" class="inline-flex items-center text-global-darkblue justify-end cursor-pointer">
        <span class="text-14-18">{{ I18n.dapp.website }}</span>
        <IconFont type="icon-right" size="xs"/>
      </a>
    </div>
    <div class="mt-2 text-14-20 text-global-highTitle text-opacity-85">
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor.
      </div>
    </div>
    <div class="flex items-center mt-3 text-global-highTitle text-opacity-65 text-12">
      <span class="mr-3 text-14">公链使用教程</span>
      <a class="chain">
        <IconFont type="heco" size="16"/>
        <span class="ml-1">{{ toUpper('heco') }}</span>
      </a>
      <a class="chain" >
        <IconFont type="eth" size="16"/>
        <span class="ml-1">{{ toUpper('eth') }}</span>
      </a>
      <a class="chain" >
        <IconFont type="BSC" size="16"/>
        <span class="ml-1">{{ toUpper('SOL') }}</span>
      </a>
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
  @apply border border-solid border-global-highTitle border-opacity-10;
  &:last-child {
    @apply mr-0;
  }
  border-radius: 20px;
}
</style>

