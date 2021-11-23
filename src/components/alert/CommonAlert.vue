<template>
  <CAlert
    v-bind:class="type === 1 ? 'bg-info' : 'bg-danger'"
    :show.sync="showAlertCounter"
    style="color: white"
  >
    {{ message }}
    <CButton
      size="sm"
      class="position-absolute close-btn"
      v-on:click="showAlertCounter = false"
      style=" border: 1px solid white; box-shadow:unset"
    >
      X
    </CButton>
  </CAlert>
</template>

<script>
export default {
  name: 'CommonAlert',
  props: {},
  methods: {
    show: function(message) {
      this.message = message
      this.type = 1
      this.showAlertCounter = this.autoHide
    },
    showError: function(message) {
      this.message = message
      this.type = 0
      this.showAlertCounter = this.autoHide
    }
  },
  data() {
    return {
      autoHide: 2, // seconds
      message: '',
      type: 1,
      showAlertCounter: false
    }
  }
}
</script>

<style scoped>
.close-btn {
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  background-color: transparent;
  z-index: 100;
}
</style>
