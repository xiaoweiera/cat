<script lang="ts">
  export default {
    data () {
      return {
        list: [{}, {}, {}],
        images: [
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        ]
      }
    },
    components: {
    },
    methods: {
      onClick (data: any) {
        console.log(data)
      }
    }
  }
</script>

<template>
  <div class="wrap-discover">
    <div class="content">
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
              <UiSort title="Mint Price / Supply" name="price" @onChange="onClick"></UiSort>
            </div>
            <div class="td-date text-global-highTitle text-opacity-65">
              <UiSort title="Sale Date / Time" name="date" @onChange="onClick"></UiSort>
            </div>
            <div class="td-operation text-global-highTitle text-opacity-65">
              <span>操作</span>
            </div>
          </div>
        </template>
      </UiList>
      <!-- 内容 -->
      <div class="mt-3">
        <UiList>
          <template #header>
            <div class="flex">
              <div class="flex-1">
                <p class="text-lg">VIDEO GAME DEV SQUAD</p>
                <p class="text-sm">美国媒体10日报道称，有数据显示，新冠肺炎疫情期间，纽约市在家中死亡的..美国媒体10日报道称，有数据显示，新冠肺炎疫情期间，纽约市在家中死亡的...国...新冠肺炎疫情期间...</p>
              </div>
              <div class="ml-4">
                Featured
              </div>
            </div>
          </template>
          <template #content>
            <div class="table-tr">
              <div class="td-title">
                <div class="flex">
                  <template v-for="(src, index) in images" :key="index">
                    <el-avatar class="inline-block" :class="{'ml-2': index > 0}" shape="square" :size="80" fit="cover" :src="src"></el-avatar>
                  </template>
                </div>
              </div>
              <div class="td-data">
                <div class="flex items-center">
                  <IconFont class="text-base" type="Telegram"/>
                  <span class="text-sm ml-1.5">Telegram</span>
                  <span class="text-xs ml-1">9999 Num / 9999 Online</span>
                </div>
                <div class="flex items-center">
                  <IconFont class="text-base" type="Twitter"/>
                  <span class="text-sm ml-1.5">Twitter</span>
                  <span class="text-xs ml-1">9999M Num / 9999K Online</span>
                </div>
              </div>
              <div class="td-price">
                <div class="inline-block text-right">
                  <div>
                    <span class="text-2xl">0.01 ETH</span>
                    <IconFont type="eth"/>
                  </div>
                  <div>
                    <span class="text-xs">7,777 Total</span>
                  </div>
                </div>
              </div>
              <div class="td-date">
                <div class="text-sm">
                  <span>2021.09.01 11:00</span>
                </div>
                <div class="text-xs">
                  <span>Asia/Shanghai</span>
                </div>
                <div class="text-xs">
                  <span>剩余时间</span>
                </div>
              </div>
              <div class="td-operation">
                <p class="flex items-center text-global-darkblue justify-end">
                  <span class="text-sm">Mint</span>
                  <IconFont type="icon-right" size="xs"/>
                </p>
                <div class="pt-3">
                  <div class="star flex items-center justify-center">
                    <div class="text-center">
                      <div class="flex">
                        <IconFont type="icon-triangle" size="24"/>
                      </div>
                      <div class="flex">
                        <span class="text-sm">124</span>
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
                <p class="text-sm whitespace-pre-wrap">评测：赌猿是由120多个特征创建的7777个独特角色的集合。有些罕见特征只出现一次。项目方将在decentraland metaverse的预购土地上建造赌场，赌场收益一部分直接发送到持有者钱包，持有者可参加不对外开放的赌场活动和锦标赛：</p>
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
