<script lang="ts" setup>
import {symbolStore, pairStore,hot} from '~/store/liquidity/state'
import {changeRouteParam} from '~/lib/tool'
import {useRoute, useRouter} from 'vue-router'
import I18n from '~/utils/i18n/index'
const route = useRoute()
const router = useRouter()
const selectTag= (item: any) => {
  if (item.type === 'token') {
    symbolStore.name = item.name
    symbolStore.id = item.token_id
    pairStore.id = ''
    pairStore.name = ''
    changeRouteParam(route, router, {token: item.token_id,pair:undefined,pairName:undefined})
  } else {
    symbolStore.name = item.tokenName
    symbolStore.id = item.token_id
    pairStore.name = item.name
    pairStore.id = item.pair_id
    changeRouteParam(route, router, {token: item.token_id,pair: item.pair_id, pairName: item.name})
    // changeRouteParam(route, router, {pair: item.pair_id, pairName: item.name})
  }
}
</script>
<template>
  <div class="font-kdExp">
    <div class="text-global-default opacity-65 text-kd14px18px  text-kdFang font-medium ">{{I18n.liquidity.select.hot}}</div>
    <div class="flex flex-wrap">
      <template v-for="item in hot">
        <div v-login  v-if="item.type" @click="selectTag(item)" class=" hand flex mt-3 ">
          <span class="coinName mr-3"  :class="item.token_id===symbolStore.id?'selected':'noSelected'">{{ item.name }}</span>
        </div>
      </template>
    </div>

  </div>
  <!--      交易对-->
</template>
<style lang="postcss" scoped>
.noSelected{
  color:rgba(37, 62, 111, 0.65);
  border: 1px solid rgba(37, 62, 111, 0.16);
  background:rgba(246, 250, 253, 1);
}
.selected{
  color:#2B8DFE !important;
  border: 1px solid rgba(43, 141, 254, 1);
  background: white;
}

.more {
  @apply text-kd14px18px px-3 py-1.5 text-global-primary font-normal;
}

.coinName {

  border-radius: 4px;
  @apply text-kd12px18px py-0.5 px-1.5 text-global-default opacity-85 font-normal border-1 whitespace-nowrap;
}

.selectBg {
  background: rgba(43, 141, 254, 0.08);
}

.tipContainer {
  background: #ffffff;
  box-shadow: 0px 4px 12px rgba(43, 140, 255, 0.16);
  border-radius: 4px;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-thumb:vertical {
    background: rgba(0, 0, 0, 0.1);
  }
}

::v-deep(.el-input__inner) {
  height: 20px;
  background: none;
  border: 0;
}

::v-deep(.el-input__inner) {
  font-size: 14px !important;
  padding-left: 0px;
}
</style>
