<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, reactive, onMounted, toRaw } from 'vue'
import * as API from '~/api/index'
import { forEach, toBoolean } from '~/utils'
const $router = useRoute()

const loading = ref<boolean>(true)
const data = reactive<object>({})

const getDetail = async function() {
  const params: any = toRaw($router.params)
  const result = await API.nft.detail.get(params)
  forEach(function(value: any, key: string) {
    // @ts-ignore
    data[key] = value
  }, result)
  loading.value = false
}

onMounted(getDetail)
</script>

<template>
  <div v-if="loading" class="md:w-250 mx-auto p-6 bg-white rounded-sm">
    <div class="min-h-100">
      <Spin :loading="true"></Spin>
    </div>
  </div>
  <div v-else class="md:w-250 mx-auto p-6 bg-white rounded-sm">
    <div class="flex md:hidden pb-4">
      <template v-for="(value, index) in data.gallery" :key="index">
        <el-avatar v-if="value" class="mr-2" shape="square" fit="fit" :size="64" :src="value"></el-avatar>
      </template>
    </div>
    <div class="flex items-center">
      <DappDetailTitle class="nft-title" :data="data"/>
    </div>
    <div class="hidden md:flex items-end">
      <div class="mr-4">
        <div class="mt-2">
          <template v-for="(value, index) in data.gallery" :key="index">
            <el-image v-if="value" class="mr-2 w-23 h-23" shape="square" fit="fit" :preview-src-list="[value]" :src="value"/>
          </template>
        </div>
        <div class="mt-2">
          <p class="text-14-20 mt-2.5 text-global-highTitle text-opacity-85">{{ data.description }}</p>
        </div>
      </div>
      <!-- 点赞 -->
      <div>
        <DappStar :id="data.id" :value="data.clout" :clouted="data.is_clouted"/>
      </div>
    </div>
    <!--项目介绍-->
    <div class="mt-4">
      <NftDetailInfo :data="data"/>
    </div>
    <!--项目测评-->
    <DappDetailComment :data="data"/>
    <!--参与方式-->
    <DappDetailHelp :data="data"/>
    <!--分享文案-->
    <div class="mt-12">
      <DappDetailShare :data="data"/>
    </div>
  </div>
</template>


<style scoped lang="scss">
.star {
  @apply h-23;
}
</style>
