<script setup lang="ts">
import { copyTxt } from '~/lib/tool'
import { isLogin, userData } from '~/logic/user/login'
import I18n from '~/utils/i18n'

const link = (): string => {
  const { origin, pathname } = window.location
  let url = `${origin}${pathname}`
  const code = `${userData.my_invitation_code}-G0`
  if (code) {
    url = `${url}?code=${code}`
  }
  // const $title = document.querySelector('title')
  // const value = $title.innerText
  return I18n.template(I18n.growthpad.mdx.copyIndex, { url })
}
</script>
<template>
  <div class="mdhidden mobileImg">
    <div class="bg-white containerRadius">
      <img :src="I18n.growthpadShow.mobileBanner" alt="" class="w-full" />
      <div class="flex items-center justify-between mt-2.5 mb-2.5 px-3">
        <div class="text-global-default opacity-65 text-kd13px18px">
          <div class="items-center">
            <div class="flex flex-cols items-center">
              <span>{{ I18n.growthpad.invited.userCount }}</span>
              <i class="text-kd17px17px text-global-primary ml-1.5">{{
                userData.invited_count || 0
              }}</i>
            </div>
            <div class="flex items-center md:ml-6 mt-1.5 md:mt-0">
              <span>{{ I18n.growthpad.invited.activeCount }}</span>
              <i class="text-kd17px17px text-global-primary ml-1.5">{{
                userData.growthpad_invited_count || 0
              }}</i>
              <!--              <img class="w-4 h-4 ml-3" src="https://res.ikingdata.com/nav/growthIndexInfo.jpg" alt="">-->
            </div>
          </div>
          <div v-if="isLogin" class="flex items-center mt-1.5">
            <span>{{ I18n.growthpadShow.code }}</span>
            <span
              class="text-kd17px17px text-global-primary ml-1.5"
            >{{ userData.my_invitation_code }}-G0</span>
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
            v-if="isLogin"
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
          <div v-else v-login class="visitedButton">
            {{ I18n.growthpadShow.login }}
          </div>
        </Copy>
      </div>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.visitedButton {
  color: #ffffff;
  background: linear-gradient(180deg, #7cb9ff 0%, #3090ff 100%);
  border-radius: 42px;
  padding: 4px 12px;
  @apply visited ml-6 flex justify-center items-center text-kd16px24px font-kdFang cursor-pointer;
}

.containerRadius {
  border: 1px solid rgba(43, 141, 254, 0.06);
  box-shadow: 0px 12px 72px -12px rgba(43, 141, 254, 0.13);
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
