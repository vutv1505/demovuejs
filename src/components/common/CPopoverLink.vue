<template>
  <b-link @click="onClick">{{ display }}</b-link>
</template>
<script>
export default {
  name: 'CPopoverLink',
  data() {
    return {}
  },
  props: {
    display: {
      default: ''
    },
    click: {
      type: Function,
      required: true
    },
    param: {
      required: false
    }
  },
  methods: {
    onClick(event) {
      this.click(event.target, this.display, this.param)
    }
  }
}
</script>
<style scoped></style>
