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
  const result = await API.dapp.detail.get(params)
  forEach(function(value: any, key: string) {
    // @ts-ignore
    data[key] = value
  }, result)
  loading.value = false
}

onMounted(getDetail)
</script>

<template>
  <div v-if="loading" class="md:w-250 mx-auto p-4 md:p-6 bg-white rounded-sm">
    <div class="min-h-100">
      <Spin :loading="true"></Spin>
    </div>
  </div>
  <div v-else class="md:w-250 mx-auto p-4 md:p-6 bg-white rounded-sm">
    <div class="md:flex">
      <div class="flex justify-center">
        <el-avatar :class="{'new-40': toBoolean(data.is_new)}" shape="square" fit="fit" :size="92" :src="data.logo"></el-avatar>
      </div>
      <div class="md:mx-4 md:flex-1 md:w-1 mt-4 md:mt-0">
        <div class="flex items-center">
          <DappDetailTitle :data="data"/>
        </div>
        <p class="text-14-20 mt-2.5 text-global-highTitle text-opacity-85">{{ data.description }}</p>
      </div>
      <div class="hidden md:block">
        <DappStar :id="data.id" :value="data.clout" :clouted="data.is_clouted"/>
      </div>
    </div>
    <!--项目基础信息-->
    <DappDetailInfo :data="data"/>
    <!--项目测评-->
    <DappDetailComment :data="data"/>
    <!--参与方式-->
    <DappDetailHelp :data="data"/>
    <!--分享文案-->
    <div class="mt-12">
      <DappDetailShare/>
    </div>
  </div>
</template>


<style scoped lang="scss">
.star {
  height: 92px !important;
}
</style>
