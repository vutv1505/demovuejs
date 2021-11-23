<template>
  <div class="body-container">
    <div class="d-flex justify-content-center">
      <CommonAlert ref="commonAlert" class="position-absolute w-50" />
    </div>
    <common-table-filter-layout
      page-title="発注情報照会"
      page-id="order-inquiry"
      :current-filter-template="currentFilterTemplate"
      pagination
      :table-items="tableItems"
      :table-headers="tableHeaders"
      :is-loading="isLoading"
      :items-per-page="itemsPerPage"
      @onClickClearAdvance="onClickClearAdvanceFilter"
      @onClickSearchAdvance="onClickSearchAdvanceFilter"
    >
      <template #setting-items>
        <CDropdownItem v-on:click="openOrderInquiryDetail(chooseItem)"
          >詳細
        </CDropdownItem>
      </template>
      <template #advance-filter-body>
        <CForm>
          <CInput
            :horizontal="{ label: 'col-sm-5', input: 'col-sm-7' }"
            label="発注番号"
          />
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5">発注年月日</label>
            <div class="col-sm-7 text-center">
              <input type="date" class="form-control" />
              ～
              <input type="date" class="form-control" />
            </div>
          </div>
          <CInput
            :horizontal="{ label: 'col-sm-5', input: 'col-sm-7' }"
            label="仕入先コード"
          >
            <template #label-after-input>
              <CButton
                size="sm"
                variant="ghost"
                class="input-icon"
                @click="findItemNumber"
              >
                <CIcon name="cil-find-in-page" />
              </CButton>
            </template>
          </CInput>
          <CInput
            :horizontal="{ label: 'col-sm-5', input: 'col-sm-7' }"
            label="仕入先名"
          />
          <CSelect
            :horizontal="{ label: 'col-sm-5', input: 'col-sm-7' }"
            label="発注状態"
            placeholder="-- 未選択 --"
            :options="[
              '一時保存',
              '申請中',
              '申請取消',
              '否認済み',
              '仕入先未開示',
              '仕入先確認中',
              '要確認',
              '発注確定',
              'キャンセル',
              '訂正済'
            ]"
          />
        </CForm>
      </template>
      <template #choice="{index, item}">
        <td class="text-center border-bottom">
          <input
            type="radio"
            name="chooseOrderInquiryRadio"
            :value="index"
            :checked="item === chooseItem"
            v-on:change="radioChanged(item)"
          />
        </td>
      </template>
      <template #order_number="{item}">
        <td class="border-bottom">
          <u class="hand-pointer" @click="openOrderInquiryDetail(item)">{{
            item.order_number
          }}</u>
        </td>
      </template>
    </common-table-filter-layout>

    <OrderInquiryDetailModal
      ref="orderInquiryDetail"
      @showOrderInquiryEdit="onClickEditOrderInquiry"
    />
    <OrderInquiryEditModal
      ref="orderInquiryEditModal"
      @finishedEditOrder="onFinishedEditOrder"
      @paymentScheduleRegistration="onPaymentScheduleRegistration"
    />
    <PaymentRegistrationModal ref="paymentRegistrationModal" />
  </div>
</template>

<script>
import MOCK_ORDERS_INQUIRY from '../../../assets/mockdata/orders_inquiry'
import OrderInquiryEditModal from './OrderInquiryEditModal'
import CommonAlert from '../../../components/alert/CommonAlert'
import PaymentRegistrationModal from './PaymentRegistrationModal'
import OrderInquiryDetailModal from './OrderInquiryDetailModal'
import CommonTableFilterLayout from '../../../components/layouts/CommonTableFilterLayout'

const ITEM_PER_PAGE = 20

export default {
  name: 'OrderInquiry',
  components: {
    CommonTableFilterLayout,
    PaymentRegistrationModal,
    CommonAlert,
    OrderInquiryEditModal,
    OrderInquiryDetailModal
  },
  data() {
    return {
      isLoading: false,
      chooseItem: null,
      tableItems: MOCK_ORDERS_INQUIRY,
      itemsPerPage: ITEM_PER_PAGE,
      tableHeaders: [
        {
          key: 'choice',
          label: '',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'order_number',
          label: '発注番号',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'order_date',
          label: '発注年月日',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'supplier_code',
          label: '仕入先コード',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'supplier_name',
          label: '仕入先名',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'order_status',
          label: '発注状態',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        }
      ],
      currentFilterTemplate: { searchConditions: {} }
    }
  },
  methods: {
    openOrderInquiryDetail(orderInquiry) {
      if (orderInquiry) {
        this.$refs.orderInquiryDetail.show(orderInquiry)
      }
    },
    onClickSearchAdvanceFilter: function() {
      console.log('Click search')
    },
    onClickClearAdvanceFilter: function() {
      console.log('Click clear')
    },
    findItemNumber: function() {
      console.log('Click findItemNumber')
    },
    onClickEditOrderInquiry(orderInquiry, targetProduct) {
      this.$refs.orderInquiryEditModal.show(orderInquiry, targetProduct)
    },
    onFinishedEditOrder(order) {
      this.$refs.orderInquiryDetail.dismiss()
      this.$refs.commonAlert.show(
        '発注番号「' + order.order_number + '」を修正しました。'
      )
    },
    onPaymentScheduleRegistration() {
      console.log('payment schedule registration')
      this.$refs.paymentRegistrationModal.show()
    },
    radioChanged(item) {
      this.chooseItem = item
    }
  }
}
</script>

<style scoped>
.lb-subtitle {
  display: inline-flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  right: 0.6em;
  top: 0;
}
</style>
