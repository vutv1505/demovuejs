<template>
  <div>
    <CModal
      :show.sync="isShow"
      :closeOnBackdrop="false"
      :centered="true"
      size="xl"
    >
      <template #header-wrapper>
        <div class="w-100 header-container modal-border">
          <h6 class="text-center m-auto font-weight-bold">
            発注情報(分納登録)
          </h6>
        </div>
      </template>
      <template #body-wrapper>
        <c-scrollbar
          class="
            modal-body
            modal-border-left
            modal-border-right
            modal-border-bottom
            modal-border-bottom-left-radius
            modal-border-bottom-right-radius
          "
        >
          <div class="body-item-header font-weight-bold">発注・納品情報</div>
          <div class="p-3">
            <CRow class="pb-2">
              <div class="col-sm">
                <CInput
                  type="date"
                  vertical
                  :addInputClasses="'border-dark'"
                  :addLabelClasses="['mb-1', 'label-field-no-wrap']"
                >
                  <template #label>
                    <label class="mb-1 label-field-no-wrap"
                      >納品予定日
                      <span class="text-danger font-weight-bold"
                        >[必須]</span
                      ></label
                    >
                  </template>
                </CInput>
              </div>
              <div class="col-sm">
                <div class="mb-1 label-field-no-wrap">
                  倉庫 <span class="text-danger font-weight-bold">[必須]</span>
                </div>
                <CSelect
                  :options="wareHouse"
                  :addInputClasses="'border-dark'"
                ></CSelect>
              </div>
              <div class="col-sm">
                <CInput
                  vertical
                  :addLabelClasses="['mb-1', 'label-field-no-wrap']"
                  :addInputClasses="'border-dark'"
                  @input="event => (delivery_number = numberFormat(event))"
                  :value="delivery_number | number"
                >
                  <template #label>
                    <label class="mb-1 label-field-no-wrap"
                      >納品予定数
                      <span class="text-danger font-weight-bold"
                        >[必須]</span
                      ></label
                    >
                  </template>
                </CInput>
              </div>
              <div class="col-sm">
                <CInput
                  vertical
                  :addLabelClasses="['mb-1', 'label-field-no-wrap']"
                  :addInputClasses="'border-dark'"
                >
                  <template #label>
                    <label class="mb-1 label-field-no-wrap"
                      >依頼確定
                      <span class="text-danger font-weight-bold"
                        >[必須]</span
                      ></label
                    >
                  </template>
                </CInput>
              </div>
            </CRow>
            <CRow class="pb-2">
              <div class="col-sm">
                <CInput
                  disabled
                  :addLabelClasses="['mb-1', 'label-field-no-wrap']"
                  :addInputClasses="'border-dark'"
                  label="引き取り開始日"
                  :value="schedulingPaymentOrder.pick_up_start_date"
                ></CInput>
              </div>
              <div class="col-sm">
                <CInput
                  disabled
                  :addLabelClasses="['mb-1', 'label-field-no-wrap']"
                  :addInputClasses="'border-dark'"
                  label="入荷済数"
                  :value="
                    schedulingPaymentOrder.quantity_already_in_stock | number
                  "
                ></CInput>
              </div>
              <div class="col-sm">
                <CInput
                  disabled
                  :addLabelClasses="['mb-1', 'label-field-no-wrap']"
                  :addInputClasses="'border-dark'"
                  label="ケース"
                  :value="schedulingPaymentOrder.case | number"
                ></CInput>
              </div>
              <div class="col-sm">
                <CInput
                  disabled
                  :addLabelClasses="['mb-1', 'label-field-no-wrap']"
                  :addInputClasses="'border-dark'"
                  label="バラ"
                  :value="schedulingPaymentOrder.roses | number"
                ></CInput>
              </div>
            </CRow>
            <CRow class="pb-2">
              <div class="col-sm">
                <CTextarea
                  maxlength="200"
                  :addLabelClasses="['mb-1', 'label-field-no-wrap']"
                  :addInputClasses="'border-dark'"
                  label="メモ"
                ></CTextarea>
              </div>
            </CRow>
            <CRow class="pb-2 d-flex justify-content-end">
              <CButton
                @click="onCancel"
                color="outline-info"
                size="sm"
                class="modal-btn mr-2"
                >キャンセル
              </CButton>
              <CButton
                @click="onRecalculation"
                color="info"
                size="sm"
                class="modal-btn mr-2"
                >再計算
              </CButton>
              <CButton @click="onSave" color="info" size="sm" class="modal-btn"
                >保存
              </CButton>
            </CRow>
          </div>
          <div class="body-item-header font-weight-bold">分納情報</div>
          <div class="pt-2">
            <common-table-filter-layout
              class="py-2"
              searchGroupSize="sm"
              vertical-scroll
              :hasActionAdvanceFilter="false"
              :table-items="tableItems"
              :table-headers="tableHeaders"
              :tableResponsive="false"
              :is-loading="isLoading"
              :right-buttons="[
                { text: '修正', clickEvent: onEditPaymentRegistrationData }
              ]"
            >
              <template #setting-items>
                <CDropdownItem v-on:click="onEditPaymentRegistrationData"
                  >修正
                </CDropdownItem>
              </template>
              <template #choice="index">
                <td class="text-center">
                  <input type="radio" name="paymentRadioGroup" :value="index" />
                </td>
              </template>
            </common-table-filter-layout>
          </div>
        </c-scrollbar>
      </template>
      <template #footer-wrapper>
        <div />
      </template>
    </CModal>
  </div>
