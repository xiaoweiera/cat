<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import * as API from '~/api/index'
import { GroupPosition } from '~/logic/dapp/interface'
import { toNumberCashFormat, toInteger, toArray } from '~/utils'
import safeGet from '@fengqiaogang/safe-get'

const list = ref<any[]>([])
const is_online = ref<boolean>(false)
const search = ref<string>('')
const page = ref<number>(1)
const limit = ref<number>(10)
const total = ref<number>(10) // 默认总条数


const onGetList = async function(value?: object) {
  const param = Object.assign({
    page: page.value,
    page_size: limit.value,
    query: search.value,
    is_online: is_online.value
  }, value || {})

  const result = await API.dapp.discover.getList<any[]>(param as any)
  const info = safeGet<any>(result, 'page_info') || {}
  total.value = toInteger(info.total)
  page.value = param.page

  const array = toArray(safeGet<any[]>(result, 'results') || [])
  list.value.push(...array)
}

const onSort = function(data?: any) {
  list.value = []
  const value = Object.assign({}, data ? data : {}, {
    page: 1,
  })
  return onGetList(value)
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
      <DappTabs :position="GroupPosition.dappNew" @change="onGetList">
        <div class="flex items-center justify-between w-full">
          <div>
            <span class="mr-1.5 text-sm text-global-highTitle text-opacity-85">查看已上线项目</span>
            <el-switch v-model="is_online"></el-switch>
          </div>
          <div>
            <el-input placeholder="搜索项目" v-model="search" size="small">
              <template #prefix>
                <i class="el-input__icon el-icon-search"></i>
              </template>
            </el-input>
          </div>
        </div>
      </DappTabs>
    </div>
    <div class="content mt-3">
      <UiList>
        <template #content>
          <div class="table-tr">
            <div class="td-title text-global-highTitle text-opacity-65">
              <span>项目信息</span>
            </div>
            <div class="td-data text-global-highTitle text-opacity-65">
              <span>社媒数据</span>
            </div>
            <div class="td-price text-global-highTitle text-opacity-65">
              <span>项目类型</span>
            </div>
            <div class="td-date text-global-highTitle text-opacity-65 flex justify-end">
              <UiSort title="Sale Date / Time" name="online_time" @onChange="onSort"></UiSort>
            </div>
            <div class="td-operation text-global-highTitle text-opacity-65">
              <span>操作</span>
            </div>
          </div>
        </template>
      </UiList>
      <!-- 内容 -->
      <div class="mt-3" v-if="list.length > 0">
        <UiList v-for="(data, index) in list" :key="index">
          <template #content>
            <div class="table-tr">
              <div class="td-title">
                <div class="flex">
                  <div class="w-20 mr-3">
                    <el-avatar class="inline-block" shape="square" :size="80" fit="cover" :src="data.logo"></el-avatar>
                  </div>
                  <div>
                    <span class="block text-lg font-medium text-global-highTitle leading-5">{{ data.name }}</span>
                    <span class="block mt-3 text-sm font-normal text-global-highTitle text-opacity-65 leading-5">{{ data.description }}</span>
                  </div>
                </div>
              </div>
              <div class="td-data">
                <template v-for="(media, key, j) in data.medias" :key="`${index}-${key}`">
                  <div class="flex items-center" :class="{'mt-2.5': j > 0}">
                    <IconFont class="text-base" :type="key" bright/>
                    <span class="text-sm ml-1.5 text-global-highTitle text-opacity-85">{{ key }}</span>
                    <span class="text-xs ml-1 text-global-highTitle text-opacity-65 leading-3">{{ toNumberCashFormat(media.total_user, 'Num') }} / {{ toNumberCashFormat(media.online_user, 'Online') }}</span>
                  </div>
                </template>
              </div>
              <div class="td-price">
                <div>
                  <div>
                    <template v-for="(item, j) in data.categories" :key="`${index}-${j}`">
                      <span class="mr-2 text-global-primary bg-global-primary bg-opacity-10 rounded-kd20px px-2 py-1">{{ item }}</span>
                    </template>
                  </div>
                  <div class="pt-3 flex">
                    <template v-for="(item, j) in data.chains" :key="`${index}-${j}`">
                      <span class="mr-2 flex items-center justify-center w-7 h-7 border border-solid border-global-primary border-opacity-10 rounded-kd28px">
                        <IconFont :type="item.logo" size="16"/>
                      </span>
                    </template>
                  </div>
                </div>
              </div>
              <div class="td-date text-right">
                <div class="text-sm">
                  <span class="text-global-highTitle text-opacity-85 text-sm leading-3">{{ data.online_time }}</span>
                </div>
                <div class="text-xs">
                  <span class="text-global-highTitle text-opacity-85 text-xs leading-3">{{ data.online_timezone }}</span>
                </div>
                <div class="text-xs mt-2.5">
                  <span class="inline-block text-xs leading-4 text-global-highTitle text-opacity-45 mr-1">剩余时间</span>
                  <span class="date-box inline-block">
                    <TimeCountdown :value="data.online_time">
                      <template #default="date">
                        <i>{{ date.day }}</i> : <i>{{ date.hour }}</i> : <i>{{ date.minute }}</i> : <i>{{ date.second }}</i>
                      </template>
                    </TimeCountdown>
                  </span>
                </div>
              </div>
              <div class="td-operation">
                <a v-router.blank="data.website" class="flex items-center text-global-darkblue justify-end cursor-pointer">
                  <span class="text-sm">Mint</span>
                  <IconFont type="icon-right" size="xs"/>
                </a>
                <div class="pt-3">
                  <DappStar :id="data.id" :value="data.clout" :clouted="data.is_clouted"/>
                </div>
              </div>
            </div>
          </template>
          <template #footer>
            <div class="flex comment">
              <div class="pr-1.5">
                <IconFont type="icon-comment" size="18"/>
              </div>
              <div>
                <p class="text-sm whitespace-pre-wrap">评测：赌猿是由120多个特征创建的7777个独特角色的集合。有些罕见特征只出现一次。项目方将在decentraland metaverse的预购土地上建造赌场，赌场收益一部分直接发送到持有者钱包，持有者可参加不对外开放的赌场活动和锦标赛：</p>
              </div>
            </div>
          </template>
        </UiList>

        <div class="text-center pt-3" v-show="total > limit * page">
          <UiButtonMore :request="onNext"/>
        </div>
      </div>
      <div class="mt-3" v-else>
        <div class="border border-solid border-gray">
          <Empty desc="暂无数据"></Empty>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./list.scss";
</style>
