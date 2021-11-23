<template>
  <b-popover
    ref="popover"
    @shown="onShownPopover"
    :target="target"
    :placement="placement"
    v-if="isShow"
    :show="isShow"
    container="popover-parent"
    :custom-class="popoverClass + ' c-popover'"
    :boundary="boundary"
  >
    <template v-slot:title>
      {{ title }}
      <b-button class="close" @click="close">×</b-button>
    </template>
    <slot></slot>
  </b-popover>
</template>

<script>
import popover from '@/lib/popover'

export default {
  name: 'CPopover',
  props: {
    title: { type: String, required: false },
    placement: { required: false },
    popoverClass: { required: false },
    boundary: { required: false }
  },
  data() {
    return {
      isShow: false,
      target: null
    }
  },
  methods: {
    close() {
      this.isShow = false
    },
    clickLink(link) {
      if (this.isShow) {
        this.isShow = false
      } else {
        this.target = link
        this.isShow = true
      }
    },
    onShownPopover() {
      popover(this.$refs.popover.$children[0].$children[0].$el)
    }
  },
  watch: {
    isShow(value) {
      if (!value) {
        const popover = this.$refs.popover.$children[0].$children[0].$el
        popover.parentElement.removeAttribute('class')
        popover.parentElement.removeAttribute('style')
      }
    }
  }
}
</script>
<style scoped>
.c-popover {
  font-size: 100%;
}
</style>
