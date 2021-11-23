import { BModal } from 'bootstrap-vue'
import Vue from 'vue'

export const CBmodal = Vue.extend({
  mixins: [BModal],
  methods: {
    focusHandler: function focusHandler(evt) {
      if (evt.target.localName === 'input') {
        return
      } else {
        BModal.options.methods.focusHandler.call(this, evt)
      }
    }
  }
})

Vue.component('b-modal', CBmodal)
