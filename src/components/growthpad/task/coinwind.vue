<script setup lang="ts">
import I18n from '~/utils/i18n/index'
import Task from '~/logic/growthpad/task'
const store = Task()
</script>

<template>
  <h2 class="font-kdFang">{{ I18n.growthpad.coinwind.share.title }}</h2>
  <div class="task-children w-full">
    <div class="task-item mt-1.5 py-1.5 pr-1.5 pl-3">
      <p class="text-sm">{{ I18n.growthpad.coinwind.share.invite }}</p>
      <span class="block description text-xs pt-1.5">{{
        I18n.growthpad.coinwind.share.desc
      }}</span>
      <span class="block share pt-2">
        <span class="text-xs">{{ I18n.growthpad.coinwind.share.users }}</span>
        <i class="text-xs ml-1.5">{{ store.user.invited_count || 0 }}</i>
      </span>
    </div>
  </div>

  <h2 class="font-kdFang mt-6">{{ I18n.growthpad.invited.partake }}</h2>
  <div class="task-children w-full pb-15">
    <div class="task-item mt-1.5 py-1.5 pr-1.5 pl-3">
      <GrowthpadTaskShare></GrowthpadTaskShare>
    </div>
  </div>
</template>

<style scoped lang="scss">
h2 {
  color: #033666;
  font-size: 18px;
  font-weight: 500;
}

p {
  line-height: 24px;
  color: rgba(37, 62, 111, 0.85);
}

.description {
  color: rgba(37, 62, 111, 0.35);
}

.share {
  color: rgba(37, 62, 111, 0.65);
  i {
    font-style: normal;
    color: #2b8dfe;
  }
}

.task-item {
  position: relative;
  border-radius: 6px;
  background: linear-gradient(
    90deg,
    rgba(43, 141, 254, 0.08) 0%,
    rgba(43, 141, 254, 0) 100%
  );
}
</style>
