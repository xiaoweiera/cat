<script lang="ts">
export default {
  props: {
    header: {
      type: String,
      default: () => ''
    },
    footer: {
      type: String,
      default: () => ''
    }
  }
}
</script>

<template>
  <div class="ui-list p-4 rounded-md bg-white">
    <div class="list-header" :class="{'pb-4': header || $slots.header}">
      <slot name="header">
        <div class="leading-5" v-if="header">
          <h3 class="text-lg text-global-highTitle">{{ header }}</h3>
          <p class="text-sm text-global-highTitle text-opacity-65"></p>
        </div>
      </slot>
    </div>
    <div>
      <slot name="content"></slot>
    </div>
    <div class="list-footer" :class="{'pt-4': footer || $slots.footer}">
      <slot name="footer">
        <div class="leading-5" v-if="footer">
          <p class="text-sm text-global-highTitle text-opacity-65">{{ footer }}</p>
        </div>
      </slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ui-list {
  & + .ui-list {
    @apply mt-3;
  }
}
</style>

