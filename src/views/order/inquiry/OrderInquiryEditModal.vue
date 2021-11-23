<template>
  <div>
    <CModal
      :show.sync="isShow"
      :closeOnBackdrop="false"
      :centered="true"
      size="xl"
    >
      <template #header-wrapper>
        <div class="w-100 h-100 header-container modal-border">
          <h6 class="text-center m-auto font-weight-bold">発注情報(修正)</h6>
        </div>
      </template>
      <template #body-wrapper>
        <c-scrollbar class="modal-body modal-border-left modal-border-right">
          <div class="body-item-header font-weight-bold">発注情報</div>
          <div class="p-3">
            <CRow class="pb-2">
              <div class="col-sm">
                発注番号 ：{{ orderInquiry.order_number }}
              </div>
              <div class="col-sm">
                ○○番号 ：{{ orderInquiry.order_number_new_system }}
              </div>
            </CRow>
            <CRow>
              <div class="col-sm">
                <CInput
                  vertical
                  disabled
                  :addLabelClasses="['mb-1', 'label-field-no-wrap']"
                  :addInputClasses="'border-dark'"
                  label="商品番号"
                  :value="product.product_code"
                />
              </div>
              <div class="col-sm">
                <CInput
                  vertical
                  disabled
                  :addLabelClasses="['mb-1', 'label-field-no-wrap']"
                  :addInputClasses="'border-dark'"
                  label="MK商品コード"
                  :value="product.mk_code"
                />
              </div>
              <div class="col-sm">
                <CInput
                  vertical
                  disabled
                  :addLabelClasses="['mb-1', 'label-field-no-wrap']"
                  :addInputClasses="'border-dark'"
                  label="商品名"
                  :value="product.product_name"
                />
              </div>
            </CRow>
            <CRow>
              <div class="col-sm">
                <CInput
                  vertical
                  disabled
                  :addLabelClasses="['mb-1', 'label-field-no-wrap']"
                  :addInputClasses="'border-dark'"
                  label="発注数"
                  :value="product.quantity_of_orders | number"
                />
              </div>
              <div class="col-sm">
                <div class="col-sm">
                  <CInput
                    vertical
                    disabled
                    :addLabelClasses="['mb-1', 'label-field-no-wrap']"
                    :addInputClasses="'border-dark'"
                    label="ケース"
                    :value="
                      Math.floor(
                        product.quantity_of_orders / product.items_per_package
                      ) | number
                    "
                  />
                </div>
              </div>
              <div class="col-sm">
                <CInput
                  vertical
                  disabled
                  :addLabelClasses="['mb-1', 'label-field-no-wrap']"
                  :addInputClasses="'border-dark'"
                  label="入目"
                  :value="product.items_per_package | number"
                />
              </div>
              <div class="col-sm">
                <CInput
                  vertical
                  disabled
                  :addLabelClasses="['mb-1', 'label-field-no-wrap']"
                  :addInputClasses="'border-dark'"
                  label="バラ"
                  :value="
                    product.quantity_of_orders % product.items_per_package
                      | number
                  "
                />
              </div>
            </CRow>
            <CRow>
              <div class="col-sm">
                <CInput
                  vertical
                  :addInputClasses="'border-dark'"
                  @input="event => (product.unit_price = numberFormat(event))"
                  :value="product.unit_price | number"
                >
                  <template #label>
                    <label class="mb-1 label-field-no-wrap"
                      >単価
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
                  disabled
                  :addLabelClasses="['mb-1', 'label-field-no-wrap']"
                  :addInputClasses="'border-dark'"
                  label="金額"
                  :value="product.total_amount | number"
                />
              </div>
            </CRow>
            <CRow>
              <div class="col-sm">
                <CSelect
                  :options="unitPriceSetting"
                  :value.sync="product.unit_price_setting"
                  :addInputClasses="'border-dark'"
                >
                  <template #label>
                    <label class="mb-1 label-field-no-wrap"
                      >単価設定
                      <span class="text-danger font-weight-bold"
                        >[必須]</span
                      ></label
                    >
                  </template>
                </CSelect>
              </div>
              <div class="col-sm">
                <CInput
                  vertical
                  disabled
                  :addLabelClasses="['mb-1', 'label-field-no-wrap']"
                  :addInputClasses="'border-dark'"
                  label="預り"
                  :value="product.custody"
                />
              </div>
              <div class="col-sm">
                <CInput
                  vertical
                  disabled
                  :addLabelClasses="['mb-1', 'label-field-no-wrap']"
                  :addInputClasses="'border-dark'"
                  label="入荷状態"
                  :value="product.in_stock_status"
                />
              </div>
            </CRow>
            <CRow>
              <div class="col-sm">
                <CInput
                  vertical
                  disabled
                  :addLabelClasses="['mb-1', 'label-field-no-wrap']"
                  :addInputClasses="'border-dark'"
                  label="納品予定日"
                  :value="product.delivery_date_plan"
                />
              </div>
              <div class="col-sm">
                <CInput
                  vertical
                  disabled
                  :addLabelClasses="['mb-1', 'label-field-no-wrap']"
                  :addInputClasses="'border-dark'"
                  label="納品倉庫"
                  :value="product.warehouse"
                />
              </div>
            </CRow>
            <CRow>
              <div class="col-sm">
                <CTextarea
                  label="申請コメント"
                  :addInputClasses="'border-dark'"
                ></CTextarea>
              </div>
            </CRow>
          </div>
          <div class="body-item-header font-weight-bold">発注情報の取消</div>
          <div class="p-3">
            <CInputRadioGroup
              :checked.sync="selectedDeleteOption"
              :options="deleteOptions"
            />
          </div>
        </c-scrollbar>
      </template>
      <template #footer-wrapper>
        <div class="modal-footer footer-container modal-border p-1">
          <CButton @click="onCancel" color="outline-info" size="sm"
            >キャンセル
          </CButton>
          <CButton color="info" size="sm" @click="onPaymentScheduleRegistration"
            >分納登録
          </CButton>
          <CButton color="info" size="sm" @click="onTemporarilySave"
            >一時保存
          </CButton>
          <CButton color="info" size="sm" @click="onOrderConfirm"
            >発注確定
          </CButton>
        </div>
      </template>
    </CModal>
    <confirm-modal ref="confirmModal" />
  </div>
