<script setup lang="ts">
import { defineProps, onMounted, reactive, ref, toRaw } from 'vue'
// @ts-ignore
import { getTokenDetail, TabCategoryData } from '~/logic/apy2/token'
import safeGet from '@fengqiaogang/safe-get'
// @ts-ignore
import makeRouterPath, { getParam } from '~/utils/router'
// @ts-ignore
import { toNumber } from '~/utils'
import DBList from '@fengqiaogang/dblist'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  category: {
    type: Array,
    required: true
  }
})

const detail = reactive({
  name: '',
  icon: '',
  prince: 0,
  change: 0,
})
const active = ref<string>('')

const upDetail = async function() {
  const data: any = await getTokenDetail(props.id)
  detail.name = safeGet<string>(data, 'name')
  detail.icon = safeGet<string>(data, 'icon')
  detail.prince = safeGet<number>(data, 'ticker.prince')
  detail.change = safeGet<number>(data, 'ticker.change_percent')
}

const getUrl = function(value: string): string {
  const query = { category: value }
  const data: any = { query }
  return makeRouterPath(data)
}

onMounted(function() {
  if (props.category) {
    const category: any[] = toRaw(props.category)
    const db = new DBList(category)
    const key = getParam<string>('category')
    const item = db.selectOne({ id: key })
    if (item) {
      // @ts-ignore
      active.value = key
      upDetail()
    } else {
      console.log(category)
      const id = safeGet<string>(category, '[0].id')
      console.log('auto category : %s', id)
      if (id) {
        const url = getUrl(id)
        window.location.replace(url)
      }
    }
  }
})

</script>

<template>
  <div class="text-kdFang">
    <div class="flex justify-between">
      <div class="flex items-center">
        <IconFont v-if="detail.icon" :type="detail.icon" size="40" rounded/>
        <IconFont v-else type="icon-morentoken" size="40"/>
        <b class="title ml-2 font-bold text-global-highTitle text-opacity-85">{{ detail.name }}</b>
        <span class="ml-4 text-xl text-global-highTitle text-opacity-85">${{ toNumber(detail.prince) }}</span>
        <span class="ml-2 bg-global-numRed inline-block py-0.5 px-1 rounded">
              <span class="text-base text-global-white">{{ toNumber(detail.change) }}%</span>
            </span>
      </div>

      <div class="flex items-center rounded-xl bg-global-highTitle bg-opacity-6 p-1">
        <template v-for="item in category" :key="item.id">
          <router-link class="page-switch" :class="{'active': active === item.id}" :to="getUrl(item.id)">
            <IconFont type="icon-danbi" size="24"/>
            <span class="ml-2">{{ item.name }}</span>
            <IconFont class="ml-1.5" type="icon-star-xuanzhong" size="16"/>
          </router-link>
        </template>
      </div>
    </div>
    <div class="mt-8 pt-0.5">
      <!--挖矿收益-->
      <div v-if="TabCategoryData.mining === active">
        <Apy2TokenMining/>
      </div>
      <!--利率收益-->
      <div v-else-if="TabCategoryData.deposit === active">
        <Apy2TokenDeposit/>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
.title {
  font-size: 1.75rem;
}

.page-switch {
  @apply inline-block h-9 flex items-center px-3.5 rounded-lg overflow-hidden text-global-highTitle text-opacity-65;
  &.active {
    @apply bg-global-white text-global-primary text-opacity-100;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.1);
  }
}
</style>

