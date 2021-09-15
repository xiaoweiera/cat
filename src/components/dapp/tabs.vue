<script setup lang="ts">
import { ref, onMounted, watch, defineProps, defineEmits } from 'vue'
import { getParam } from '~/utils/router'
import { useRoute } from 'vue-router'
import * as API from '~/api/index'
import safeGet from '@fengqiaogang/safe-get'
import { GroupPosition } from '~/logic/dapp/interface'
import { chain } from '~/store/config'
import { equalsIgnoreCase, isEmpty, map } from '~/utils'

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
})

const getGroupAll = function() {
  const all: any = {
    id: '',
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
    chain: chain.value
  }
  const data = await API.dapp.group.getList<any>(query)
  if (data) {
    list.value = map(function(item: any) {
      item.href = {
        'query': {
          group: item.id,
          chain: chain.value
        }
      }
      return item
    }, [getGroupAll()].concat(data))
  } else {
    list.value = []
  }
}

const isActive = function(id: string) {
  if (id) {
    return equalsIgnoreCase(`${tabValue.value}`, `${id}`);
  }
  return id === tabValue.value
}

const setType = function(value: string) {
  if (isEmpty(value)) {
    value = ''
  }
  tabValue.value = value
  emitEvent('change', {
    chain: chain.value || 'all',
    group_id: value
  })
}

onMounted(function() {
  setType(getParam<string>('group', '') as string)
  getGroupList()
  watch([$router, props], function() {
    setType(getParam<string>('group', '') as string)
  })
  watch(chain, async function() {
    await getGroupList()
    setType('')
  })
})

</script>

<template>
  <div class="md:flex py-3.5">
    <div class="md:flex-1 md:pr-6">
      <template v-for="(item, index) in list" :key="index">
        <router-link v-if="index < 7" :to="item.href" class="tab-item" :class="{'active': isActive(item.id)}">
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
