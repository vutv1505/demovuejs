<template>
  <div>
    <ValidationObserver v-slot="{ invalid }" ref="form">
      <CModal
        :show.sync="showModal"
        :closeOnBackdrop="false"
        :centered="true"
        size="xl"
      >
        <template #header-wrapper>
          <div class="w-100 header-container modal-border">
            <h6 class="text-center m-auto font-weight-bold">
              入荷予定情報修正
            </h6>
          </div>
        </template>

        <template #body-wrapper>
          <c-scrollbar
            class="modal-body modal-border-left modal-border-right"
            v-loading="isLoading"
          >
            <div class="body-item-header font-weight-bold">入荷予定情報</div>
            <div class="px-3">
              <CRow class="mt-3">
                <CCol sm="6"
                  >OPOS発注番号：{{ arrivalDetail.orderNumber }}
                </CCol>
                <CCol sm="6">FORCE発注番号：</CCol>
              </CRow>
              <CRow class="mt-3">
                <CCol sm="6">
                  仕入先コード：{{ arrivalDetail.supplierCode }}
                </CCol>
                <CCol sm="6"> 仕入先名：{{ arrivalDetail.supplierName }}</CCol>
              </CRow>
              <CRow class="mt-3">
                <CCol sm="6"> 商品番号：{{ arrivalDetail.productNumber }}</CCol>
                <CCol sm="6"> 商品名：{{ arrivalDetail.productName }}</CCol>
              </CRow>
            </div>
            <div class="body-item-header font-weight-bold mt-3">
              入荷予定情報詳細
            </div>
            <div class="px-3">
              <CRow class="mt-3">
                <b-form-group class="col-sm">
                  <label class="mb-1"
                    >入荷予定数
                    <span class="text-danger font-weight-bold"
                      >[必須]</span
                    ></label
                  >
                  <validation-provider
                    rules="required|min_value:0"
                    name="入荷予定数"
                    vid="purchaseScheduleQuantity"
                    v-slot="{ valid, errors }"
                  >
                    <number-input
                      v-model="arrivalDetail.purchaseScheduleQuantity"
                      name="purchaseScheduleQuantity"
                      @input="calculateCaseAndBugQuantity"
                      maxlength="7"
                      :state="valid"
                    ></number-input>
                    <div
                      v-show="!valid"
                      class="valid-msg-area fm-font-standard mt-1 mb-1"
                    >
                      {{ errors[0] }}
                    </div>
                  </validation-provider>
                </b-form-group>
                <b-form-group class="col-sm">
                  <label class="mb-1"
                    >入目
                    <span class="text-danger font-weight-bold"
                      >[必須]</span
                    ></label
                  >
                  <validation-provider
                    rules="required"
                    name="入目"
                    vid="quantityPerCarton"
                    v-slot="{ valid, errors }"
                  >
                    <number-input
                      v-model="arrivalDetail.quantityPerCarton"
                      name="quantityPerCarton"
                      @input="calculateCaseAndBugQuantity"
                      maxlength="7"
                      :state="valid"
                    ></number-input>
                    <div
                      v-show="!valid"
                      class="valid-msg-area fm-font-standard mt-1 mb-1"
                    >
                      {{ errors[0] }}
                    </div>
                  </validation-provider>
                </b-form-group>
              </CRow>
              <CRow>
                <b-form-group class="col-sm">
                  <label class="mb-1">ケース ></label>
                  <number-input
                    v-model="arrivalDetail.caseQuantity"
                    disabled
                    name="caseQuantity"
                    class="border-dark"
                  ></number-input>
                </b-form-group>
                <b-form-group class="col-sm">
                  <label class="mb-1">バラ数</label>
                  <number-input
                    v-model="arrivalDetail.bugQuantity"
                    name="bugQuantity"
                    disabled
                    class="border-dark"
                  >
                  </number-input>
                </b-form-group>
              </CRow>
              <CRow>
                <CInput
                  class="col-sm"
                  disabled
                  addLabelClasses="mb-1"
                  addInputClasses="border-dark"
                  label="入荷状態"
                  :value="arrivalDetail.purchaseConditionDivision"
                />
                <CInput
                  class="col-sm"
                  disabled
                  addLabelClasses="mb-1"
                  addInputClasses="border-dark"
                  label="取引区分"
                  :value="arrivalDetail.tradingDivision"
                />
              </CRow>
              <CRow>
                <CInput
                  class="col-sm"
                  disabled
                  addLabelClasses="mb-1"
                  addInputClasses="border-dark"
                  label="入荷予定日"
                  :value="arrivalDetail.purchaseScheduleDate"
                />
                <CInput
                  class="col-sm"
                  disabled
                  addLabelClasses="mb-1"
                  addInputClasses="border-dark"
                  label="納品予定日"
                  :value="arrivalDetail.deliveryScheduleDate"
                />
              </CRow>
              <CRow>
                <CInput
                  class="col-sm"
                  disabled
                  addLabelClasses="mb-1"
                  addInputClasses="border-dark"
                  label="納品先名"
                  :value="arrivalDetail.deliveryToName"
                />
                <CInput
                  class="col-sm"
                  disabled
                  addLabelClasses="mb-1"
                  addInputClasses="border-dark"
                  label="倉庫コード"
                  :value="arrivalDetail.warehouseCode"
                />
              </CRow>
              <CRow>
                <CInput
                  class="col-sm"
                  disabled
                  addLabelClasses="mb-1"
                  addInputClasses="border-dark"
                  label="MK製造記号"
                  :value="arrivalDetail.mkMakeCode"
                />
                <CInput
                  class="col-sm"
                  disabled
                  addLabelClasses="mb-1"
                  addInputClasses="border-dark"
                  label="充填日"
                  :value="arrivalDetail.fillingDate"
                />
              </CRow>
              <CRow>
                <CInput
                  class="col-sm"
                  disabled
                  addLabelClasses="mb-1"
                  addInputClasses="border-dark"
                  label="製造日"
                  :value="arrivalDetail.makeDate"
                />
                <CInput
                  class="col-sm"
                  disabled
                  addLabelClasses="mb-1"
                  addInputClasses="border-dark"
                  label="使用期限"
                  :value="arrivalDetail.useDeadline"
                />
              </CRow>
              <CRow>
                <CInput
                  class="col-sm-6"
                  disabled
                  addLabelClasses="mb-1"
                  addInputClasses="border-dark"
                  label="ロット番号"
                  :value="arrivalDetail.lotNumber"
                />
              </CRow>
            </div>
          </c-scrollbar>
        </template>

        <template #footer-wrapper>
          <div class="modal-footer footer-container modal-border">
            <CButton
              class="btn-sm modal-btn"
              color="outline-info"
              @click="dismiss"
              >キャンセル
            </CButton>
            <CButton
              color="info"
              class="btn-sm modal-btn"
              v-on:click="onClickEdit"
              :disabled="invalid"
              >修正
            </CButton>
          </div>
        </template>
      </CModal>
    </ValidationObserver>
    <confirm-modal ref="confirmModal" />
  </div>
