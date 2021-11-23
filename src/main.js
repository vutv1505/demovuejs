// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './polyfill'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router/index'
import store from './store'
import constants from './lib/mixins/constants'
import commonUtils from './lib/commonMixin'
import suggest from './lib/mixins/suggest'
// import VeeValidate from 'vee-validate'
// Vue.use(VeeValidate, {
//   // This is the default
//   inject: true,
//   // Important to name this something other than 'fields'
//   fieldsBagName: 'veeFields',
//   errorBagName: 'veeErrors'
// })
import VueNotifications from 'vue-notifications'
import miniToastr from 'mini-toastr' // https://github.com/se-panfilov/mini-toastr
import CoreuiVuePro from '../node_modules/@coreui/vue-pro/src/index.js'
Vue.use(CoreuiVuePro)
import { iconsSet as icons } from './assets/icons/icons.js'
import vueMoment from 'vue-moment'
Vue.use(vueMoment)
import moment from 'moment'
moment.locale('ja')
Vue.use(moment)
import './lib/validate'
import './lib/handsontable'
import './lib/filters'
import './lib/directive'
import './lib/bootstrap-vue/bModalFilter'
import './components/_globals'
import _ from 'lodash'
import SetInterval from './lib/setInterval'
Vue.use(SetInterval)
import vSuggest from 'v-suggest'
Vue.use(vSuggest)
import ApiService from './api/api.service'
ApiService.init()
// todo
// cssVars()

Vue.use(BootstrapVue)
Vue.use(require('vue-shortkey'))

// グローバルミックスイン
// Vue.mixin(constants)
Vue.mixin(commonUtils)
Vue.mixin(suggest)

import vClickOutside from 'v-click-outside'
Vue.use(vClickOutside)

const toastTypes = {
  success: 'success',
  error: 'error',
  info: 'info',
  warn: 'warn'
}

miniToastr.init({ types: toastTypes })

function toast({ title, message, type, timeout, cb }) {
  return miniToastr[type](message, title, timeout, cb)
}

const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}

Vue.use(VueNotifications, options)

Vue.use(_)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  },
  data: {
    mode: 'single',
    formats: {
      input: ['YYYY-MM-DD']
    },
    selectedDate: null
  }
})
