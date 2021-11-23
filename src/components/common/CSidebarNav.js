import Vue from 'vue'
import { SidebarNav } from '@coreui/vue'
import { mapActions } from '@/lib/store'

export const CSidebarNav = Vue.extend({
  mixins: [SidebarNav],
  updated() {
    const navLink = this.$el.querySelectorAll(
      '.nav-link:not(.nav-dropdown-toggle)'
    )
    navLink.forEach(link => {
      link.addEventListener('mousedown', this.onMouseDownNavLink)
      link.addEventListener('mouseup', this.onMouseUpNavLink)
    })
  },
  methods: {
    ...mapActions(['changeNavLink'], () => 'document'),
    onMouseDownNavLink(e) {
      this.mouseEvent = e
    },
    onMouseUpNavLink(e) {
      if (
        this.mouseEvent &&
        this.mouseEvent.clientX === e.clientX &&
        this.mouseEvent.clientY === e.clientY
      ) {
        this.changeNavLink(true)
      }
      this.mouseEvent = null
    }
  }
})