</template>

<script>
import ConfirmModal from '../../../components/modals/ConfirmModal'

const DELETE_PRODUCT_ONLY = '1'
const DELETE_ORDER = '2'

export default {
  name: 'OrderInquiryEditModal',
  components: {
    ConfirmModal
  },
  data() {
    return {
      isShow: false,
      unitPriceSetting: [
        {
          value: '0',
          label: '納品時'
        },
        {
          value: '1',
          label: '発注時'
        }
      ],
      deleteOptions: [
        {
          value: DELETE_PRODUCT_ONLY,
          label: '上記商品情報に表示されている商品のみを無効にする'
        },
        {
          value: DELETE_ORDER,
          label: '発注伝票を無効にする'
        }
      ],
      selectedDeleteOption: '',
      orderInquiry: {},
      product: {}
    }
  },
  methods: {
    show(orderInquiry, product) {
      this.orderInquiry = orderInquiry
      if (product) {
        this.product = product
      } else {
        this.product = {}
      }
      this.isShow = true
    },
    dismiss() {
      this.isShow = false
      this.selectedDeleteOption = ''
    },
    onTemporarilySave() {
      const title = '一時保存内容確認'
      if (this.selectedDeleteOption === DELETE_PRODUCT_ONLY) {
        const message =
          '商品番号：' +
          this.product.product_code +
          'の発注情報を無効にします。'
        this.$refs.confirmModal.show(
          title,
          message,
          this.onConfirmModal,
          this.onCancelModal
        )
      } else if (this.selectedDeleteOption === DELETE_ORDER) {
        const message =
          '発注番号：' +
          this.orderInquiry.order_number +
          'の発注情報を無効にします。'
        this.$refs.confirmModal.show(
          title,
          message,
          this.onConfirmModal,
          this.onCancelModal
        )
      } else {
        this.onConfirmModal()
      }
    },
    onOrderConfirm() {
      this.$refs.confirmModal.show(
        '発注確定',
        '発注番号：' + this.orderInquiry.order_number + ' を発注確定します。',
        this.onConfirmModal,
        this.onCancelModal
      )
    },
    onPaymentScheduleRegistration() {
      // Todo
      this.dismiss()
      this.$emit('paymentScheduleRegistration')
    },
    onCancel() {
      // Todo
      console.log('Cancel')
      this.dismiss()
    },
    onConfirmModal() {
      // Todo
      this.$emit('finishedEditOrder', this.orderInquiry)
      this.dismiss()
    },
    onCancelModal() {
      // Todo
      console.log('Click cancel on Confirm Modal')
    }
  }
}
</script>

<style scoped></style>
