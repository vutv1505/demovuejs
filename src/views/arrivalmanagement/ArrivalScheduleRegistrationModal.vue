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
              入荷予定登録
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
                <validation-provider
                  class="col-sm"
                  rules="required|length:7"
                  name="OPOS発注番号"
                  vid="orderNumber"
                  v-slot="{ valid, errors }"
                >
                  <CInput
                    :class="{ 'is-invalid': errors.length > 0 }"
                    addLabelClasses="mb-1"
                    addInputClasses="pr-2-rem"
                    maxlength="7"
                    v-model="arrivalDetail.orderNumber"
                    :isValid="errors.length === 0"
                  >
                    <template #label>
                      <label class="mb-1"
                        >OPOS発注番号
                        <span class="text-danger font-weight-bold"
                          >[必須]</span
                        ></label
                      >
                    </template>
                    <template #label-after-input>
                      <CButton
                        size="sm"
                        variant="ghost"
                        class="input-icon-vertical btn-search"
                        @click="$refs.orderSearch.show()"
                      >
                        <CIcon name="cil-find-in-page" />
                      </CButton>
                    </template>
                    <template #invalid-feedback>
                      <span class="valid-msg-area fm-font-standard mb-1">
                        {{ errors[0] }}
                      </span>
                    </template>
                  </CInput>
                </validation-provider>
                <CInput
                  class="col-sm"
                  disabled
                  addLabelClasses="mb-1"
                  addInputClasses="border-dark"
                  label="FORCE発注番号"
                  :value="arrivalDetail.forceOrderNumber"
                />
              </CRow>
              <CRow>
                <CInput
                  class="col-sm"
                  disabled
                  addLabelClasses="mb-1"
                  addInputClasses="border-dark"
                  label="商品番号"
                  :value="arrivalDetail.productNumber"
                />
                <CInput
                  class="col-sm"
                  disabled
                  addLabelClasses="mb-1"
                  addInputClasses="border-dark"
                  label="商品名"
                  :value="arrivalDetail.productName"
                />
              </CRow>
              <CRow>
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
                      maxlength="7"
                      :state="valid"
                      @input="calculateCaseAndBugQuantity"
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
                      maxlength="7"
                      :state="valid"
                      @input="calculateCaseAndBugQuantity"
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
                  <label class="mb-1">ケース</label>
                  <number-input
                    v-model="arrivalDetail.caseQuantity"
                    name="caseQuantity"
                    disabled
                    class="border-dark"
                  ></number-input>
                </b-form-group>
                <b-form-group class="col-sm">
                  <label class="mb-1">バラ数</label>
                  <number-input
                    v-model="bugQuantity"
                    name="bugQuantity"
                    disabled
                    class="border-dark"
                  ></number-input>
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
                <validation-provider
                  class="col-sm"
                  rules="required"
                  name="入荷予定日"
                  vid="purchaseScheduleDate"
                  v-slot="{ valid, errors }"
                >
                  <div class="form-group">
                    <label class="mb-1"
                      >入荷予定日
                      <span class="text-danger font-weight-bold"
                        >[必須]</span
                      ></label
                    >
                    <date-time-picker
                      placeholder="yyyy/mm/dd"
                      param-mode="date"
                      v-model="arrivalDetail.purchaseScheduleDate"
                      :isValid="errors.length === 0"
                    ></date-time-picker>
                    <div
                      v-show="!valid"
                      class="valid-msg-area fm-font-standard mt-1 mb-1"
                    >
                      {{ errors[0] }}
                    </div>
                  </div>
                </validation-provider>
              </CRow>
              <CRow>
                <CInput
                  class="col-sm"
                  disabled
                  addLabelClasses="mb-1"
                  addInputClasses="border-dark"
                  label="納品予定日"
                  v-model="arrivalDetail.deliveryScheduleDate"
                  placeholder="yyyy/mm/dd"
                >
                </CInput>
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
                <validation-provider
                  rules="required"
                  class="col-sm"
                  name="MK製造記号"
                  vid="mkMakeCode"
                  v-slot="{ valid, errors }"
                >
                  <CInput
                    addLabelClasses="mb-1"
                    v-model="arrivalDetail.mkMakeCode"
                    :class="{ 'is-invalid': errors.length > 0 }"
                    :isValid="errors.length === 0"
                  >
                    <template #label>
                      <label class="mb-1"
                        >MK製造記号(メーカー独自の商品番号)
                        <span class="text-danger font-weight-bold"
                          >[必須]</span
                        ></label
                      >
                    </template>
                    <template #invalid-feedback>
                      <span class="valid-msg-area fm-font-standard mb-1">
                        {{ errors[0] }}
                      </span>
                    </template>
                  </CInput>
                </validation-provider>
              </CRow>
              <CRow>
                <div class="col-sm form-group">
                  <label class="mb-1">充填日(ボディ以外は必須)</label>
                  <date-time-picker
                    placeholder="yyyy/mm/dd"
                    param-mode="date"
                    v-model="arrivalDetail.fillingDate"
                  ></date-time-picker>
                </div>
                <div class="col-sm form-group">
                  <label class="mb-1">製造日(ボディは必須)</label>
                  <date-time-picker
                    placeholder="yyyy/mm/dd"
                    param-mode="date"
                    v-model="arrivalDetail.makeDate"
                  ></date-time-picker>
                </div>
              </CRow>
              <CRow>
                <CInput
                  class="col-sm-6"
                  disabled
                  addLabelClasses="mb-1"
                  addInputClasses="border-dark"
                  label="使用期限"
                  :value="arrivalDetail.useDeadline"
                  placeholder="yyyy/mm/dd"
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
              :disabled="invalid"
              v-on:click="onClickRegistration"
              >登録
            </CButton>
          </div>
        </template>
      </CModal>
    </ValidationObserver>
    <search-order-modal
      ref="orderSearch"
      @order-selected="orderSearchSelected"
    />
    <confirm-modal ref="confirmModal">
      <template #addition-buttons>
        <action-button
          size="sm"
          variant="info"
          class="regist-btn"
          @click="clickRegistrationDuplicate"
          >はい (続けて登録)
        </action-button>
      </template>
    </confirm-modal>
  </div>
