<template>
  <b-button v-bind="$attrs" v-on="listeners">
    <slot />
  </b-button>
</template>

<script>
import store from '@/store/index'

export default {
  inheritAttrs: false,
  computed: {
    listeners() {
      const vm = this
      return Object.assign({}, vm.$listeners, {
        click: $event => {
          const trackId = Math.random()
            .toString(36)
            .slice(2)
          // TODO: Comment to ignore vuex unknown error log
          //  store.dispatch('common/setTrackId', trackId)
          vm.$emit('click', $event)
        }
      })
    }
  }
}
</script>
