<script setup lang="ts">
import { ref, onMounted, watch, defineProps, defineEmits } from 'vue'
import { getParam } from '~/utils/router'
import { useRoute } from 'vue-router'
import * as API from '~/api/index'
import I18n from '~/utils/i18n/index'
import safeGet from '@fengqiaogang/safe-get'
import { GroupPosition } from '~/logic/dapp/interface'
import { chain } from '~/store/config'
import { equalsIgnoreCase, isEmpty, debounce } from '~/utils'
import router from '~/utils/router'

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
      text: I18n.dapp.group.all
    },
    active: {
      text: I18n.dapp.group.all
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
    list.value = [getGroupAll()].concat(data)
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

const triggerEvent = debounce<any>(function(value: string) {
  emitEvent('change', {
    chain: chain.value || 'all',
    group_id: value
  })
}, 500)

const setType = function(value?: string) {
  if (isEmpty(value)) {
    value = ''
  }
  tabValue.value = value as string
  triggerEvent(value)
}

const getHref = function(item: any, chainValue: string) {
  return router({
    'query': {
      group: item.id,
      chain: chainValue
    }
  })
}

onMounted(function() {
  const onWatchPropsCallback = function() {
    setType(getParam<string>('group', '') as string)
  }
  const onWatchChainCallback = async function() {
    setType()
    await getGroupList()
  }

  watch([props, $router], onWatchPropsCallback)
  watch([chain], onWatchChainCallback)
  onWatchChainCallback()
})

</script>

<template>
  <div class="md:flex py-3.5">
    <div class="md:flex-1 md:pr-6 text-kdFang">
      <template v-for="(item, index) in list" :key="index">
        <router-link v-if="index < 7" :to="getHref(item, chain)" class="tab-item" :class="{'active': isActive(item.id)}">
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
      @apply bg-global-highTitle bg-opacity-10;
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