</template>

<script>
import { MOCK_PAYMENT_REGISTRATION } from '../../../assets/mockdata/payment_registration'
import CommonTableFilterLayout from '../../../components/layouts/CommonTableFilterLayout'

export default {
  name: 'PaymentRegistration',
  components: { CommonTableFilterLayout },
  data() {
    return {
      isShow: false,
      schedulingPaymentOrder: MOCK_PAYMENT_REGISTRATION,
      delivery_number: 123,
      isLoading: false,
      tableItems: MOCK_PAYMENT_REGISTRATION.products,
      tableHeaders: [
        {
          key: 'choice',
          label: '',
          _style: 'text-align: center; border: 1px solid #727272 '
        },
        {
          key: 'delivery_date',
          label: '納品予定日',
          _style: 'text-align: center; border: 1px solid #727272 '
        },
        {
          key: 'ware_house',
          label: '倉庫',
          _style: 'text-align: center; border: 1px solid #727272 '
        },
        {
          key: 'expect_quantity',
          label: '納品予定数',
          _style: 'text-align: center; border: 1px solid #727272 '
        },
        {
          key: 'request_confirmed',
          label: '依頼確定',
          _style: 'text-align: center; border: 1px solid #727272 '
        },
        {
          key: 'pick_up_date',
          label: '引き取り開始日',
          _style: 'text-align: center; border: 1px solid #727272 '
        },
        {
          key: 'number_in_stock',
          label: '入荷済数',
          _style: 'text-align: center; border: 1px solid #727272 '
        },
        {
          key: 'case',
          label: 'ケース',
          _style: 'text-align: center; border: 1px solid #727272 '
        },
        {
          key: 'rose',
          label: 'バラ',
          _style: 'text-align: center; border: 1px solid #727272 '
        },
        {
          key: 'note',
          label: 'メモ',
          _style: 'text-align: center; border: 1px solid #727272 '
        }
      ],
      wareHouse: [
        { value: 1, label: '本社倉庫' },
        { value: 2, label: '西倉庫' },
        { value: 4, label: '東倉庫' },
        { value: 7, label: 'ショップ倉庫' },
        { value: 9, label: '商品倉庫' },
        { value: 90, label: '海外倉庫' },
        { value: 817, label: 'ｱｲﾙﾐﾈ倉庫' },
        { value: 828, label: '蔦屋家電+' },
        { value: 835, label: 'ﾏﾙｲｳｪﾌﾞﾁｬﾈﾙ' }
      ],
      paymentInformation: {}
    }
  },
  methods: {
    show() {
      this.isShow = true
    },
    dismiss() {
      this.isShow = false
    },
    handleInput(event) {
      event.target.value = this.numberFormat(event.target.value)
    },
    onCancel() {
      console.log('on cancel')
      this.dismiss()
    },
    onSave() {
      console.log('on Save')
      this.dismiss()
    },
    onRecalculation() {
      console.log('on Recalculation')
    },
    onEditPaymentRegistrationData() {
      console.log('edit')
      const selector = document.querySelector(
        'input[name="paymentRadioGroup"]:checked'
      )
      if (selector) {
        console.log(this.schedulingPaymentOrder.products[selector.value])
      }
    }
  }
}
</script>

<style scoped></style>
