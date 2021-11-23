<template>
  <CSidebar
    :minimize="minimize"
    :show="show"
    @update:show="value => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <h4>OPOS</h4>
    </CSidebarBrand>
    <CRenderFunction flat :contentToRender="sidebarItems" />
    <CSidebarMinimizer
      class="c-d-md-down-none"
      @click.native="$store.commit('toggle', 'sidebarMinimize')"
    />
  </CSidebar>
</template>

<script>
import SidebarItems from './SidebarItems'
export default {
  name: 'SideBar',
  extends: SidebarItems,
  computed: {
    show() {
      return this.$store.state.sidebarShow
    },
    minimize() {
      return this.$store.state.sidebarMinimize
    }
  }
}
</script>
