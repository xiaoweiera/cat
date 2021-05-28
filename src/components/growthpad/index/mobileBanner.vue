<script setup lang="ts">
import { copyTxt } from '~/lib/tool'
import I18n from '~/utils/i18n'
import { userData } from '~/logic/user/login'
const link = (): string => {
  const { origin, pathname } = window.location
  let url = `${origin}${pathname}`
  const code = userData.my_invitation_code
  if (code) {
    url = `${url}?code=${code}`
  }
  return url
}
</script>
<template>
  <div class="mdhidden mobileImg">
    <div class="bg-white containerRadius">
      <img :src="I18n.growthpadShow.mobileBanner" alt="" class="w-full" />
      <div class="flex items-center justify-between mt-2.5 mb-2.5 px-3">
        <div class="text-global-default opacity-65 text-kd13px18px">
          <div class="flex items-center">
            <span>{{ I18n.growthpadShow.iInvite }}</span>
            <span class="text-kd17px17px text-global-primary ml-1.5">{{
              userData.growthpad_invited_count
            }}</span>
          </div>
          <div class="flex items-center mt-1.5">
            <span>{{ I18n.growthpadShow.code }}</span>
            <span class="text-kd17px17px text-global-primary ml-1.5">{{
              userData.my_invitation_code
            }}</span>
            <Copy :link="link">
              <IconFont
                class="ml-2 hand flex mb-1"
                type="copy"
                size="base"
              ></IconFont>
            </Copy>
          </div>
        </div>
        <Copy :link="link">
          <div
            class="
              visited
              flex
              justify-center
              items-center
              text-kd16px24px
              font-kdFang
            "
          >
            {{ I18n.growthpadShow.invite }}
          </div>
        </Copy>
      </div>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.containerRadius {
  border-radius: 12px;
}
.visited {
  color: #ffffff;

  background: linear-gradient(180deg, #7cb9ff 0%, #3090ff 100%);
  border-radius: 42px;
  padding: 4px 12px;
}
.mobileImg {
  @apply flex items-center   justify-center  w-full pt-4 px-4;
}
</style>
