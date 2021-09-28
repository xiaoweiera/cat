<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { toBoolean } from '~/utils'
import { getInject, setInject } from '~/utils/use/state'
import { useRoute } from 'vue-router'

const setMenuStatus = setInject('layout-menu')
const getStatus = getInject('layout-menu')
const $router = useRoute()

const onClick = function() {
  const arr = getStatus?.value || []
  const value = toBoolean(arr[0])
  setMenuStatus(!value)
}

onMounted(() => {
  watch($router, () => {
    setMenuStatus(false)
  })
})

</script>

<template>
  <div @click="onClick">
    <slot></slot>
  </div>
</template>




