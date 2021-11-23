<template>
  <div>
    <CModal
      :show.sync="$store.state.mainContainer.showNotificationModal"
      :centered="true"
      size="xl"
    >
      <CCard class="mb-0">
        <CButton
          block
          color="link"
          class="text-left shadow-none card-header w-100"
          @click="accordion = accordion === 0 ? false : 0"
        >
          <h5 class="m-0 notification-title">
            2021/04/01 10:00 【ワークフロー承認依頼】発注承認のお願い
          </h5>
        </CButton>
        <CCollapse :show="accordion === 0">
          <CCardBody>
            発注確定がされました。承認を行ってください。
            ＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸ
            ＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸ
            ＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸ
          </CCardBody>
        </CCollapse>
      </CCard>

      <CCard class="mb-0">
        <CButton
          block
          color="link"
          class="text-left shadow-none card-header w-100"
          @click="accordion = accordion === 1 ? false : 1"
        >
          <h5 class="m-0 notification-title">
            2021/04/01 10:00
            ＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸ
          </h5>
        </CButton>
        <CCollapse :show="accordion === 1">
          <CCardBody>
            発注確定がされました。承認を行ってください。
            ＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸ
            ＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸ
            ＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸ
          </CCardBody>
        </CCollapse>
      </CCard>

      <CCard class="mb-0">
        <CButton
          block
          color="link"
          class="text-left shadow-none card-header w-100"
          @click="accordion = accordion === 2 ? false : 2"
        >
          <h5 class="m-0 notification-title">
            2021/04/02 11:00【ワークフロー承認依頼】発注承認のお願い
          </h5>
        </CButton>
        <CCollapse :show="accordion === 2">
          <CCardBody>
            発注確定がされました。承認を行ってください。
            ＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸ
            ＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸ
            ＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸ
          </CCardBody>
        </CCollapse>
      </CCard>

      <template #header-wrapper>
        <div class="w-100 header-container">
          <h6 class="text-center m-auto font-weight-bold">通知</h6>
        </div>
      </template>

      <template #footer-wrapper>
        <div class="footer-container modal-footer">
          <CButton
            @click="$store.commit('showHideNotificationModal', false)"
            color="outline-info"
            >閉じる</CButton
          >
        </div>
      </template>
    </CModal>
  </div>
</template>

<script>
export default {
  name: 'NotificationModal',
  data() {
    return {
      accordion: 0
    }
  }
}
</script>

<style scoped>
.notification-title {
  font-weight: bold;
  color: #321fdb;
}
</style>
