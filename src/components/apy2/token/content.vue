<script setup lang="ts">
import { toBoolean } from '~/utils'
import { defineProps, onMounted, reactive, ref, toRaw } from 'vue'
import { getTokenDetail } from '~/logic/apy2/token'
import { TabCategoryData } from '~/logic/apy2/interface'
import safeGet from '@fengqiaogang/safe-get'
import makeRouterPath, { getParam, getLocation } from '~/utils/router'
import { toNumber } from '~/utils'
import DBList from '@fengqiaogang/dblist'

const props = defineProps({
  symbol: {
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
  mining_followed: false, // 挖矿收藏
  lend_followed: false    // 借贷收藏
})
const active = ref<string>('')

const upDetail = async function() {
  const data: any = await getTokenDetail(props.symbol)
  detail.name = safeGet<string>(data, 'name')
  detail.icon = safeGet<string>(data, 'icon')

  detail.mining_followed = toBoolean(safeGet<boolean>(data, 'mining_followed'))
  detail.lend_followed = toBoolean(safeGet<boolean>(data, 'lend_followed'))

  detail.prince = safeGet<number>(data, 'ticker.prince')
  detail.change = safeGet<number>(data, 'ticker.change_percent')
}

const getUrl = function(value: string): string {
  const { path } = getLocation()
  const query = { symbol: props.symbol, category: value }
  const data: any = { path, query }
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
      const id = safeGet<string>(category, '[0].id')
      if (id) {
        window.location.replace(getUrl(id))
      }
    }
  }
})

</script>

<template>
  <div class="text-kdFang">
    <div class="flex justify-between md:flex-row flex-col">
      <div class="flex items-center font-kdExp">
        <IconFont class="xshidden" :type="detail.icon ? detail.icon : 'icon-morentoken'" size="40" rounded/>
        <IconFont class="mdhidden" :type="detail.icon ? detail.icon : 'icon-morentoken'" size="32" rounded/>
        <b style="font-size:24px;" class="title ml-2 font-bold text-global-highTitle text-opacity-85">{{ detail.name }}</b>
        <span class="md:ml-4 ml-2 text-xl text-global-highTitle text-opacity-85">${{ toNumber(detail.prince) }}</span>
        <div class="ml-2 bg-global-numRed flex items-center  pt-0.5 px-1 font-kdExp md:rounded rounded-kd4px">
          <div  class="text-global-white flex items-center md:text-kd16px24px text-kd14px18px">{{ toNumber(detail.change) }}%</div>
        </div>
      </div>

      <div class="flex items-center md:rounded-xl rounded-kd12px md:mt-0 mt-8 bg-global-highTitle bg-opacity-6 p-1" :class="{ 'hidden': category.length <= 1  }">
        <template v-for="item in category" :key="item.id">
          <router-link class="page-switch flex-1  text-center flex justify-center " :class="{'active': active === item.id}" :to="getUrl(item.id)">
            <IconFont class="xshidden" type="icon-danbi" size="24"/>
            <IconFont class="mdhidden" type="icon-danbi" size="20"/>
            <span class="ml-2 text-kd12px16px w-fit whitespace-nowrap">{{ item.name }}</span>
            <!-- 收藏 -->
            <Apy2BaseFollow class="ml-1.5" :type="item.id" :value="symbol" :status="detail[item.followed]"/>
          </router-link>
        </template>
      </div>
    </div>
    <div class="mt-8 pt-0.5" v-if="detail.name">
      <!--挖矿收益-->
      <template v-if="TabCategoryData.mining === active">
        <Apy2TokenMining :symbol="detail.name" :type="active" :key="active"/>
      </template>
      <!--利率收益-->
      <template v-else-if="TabCategoryData.deposit === active">
        <Apy2TokenDeposit :symbol="detail.name" :type="active" :key="active"/>
      </template>
    </div>
  </div>

</template>

<style scoped lang="scss">
.title {
  font-size: 1.75rem;
}

.page-switch {
  @apply inline-block h-9 flex items-center px-3.5  rounded-lg overflow-hidden text-global-highTitle text-opacity-65;
  &.active {
    @apply bg-global-white text-global-primary text-opacity-100;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.1);
  }
}
</style>