</template>

<script>
import ConfirmModal from '../../components/modals/ConfirmModal'
import SearchOrderModal from '../../components/modals/SearchOrderModal'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import NumberInput from '@/components/customInput/NumberInput'
import ArrivalService from '../../api/purchase.service'
import { DatePattern, formatDate } from '../../lib/DateUtils'
import moment from 'moment'
import DateTimePicker from '@/components/customInput/DateTimePicker'

export default {
  name: 'ArrivalScheduleRegistrationModal',
  components: {
    DateTimePicker,
    SearchOrderModal,
    ConfirmModal,
    NumberInput,
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      arrivalDetail: {},
      showModal: false,
      isLoading: false
    }
  },
  methods: {
    show(arrivalDetail) {
      if (arrivalDetail) {
        this.arrivalDetail = {
          ...arrivalDetail,
          //forceNumber:,
          purchaseScheduleDate: formatDate(
            arrivalDetail.purchaseScheduleDate,
            DatePattern.YYYY_MM_DD
          ),
          deliveryScheduleDate: formatDate(
            arrivalDetail.deliveryScheduleDate,
            DatePattern.YYYY_MM_DD
          ),
          fillingDate: formatDate(
            arrivalDetail.fillingDate,
            DatePattern.YYYY_MM_DD
          ),
          makeDate: formatDate(arrivalDetail.makeDate, DatePattern.YYYY_MM_DD),
          useDeadline: formatDate(
            arrivalDetail.useDeadline,
            DatePattern.YYYY_MM_DD
          )
        }
        this.calculateCaseAndBugQuantity()
      } else {
        this.arrivalDetail = {
          orderNumber: null,
          makeDate: '',
          fillingDate: '',
          useDeadline: ''
        }
      }
      this.showModal = true
    },
    dismiss() {
      this.$refs.form.reset()
      this.showModal = false
    },
    updatePurchaseList() {
      this.$emit('registration-success')
    },
    async onClickRegistration() {
      const formValid = await this.$refs.form.validate()
      if (!formValid) {
        return
      }
      this.$refs.confirmModal.show(
        '入荷予定情報登録確認',
        `OPOS発注番号：${
          this.arrivalDetail.orderNumber
        }の入荷予定情報を登録します。`,
        this.clickRegistrationConfirm
      )
    },
    clickRegistrationConfirm() {
      this.processRegistration(this.dismiss, this.dismiss)
    },
    clickRegistrationDuplicate() {
      this.$refs.confirmModal.dismiss()
      this.processRegistration()
    },
    processRegistration(successCallback, errorCallback) {
      this.isLoading = true
      const keyNeedRemove = [
        'purchaseConditionDivisionName',
        'supplierName',
        'tradingDivisionName',
        'warehouseName',
        'bugQuantity',
        'categoryName',
        'deliveryScheduleQuantity',
        'deliveryToName',
        'forceOrderNumber',
        'productCode',
        'productName',
        'purchaseScheduleNumber'
      ]
      let body = {
        ...this.arrivalDetail,
        orderNumber: String(this.arrivalDetail.orderNumber),
        // Todo add in future. Fake body value
        // purchaseScheduleNumber: 1000,        /*purchaseScheduleNumber	空白*/
        deliveryNumber: '9999',
        orderPartialNumber: '2',
        orderDate: moment().format(DatePattern.YYYY_MM_DDTHH_MM_SS_SSSZ),
        purchaseNumber: '9999',
        purchaseRowNumber: '9999',
        purchaseDate: moment().format(DatePattern.YYYY_MM_DDTHH_MM_SS_SSSZ),
        tradingDivision: '1',
        rate: 0,
        purchaseQuantity: 0,
        registrationUser: '豊田',
        registrationDate: moment().format(DatePattern.YYYY_MM_DDTHH_MM_SS_SSSZ)
      }
      //Todo add temp body request. Need make clearly body
      for (const key of keyNeedRemove) {
        if (Object.prototype.hasOwnProperty.call(body, key)) delete body[key]
      }
      ArrivalService.save(body)
        .then(({ data }) => {
          this.isLoading = false
          this.$emit('showCommonAlert', {
            isSuccess: true,
            message: '入荷予定情報を登録しました。'
          })
          this.updatePurchaseList()
          if (successCallback) {
            successCallback()
          }
        })
        .catch(error => {
          this.isLoading = false
          this.$emit('showCommonAlert', {
            isSuccess: false,
            message: '入荷予定情報の登録に失敗しました。'
          })
          if (errorCallback) {
            errorCallback()
          }
        })
    },
    orderSearchSelected(order) {
      let {
        orderNumber,
        forceOrderNumber,
        productNumber,
        productName,
        deliveryScheduleDate,
        deliveryToName,
        deliveryToCode
      } = order
      deliveryScheduleDate = formatDate(
        deliveryScheduleDate,
        DatePattern.YYYY_MM_DD
      )
      Object.assign(this.arrivalDetail, {
        orderNumber,
        forceOrderNumber,
        productNumber,
        productName,
        deliveryScheduleDate,
        deliveryToName,
        deliveryToCode
      })
    },
    calculateCaseAndBugQuantity() {
      let psQuantity = this.arrivalDetail.purchaseScheduleQuantity
      let pcQuantity = this.arrivalDetail.quantityPerCarton
      if (psQuantity && pcQuantity) {
        this.arrivalDetail.caseQuantity =
          (psQuantity - this.bugQuantity) / pcQuantity
      }
    }
  },
  computed: {
    bugQuantity() {
      if (
        this.arrivalDetail.purchaseScheduleQuantity &&
        this.arrivalDetail.quantityPerCarton
      )
        return (
          this.arrivalDetail.purchaseScheduleQuantity %
          this.arrivalDetail.quantityPerCarton
        )
      else return 0
    }
  }
}
</script>

<style scoped>
>>> .btn.input-icon-vertical.btn-search {
  top: 25px;
  height: 30px;
}
</style>
