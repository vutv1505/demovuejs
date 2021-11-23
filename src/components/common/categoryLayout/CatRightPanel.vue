<template>
  <transition name="fade">
    <div class="filter-panel" :class="{ close: !isRightPanelOpen }">
      <div class="filter-panel-header">
        <div class="header-title">{{ title }}</div>
        <i
          @click.stop="isRightPanelOpen = !isRightPanelOpen"
          class="close-btn icon-arrow-right icons font-2xl d-block mt-4"
        ></i>
      </div>

      <div class="filter-panel-main">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from '@/lib/store'

export default {
  name: 'CatRightPanel',
  props: {
    namespace: {
      required: true
    },
    title: {
      type: String
    }
  },
  computed: {
    ...mapState({ isRightPanelOpen: 'isRightPanelOpen' })
  }
}
</script>

<style scoped lang="scss">
.filter-panel {
  z-index: 200 !important;
}
.filter-panel-main {
  max-height: calc(100vh - 170px) !important;
}
</style>
