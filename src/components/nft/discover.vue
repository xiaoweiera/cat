<script setup lang="ts">
import * as API from '~/api/index'
import { ref } from 'vue'
import { GroupPosition } from '~/logic/dapp/interface'

const list = ref<any[]>([])
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


</script>

<template>
  <div class="wrap-discover">
    <div class="content">
      <div class="flex items-center justify-center">
        <h2 class="mr-3">快速发现 NFT 新项目</h2>
        <a class="text-white bg-global-darkblue rounded-kd34px px-4 py-2 flex items-center">
          <IconFont type="icon-shangchuan" size="16"/>
          <span class="text-sm ml-1.5">提交新项目</span>
        </a>
      </div>
    </div>
    <div class="content mt-8">
      <div class="flex justify-center">
        <Chains/>
      </div>
    </div>
    <div class="content mt-3">
      <DappTabs :position="GroupPosition.nftNew" @change="onGetList"/>
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
              <UiSort title="Sale Date / Time" name="date" @onChange="onSort"></UiSort>
            </div>
            <div class="td-operation text-global-highTitle text-opacity-65">
              <span>操作</span>
            </div>
          </div>
        </template>
      </UiList>
      <!-- 内容 -->
      <div class="mt-3">
        <UiList v-for="(data, index) in list" :key="index">
          <template #header>
            <div class="flex">
              <div class="flex-1">
                <p class="text-lg">{{ data.name }}</p>
                <p class="text-sm">{{ data.description }}</p>
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
                <template v-for="(media, key) in data.medias" :key="index">
                  <div class="flex items-center">
                    <IconFont class="text-base" :type="key"/>
                    <span class="text-sm ml-1.5">{{ key }}</span>
                    <span class="text-xs ml-1">{{ media.total_user }} Num / {{ media.online_user }} Online</span>
                  </div>
                </template>
              </div>
              <div class="td-price">
                <div class="inline-block text-right">
                  <div>
                    <span class="text-2xl">{{ data.price }} {{ data.price_unit }}</span>
                    <IconFont :type="data.price_unit"/>
                  </div>
                  <div>
                    <span class="text-xs">7,777 Total</span>
                  </div>
                </div>
              </div>
              <div class="td-date">
                <div class="text-sm">
                  <span>{{ data.online_time }}</span>
                </div>
                <div class="text-xs">
                  <span>{{ data.online_timezone }}</span>
                </div>
                <div class="text-xs">
                  <span>剩余时间</span>
                  <TimeCountdown :value="data.online_time">
                    <template #default="date">
                      {{ date.day }} : {{ date.hour }} : {{ date.minute }} : {{ date.second }}
                    </template>
                  </TimeCountdown>
                </div>
              </div>
              <div class="td-operation">
                <a v-router="data.website" class="flex items-center text-global-darkblue justify-end">
                  <span class="text-sm">Mint</span>
                  <IconFont type="icon-right" size="xs"/>
                </a>
                <div class="pt-3">
                  <div class="star flex items-center justify-center">
                    <div class="text-center">
                      <div class="flex">
                        <IconFont type="icon-triangle" size="24"/>
                      </div>
                      <div class="flex justify-center">
                        <span class="text-sm">{{ data.clout }}</span>
                      </div>
                    </div>
                  </div>
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

      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrap-discover {
  background-color: #FAFBFC;
  @apply py-15;
}
.content {
  @apply max-w-320 mx-auto;
}
.table-tr {
  @apply flex items-center justify-between;
  .td-title {
    @apply w-124;
  }
  .td-data {
    @apply w-71;
  }
  .td-price {
    @apply w-55;
  }
  .td-date {
    @apply w-50;
  }
  .td-operation {
    @apply flex-1 text-right;
  }
  .star {
    @apply w-14 h-12.5 rounded;
    @apply bg-white border border-solid;
    @apply border-global-highTitle border-opacity-6;
    &.active {
      @apply text-global-darkblue;
      @apply bg-global-darkblue bg-opacity-8;
      @apply border-global-darkblue border-opacity-8;
    }
  }
}
.comment {
  color: #009C56;
  @apply py-1.5 pl-3 pr-1.5 rounded-md;
  @apply bg-global-numGreen bg-opacity-4;
}
</style>
