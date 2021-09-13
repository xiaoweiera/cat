<script setup lang="ts">
import I18n from '~/utils/i18n/index'
import {ref, defineProps, onMounted} from 'vue'
// @ts-ignore
import { formatRulesNumber,formatDefaultTime} from '~/lib/tool'
import { setInject } from '~/utils/use/state'
import {getProjectDetail} from '~/logic/apy2/index'
import {noticType} from '~/logic/apy2/config'
const imgList={
  top:'icon-laba',
  announcement:'icon-jiaocheng',
  tutorial:'icon-laba',
  warning:'icon-Warning'
}
const classList= {top: 'top', announcement: 'notic', tutorial: 'study',warning:'warning'}
const getClass=(type:string,is_top:boolean)=>classList[is_top?'top':type]
const props = defineProps({projectId: Object})
const setProjectInfo=setInject('projectInfo')
const data = ref({})

const getData = async () =>{
  if(props.projectId) {
    data.value = await getProjectDetail(props.projectId as any)
    setProjectInfo(data.value)
  }
}
onMounted(getData)

</script>
<template>
  <div class="font-kdFang">
    <div class="hidden" v-if="data.name">
      <UiHeaderTitle :value="I18n.template(I18n.apyIndex.pageProject.title, { project: data.name })"/>
    </div>
    <div>
      <div class="flex items-center relative">
        <div class="relative">
          <IconFont v-if="data.new" class="absolute" size="30" type="icon-NEW"/>
          <IconFont rounded border  size="60" :type="data.logo || 'icon-morentoken'"/>
        </div>
        <div class="ml-3">
          <div class="flex items-center">
            <div class="text-kd28px28px font-kdExp font-bold text-global-highTitle text-opacity-85">{{ data.name }}
            </div>

            <template v-for="tip in data.category">
              <span class="ml-2 bg-global-highTitle bg-opacity-6 rounded-kd4px px-1 py-0.5 text-global-highTitle text-kd12px14px text-opacity-45">{{ tip }}</span>
            </template>
          </div>
          <div class="flex items-center mt-2 font-kdExp">
            <IconFont size="20" class="mr-1" :type="data.platform_token_logo || 'icon-morentoken'"/>
            <span class="mr-1 text-global-highTitle text-kd14px18px">{{ data.platform_token }}</span>
            <span class="mr-1 text-global-highTitle text-kd14px18px">${{ formatRulesNumber(data.platform_token_price) }}</span>
            <!--            <span class="bg-global-numRed  bg-opacity-20 rounded-kd4px px-1 py-0.5 text-kd12px14px text-global-numRed">-3.23%</span>-->
            <IconFont size="16" class="text-global-highTitle text-opacity-10 px-2  " type="icon-gang"/>
            <a class="text-global-primary flex items-center font-kdExp  hand" :href="data.project_url" target="_blank">
              <IconFont class="mr-1" size="20" type="icon-link"/>
              <a v-router.blank="data.project_url" class="text-kd14px18px">{{I18n.apyIndex.comLink}}</a>
            </a>
            <div class="flex items-center" v-if="data.safety">
              <IconFont size="16" class="text-global-highTitle text-opacity-10 px-2" type="icon-gang"/>
              <div class="text-global-primary flex items-center">
                <div v-if="data.safety.length>0" class="flex items-center ">
                  <IconFont class="mr-2" size="20" type="icon-shenji"/>
                  <template v-for="item in data.safety">
                    <a v-router.blank="item.link" class="text-global-primary  mr-2 hand flex items-center font-kdFang text-kd14px18px" style="border-bottom:1px solid #2B8DFE;">{{ item.department }}</a>
                  </template>
                </div>
                <div v-else class="flex items-center ">
                  <IconFont class="mr-1" size="20" type="icon-weishenji"/>
                  <span class="text-global-numRed  text-kd14px18px">{{I18n.apyIndex.unaudited}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a v-if="data.tutorial_url" :href="data.tutorial_url"  class="text-global-white hand bg-global-primary px-3 py-2  flex items-center absolute right-0 rounded-kd4px">
          <IconFont type="icon-jiaocheng" size="16"/>
          <span  target="_blank" class="ml-1 text-kd14px18px font-medium hand">{{I18n.apyIndex.projectTutorial}}</span>
         </a>
      </div>
      <!--  数字-->
      <div class="tbBorder py-4 mt-4">
        <div class="min-h-12 flex font-kdFang ">
          <div class="flex-1 rightBorder">
            <div class="titleTxt mr-6">{{I18n.apyIndex.projectTvl}}</div>
            <div class="font-kdExp font-bold text-kd26px26px text-global-highTitle text-opacity-85 mt-1">
              ${{ formatRulesNumber(data.tvl, false) }}
            </div>
          </div>
          <div v-if="data.reward_cap" class="flex-1 rightBorder ml-6 ">
            <div class="titleTxt">{{I18n.apyIndex.userMoney}}</div>
            <div class="font-kdExp font-bold text-kd26px26px text-global-highTitle text-opacity-85 mt-1">
              ${{ formatRulesNumber(data.reward_cap, false) }}
            </div>
          </div>
          <div class="flex-1 rightBorder ml-6 ">
            <div class="titleTxt">{{I18n.apyIndex.supprotChain}}</div>
            <div v-if="data.chains" class="font-kdExp font-bold text-kd26px26px text-global-highTitle text-opacity-85 mt-1">
              <span>{{ data.chains.length }}</span>
              <span class="text-kd12px18px font-medium font-kdFang text-global-highTitle ml-0.8 ">{{I18n.apyIndex.unitTiao}} (
                <template v-for="(item,i) in data.chains">
                    <span>{{ item }}</span>
                      <span v-if="i<data.chains.length-1">、</span>
                    </template>)
              </span>
            </div>
          </div>
          <div  class="flex-1  ml-6 ">
            <div class="titleTxt">{{I18n.apyIndex.poolNumber}}</div>
            <div  class="font-kdExp font-bold text-kd26px26px text-global-highTitle text-opacity-85 mt-1">
              <span v-if="data.token_pool_length">{{ data.token_pool_length || 0 }}</span>
              <span v-if="data.token_pool_length" class="mr-3 text-kd12px18px font-medium font-kdFang text-global-highTitle ml-0.8 ">{{I18n.apyIndex.singleCoin}}</span>
              <span v-if="data.lp_pool_length ">{{ data.lp_pool_length || 0 }}</span>
              <span v-if="data.lp_pool_length " class="text-kd12px18px font-medium font-kdFang text-global-highTitle ml-0.8 ">LP</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 项目描述-->
      <div class="font-kdFang text-kd14px22px py-4 bottomBorder">
        <div class="text-global-highTitle text-opacity-65">{{I18n.apyIndex.projectDes}}</div>
        <div class="text-global-highTitle mt-1">{{ data.project_description || '-' }}</div>
      </div>
            <template v-for="item in data.announcements">
              <a v-router.blank="item.url" :class="getClass(item.type)"   class="flex items-center mt-4 flex-wrap ">
                <span  class="flex tip items-center  rounded-kd4px px-1 py-0.5 whitespace-nowrap">
                  <IconFont :type="imgList[item.type]"  size="16" ></IconFont>
                  <span class="ml-1 text-kd12px16px ">{{noticType[item.type]}}</span>
                </span>
                <span class="ml-1.5 text-kd13px18px txt  ">{{item.content}}</span>
                <span  class="ml-1.5 text-kd13px18px text-global-highTitle text-opacity-45">{{formatDefaultTime(item.published_at,I18n.apyIndex.timeFormat)}}</span>
              </a>
            </template>
      <Apy2BaseWarnTip class="mt-4" :des="I18n.apyIndex.warningDes"/>
    </div>
  </div>
</template>
<style scoped lang="scss">
.tbBorder {
  border-top: 1px solid rgba(3, 54, 102, 0.06);
  border-bottom: 1px solid rgba(3, 54, 102, 0.06);
}

.bottomBorder {
  border-bottom: 1px solid rgba(3, 54, 102, 0.06);
}

.rightBorder {
  border-right: 1px solid rgba(3, 54, 102, 0.06);
}

.titleTxt {
  @apply text-kd14px18px text-global-highTitle  text-opacity-65;
}
.top{
  .tip{
    border-radius: 4px;
    @apply px-1 py-0.5 text-kd13px18px text-global-numRed bg-global-numRed bg-opacity-10 font-medium;
  }
  .des {
    @apply ml-1 text-kd13px18px  text-global-numRed text-opacity-85;
  }
  .txt{
    @apply  text-global-highTitle text-opacity-85;
  }
}
.notic{
  .tip{
    border-radius: 4px;
    @apply px-1 py-0.5 text-kd13px18px text-global-primary  bg-global-primary bg-opacity-10 font-medium;
  }
  .des {
    @apply ml-1 text-kd13px18px  text-global-highTitle text-opacity-85;
  }
  .txt{
    @apply  text-global-highTitle text-opacity-85;
  }

}
.warning{
  .tip{
    border-radius: 4px;
    @apply px-1 py-0.5 text-kd13px18px text-global-numRed  bg-global-numRed bg-opacity-10 font-medium;
  }
  .des {
    @apply ml-1 text-kd13px18px  text-global-numRed text-opacity-85;
  }
  .txt{
    @apply text-global-numRed text-opacity-85;
  }
}
.study{
  .tip{
    border-radius: 4px;
    @apply px-1 py-0.5 text-kd13px18px text-global-numGreen  bg-global-numGreen bg-opacity-10 font-medium;
  }
  .des {
    @apply ml-1 text-kd13px18px  text-global-highTitle text-opacity-85;
  }
  .txt{
    @apply  text-global-highTitle text-opacity-85;
  }
}
</style>



