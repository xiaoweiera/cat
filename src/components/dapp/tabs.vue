<script setup lang="ts">
import { ref, onMounted, watch, defineProps, defineEmits } from 'vue'
import { getParam } from '~/utils/router'
import { useRoute } from 'vue-router'
import * as API from '~/api/index'
import { equalsIgnoreCase } from '~/utils'
import safeGet from '@fengqiaogang/safe-get'
import { GroupPosition } from '~/logic/dapp/interface'
const props = defineProps({
  position: {
    type: String,
    required: true,
    validator: (value: string) => {
      switch (value) {
        case GroupPosition.dappRank:
        case GroupPosition.dappNew:
        case GroupPosition.nftNew:
        case GroupPosition.nftRank:
          return true
          break
      }
      return false
    }
  },
  chain: {
    type: String,
    default: () => 'all'
  }
})

const getGroupAll = function() {
  const all: any = {
    id: 'all',
    initial: {
      text: '全部类型'
    },
    active: {
      text: '全部类型'
    }
  }
  return all
}

const list = ref<any[]>(getGroupAll())



const emitEvent = defineEmits(['change'])

const tabValue = ref<string>('')

const $router = useRoute()

const getGroupList = async function() {
  const query: any = {
    position: props.position,
    chain: props.chain
  }
  const data = await API.dapp.group.getList<any>(query)
  if (data) {

    list.value = [getGroupAll()].concat(data)
  }
}

const setType = function() {
  const value = getParam<string>('group', '')
  tabValue.value = value as string

  emitEvent('change', {
    chain: props.chain || 'all',
    group_id: value
  })
}

onMounted(function() {
  setType()
  getGroupList()
  watch([$router, props], setType)
})

</script>

<template>
  <div class="md:flex py-3.5">
    <div class="md:flex-1 md:pr-6">
      <template v-for="(item, index) in list" :key="index">
        <router-link v-if="index < 7" class="tab-item" :class="{'active': equalsIgnoreCase(item.id, tabValue)}" :to="{'query': { group: item.id }}">
          <template v-if="safeGet(item, 'initial.image')">
            <div class="initial image">
              <img :src="safeGet(item, 'initial.image')">
            </div>
          </template>
          <template v-else>
            <div class="initial text">
              <span>{{ safeGet(item, 'initial.text') }}</span>
            </div>
          </template>

          <template v-if="safeGet(item, 'active.image')">
            <div class="active image">
              <img :src="safeGet(item, 'active.image')">
            </div>
          </template>
          <template v-else>
            <div class="active text">
              <span>{{ safeGet(item, 'active.text') }}</span>
            </div>
          </template>
        </router-link>
      </template>
    </div>
    <div class="tabs-other">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tabs-other {
  @apply flex items-center mt-4;
  @screen md {
    @apply w-115 mt-0;
    &:before {
      content: "";
      width: 1px;
      @apply bg-global-highTitle bg-opacity-1;
      @apply inline-block h-4 mr-3;
    }
  }
}

.tab-item {
  @apply inline-block;
  &[href] {
    @apply cursor-pointer;
  }
  .text {
    transition: all 0.3s;
    @apply inline-block py-1.5 px-2.5 text-sm text-global-highTitle text-opacity-85;
  }
  .initial {
    @apply block;
  }
  .active {
    @apply hidden;
  }
  &.active {
    .active {
      @apply block;
    }
    .initial {
      @apply hidden;
    }
    .text {
      border-radius: 30px;
      @apply font-medium text-global-primary bg-global-primary bg-opacity-10;
    }
  }
  img {
    @apply inline-block h-7.5;
  }
}
</style>
