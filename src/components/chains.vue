<script setup lang='ts'>
import router, { getParam } from '~/utils/router'
import { onBeforeMount, computed, defineProps, ref, watch } from 'vue'
import { getChains } from '~/logic/topRank/dapp'
import { chain } from '~/store/config'
import I18n from '~/utils/i18n/index'
import { useRoute } from 'vue-router'
const $router = useRoute()

const props = defineProps({
  page: {
    type: String,
    required: true,
  },
  to: {
    type: Boolean
  },
})
const getHref = (slug: string) => {
  return router({
    query: {
      chain: slug,
      group: ''
    },
  })
}
const chainData = ref([{
  'id': 100,
  'name': I18n.topRank.chainAll,
  'slug': 'all',
  'logo': 'icon-quanbu',
}])

const other = {
  'id': 101,
  'name': I18n.topRank.chainOther,
  'slug': 'other',
  'logo': '',
}
const getData = async () => {
  const res = await getChains(props.page)
  chainData.value = chainData.value.concat(res)
  chainData.value.push(other)
}

const onChangeChainStatus = function() {
  chain.value = getParam<string>('chain', 'all') as string
}

onBeforeMount(() => {
  onChangeChainStatus()
  watch($router, onChangeChainStatus)
  getData()
})
const chainItem = computed(() => {
  return chainData.value?.find(item => item.slug === chain.value)
})

</script>
<template>
  <div class='flex   xshidden   font-kdFang flex-wrap'>
    <template v-for='item in chainData'>
      <router-link :to='getHref(item.slug)' :class="chain===item.slug?'selectedTag ':'tag'" class='flex hand mb-3  rounded-kd20px max-h-9  flex items-center justify-center ' style='flex-shrink:0;'>
        <IconFont v-if='item.slug!=="other"' :class="chain==='all'?'text-global-white':item.slug==='all'?'text-global-primary':''" size='20' :type='item.slug==="all"?"icon-quanbuno-copy":item.logo' class='mr-1' />
        <div class='text-kd14px18px '>{{ item.name === I18n.apyIndex.allChain ? I18n.apyIndex.all : item.name }}</div>
      </router-link>
    </template>
  </div>
  <div class='mdhidden  flex items-center relative w-full'>
    <IconFont v-if='chainItem' :class='chainItem.slug==="all"?"text-global-primary":""' size='20' class='absolute z-1 left-3 ' :type='chainItem?.logo' />
    <el-select class=' w-full' v-model='chain' placeholder='全部'>
      <el-option v-for='item in chainData' :label='item.name' :value='item.slug'>
        <router-link :to='getHref(item.slug)' class='flex items-center  h-full'>
          <IconFont size='20' :type='item.logo' />
          <div class='ml-1 text-kd14px18px text-global-highTitle txt85' >{{ item.name }}</div>
        </router-link>
      </el-option>
    </el-select>
  </div>
</template>
<style scoped lang='scss'>
::v-deep(.el-input__inner) {
  border-radius: 20px;
  @apply h-9 pl-9.5;
}

.tag {
  border: 1px solid rgba(3, 54, 102, 0.1);
  @apply px-2 py-1 mr-3  text-kd16px24px text-global-highTitle text-opacity-85 ;
}

.selectedTag {
  border: 1px solid rgba(3, 54, 102, 0);
  @apply px-2 py-1 bg-global-primary   mr-3  text-kd16px24px text-global-white ;
}
</style>
