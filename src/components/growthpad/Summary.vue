<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
<template>
  <div class="flex tagContainer font-kdExp  items-center  text-center  py-2 px-4 md:py-4 mt-6 md:mt-kd32px">
    <div class="flex-1">
      <div class="text-global-primary text-kd24px30px">
        -
        <!--        ${{ summary.total.toLocaleString() }}-->
      </div>
      <div class="text-global-default opacity-65 mt-kd4px text-kd14px18px">
        {{ t('summary.award_total') }}
      </div>
    </div>
    <div class=" w-0.25 bg-global-default opacity-10 h-6"></div>
    <div class="flex-1">
      <div class="text-global-primary text-kd24px30px">
        -
        <!--        {{ summary.totalProject.toLocaleString() }}-->
      </div>
      <div class="text-global-default opacity-65 mt-kd4px  text-kd14px18px">
        {{ t('summary.projects') }}
      </div>
    </div>
    <div class=" w-0.25 bg-global-default opacity-10 h-6"></div>
    <div class="flex-1">
      <div class="text-global-primary text-kd24px30px">
        -
        <!--        {{ summary.person.toLocaleString() }}-->
      </div>
      <div class="text-global-default opacity-65 mt-kd4px text-kd14px18px">
        {{ t('summary.person_count') }}
      </div>
    </div>
  </div>
</template>
<style scoped lang="postcss">
.tagContainer {
  background: linear-gradient(
      180deg, #FFFFFF 0%, #EDF5FF 100%);
  box-sizing: border-box;
  box-shadow: 0px 12px 42px -12px rgb(43 141 255 / 26%);
  border-radius: 12px;
}
</style>
