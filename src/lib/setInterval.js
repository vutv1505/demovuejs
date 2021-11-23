export default {
  install(vue) {
    vue.prototype.$intervals = []
    vue.prototype.$setInterval = (func, intervalMilliSec) => {
      if (process.env.VUE_APP_DISABLE_SET_INTERVAL === 'true') {
        console.warn(
          `%c[DISABLE_SET_INTERVAL] Check environment vars`,
          'color:red;'
        )
        return null
      }
      const id = setInterval(() => {
        if (document.visibilityState === 'visible') {
          func()
        }
      }, intervalMilliSec)
      vue.prototype.$intervals.push(id)
      return id
    }
    vue.prototype.$clearInterval = id => {
      clearInterval(id)
      vue.prototype.$intervals = vue.prototype.$intervals.filter(i => i !== id)
    }
    vue.prototype.$clearAllIntervals = () => {
      vue.prototype.$intervals.forEach(clearInterval)
      vue.prototype.$intervals = []
    }
  }
}
