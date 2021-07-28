<script setup lang="ts"></script>

<template>
  <div class="relative nav-main">
    <div class="nav-label">
      <slot name="reference"></slot>
    </div>
    <div class="nav-list">
      <div class="nav-content p-6">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
%animation {
  opacity: 0;
  z-index: 0;
  max-height: 0;
  visibility: visible;
  transition: all 0.3s;
  overflow: hidden;
}
%active {
  opacity: 1;
  z-index: 999;
  visibility: visible;
  max-height: 1000px;
  height: auto;
}

.nav-label {
  position: relative;
  &:after {
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    left: 50%;
    top: 100%;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #fff;
    transform: translate(-50%, 4px);
    @extend %animation;
  }
}

.nav-list {
  position: absolute;
  top: 100%;
  left: 0;
  padding-top: 12px;
  @extend %animation;
}

.nav-content {
  background: #fff;
  border-radius: 6px;
  box-shadow: inset 0px -1px 0px rgba(37, 62, 111, 0.06);
}

.nav-main {
  &:hover {
    .nav-list {
      @extend %active;
    }
    .nav-label {
      &:after {
        @extend %active;
      }
    }
  }
}
</style>
