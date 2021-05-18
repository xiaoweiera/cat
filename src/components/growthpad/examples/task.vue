<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  data: Object,
  skin: String,
})
</script>

<template>
  <div class="flex p-1.5 task-content items-center" :class="`skin-${skin}`">
    <DotCount size="sm" :skin="skin" />
    <div class="ml-1 flex-1 flex justify-between items-center">
      <div class="flex-1 flex justify-between items-center text-sm">
        <div class="flex items-center">
          <span class="description">{{ data.description }}</span>
          <template v-if="data.tooltip">
            <span class="ml-1.5 tooltip py-1.5 px-1 rounded">
              <template v-if="data.tooltip.icon">
                <IconFont class="mr-1" :type="data.tooltip.icon" />
              </template>
              <span>{{ data.tooltip.value }}</span>
            </span>
          </template>
          <template v-if="data.badge">
            <span class="ml-4 badge py-1.5 px-2 rounded">{{ data.badge }}</span>
          </template>
        </div>
        <div>
          <span v-if="data.suffix" class="suffix font-kdFang font-bold">{{
            data.suffix
          }}</span>
        </div>
      </div>
      <div class="text-xs ml-1.5">
        <span
          v-if="data.status"
          class="button text-center rounded-xl block success"
        >{{ data.success }}</span>
        <a
          v-else
          class="button text-center rounded-xl block"
          :href="data.href"
        >{{ data.wait }}</a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.task-content {
  border-radius: 64px;
  background: linear-gradient(
    90deg,
    rgba(43, 141, 254, 0.12) 0%,
    rgba(43, 141, 254, 0) 100%
  );
}
.description {
  color: rgba(37, 62, 111, 0.85);
}
.tooltip {
  color: #fff;
}
.badge {
  display: inline-block;
  height: 100%;
  border: 1px solid #dcdcdc;
  background: #fff;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 10px;
    height: 10px;
    background: #fff;
    transform: translate(-6px, -50%) rotate(-45deg);
    border-width: 1px 0 0 1px;
    border-style: solid;
    border-color: #dcdcdc;
  }
}
.button {
  width: 60px;
  height: 24px;
  line-height: 24px;
  color: #fff;
  border-width: 1px;
  border-style: solid;
}
.skin-orange {
  .button {
    border-color: #f4851f;
  }
  .button:not(.success) {
    background: #f4851f;
  }
  .success {
    color: #f4851f;
  }
  .suffix,
  .badge {
    color: #f4851f;
  }
  .tooltip {
    background: #f4851f;
  }
}
.skin-blue {
  .button {
    border-color: #2b8dfe;
  }
  .button:not(.success) {
    background: #2b8dfe;
  }
  .success {
    color: #2b8dfe;
  }
  .suffix,
  .badge {
    color: #2b8dfe;
  }
  .tooltip {
    background: #2b8dfe;
  }
}
</style>
