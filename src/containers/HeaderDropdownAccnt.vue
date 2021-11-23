<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavItem class="px-3">
        <button class="c-header-nav-btn">
          <img
            src="img/icons/userIcon.png"
            class="c-avatar-img "
            alt="userIcon"
          />
        </button>
      </CHeaderNavItem>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>アカウント</strong>
    </CDropdownHeader>
    <CDropdownItem class="mt-2 mb-2" @click="showNotifications"
      >通知</CDropdownItem
    >
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>設定</strong>
    </CDropdownHeader>
    <CDropdownItem class="mt-2 mb-2" @click="changePassword"
      >パスワード変更</CDropdownItem
    >
    <CDropdownDivider />
    <CDropdownItem @click="logOut"> ログアウト</CDropdownItem>
  </CDropdown>
</template>

<script>
export default {
  name: 'HeaderDropdownAccnt',
  methods: {
    changePassword() {
      this.$store.commit('showHideChangePasswordModal', true)
    },
    showNotifications() {
      this.$store.commit('showHideNotificationModal', true)
    },
    logOut() {
      this.$store.commit('showHideLogoutModal', true)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 25px;
  max-height: 25px;
}
</style>
