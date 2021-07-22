<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { map, toArray } from '~/utils/index'
import Task from '~/logic/growthpad/task'
import { ProjectKey } from '~/logic/growthpad/config'

const store = Task()

const props = defineProps({
  symbol: {
    type: String,
    default () {
      return ''
    }
  },
  value: {
    type: [String, Number, Array],
    default () {
      return []
    }
  },
  unit: {
    type: String,
    default () {
      return ''
    }
  }
})

const format = function(list: string[]): string[] {
  const project = store.getNickName()
  return map(function(value: string) {
    if (project === ProjectKey.heco) {
      return `${value}%`
    }
    return value || 0
  }, list)
}

// @ts-ignore
const rewardValue = computed<string>(function() {
  const array = format(toArray(props.value))
  return array.join('~')
})

// @ts-ignore
const rewardUnit = computed<string>(function() {
  const project = store.getNickName()
  if (project === ProjectKey.heco) {
    return void 0
  }
  return props.unit
})

// @ts-ignore
const rewardSymbol = computed<string>(function() {
  const project = store.getNickName()
  if (project === ProjectKey.heco) {
    return void 0
  }
  return props.symbol
})



</script>

<template>
  <span class="text-xs reward-symbol" v-show="rewardSymbol">{{ rewardSymbol }}</span>
  <span class="inline-block whitespace-nowrap reward-value">{{ rewardValue }}</span>
  <span class="reward-unit" v-show="rewardUnit">{{ rewardUnit }}</span>
</template>

