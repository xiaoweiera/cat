<script lang="ts">
import router from '~/utils/router'

export default {
  props: {
    href: {
      type: [String, Object],
    },
    header: {
      type: String,
      default: () => ''
    },
    footer: {
      type: String,
      default: () => ''
    }
  },
  methods: {
    onClick () {
      // @ts-ignore
      if (this.href) {
        // @ts-ignore
        const href = router(this.href)
        if (href) {
          window.location.href = href
        }
      }
    }
  }
}
</script>

<template>
  <div class="ui-list p-4 rounded-md bg-white" @click="onClick">
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
  @apply block;
  & + .ui-list {
    @apply mt-3;
  }
}
</style>