</template>

<script>
import ConfirmModal from '../../components/modals/ConfirmModal'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import NumberInput from '@/components/customInput/NumberInput'
import ArrivalService from '../../api/purchase.service'

/**
 * OPOS-Purchase-ScheduleEdit
 */
export default {
  name: 'ArrivalEditModal',
  components: {
    ConfirmModal,
    ValidationProvider,
    ValidationObserver,
    NumberInput
  },
  data() {
    return {
      isLoading: false,
      arrivalDetail: {},
      showModal: false
    }
  },
  methods: {
    show(arrivalDetail) {
      this.arrivalDetail = arrivalDetail
      this.showModal = true
    },
    dismiss() {
      this.showModal = false
    },
    async onClickEdit() {
      const formValid = await this.$refs.form.validate()
      if (!formValid) {
        return
      }
      this.$refs.confirmModal.show(
        '入荷予定情報修正確認',
        `OPOS発注番号：${
          this.arrivalDetail.orderNumber
        }の入荷予定情報を修正します。`,
        this.processEdit
      )
    },
    processEdit() {
      this.isLoading = true
      ArrivalService.save(this.arrivalDetail)
        .then(({ data }) => {
          this.isLoading = false
          this.dismiss()
          this.$emit('showCommonAlert', {
            isSuccess: true,
            message: '入荷予定情報を修正しました。'
          })
        })
        .catch(error => {
          this.isLoading = false
          this.dismiss()
          this.$emit('showCommonAlert', {
            isSuccess: false,
            message: '入荷予定情報の修正に失敗しました。'
          })
        })
    },
    calculateCaseAndBugQuantity() {
      let psQuantity = this.arrivalDetail.purchaseScheduleQuantity
      let pcQuantity = this.arrivalDetail.quantityPerCarton
      if (psQuantity && pcQuantity) {
        this.arrivalDetail.bugQuantity = psQuantity % pcQuantity
        this.arrivalDetail.caseQuantity =
          (psQuantity - this.arrivalDetail.bugQuantity) / pcQuantity
      }
    }
  }
}
</script>

<style scoped></style>
