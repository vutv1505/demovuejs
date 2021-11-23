<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="px-4">
              <CCardBody>
                <h4>ログイン</h4>
                <CForm class="py-5">
                  <CInput
                    placeholder="ユーザーID"
                    autocomplete="username email"
                  >
                  </CInput>
                  <CInput
                    placeholder="パスワードを入力"
                    type="password"
                    autocomplete="curent-password"
                  >
                  </CInput>
                  <CRow>
                    <CCol class="text-left w-100">
                      <CButton color="primary" class="px-4 w-100" @click="login"
                        >ログイン</CButton
                      >
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>

            <CCard
              color="primary"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <h3 class="py-5" style="font-weight: bold">
                  OPOS(仮)
                </h3>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    login() {
      console.log('Login....')
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style scoped></style>
