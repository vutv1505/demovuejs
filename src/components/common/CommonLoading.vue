<template>
  <div :style="outerContainerStyles" v-if="isLoading">
    <div :style="centeringStyles">
      <c-spinner grow size="lg" color="primary" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonLoading',
  props: {
    boundaries: Array,
    opacity: {
      type: Number,
      default: 0.4
    }
  },
  data() {
    return {
      containerCoords: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      parentCoords: null,
      isLoading: false
    }
  },
  mounted() {
    if (this.boundaries) {
      this.setOffsets()
    }
  },
  computed: {
    outerContainerStyles() {
      return {
        ...this.containerCoords,
        position: 'absolute',
        'background-color': `rgb(255,255,255,${this.opacity})`,
        'z-index': 100000
      }
    },
    centeringStyles() {
      return {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)'
      }
    }
  },
  methods: {
    setOffsets() {
      const parent = this.$el.parentElement
      this.parentCoords = parent.getBoundingClientRect()
      this.boundaries.forEach(({ sides, query }) => {
        const element = parent.querySelector(query)
        if (!element || !sides) {
          return
        }
        const coords = element.getBoundingClientRect()
        sides.forEach(side => {
          const sideMargin = Math.abs(coords[side] - this.parentCoords[side])
          this.containerCoords[side] = sideMargin + 'px'
        })
      })
    }
  }
}
</script>
