<script setup lang="ts">
import { computed } from 'vue'
// @ts-ignore
import I18n from '~/utils/i18n/index'
import Task from '~/logic/growthpad/task'
const store = Task()

// @ts-ignore
const infoStatus = computed<boolean>(function() {
  if (store.info.bsc && store.info.uid) {
    return true
  }
  return false
})

</script>

<template>
  <div class="pb-15 font-kdFang">
    <div v-if="!infoStatus">
      <h2 class="pb-4 text-base font-medium address">
        <span>{{ I18n.growthpad.register }}</span>
      </h2>
    </div>
    <div v-else>
      <h2 class="pb-4 text-base font-medium address">Award Information</h2>
    </div>
    <!--个人信息填写-->
    <div>
      <div>
        <p class="text-global-highTitle text-sm leading-6" v-if="store.info.uid">
          <span class="block md:inline-block mr-1.5">Enter Huobi UID:</span>
          <span class="block md:inline whitespace-pre-wrap break-all font-medium">{{ store.info.uid }}</span>
        </p>
        <GrowthpadFormInput v-else name="uid" placeholder="Enter Huobi UID" :button="I18n.growthpad.submit">
          <template #warn>
            <p class="warn">
              <span>Log in to Huobi Global, click My-Profile to see the UID.</span>
            </p>
          </template>
        </GrowthpadFormInput>
      </div>
      <div>
        <p class="text-global-highTitle text-sm leading-6" v-if="store.info.bsc">
          <span class="block md:inline-block mr-1.5">Enter HECO address:</span>
          <span class="block md:inline whitespace-pre-wrap break-all font-medium">{{ store.info.bsc }}</span>
        </p>
        <GrowthpadFormInput v-else class="pt-5" name="address" placeholder="Enter HECO address" :button="I18n.growthpad.submit">
          <template #warn>
            <span>Enter your Heco wallet address,</span>
            <a class="link ml-1" target="_blank" href="https://medium.com/heco-chain/how-to-set-up-matemask-for-heco-chian-53eda451424c">HECO wallet address creation tutorial</a>
          </template>
        </GrowthpadFormInput>
      </div>
    </div>
    <div v-if="infoStatus" class="pt-4">
      <!--奖励信息-->
      <GrowthpadHecoReward/>
    </div>
  </div>
</template>


