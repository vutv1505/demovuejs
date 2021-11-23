<template>
  <b-button
    variant="link"
    size="sm"
    class="text-muted back-btn"
    v-shortkey="{ f10: ['f10'] }"
    @shortkey="theAction"
    @click="$emit('backToSearch')"
  >
    <i class="fa fa-angle-left icon-back-btn" aria-hidden="true"></i>
  </b-button>
</template>

<script>
export default {
  name: 'BackButton',
  methods: {
    onClickShortKey(e) {
      this.switchAction(e.target.id)
    },
    theAction(event) {
      this.switchAction(event.srcKey)
    },
    switchAction(key) {
      if (key === 'f10') {
        this.$emit('backToSearch')
      }
    }
  }
}
</script>
