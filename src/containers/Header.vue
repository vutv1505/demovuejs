<template>
  <CHeader with-subheader>
    <CToggler
      in-header
      class="ml-3 d-lg-none"
      @click="$store.commit('toggleSidebarMobile')"
    />
    <CToggler
      in-header
      class="ml-3 d-md-down-none"
      @click="$store.commit('toggleSidebarDesktop')"
    />

    <CHeaderNav class="ml-auto">
      <CHeaderNavItem>
        <CHeaderNavLink exact>
          {{ userName }}
        </CHeaderNavLink>
      </CHeaderNavItem>
      <HeaderDropdownAccnt />
    </CHeaderNav>

    <CSubheader class="px-3">
      <CBreadcrumbRouter class="border-0 mb-0" />
    </CSubheader>
  </CHeader>
</template>

<script>
import HeaderDropdownAccnt from './HeaderDropdownAccnt'
export default {
  name: 'Header',
  components: {
    HeaderDropdownAccnt
  },
  data() {
    return {
      userName: 'オルビス　花子'
    }
  }
}
</script>
