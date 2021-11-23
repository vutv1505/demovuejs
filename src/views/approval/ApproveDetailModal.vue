<template>
  <div>
    <CModal :show.sync="isShow" :centered="true" size="xl">
      <template #header-wrapper>
        <div class="w-100 header-container modal-border">
          <h6 class="text-center m-auto font-weight-bold">
            承認情報詳細
          </h6>
        </div>
      </template>
      <template #body-wrapper>
        <c-scrollbar
          class="modal-body modal-border-left modal-border-right"
          v-if="approveDetail"
        >
          <div class="body-item-header font-weight-bold">申請情報</div>
          <CRow class="p-3">
            <CCol sm="6">
              申請番号 ： {{ approveDetail.application_number }}
            </CCol>
            <CCol sm="6">
              発注番号 ： {{ approveDetail.application_classification }}
            </CCol>
          </CRow>
          <CRow class="p-3">
            <CCol sm="6"> 申請日 ： {{ approveDetail.application_date }}</CCol>
            <CCol sm="6">
              申請ルート ：{{ approveDetail.application_route }}
            </CCol>
          </CRow>
          <CRow class="p-3">
            <CCol sm="6"> 申請者 ： {{ approveDetail.applicant }}</CCol>
            <CCol sm="6">
              前回申請番号 ： {{ approveDetail.last_application_number }}
            </CCol>
          </CRow>
          <CRow class="p-3">
            <CCol sm="12">
              申請コメント ：{{ approveDetail.application_comment }}
            </CCol>
          </CRow>

          <div class="body-item-header font-weight-bold mt-5">
            承認情報
          </div>

          <div class="pt-4">
            <common-table-filter-layout
              class="py-2"
              searchGroupSize="sm"
              vertical-scroll
              :has-page-title="false"
              :hasActionAdvanceFilter="false"
              :table-items="tableItems"
              :table-headers="tableHeaders"
              :tableResponsive="false"
              :is-loading="isLoading"
            >
            </common-table-filter-layout>
          </div>
        </c-scrollbar>
      </template>

      <template #footer-wrapper>
        <div class="modal-footer footer-container modal-border">
          <CButton
            class="btn-sm modal-btn"
            color="outline-info"
            @click="dismiss"
            >閉じる
          </CButton>
          <CButton color="info" class="btn-sm modal-btn">発注情報詳細</CButton>
          <CButton
            color="danger"
            class="btn-sm modal-btn"
            v-on:click="clickRemand"
            >差戻し</CButton
          >
          <CButton color="info" class="btn-sm modal-btn">承認</CButton>
        </div>
      </template>
    </CModal>
    <ConfirmRemandModal ref="confirmRemandModal"></ConfirmRemandModal>
  </div>
</template>

<script>
import ConfirmRemandModal from './ConfirmRemandModal'
import CommonTableFilterLayout from '../../components/layouts/CommonTableFilterLayout'

export default {
  name: 'ApproveDetailModal',
  components: { CommonTableFilterLayout, ConfirmRemandModal },
  data() {
    return {
      isShow: false,
      approveDetail: null,
      isLoading: false,
      tableItems: [],
      tableHeaders: [
        {
          key: 'approval_pt',
          label: '承認PT',
          _style: 'text-align: center; border: 1px solid #727272 '
        },
        {
          key: 'approval_status',
          label: '承認状態',
          _style: 'text-align: center; border: 1px solid #727272 '
        },
        {
          key: 'approval_method',
          label: '承認方法',
          _style: 'text-align: center; border: 1px solid #727272 '
        },
        {
          key: 'expect_approval_date',
          label: '承認予定日',
          _style: 'text-align: center; border: 1px solid #727272 '
        },
        {
          key: 'approval_date',
          label: '承認日',
          _style: 'text-align: center; border: 1px solid #727272 '
        },
        {
          key: 'approval_authority_name',
          label: '承認権限名',
          _style: 'text-align: center; border: 1px solid #727272 '
        },
        {
          key: 'proxy_approver',
          label: '代理承認者',
          _style: 'text-align: center; border: 1px solid #727272 '
        },
        {
          key: 'approver',
          label: 'コード',
          _style: 'text-align: center; border: 1px solid #727272 '
        },
        {
          key: 'denial_comment',
          label: '否認コメント',
          _style: 'text-align: center; border: 1px solid #727272 '
        }
      ]
    }
  },
  methods: {
    show(approveDetail) {
      this.approveDetail = approveDetail
      this.tableItems = approveDetail.approve_histories
      this.isShow = true
    },
    dismiss() {
      this.isShow = false
    },
    clickRemand() {
      this.$refs.confirmRemandModal.show(
        this.approveDetail.application_number,
        this.onSaveRemand
      )
    },
    onSaveRemand(comment) {
      this.dismiss()
      this.$emit('onRemand', this.approveDetail, comment)
    }
  }
}
</script>

<style scoped></style>
