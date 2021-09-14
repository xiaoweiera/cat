<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getParam, watchRoute } from '~/utils/router'

const tabValue = ref<string>('')


const setType = function() {
  const value = getParam<string>('type', '')
  tabValue.value = value as string
  console.log('value : ', value)
}

onMounted(function() {
  setType()
  watchRoute(setType)
})

const list = [
  {
    id: '',
    text: '所有类型'
  },
  {
    id: '1',
    text: '交易所'
  },
  {
    id: '2',
    text: '借贷'
  }
]

</script>

<template>
  <div class="flex py-3.5">
    <div class="flex-1 pr-6">
      <template v-for="(item, index) in list" :key="index">
        <router-link class="tab-item" :class="{'text': item.text, 'active': item.id === tabValue}" :to="{'query': { type: item.id }}">
          <span>{{ item.text }}</span>
        </router-link>
      </template>
    </div>
    <div class="tabs-other"></div>
  </div>
</template>

<style scoped lang="scss">
.tabs-other {
  @apply w-115 flex items-center;
  &:before {
    content: "";
    width: 1px;
    @apply bg-global-highTitle bg-opacity-1;
    @apply inline-block h-4 mr-3;
  }
}

.tab-item {
  @apply inline-block py-1.5 px-2.5;
  &[href] {
    @apply cursor-pointer;
  }
  &.active {
    border-radius: 30px;
    @apply text-global-primary;
    @apply bg-global-primary bg-opacity-10;
  }
}
</style>
