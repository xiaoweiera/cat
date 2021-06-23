<script setup lang="ts">
import I18n from '~/utils/i18n/index'
</script>
<template>
  <div
    class="
      flex
      tagContainer
      font-kdExp
      items-center
      text-center
      py-2
      px-4
      md:py-4
      mt-6
      md:mt-kd32px
    "
  >
    <div class="flex-1">
      <div class="text-global-primary text-kd24px30px font-kdExp">$600,000</div>
      <div
        class="
          text-global-default
          opacity-65
          mt-kd4px
          text-kd14px18px
          i8n-font-inter
        "
      >
        {{ I18n.growthpadShow.summary.rewarded }}
      </div>
    </div>
    <div class="w-0.25 bg-global-default opacity-10 h-6"></div>
    <div class="flex-1">
      <div class="text-global-primary text-kd24px30px font-kdExp">5</div>
      <div
        class="
          text-global-default
          opacity-65
          mt-kd4px
          text-kd14px18px
          i8n-font-inter
        "
      >
        {{ I18n.growthpadShow.summary.projects }}
      </div>
    </div>
    <div class="w-0.25 bg-global-default opacity-10 h-6"></div>
    <div class="flex-1">
      <div class="text-global-primary text-kd24px30px font-kdExp">-</div>
      <div
        class="
          text-global-default
          opacity-65
          mt-kd4px
          text-kd14px18px
          i8n-font-inter
        "
      >
        {{ I18n.growthpadShow.summary.users }}
      </div>
    </div>
  </div>
</template>
<style scoped lang="postcss">
.tagContainer {
  background: linear-gradient(180deg, #ffffff 0%, #edf5ff 100%);
  box-sizing: border-box;
  box-shadow: 0px 12px 42px -12px rgb(43 141 255 / 26%);
  border-radius: 12px;
}
</style>
