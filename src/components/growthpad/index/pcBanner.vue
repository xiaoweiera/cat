<script setup lang="ts">
import { company } from '~/logic/growthpad/index'
import { userData, isLogin } from '~/logic/user/login'
import { copyTxt } from '~/lib/tool'
import I18n from '~/utils/i18n'
// @ts-ignore
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
  <div class="xshidden relative mt-20">
    <div class="bg-white containerRadius">
      <img :src="I18n.growthpadShow.pcBanner" alt="" />
      <div class="absolute flex items-center ml-10 bottom-21">
        <template v-for="(item, i) in company">
          <a :href="item.url" class="hand" target="_blank">
            <img
              :class="i === 0 ? 'h-5 mr-6 mb-1' : 'h-5 mr-6'"
              :src="item.logo"
              alt=""
            />
          </a>
        </template>
      </div>
      <div
        class="
          pt-4
          pb-4
          px-6
          flex
          items-end
          justify-between
          text-global-default text-kd13px18px
        "
      >
        <div class="flex relative">
          <span class="flex items-center opacity-65">
            <span>{{ I18n.growthpad.invited.userCount }}</span>
            <i class="ml-1 numText">{{ userData.invited_count || 0 }}</i>
          </span>
          <span class="flex items-center md:ml-6 mt-1.5 md:mt-0">
            <span class="opacity-65">{{
              I18n.growthpad.invited.activeCount
            }}</span>
            <i class="ml-1 numText opacity-65">{{
              userData.growthpad_invited_count || 0
            }}</i>
            <UiPopover>
              <template #reference>
                <IconFont class="flex ml-3" type="help" size="base"></IconFont>
              </template>
              <template #content>
                <p
                  class="leading-loose"
                  v-html="I18n.growthpad.invited.help"
                ></p>
              </template>
            </UiPopover>
          </span>
        </div>
        <div v-if="isLogin" class="flex items-end">
          <span class="opacity-65">{{ I18n.growthpadShow.code }}</span>
          <span
            class="text-kd17px17px text-global-primary ml-1.5 numText"
          >{{ userData.my_invitation_code }}-G0</span>
          <Copy :link="link">
            <IconFont
              class="ml-2 hand flex mb-1 opacity-65"
              type="copy"
              size="base"
            ></IconFont>
          </Copy>
          <Copy :link="link">
            <div class="visitedButton">
              {{ I18n.growthpadShow.invite }}
            </div>
          </Copy>
        </div>
        <div v-else v-login class="visitedButton">
          {{ I18n.growthpadShow.login }}
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.visitedButton {
  color: #ffffff;
  background: linear-gradient(180deg, #7cb9ff 0%, #3090ff 100%);
  border-radius: 42px;
  padding: 4px 12px;
  @apply visited ml-6 flex justify-center items-center text-kd16px24px font-kdFang cursor-pointer;
}

.numText {
  @apply text-kd24px24px text-global-primary font-kdExp ml-1.5;
}

.containerRadius {
  border: 1px solid rgba(43, 141, 254, 0.06);
  box-shadow: 0px 12px 72px -12px rgba(43, 141, 254, 0.13);
  border-radius: 24px;
}

.mobileImg {
  @apply flex items-center   justify-center  w-full pt-4 px-4;
}
</style>
