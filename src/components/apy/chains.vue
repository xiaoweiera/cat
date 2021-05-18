<script setup lang="ts">
import { useRoute } from 'vue-router'
import { defineProps, toRefs, toRaw, onBeforeMount, watch } from 'vue'
// 定义属性
const props = defineProps({
  chains: Object,
  active: String,
})
// 获取当前路由对象
const router = useRoute()
interface Query {
  [key: string]: string
}
interface Item {
  img: string // icon
  key: string // 键
  name: string // 名称
  select: boolean // 选择状态
}
// @ts-ignore
const { data: outerChains } = toRefs(props.chains)
// @ts-ignore
const getTabs = function() {
  const $router = toRaw(router)
  const query: Query = $router.query.value as any
  let value: string = props.active as string
  if (query && query.key) {
    value = `${query.key}`.toLocaleLowerCase()
  }
  const list: Item[] = outerChains.value.map((item: Item) => {
    if (item.key === value) {
      item.select = true
    } else {
      item.select = false
    }
    return item
  })
  outerChains.value = list
}
// 监听路由变化
watch(router, getTabs)
// 处理数据
onBeforeMount(getTabs)
// utm_source=https://apy.kingdata.com
// 计算跳转地址
// @ts-ignore
const getHref = function(data: Item): string {
  const key = data.key
  const utm_source = 'https://apy.kingdata.com'
  return `?key=${key}&utm_source=${utm_source}`
}
</script>
<template>
  <div class="flex w-full justify-center">
    <template v-for="(item, index) in outerChains" :key="index">
      <a
        :href="getHref(item)"
        class="hand inline-block"
        :class="item.select ? 'selectTag tag' : 'tag'"
      >
        <img
          class="md:w-8 md:h-8 md:mr-1.4 w-6 h-6 mr-1"
          :src="item.img"
          alt=""
        />
        <div :class="item.select ? 'selectTxt' : 'txt'">
          <span>{{ item.name }}</span>
        </div>
      </a>
    </template>
  </div>
</template>

<style scoped lang="postcss">
.tag {
  @apply text-global-default     rounded-md  flex mt-3 py-1.25 px-1 md:mt-4 md:mr-11.1  md:py-1.25 md:px-3.75 items-center justify-center;
}
.txt {
  @apply text-kd14px20px md:text-kd24px150 text-global-default opacity-65 font-normal;
}
.selectTxt {
  @apply text-kd14px20px md:text-kd24px150 text-global-primary;
}
.selectTag {
  @apply bg-global-primary  bg-opacity-8;
}
</style>
