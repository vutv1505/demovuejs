<template>
  <div>
    <CModal
      :show.sync="$store.state.mainContainer.showLogoutModal"
      :closeOnBackdrop="false"
      :centered="true"
      size="lg"
    >
      <template #header-wrapper>
        <div class="w-100 h-100 header-container">
          <h6 class="text-center m-auto font-weight-bold">ログアウト</h6>
        </div>
      </template>
      <template #body-wrapper class="modal-body">
        <div class="body-container body-text">
          ログアウトします。よろしいですか？
        </div>
      </template>
      <template #footer-wrapper>
        <div class="modal-footer footer-container">
          <CButton
            @click="closeModal"
            color="outline-info"
            class="execute-button"
            >キャンセル</CButton
          >
          <CButton @click="logout" color="info" class="execute-button"
            >はい</CButton
          >
        </div>
      </template>
    </CModal>
  </div>
</template>

<script>
export default {
  name: 'Logout',
  methods: {
    closeModal() {
      this.$store.commit('showHideLogoutModal', false)
    },
    logout() {
      this.closeModal()
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>

<style scoped>
.execute-button {
  width: 100px;
}

.body-container {
  height: 10em;
}

.body-text {
  text-align: center;
  display: flex;
  align-items: center;
  padding-left: 3em;
}

.footer-container {
  background-color: transparent !important;
  border-top: unset;
}
</style>
