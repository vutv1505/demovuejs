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
              請求情報詳細（更新）
            </h6>
          </div>
        </template>

        <template #body-wrapper>
          <c-scrollbar
            class="modal-body modal-border-left modal-border-right"
            v-loading="isLoading"
          >
            <div class="body-item-header font-weight-bold">請求情報</div>
            <div class="px-3">
              <CRow class="mt-3">
                <CCol sm="4"> 仕入先名：{{ billingDetail.supplierName }}</CCol>
                <CCol sm="4">
                  請求対象年月：{{ billingDetail.billingTargetDate }}</CCol
                >
              </CRow>
            </div>
            <div class="body-item-header font-weight-bold mt-3">
              請求情報詳細
            </div>
            <div class="px-3">
              <CRow class="mt-3">
                <b-form-group class="col-sm">
                  <label class="mb-1">請求情報照合状態</label>
                  <CSelect
                    :options="billingReferStateList"
                    :value.sync="billingDetail.billingReferState"
                  ></CSelect>
                </b-form-group>
                <b-form-group class="col-sm">
                  <label class="mb-1">金額計算区分</label>
                  <CInput
                    v-model="billingDetail.amountCalculationCode"
                    disabled
                    name="amountCalculationCode"
                    addInputClasses="border-dark"
                  ></CInput>
                </b-form-group>
              </CRow>
              <CRow>
                <b-form-group class="col-sm">
                  <label class="mb-1">算出請求金額（税抜）</label>
                  <number-input
                    v-model="billingDetail.calculatedBillingMoneyExcludeTax"
                    name="calculatedBillingMoneyExcludeTax"
                    disabled
                    class="border-dark"
                    maxlength="12"
                  ></number-input>
                </b-form-group>
                <b-form-group class="col-sm">
                  <label class="mb-1">算出請求金額（税込）</label>
                  <number-input
                    v-model="billingDetail.calculatedBillingMoneyIncludeTax"
                    name="calculatedBillingMoneyIncludeTax"
                    disabled
                    class="border-dark"
                    maxlength="12"
                  ></number-input>
                </b-form-group>
                <b-form-group class="col-sm">
                  <label class="mb-1"
                    >請求金額（税抜）<span class="text-danger font-weight-bold"
                      >[必須]</span
                    ></label
                  >
                  <validation-provider
                    rules="required|min_value:0"
                    name="billingMoney"
                    v-slot="{ valid, errors }"
                  >
                    <number-input
                      v-model="billingDetail.billingMoneyExcludeTax"
                      name="billingMoneyExcludeTax"
                      maxlength="12"
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
                    >請求金額（税込）<span class="text-danger font-weight-bold"
                      >[必須]</span
                    ></label
                  >
                  <validation-provider
                    rules="required|min_value:0"
                    name="billingMoney"
                    v-slot="{ valid, errors }"
                  >
                    <number-input
                      v-model="billingDetail.billingMoneyIncludeTax"
                      name="billingMoneyIncludeTax"
                      maxlength="12"
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
                  <label class="mb-1">算出商品金額（税抜）</label>
                  <number-input
                    v-model="billingDetail.calculatedBillingMoneyExcludeTax1"
                    name="calculatedBillingMoneyExcludeTax1"
                    disabled
                    class="border-dark"
                    maxlength="12"
                  ></number-input>
                </b-form-group>
                <b-form-group class="col-sm">
                  <label class="mb-1">算出商品金額（税込）</label>
                  <number-input
                    v-model="billingDetail.calculatedBillingMoneyIncludeTax1"
                    name="calculatedBillingMoneyIncludeTax1"
                    disabled
                    class="border-dark"
                    maxlength="12"
                  ></number-input>
                </b-form-group>
                <b-form-group class="col-sm">
                  <label class="mb-1"
                    >商品金額（税抜）<span class="text-danger font-weight-bold"
                      >[必須]</span
                    ></label
                  >
                  <validation-provider
                    rules="required|min_value:0"
                    name="abc"
                    v-slot="{ valid, errors }"
                  >
                    <number-input
                      v-model="billingDetail.calculatedProductMoneyExcludeTax"
                      name="calculatedProductMoneyExcludeTax"
                      maxlength="12"
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
                    >商品金額（税込）<span class="text-danger font-weight-bold"
                      >[必須]</span
                    ></label
                  >
                  <validation-provider
                    rules="required|min_value:0"
                    name="calculatedProductMoneyIncludeTax"
                    v-slot="{ valid, errors }"
                  >
                    <number-input
                      v-model="billingDetail.calculatedProductMoneyIncludeTax"
                      name="calculatedProductMoneyIncludeTax"
                      maxlength="12"
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
                  <label class="mb-1">算出サンプル（税抜）</label>
                  <number-input
                    v-model="billingDetail.calculatedSampleExcludeTax"
                    name="calculatedSampleExcludeTax"
                    disabled
                    class="border-dark"
                    maxlength="12"
                  ></number-input>
                </b-form-group>
                <b-form-group class="col-sm">
                  <label class="mb-1">算出サンプル（税込）</label>
                  <number-input
                    v-model="billingDetail.calculatedSampleIncludeTax"
                    name="calculatedSampleIncludeTax"
                    disabled
                    class="border-dark"
                    maxlength="12"
                  ></number-input>
                </b-form-group>
                <b-form-group class="col-sm">
                  <label class="mb-1"
                    >サンプル（税抜）<span class="text-danger font-weight-bold"
                      >[必須]</span
                    ></label
                  >
                  <validation-provider
                    rules="required|min_value:0"
                    name="sampleExcludeTax"
                    v-slot="{ valid, errors }"
                  >
                    <number-input
                      v-model="billingDetail.sampleExcludeTax"
                      name="sampleExcludeTax"
                      maxlength="12"
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
                    >サンプル（税込）<span class="text-danger font-weight-bold"
                      >[必須]</span
                    ></label
                  >
                  <validation-provider
                    rules="required|min_value:0"
                    name="sampleIncludeTax"
                    v-slot="{ valid, errors }"
                  >
                    <number-input
                      v-model="billingDetail.sampleIncludeTax"
                      name="sampleIncludeTax"
                      maxlength="12"
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
                  <label class="mb-1">算出ツール品（税抜）</label>
                  <number-input
                    v-model="billingDetail.calculatedToolExcludeTax"
                    name="calculatedToolExcludeTax"
                    disabled
                    class="border-dark"
                    maxlength="12"
                  ></number-input>
                </b-form-group>
                <b-form-group class="col-sm">
                  <label class="mb-1">算出ツール品（税込）</label>
                  <number-input
                    v-model="billingDetail.calculatedToolIncludeTax"
                    name="calculatedToolIncludeTax"
                    disabled
                    class="border-dark"
                    maxlength="12"
                  ></number-input>
                </b-form-group>
                <b-form-group class="col-sm">
                  <label class="mb-1"
                    >ツール品（税抜）<span class="text-danger font-weight-bold"
                      >[必須]</span
                    ></label
                  >
                  <validation-provider
                    rules="required|min_value:0"
                    name="toolExcludeTax"
                    v-slot="{ valid, errors }"
                  >
                    <number-input
                      v-model="billingDetail.toolExcludeTax"
                      name="toolExcludeTax"
                      maxlength="12"
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
                    >ツール品（税込）<span class="text-danger font-weight-bold"
                      >[必須]</span
                    ></label
                  >
                  <validation-provider
                    rules="required|min_value:0"
                    name="toolIncludeTax"
                    v-slot="{ valid, errors }"
                  >
                    <number-input
                      v-model="billingDetail.toolIncludeTax"
                      name="toolIncludeTax"
                      maxlength="12"
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
                <CInput
                  class="col-sm"
                  label="メモ"
                  addLabelClasses="mb-1"
                  addInputClasses="border-dark"
                  v-model="billingDetail.memo"
                >
                </CInput>
              </CRow>
            </div>
            <div class="body-item-header font-weight-bold">商品情報詳細</div>
            <div class="pt-4">
              <c-data-table
                ref="cDataTable"
                :items="tableItems"
                :fields="tableHeaders"
                :loading="isLoading"
                border="true"
                outlined
                striped
              >
                <template #orderNumber="{item}">
                  <td class="text-center">{{ item.orderNumber | number }}</td>
                </template>
                <template #productDivision="{item}">
                  <td class="text-center">
                    {{ item.productDivision }}
                  </td>
                </template>
                <template #productNumber="{item}">
                  <td class="text-center">{{ item.productNumber }}</td>
                </template>
                <template #mkproductCode="{item}">
                  <td class="text-center">{{ item.mkproductCode }}</td>
                </template>
                <template #productName="{item}">
                  <td class="text-left">
                    {{ item.productName }}
                  </td>
                </template>
                <template #purchaseDate="{item}">
                  <td class="text-center">
                    {{ item.purchaseDate }}
                  </td>
                </template>
                <template #deliveryToCode="{item}">
                  <td class="text-center">
                    {{ item.deliveryToCode }}
                  </td>
                </template>
                <template #purchaseQuantity="{item}">
                  <td class="text-right">
                    {{ item.purchaseQuantity | number }}
                  </td>
                </template>
                <template #backQuantity="{item}">
                  <td class="text-right">
                    {{ item.backQuantity | number }}
                  </td>
                </template>
                <template #rate="{item}">
                  <td class="text-right">
                    {{ item.rate | number }}
                  </td>
                </template>
              </c-data-table>
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
            <CButton
              color="info"
              class="btn-sm modal-btn"
              v-on:click="onClickEdit"
              :disabled="invalid"
              >更新
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
import { BILLING_HISTORY_LIST } from '../../assets/mockdata/billing_history_list'
import CommonTableFilterLayout from '../../components/layouts/CommonTableFilterLayout'

