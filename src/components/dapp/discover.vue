<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import * as API from '~/api/index'
import I18n from '~/utils/i18n/index'
import { isAfter } from '~/utils/time'
import { GroupPosition } from '~/logic/dapp/interface'
import { toNumberCashFormat, toInteger, toArray, debounce, dateFormat, compact, upperFirst } from '~/utils'
import safeGet from '@fengqiaogang/safe-get'

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
    label: '按上线时间降序',
    value: '{"online_time": "desc"}'
  }, {
    label: '按上线时间升序',
    value: '{"online_time": "asc"}'
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
  const result = await API.dapp.discover.getList<any[]>(param as any)
  const info = safeGet<any>(result, 'page_info') || {}
  total.value = toInteger(info.total)
  page.value = param.page

  const array = toArray(safeGet<any[]>(result, 'results') || [])
  list.value.push(...array)

  loading.value = false
}

const onSort = debounce<any>(function(data?: any) {
  list.value = []
  const value = Object.assign({}, data ? data : {}, {
    page: 1,
  })
  return onGetList(value)
}, 500)

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


</script>

<template>
  <div class="wrap-discover">
    <div class="content">
      <DappTabs :position="GroupPosition.dappNew" @change="onChangeTab">
        <div class="tabs-operate">
          <div class="mt-4 md:mt-0 hidden">
            <span class="mr-1.5 text-sm text-global-highTitle text-opacity-85">{{ I18n.dapp.group.viewOnline }}</span>
            <el-switch v-model="is_online"></el-switch>
          </div>
          <div class="flex flex-1 items-center md:justify-end">
            <div class="max-w-56 min-w-34">
              <el-input :placeholder="I18n.dapp.group.search" v-model="search" size="small">
                <template #prefix>
                  <i class="el-input__icon el-icon-search"></i>
                </template>
              </el-input>
            </div>
            <div class="max-w-50 min-w-40 ml-4 flex-1 block md:hidden">
              <el-select v-model="sortValue" @change="onChangeSort" placeholder="请选择排序方式" size="small">
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
          <div class="table-tr text-kdFang">
            <div class="td-title text-global-highTitle text-opacity-65">
              <span>{{ I18n.dapp.header.info }}</span>
            </div>
            <div class="td-data text-global-highTitle text-opacity-65">
              <span>{{ I18n.dapp.header.mediaData }}</span>
            </div>
            <div class="td-price text-global-highTitle text-opacity-65">
              <span>{{ I18n.dapp.header.type }}</span>
            </div>
            <div class="td-date text-global-highTitle text-opacity-65 flex justify-end">
              <UiSort :title="I18n.dapp.header.time" name="online_time" @change="onSort"></UiSort>
            </div>
            <div class="td-operation text-global-highTitle text-opacity-65">
              <span>{{ I18n.dapp.header.operate }}</span>
            </div>
          </div>
        </template>
      </UiList>
      <!-- 内容 -->
      <div class="mt-3" v-if="list.length > 0">
        <UiList v-for="(data, index) in list" :key="index">
          <template #content>
            <div class="table-tr text-kdFang">
              <div class="td-title flex">
                <div class="flex-1">
                  <div class="flex">
                    <div class="w-20 mr-3">
                      <el-avatar class="inline-block" shape="square" :size="80" fit="cover" :src="data.logo"></el-avatar>
                    </div>
                    <div>
                      <span class="block text-lg font-medium text-global-highTitle leading-5 whitespace-pre-wrap">{{ data.name }}</span>
                      <span class="block mt-1.5 md:mt-3 text-xs md:text-sm font-normal text-global-highTitle text-opacity-65 leading-5 whitespace-pre-wrap line-clamp-3" v-if="data.description">{{ data.description }}</span>
                    </div>
                  </div>
                </div>
                <DappOperation class="ml-4 md:hidden" :data="data"/>
              </div>
              <div class="td-data">
                <template v-for="(media, key) in data.medias" :key="`${index}-${key}`">
                  <a v-router.blank="media.project_media_url" class="flex items-center media-item" v-if="media">
                    <IconFont class="text-base" :type="key" bright/>
                    <span class="text-sm ml-1.5 text-global-highTitle text-opacity-85">{{ upperFirst(key) }}</span>
                    <template v-if="media.total_user && media.online_user">
                      <span class="text-xs ml-1 text-global-highTitle text-opacity-65 leading-3">{{ toNumberCashFormat(media.total_user, 'Num') }} / {{ toNumberCashFormat(media.online_user, 'Online') }}</span>
                    </template>
                    <template v-else-if="media.total_user">
                      <span class="text-xs ml-1 text-global-highTitle text-opacity-65 leading-3">{{ toNumberCashFormat(media.total_user, 'Num') }}</span>
                    </template>
                    <template v-else-if="media.online_user">
                      <span class="text-xs ml-1 text-global-highTitle text-opacity-65 leading-3">{{ toNumberCashFormat(media.online_user, 'Online') }}</span>
                    </template>
                  </a>
                </template>
              </div>
              <div class="td-price">
                <div class="flex items-center md:block">
                  <div class="md:pb-3" v-if="data.categories && compact(data.categories).length > 0">
                    <template v-for="(item, j) in data.categories" :key="`${index}-${j}`">
                      <span class="mr-2 text-global-primary bg-global-primary bg-opacity-10 rounded-kd20px px-2 py-1">{{ item }}</span>
                    </template>
                  </div>
                  <div class="flex">
                    <template v-for="(item, j) in data.chains" :key="`${index}-${j}`">
                      <span class="mr-2 flex items-center justify-center w-7 h-7 border border-solid border-global-primary border-opacity-10 rounded-kd28px">
                        <IconFont :type="item.logo" size="16"/>
                      </span>
                    </template>
                  </div>
                </div>
              </div>
              <div class="td-date">
                <div class="flex md:block items-center">
                  <div class="text-sm whitespace-nowrap" v-if="data.online_time">
                    <span class="text-global-highTitle text-opacity-85 text-sm leading-3">{{ dateFormat(data.online_time, 'YYYY.MM.DD HH:mm') }}</span>
                  </div>
                  <div class="text-xs whitespace-nowrap" v-if="data.online_timezone">
                    <span class="text-global-highTitle text-opacity-45 text-xs leading-3">
                      <span class="mx-1 md:hidden">/</span>
                      <span>{{ data.online_timezone }}</span>
                    </span>
                  </div>
                </div>
                <div class="text-xs mt-1.5 md:mt-2.5 flex whitespace-nowrap" v-if="data.online_time && isAfter(data.online_time)">
                  <span class="inline-block text-xs leading-4 text-global-highTitle text-opacity-45 mr-1">{{ I18n.dapp.timeEnd }}</span>
                  <span class="date-box inline-block">
                    <TimeCountdown :value="data.online_time">
                      <template #default="date">
                        <i>{{ date.day }}</i> : <i>{{ date.hour }}</i> : <i>{{ date.minute }}</i> : <i>{{ date.second }}</i>
                      </template>
                    </TimeCountdown>
                  </span>
                </div>
              </div>
              <div class="td-operation hidden md:block">
                <DappOperation :data="data"/>
              </div>
            </div>
            <div class="flex comment text-kdFang mt-4" v-if="data.comment">
              <div class="pr-1.5">
                <IconFont type="icon-comment" size="18"/>
              </div>
              <div>
                <p class="text-sm whitespace-pre-wrap">{{ data.comment }}</p>
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
  </div>
</template>

<style scoped lang="scss">
@import "./list.scss";
</style>
