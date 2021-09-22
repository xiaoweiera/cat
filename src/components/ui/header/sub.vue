<script lang="ts">
import HeaderSubApy from '~/components/header/sub/apy.vue';
import HeaderSubDapp from '~/components/header/sub/dapp.vue';
import HeaderSubData from '~/components/header/sub/data.vue';
import HeaderSubGrowthPad from '~/components/header/sub/growthpad.vue';
import HeaderSubLiquidity from '~/components/header/sub/liquidity.vue';

export default {
  name: 'HeaderSubMenu',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    sub: {
      type: String,
    }
  },
  components: {
    HeaderSubApy,
    HeaderSubDapp,
    HeaderSubData,
    HeaderSubGrowthPad,
    HeaderSubLiquidity,
  }
}

</script>

<template>
  <div class="bg-white ui-header-sub">
    <div v-if="list.length > 0" class="h-full px-20 flex items-center justify-between text-kdFang">
      <div class="sub-content text-global-highTitle text-opacity-65">
        <div class="flex h-full">
          <template v-for="(data, index) in list" :key="index">
            <template v-if="data.header">
              <a class="sub-menu-item text-14-18" :class="{'active': data.active}" v-router="data.href">{{ data.name }}</a>
            </template>
          </template>
        </div>
      </div>
      <div class="extend ml-5 h-full">
        <div class='hidden md:block h-full'>
          <template v-if="sub">
            <component :is="sub"></component>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ui-header-sub {
  border-bottom: 1px solid rgba(#033666, 0.06);
  box-shadow: 0 1px 0 rgba(#fff, 0.08);
}
.sub-content {
  @apply h-full;
  .sub-menu-item {
    @apply h-full flex items-center px-2 ml-8 font-normal;
    &:first-child {
      @apply ml-0;
    }
    &.active, &[href]:hover {
      @apply text-global-primary text-opacity-100;
      box-shadow: inset 0px -2px 0px #2B8DFE;
    }
  }
}
</style>
