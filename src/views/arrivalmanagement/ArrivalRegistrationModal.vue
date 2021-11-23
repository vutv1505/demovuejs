<template>
  <div>
    <CModal
      :show.sync="showModal"
      :closeOnBackdrop="false"
      :centered="true"
      size="xl"
    >
      <template #header-wrapper>
        <div class="w-100 header-container modal-border">
          <h6 class="text-center m-auto font-weight-bold">
            入荷実績登録
          </h6>
        </div>
      </template>

      <template #body-wrapper>
        <c-scrollbar
          class="modal-body modal-border-left modal-border-right"
          v-loading="isLoading"
        >
          <validation-observer ref="purchaseRegisterObserver">
            <div class="body-item-header font-weight-bold">入荷情報</div>
            <div class="px-3">
              <CRow class="mt-3">
                <CCol sm="6">
                  OPOS発注番号 ： {{ arrivalDetail.orderNumber }}</CCol
                >
                <CCol sm="6">
                  FORCE発注番号 ： {{ arrivalDetail.order_number_new_system }}
                </CCol>
              </CRow>
              <CRow class="mt-3">
                <CCol sm="6">
                  仕入先コード ： {{ arrivalDetail.supplierCode }}
                </CCol>
                <CCol sm="6">
                  仕入先名 ： {{ arrivalDetail.supplierName }}</CCol
                >
              </CRow>
              <CRow class="mt-3">
                <CCol sm="6">
                  商品番号 ： {{ arrivalDetail.productNumber }}</CCol
                >
                <CCol sm="6"> 商品名 ： {{ arrivalDetail.productName }}</CCol>
              </CRow>
              <CRow class="mt-3">
                <CCol> 取引区分 ： {{ arrivalDetail.tradingDivision }}</CCol>
              </CRow>
            </div>
            <div class="body-item-header font-weight-bold mt-3">
              入荷実績情報
            </div>
            <div class="px-3">
              <CRow class="mt-3">
                <CInput
                  class="col-sm"
                  disabled
                  addLabelClasses="mb-1"
                  addInputClasses="border-dark"
                  label="仕入番号"
                  v-model="arrivalDetail.purchaseScheduleNumber"
                />
                <CInput
                  class="col-sm"
                  disabled
                  addLabelClasses="mb-1"
                  addInputClasses="border-dark"
                  label="入荷予定日"
                  :value="
                    arrivalDetail.purchaseScheduleDate
                      | dateFormat('YYYY/MM/DD')
                  "
                />
              </CRow>
              <CRow>
                <CInput
                  class="col-sm"
                  disabled
                  addLabelClasses="mb-1"
                  addInputClasses="border-dark"
                  label="入出庫日"
                  :value="arrivalDetail.purchaseDate | dateFormat('YYYY/MM/DD')"
                />
                <validation-provider vid="入荷予定数" class="col-sm">
                  <CInput
                    disabled
                    addLabelClasses="mb-1"
                    addInputClasses="border-dark text-right"
                    label="入荷予定数"
                    v-model="arrivalDetail.purchaseScheduleQuantity"
                  />
                </validation-provider>
              </CRow>
              <CRow>
                <validation-provider
                  rules="required|numericWithComma|smallerOrEqualWithComma:入荷予定数"
                  name="入出庫数"
                  vid="purchaseQuantity"
                  :immediate="true"
                  v-slot="{ valid, errors, validate }"
                  class="col-sm"
                >
                  <CInput
                    ref="purchaseQuantityInput"
                    vertical
                    addLabelClasses="mb-1"
                    addInputClasses="border-dark text-right"
                    maxlength="7"
                    @input="
                      event => {
                        arrivalDetail.purchaseQuantity = numberFormat(event)
                        validate(event)
                        checkPurchaseWarning(event)
                      }
                    "
                    v-model="arrivalDetail.purchaseQuantity"
                  >
                    <template #label>
                      <label class="mb-1"
                        >入出庫数
                        <span class="text-danger font-weight-bold"
                          >[必須]</span
                        ></label
                      >
                    </template>
                    <template #invalid-feedback>
                      <span
                        v-show="!valid"
                        class="valid-msg-area fm-font-standard mb-1"
                      >
                        {{ errors[0] }}
                      </span>
                    </template>
                    <template #description>
                      <span
                        v-show="purchaseWarning"
                        class="valid-msg-area fm-font-standard mb-1 warning"
                      >
                        入荷予定数を下回る入出庫数が設定されています。よろしいですか？
                      </span>
                    </template>
                  </CInput>
                </validation-provider>

                <CInput
                  class="col-sm"
                  vertical
                  disabled
                  addLabelClasses="mb-1"
                  addInputClasses="border-dark text-right"
                  label="単価"
                  :value="arrivalDetail.rate | number"
                >
                </CInput>
              </CRow>
              <CRow>
                <CInput
                  class="col-sm"
                  disabled
                  addLabelClasses="mb-1"
                  addInputClasses="border-dark"
                  label="入出庫状態"
                  :value="arrivalDetail.purchaseConditionDivision"
                />
                <CInput
                  class="col-sm"
                  disabled
                  addLabelClasses="mb-1"
                  addInputClasses="border-dark"
                  label="納品先名"
                  :value="arrivalDetail.deliveryToName"
                />
              </CRow>
              <CRow>
                <CInput
                  class="col-sm"
                  disabled
                  addLabelClasses="mb-1"
                  addInputClasses="border-dark"
                  label="倉庫コード"
                  :value="arrivalDetail.warehouseCode"
                />
                <CInput
                  class="col-sm"
                  disabled
                  addLabelClasses="mb-1"
                  addInputClasses="border-dark"
                  label="ロット番号"
                  :value="arrivalDetail.lotNumber"
                />
              </CRow>
              <CRow>
                <CInput
                  class="col-sm"
                  addLabelClasses="mb-1"
                  addInputClasses="border-dark"
                  label="仕入返品理由"
                />
              </CRow>
            </div>
          </validation-observer>
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
            v-on:click="onClickRegistration"
            >登録
          </CButton>
        </div>
      </template>
    </CModal>
    <confirm-modal ref="confirmModal" />
  </div>
