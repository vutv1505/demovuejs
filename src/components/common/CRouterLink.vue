<template>
  <b-link @click="onRouter">{{ display }}</b-link>
</template>
<script>
import stringFormat from 'string-format'
export default {
  name: 'CRouterLink',
  props: {
    display: {
      default: ''
    },
    router: {
      required: true
    },
    routerPath: {
      type: String,
      required: true
    },
    data: {
      required: false
    },
    param: {
      required: false
    },
    targetBlank: {
      required: false,
      default: false
    }
  },
  methods: {
    onRouter() {
      if (!this.targetBlank) {
        this.router.push({
          path: stringFormat(this.routerPath, this.data),
          query: this.param
        })
      } else {
        const routeData = this.router.resolve({
          path: stringFormat(this.routerPath, this.data),
          query: this.param
        })
        window.open(routeData.href, '_blank')
      }
    }
  }
}
</script>
<style scoped></style>