/**
 * OPOS-Billing-DetailEdit
 */
export default {
  name: 'BillingEditModal',
  components: {
    ConfirmModal,
    ValidationProvider,
    ValidationObserver,
    NumberInput
  },
  data() {
    return {
      isLoading: false,
      billingDetail: {},
      showModal: false,
      billingReferStateList: [
        { value: 0, label: '入荷締め前' },
        { value: 1, label: '請求情報照合中' },
        { value: 2, label: '請求情報不一致' },
        { value: 3, label: '請求情報照合済' },
        { value: 4, label: '請求情報確定' }
      ],
      isTableLoading: false,
      tableItems: BILLING_HISTORY_LIST,
      tableHeaders: [
        {
          key: 'orderNumber',
          label: 'No.',
          _style: 'text-align: center;',
          _classes: 'col-w-1'
        },
        {
          key: 'productDivision',
          label: '商品区分',
          _style: 'text-align: center;',
          _classes: 'col-w-2'
        },
        {
          key: 'productNumber',
          label: '商品番号',
          _style: 'text-align: center;',
          _classes: 'col-w-2'
        },
        {
          key: 'mkproductCode',
          label: 'MK商品コード',
          _style: 'text-align: center;',
          _classes: 'col-w-3'
        },
        {
          key: 'productName',
          label: '商品名',
          _style: 'text-align: center;',
          _classes: 'col-w-3'
        },
        {
          key: 'purchaseDate',
          label: '入出庫日',
          _style: 'text-align: center;',
          _classes: 'col-w-1'
        },
        {
          key: 'deliveryToName',
          label: '納品先名',
          _style: 'text-align: center;',
          _classes: 'col-w-3'
        },
        {
          key: 'purchaseQuantity',
          label: '納品数',
          _style: 'text-align: center;',
          _classes: 'col-w-1'
        },
        {
          key: 'backQuantity',
          label: '返品数',
          _style: 'text-align: center;',
          _classes: 'col-w-2'
        },
        {
          key: 'rate',
          label: '単価',
          _style: 'text-align: center;',
          _classes: 'col-w-2'
        }
      ]
    }
  },
  methods: {
    show(billingDetail) {
      this.billingDetail = {
        calculatedBillingMoneyExcludeTax: 1234567890,
        calculatedBillingMoneyIncludeTax: 1234567890,
        billingMoneyExcludeTax: 1234567890,
        billingMoneyIncludeTax: 1234567890,
        calculatedBillingMoneyExcludeTax1: 1234567890,
        calculatedBillingMoneyIncludeTax1: 1234567890,
        calculatedProductMoneyExcludeTax: 1234567890,
        calculatedProductMoneyIncludeTax: 1234567890,
        calculatedSampleExcludeTax: 1234567890,
        calculatedSampleIncludeTax: 1234567890,
        sampleExcludeTax: 1234567890,
        sampleIncludeTax: 1234567890,
        calculatedToolExcludeTax: 1234567890,
        calculatedToolIncludeTax: 1234567890,
        toolExcludeTax: 1234567890,
        toolIncludeTax: 1234567890,
        memo:
          'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
      }
      this.showModal = true
    },
    dismiss() {
      this.$refs.form.reset()
      this.showModal = false
    },
    async onClickEdit() {
      const formValid = await this.$refs.form.validate()
      console.log(formValid)
      if (!formValid) {
        return
      }
      this.$refs.confirmModal.show(
        '請求情報更新確認',
        `請求情報を更新します。`,
        this.processEdit
      )
    },
    processEdit() {
      this.dismiss()
      this.$emit('showCommonAlert', {
        isSuccess: true,
        message: '請求情報を更新しました。'
      })
      // When process fail
      // {
      //   isSuccess: false,
      //   message: '請求情報の更新に失敗しました。'
      // }
    }
  }
}
</script>

<style scoped></style>
