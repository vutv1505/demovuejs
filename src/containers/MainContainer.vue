<template>
  <div class="c-app">
    <TheSidebar />
    <CWrapper>
      <TheHeader />
      <div class="c-body">
        <main class="c-main">
          <CContainer fluid class="h-100 position-relative pb-5">
            <transition name="fade" mode="out-in">
              <router-view :key="$route.path"></router-view>
            </transition>
          </CContainer>
        </main>
      </div>
    </CWrapper>
    <NotificationModal></NotificationModal>
    <Logout></Logout>
    <ChangePassword></ChangePassword>
    <SearchProductModal
      ref="modalSearchProduct"
      :onChooseItem="onChooseProduct"
    ></SearchProductModal>
  </div>
</template>

<script>
import TheSidebar from './Sidebar'
import TheHeader from './Header'
import Logout from '../components/modals/LogoutModal'
import NotificationModal from '../components/modals/NotificationModal'
import ChangePassword from '../components/modals/ChangePasswordModal'
import SearchProductModal from '../components/modals/SearchProductModal'

export default {
  name: 'TheContainer',
  components: {
    SearchProductModal,
    ChangePassword,
    Logout,
    TheSidebar,
    TheHeader,
    NotificationModal
  },
  data() {
    return {
      chooseProduct: {},
      chooseSupplier: {}
    }
  },
  methods: {
    showSearchProductsModal() {
      this.$refs.modalSearchProduct.show()
    },
    showSearchSuppliersModal() {
      this.$refs.modalSearchSupplier.show()
    },
    onChooseProduct(product) {
      // TODO write logic for selected product here
      this.chooseProduct = product
    },
    onChooseSupplier(supplier) {
      // TODO write logic for selected supplier here
      this.chooseSupplier = supplier
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
