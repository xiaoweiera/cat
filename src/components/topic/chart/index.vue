<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue'
import { getChartList } from '~/logic/topic/chart'

// @ts-ignore
const props = defineProps({
  menu: {
    type: Object
  }
})

const page = ref<number>(1)
const limit = ref<number>(10)
const list = ref<any[]>([])

const getData = async function() {
  const menu = props.menu
  const id = menu.topicID | menu.id
  const data = await getChartList(id, page.value, limit.value)
  list.value = data
}

onMounted(getData)

</script>

<template>
  <div class="p-5">
    <template v-for="(data, index) in list" :key="index">
      <div>
        <span>isMultyChart = {{ data.isMultyChart }}</span>
        <span> - </span>
        <span>ids = {{ data.ids }}</span>
      </div>
    </template>
  </div>
</template>

