<template>
  <div>
    <CModal
      :show.sync="$store.state.mainContainer.showChangePasswordModal"
      :closeOnBackdrop="false"
      :centered="true"
      size="lg"
    >
      <template #header-wrapper>
        <div class="w-100 h-100 header-container">
          <h6 class="text-center m-auto font-weight-bold">パスワード変更</h6>
        </div>
      </template>
      <template #body-wrapper class="modal-body">
        <div class="body-container body-text">
          <div v-if="!changePasswordStatus" class="modal-notification noti-rq">
            パスワードはX文字以上、英数字を含めて設定してください。
          </div>
          <div v-if="changePasswordStatus" class="modal-notification noti-sc">
            パスワードの変更が完了しました。
          </div>
          <div>
            <CRow>
              <CCardBody>
                <CForm>
                  <CRow>
                    <CCol sm="11">
                      <CInput
                        horizontal
                        label="現在のパスワード"
                        v-model="oldPassword"
                        type="password"
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol sm="11">
                      <CInput
                        horizontal
                        label="新しいパスワード"
                        v-model="newPassword"
                        type="password"
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol sm="11">
                      <CInput
                        horizontal
                        label="新しいパスワード(確認)"
                        v-model="passwordConfirm"
                        type="password"
                      />
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CRow>
          </div>
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
          <CButton @click="changePassword" color="info" class="execute-button"
            >保存</CButton
          >
        </div>
      </template>
    </CModal>
  </div>
</template>

<script>
export default {
  name: 'ChangePassword',
  data() {
    return {
      changePasswordStatus: false,
      oldPassword: '',
      newPassword: '',
      passwordConfirm: ''
    }
  },
  methods: {
    clearInputValue() {
      this.oldPassword = this.newPassword = this.passwordConfirm = ''
    },
    closeModal() {
      this.clearInputValue()
      this.$store.commit('showHideChangePasswordModal', false)
    },
    changePassword() {
      console.log('change Password')
      this.clearInputValue()
    }
  }
}
</script>

<style scoped lang="scss">
.execute-button {
  width: 100px;
}

.body-container {
  height: 30em;
}

.body-text {
  display: block;
  align-items: center;
  padding: 1em 3em 1em 3em;
}

.footer-container {
  background-color: transparent !important;
  border-top: unset;
}

.modal-notification {
  border-radius: 4px;
  padding: 4px 4px 4px 10px;
  margin: 10px 0 20px 0;
}

.noti-sc {
  background-color: #3399ff;
  color: white;
}

.noti-rq {
  background-color: #e0f3f8;
  color: #336573;
}
</style>
