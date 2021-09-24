<script setup lang="ts">
import * as API from '~/api/index'
import I18n from '~/utils/i18n/index'
import { onMounted, ref, toRaw, watch } from 'vue'
import { isAfter } from '~/utils/time'
import { debounce, toArray, toInteger, toNumberCashFormat, dateFormat, upperFirst } from '~/utils'
import { GroupPosition } from '~/logic/dapp/interface'
import safeGet from '@fengqiaogang/safe-get'
import { config } from '~/utils/router'

const list = ref<any[]>([])
const is_online = ref<boolean>(false)
const search = ref<string>('')
const page = ref<number>(1)
const limit = ref<number>(10)
const total = ref<number>(10) // 默认总条数
const sortValue = ref<string>('')
const chain = ref<string>('all')
const group_id = ref<string>('')
const loading = ref<boolean>(true)

const sortList = ref<any>([
  {
    label: I18n.dapp.sort.timeDesc,
    value: '{"online_time": "desc"}'
  }, {
    label: I18n.dapp.sort.timeAsc,
    value: '{"online_time": "asc"}'
  },
  {
    label: I18n.dapp.sort.priceDesc,
    value: '{"price": "desc"}'
  }, {
    label: I18n.dapp.sort.priceAsc,
    value: '{"price": "asc"}'
  }
])

const onGetList = async function(value?: object) {
  const param = Object.assign({
    page: page.value,
    page_size: limit.value,
    query: search.value,
    is_online: is_online.value,
    chain: chain.value,
    group_id: group_id.value
  }, value || {})
  loading.value = true
  const result = await API.nft.discover.getList<any[]>(param as any)
  const info = safeGet<any>(result, 'page_info') || {}
  total.value = toInteger(info.total)
  page.value = param.page

  const array = toArray(safeGet<any[]>(result, 'results') || [])
  if (list.value.length > 0) {
    const oldList = toArray(toRaw(list.value))
    list.value = toArray(oldList, array)
  } else {
    list.value = array
  }
  loading.value = false
}

const onSort = debounce<any>(function(data?: any) {
  list.value = []
  const value = Object.assign({}, data ? data : {}, {
    page: 1,
  })
  return onGetList(value)
})

const onChangeTab = function(data?: any) {
  chain.value = safeGet<string>(data, 'chain') || 'all'
  group_id.value = safeGet<string>(data, 'group_id') || ''
  list.value = []
  const value = Object.assign({
    page: 1,
  }, data ? data : {})
  return onGetList(value)
}

const onChangeSort = function(value: string) {
  const data = JSON.parse(value)
  return onSort(data)
}

const onNext = function() {
  return onGetList({
    page: page.value + 1
  })
}

onMounted(() => {
  watch([is_online, search], onSort)
})

const getHref = function(id: string | number): string {
  return `${config.nft}/${id}`
}

</script>

