<script setup lang="ts">
import * as API from '~/api/index'
import { onMounted, ref, watch } from 'vue'
import { toNumberCashFormat } from '~/utils'
import { GroupPosition } from '~/logic/dapp/interface'

const list = ref<any[]>([])
const is_online = ref<boolean>(false)
const search = ref<string>('')

const query = {
  page: 1,
  page_size: 10
}

const onGetList = async function(value: object) {
  Object.assign(query, value)
  const data = await API.nft.discover.getList<any[]>(query as any)
  list.value = data
}

const onSort = function(data: any) {
  onGetList({
    page: 1,
    ...data
  })
}

onMounted(() => {
  watch([is_online, search], function(data) {
    onSort({
      is_online: data[0],
      query: data[1]
    })
  })
})

</script>

<template>
  <div class="wrap-discover">
    <div class="content">
      <DappTabs :position="GroupPosition.nftNew" @change="onGetList">
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
              <UiSort title="Mint Price / Supply" name="price" @onChange="onSort"></UiSort>
            </div>
            <div class="td-date text-global-highTitle text-opacity-65">
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
          <template #header>
            <div class="flex">
              <div class="flex-1">
                <span class="block text-lg font-medium text-global-highTitle leading-5">{{ data.name }}</span>
                <span class="block mt-3 text-sm font-normal text-global-highTitle text-opacity-65 leading-5">{{ data.description }}</span>
              </div>
              <div class="ml-4" v-if="data.is_featured">
                Featured
              </div>
            </div>
          </template>
          <template #content>
            <div class="table-tr">
              <div class="td-title">
                <div class="flex">
                  <template v-for="(src, index) in data.gallery" :key="index">
                    <el-avatar v-if="index < 5" class="inline-block" :class="{'ml-2': index > 0}" shape="square" :size="80" fit="cover" :src="src"></el-avatar>
                  </template>
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
                <div class="inline-block text-right">
                  <div>
                    <span class="text-2xl text-global-numGreen">{{ data.price }} {{ data.price_unit }}</span>
                    <IconFont :type="data.price_unit"/>
                  </div>
                  <div>
                    <span class="text-xs leading-4 text-global-highTitle text-opacity-45">{{ toNumberCashFormat(data.issue_volume, 'Total') }}</span>
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
                <a v-router="data.website" class="flex items-center text-global-darkblue justify-end">
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
                <p class="text-sm whitespace-pre-wrap">{{ data.comment }}</p>
              </div>
            </div>
          </template>
        </UiList>
        <div class="text-center pt-3">
          <UiButtonMore/>
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
@import "../dapp/list.scss";
</style>