</template>

<script>
import ConfirmModal from '../../components/modals/ConfirmModal'
import PurchaseService from '../../api/purchase.service'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { numberFormat } from '../../lib/format'

export default {
  name: 'ArrivalRegistrationModal',
  components: { ConfirmModal, ValidationProvider, ValidationObserver },
  data() {
    return {
      arrivalDetail: {},
      showModal: false,
      isLoading: false,
      purchaseWarning: false
    }
  },
  methods: {
    show(purchaseScheduleNumber, supplierCode) {
      this.showModal = true
      this.isLoading = true
      PurchaseService.getByArrivalId(purchaseScheduleNumber, supplierCode)
        .then(({ data }) => {
          this.arrivalDetail = data
          this.arrivalDetail.purchaseScheduleQuantity = numberFormat(
            data.purchaseScheduleQuantity
          )
          this.arrivalDetail.purchaseQuantity = numberFormat(
            data.purchaseQuantity
          )
          this.isLoading = false
        })
        .catch(() => {
          this.arrivalDetail = {}
          this.isLoading = false
        })
    },
    dismiss() {
      this.showModal = false
      this.resetValidate()
    },
    async onClickRegistration() {
      const isValid = await this.$refs.purchaseRegisterObserver.validate()
      if (isValid) {
        this.$refs.confirmModal.show(
          '入荷実績登録確認',
          `OPOS発注番号：${
            this.arrivalDetail.orderNumber
          }の入荷実績を登録します。`,
          this.processRegistration
        )
      }
    },
    processRegistration() {
      let body = { ...this.arrivalDetail }
      body.purchaseQuantity = this.stringToNumber(
        this.arrivalDetail.purchaseQuantity
      )
      body.purchaseScheduleQuantity = this.stringToNumber(
        this.arrivalDetail.purchaseScheduleQuantity
      )
      this.isLoading = true
      PurchaseService.save(body)
        .then(() => {
          this.$emit('showCommonAlert', {
            isSuccess: true,
            message: '入荷実績を登録しました。'
          })
          this.$emit('registration-success')
          this.isLoading = false
        })
        .catch(() => {
          this.$emit('showCommonAlert', {
            isSuccess: false,
            message: '入荷実績の登録に失敗しました。'
          })
          this.isLoading = false
        })
      this.dismiss()
    },
    resetValidate() {
      this.$refs.purchaseRegisterObserver.reset()
      this.purchaseWarning = false
    },
    checkPurchaseWarning(value) {
      this.purchaseWarning =
        value != null &&
        String(value).trim().length > 0 &&
        this.stringToNumber(value) <
          this.stringToNumber(this.arrivalDetail.purchaseScheduleQuantity)
    }
  }
}
</script>

<style scoped></style>