<template>
  <div class="wrap-discover">
    <div class="content">
      <DappTabs :position="GroupPosition.nftNew" @change="onChangeTab">
        <div class="tabs-operate text-kdFang">
          <div class="mt-4 md:mt-0 hidden">
            <span class="mr-1.5 text-14-18 text-global-highTitle text-opacity-85">{{ I18n.dapp.group.viewOnline }}</span>
            <el-switch v-model="is_online"></el-switch>
          </div>
          <div class="flex flex-1 items-center justify-end">
            <div class="max-w-56 min-w-34">
              <el-input :placeholder="I18n.dapp.group.search" v-model="search" size="small">
                <template #prefix>
                  <i class="el-input__icon el-icon-search"></i>
                </template>
              </el-input>
            </div>
            <div class="max-w-50 min-w-40 ml-4 flex-1 block md:hidden">
              <el-select v-model="sortValue" @change="onChangeSort" :placeholder="I18n.common.placeholder.sort" size="small">
                <template v-for="(item, index) in sortList" :key="index">
                  <el-option :label="item.label" :value="item.value"></el-option>
                </template>
              </el-select>
            </div>
          </div>
        </div>
      </DappTabs>
    </div>

    <div class="content mt-3">
      <!-- 表头 -->
      <UiList class="hidden md:block">
        <template #content>
          <UiSortGroup class="table-tr">
            <div class="td-title text-global-highTitle text-opacity-65">
              <span class="text-14-18 font-kdBarlow">{{ I18n.dapp.header.info }}</span>
            </div>
            <div class="td-data text-global-highTitle text-opacity-65">
              <span class="text-14-18 font-kdBarlow">{{ I18n.dapp.header.mediaData }}</span>
            </div>
            <div class="td-price text-global-highTitle text-opacity-65 text-14-18 font-kdBarlow">
              <UiSort title="Mint Price / Supply" name="price" @change="onSort"></UiSort>
            </div>
            <div class="td-date text-global-highTitle text-opacity-65 text-14-18 font-kdBarlow">
              <div class="flex justify-end">
                <UiSort title="Sale Date / Time" name="online_time" @change="onSort"></UiSort>
              </div>
            </div>
            <div class="td-operation text-global-highTitle text-opacity-65">
              <span class="text-14-18 font-kdBarlow">{{ I18n.dapp.header.operate }}</span>
            </div>
          </UiSortGroup>
        </template>
      </UiList>
      <!-- 内容 -->
      <div class="mt-3" v-if="list.length > 0">
        <UiList class="nft-item-box" v-for="(data, index) in list" :key="index" :href="getHref(data.id)">
          <template #header>
            <div class="flex">
              <div class="flex flex-1 text-kdFang">
                <div class="flex-1">
                  <span class="block text-global-highTitle">
                    <span class="text-14-18">{{ data.name }}</span>
                    <span class="inline-flex md:hidden ml-1.5 align-middle leading-5">
                      <IconFont class="text-global-golden" type="icon-featured" size="18"/>
                    </span>
                  </span>
                  <span class="block mt-1.5 md:mt-3 text-14-20 font-normal text-global-highTitle text-opacity-65 leading-5" v-if="data.description">
                    <span class="line-clamp-3">{{ data.description }}</span>
                  </span>
                </div>
                <div class="ml-4 hidden md:block" v-show="data.is_featured">
                  <span class="featured">
                    <IconFont type="icon-featured" size="16"/>
                    <span class="ml-1">Featured</span>
                  </span>
                </div>
              </div>
              <div class="ml-3 md:hidden">
                <DappOperation :data="data"/>
              </div>
            </div>
          </template>
          <template #content>
            <div class="table-tr text-kdFang">
              <div class="td-title">
                <div class="flex">
                  <template v-for="(src, index) in data.gallery" :key="index">
                    <el-avatar v-if="index < 5" class="inline-block" :class="{'ml-2': index > 0}" shape="square" fit="cover" :src="src"></el-avatar>
                  </template>
                </div>
              </div>
              <div class="td-data">
                <template v-for="(media, key) in data.medias" :key="`${index}-${key}`">
                  <a v-router.blank="media.project_media_url" class="flex items-center media-item" v-if="media">
                    <IconFont class="text-base" :type="key" bright/>
                    <span class="text-14-16 ml-1.5 text-global-highTitle text-opacity-85">{{ upperFirst(key) }}</span>
                    <template v-if="media.total_user && media.online_user">
                      <span class="text-12-14 ml-1 text-global-highTitle text-opacity-65 leading-3">{{ toNumberCashFormat(media.total_user, 'Num') }} / {{ toNumberCashFormat(media.online_user, 'Online') }}</span>
                    </template>
                    <template v-else-if="media.total_user">
                      <span class="text-12-14 ml-1 text-global-highTitle text-opacity-65 leading-3">{{ toNumberCashFormat(media.total_user, 'Num') }}</span>
                    </template>
                    <template v-else-if="media.online_user">
                      <span class="text-12-14 ml-1 text-global-highTitle text-opacity-65 leading-3">{{ toNumberCashFormat(media.online_user, 'Online') }}</span>
                    </template>
                  </a>
                </template>
              </div>
              <div class="td-price">
                <div class="flex items-center md:inline-block md:text-right">
                  <div>
                    <span class="text-20 text-global-numGreen">{{ data.price }} {{ data.price_unit }}</span>
                    <IconFont :type="data.price_unit"/>
                  </div>
                  <div class="ml-1 md:ml-0">
                    <span class="text-12-16 text-global-highTitle text-opacity-45">{{ toNumberCashFormat(data.issue_volume, 'Total') }}</span>
                  </div>
                </div>
              </div>
              <div class="td-date">
                <template v-if="data.online_time && isAfter(data.online_time)">
                  <div class="flex md:block items-center">
                    <div class="text-sm whitespace-nowrap">
                      <span class="text-global-highTitle text-opacity-85 text-14-16 leading-3">{{ dateFormat(data.online_time, 'YYYY.MM.DD HH:mm') }}</span>
                    </div>
                    <div class="text-12 whitespace-nowrap" v-if="data.online_timezone">
                      <span class="text-global-highTitle text-opacity-45 text-xs leading-3">
                        <span class="mx-1 md:hidden">/</span>
                        <span>{{ data.online_timezone }}</span>
                      </span>
                    </div>
                  </div>
                  <div class="text-xs mt-1.5 md:mt-2.5 flex justify-end whitespace-nowrap" v-if="data.online_time && isAfter(data.online_time)">
                    <span class="inline-block text-12 leading-4 text-global-highTitle text-opacity-45 mr-1">{{ I18n.dapp.timeEnd }}</span>
                    <TimeRed :value="data.online_time"></TimeRed>
                  </div>
                </template>
                <template v-else>
                  <el-avatar shape="square" fit="fit" :size="80" :src="I18n.dapp.status.success"></el-avatar>
                </template>
              </div>
              <div class="td-operation hidden md:block">
                <DappOperation :data="data"/>
              </div>
            </div>
            <div class="flex comment mt-4" v-if="data.comment">
              <div class="pr-1.5">
                <IconFont type="icon-comment" size="18"/>
              </div>
              <div>
                <p class="text-14-20 whitespace-pre-wrap">{{ data.comment }}</p>
              </div>
            </div>
          </template>
        </UiList>
        <div class="text-center pt-3" v-show="total > limit * page">
          <UiButtonMore :request="onNext"/>
        </div>
      </div>
      <div class="mt-3" v-else>
        <div v-show="!loading">
          <Empty :desc="I18n.apy.tips.noData"></Empty>
        </div>
      </div>
    </div>
    <div class="hidden">
      <UiWechatShare :title="I18n.nft.page.title" :content="I18n.nft.page.content"/>

      <UiHeaderTitle :value="I18n.nft.page.title"/>
      <UiHeaderMeta name="description" :content="I18n.dapp.meta.description"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../dapp/list.scss";
.featured {
  @apply text-xs;
  @apply py-1 px-2 rounded text-white leading-5;
  @apply flex items-center;
  @apply bg-global-golden;
}
</style>
