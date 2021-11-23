<template>
  <CModal
    :show.sync="isShow"
    :closeOnBackdrop="false"
    :centered="true"
    size="xl"
  >
    <template #header-wrapper>
      <div class="w-100 h-100 header-container modal-border">
        <h6 class="text-center m-auto font-weight-bold">発注情報詳細</h6>
      </div>
    </template>
    <template #body-wrapper>
      <c-scrollbar class="modal-body modal-border-left modal-border-right">
        <div class="body-item-header font-weight-bold">発注情報</div>
        <div class="px-3 py-1">
          <CRow class="px-3 pb-1">
            <div class="col-sm">
              発注番号 ：{{ orderInformation.order_number }}
            </div>
            <div class="col-sm">
              ○○番号 ：{{ orderInformation.order_number_new_system }}
            </div>
          </CRow>
        </div>

        <div class="body-item-header font-weight-bold">発注情報詳細</div>
        <div class="px-3 py-1">
          <CRow class="px-3">
            <CInput
              class="col-sm-3 mb-2 label-field-no-wrap"
              disabled
              vertical
              :addLabelClasses="'mb-1'"
              :addInputClasses="'border-dark'"
              label="仕入先"
              :value="
                orderInformation.supplier_code +
                  ' : ' +
                  orderInformation.supplier_name
              "
            />
            <CInput
              class="col-sm-3 mb-2 label-field-no-wrap"
              vertical
              disabled
              :addLabelClasses="'mb-1'"
              :addInputClasses="'border-dark'"
              label="発注状態"
              :value="orderInformation.order_status"
            />
            <CInput
              class="col-sm-3 mb-2 label-field-no-wrap"
              vertical
              disabled
              :addLabelClasses="'mb-1'"
              :addInputClasses="'border-dark'"
              label="発注年月日"
              :value="orderInformation.order_date"
            />
            <CInput
              class="col-sm-3 mb-2 label-field-no-wrap"
              vertical
              disabled
              :addLabelClasses="'mb-1'"
              :addInputClasses="'border-dark'"
              label="オルビス担当者"
              :value="orderInformation.orbit_pic"
            />
          </CRow>
          <CRow class="px-3">
            <CInput
              class="col-sm-4 mb-2 label-field-no-wrap"
              disabled
              vertical
              :addLabelClasses="'mb-1'"
              :addInputClasses="'border-dark'"
              label="発注方法"
              :value="orderInformation.order_method"
            />
            <CInput
              class="col-sm-8 mb-2 label-field-no-wrap"
              disabled
              vertical
              :addLabelClasses="'mb-1'"
              :addInputClasses="'border-dark'"
              label="メールアドレス"
              :value="orderInformation.email"
            />
          </CRow>
          <CRow class="px-3">
            <CInput
              class="col-sm-12 mb-2 label-field-no-wrap"
              disabled
              vertical
              :addLabelClasses="'mb-1'"
              :addInputClasses="'border-dark'"
              label="仕入先への通知メモ"
              :value="orderInformation.note_for_supplier"
            />
          </CRow>
          <CRow class="px-3">
            <CInput
              class="col-sm-12 mb-2 label-field-no-wrap"
              disabled
              vertical
              :addLabelClasses="'mb-1'"
              :addInputClasses="'border-dark'"
              label="仕入先確認メモ"
              :value="orderInformation.supplier_confirm_note"
            />
          </CRow>
        </div>
        <common-table-filter-layout
          searchGroupSize="sm"
          vertical-scroll
          horizontal-scroll
          :hasActionAdvanceFilter="false"
          :table-items="tableItems"
          :table-headers="tableHeaders"
          :tableResponsive="false"
          :is-loading="isLoading"
          :right-buttons="[{ text: '修正', clickEvent: onClickEdit }]"
        >
          <template #setting-items>
            <CDropdownItem>修正</CDropdownItem>
            <CDropdownItem>詳細</CDropdownItem>
          </template>
          <template #select="{ index, item }">
            <td class="col-w-0 text-center">
              <input
                type="radio"
                name="chooseProductRadio"
                :value="index"
                :checked="item === chooseProduct"
                v-on:change="radioChanged(item)"
              />
            </td>
          </template>
          <template #quantity_of_orders="{ item }">
            <td>
              {{ item.quantity_of_orders | number }}
            </td>
          </template>
          <template #items_per_package="{ item }">
            <td>
              {{ item.items_per_package | number }}
            </td>
          </template>
          <template #total_amount="{ item }">
            <td>
              {{ item.total_amount | number }}
            </td>
          </template>
          <template #unit_price="{ item }">
            <td>
              {{ parseFloat(item.unit_price).toFixed(2) }}
            </td>
          </template>
          <template #case="{ item }">
            <td>
              {{
                Math.floor(item.quantity_of_orders / item.items_per_package)
                  | number
              }}
            </td>
          </template>
          <template #bara="{ item }">
            <td>
              {{
                Math.floor(item.quantity_of_orders % item.items_per_package)
                  | number
              }}
            </td>
          </template>
        </common-table-filter-layout>
      </c-scrollbar>
    </template>
    <template #footer-wrapper>
      <div class="modal-footer footer-container modal-border p-1">
        <CButton
          size="sm"
          color="outline-info"
          v-on:click="dismiss"
          class="modal-btn"
          >閉じる
        </CButton>
        <CButton size="sm" color="outline-info">１つ前の履歴を表示</CButton>
        <CButton size="sm" color="outline-info">１つ後の履歴を表示</CButton>
      </div>
    </template>
  </CModal>
</template>

<script>
import ORDER_INQUIRY_PRODUCTS from '../../../assets/mockdata/order_inquiry_detail'
import CommonTableFilterLayout from '../../../components/layouts/CommonTableFilterLayout'
import _ from 'lodash'

export default {
  name: 'OrderInquiryDetail',
  components: { CommonTableFilterLayout },
  data() {
    return {
      isShow: false,
      isLoading: false,
      chooseProduct: null,
      orderInformation: {},
      tableItems: ORDER_INQUIRY_PRODUCTS,
      tableHeaders: [
        {
          key: 'select',
          label: '',
          _style: 'text-align: center;',
          _classes: 'col-w-0 text-center col-first'
        },
        {
          key: 'product_code',
          label: '商品番号',
          _style: 'text-align: center;',
          _classes: 'col-w-3'
        },
        {
          key: 'mk_code',
          label: 'MK商品コード',
          _style: 'text-align: center;',
          _classes: 'col-w-3'
        },
        {
          key: 'product_name',
          label: '商品名',
          _style: 'text-align: center;',
          _classes: 'col-w-4'
        },
        {
          key: 'product_type',
          label: '取扱製品区分',
          _style: 'text-align: center;',
          _classes: 'col-w-3'
        },
        {
          key: 'quantity_of_orders',
          label: '発注数',
          _style: 'text-align: center;',
          _classes: 'col-w-3'
        },
        {
          key: 'case',
          label: 'ケース',
          _style: 'text-align: center;',
          _classes: 'col-w-1'
        },
        {
          key: 'items_per_package',
          label: '入目',
          _style: 'text-align: center;',
          _classes: 'col-w-1'
        },
        {
          key: 'bara',
          label: 'バラ',
          _style: 'text-align: center;',
          _classes: 'col-w-1'
        },
        {
          key: 'unit_price',
          label: '単価',
          _style: 'text-align: center;',
          _classes: 'col-w-2'
        },
        {
          key: 'total_amount',
          label: '金額',
          _style: 'text-align: center;',
          _classes: 'col-w-2'
        },
        {
          key: 'unit_price_setting',
          label: '単価設定',
          _style: 'text-align: center;',
          _classes: 'col-w-3'
        },
        {
          key: 'in_stock_status',
          label: '入荷状態',
          _style: 'text-align: center;',
          _classes: 'col-w-3'
        },
        {
          key: 'delivery_date_plan',
          label: '納品予定日',
          _style: 'text-align: center;',
          _classes: 'col-w-3'
        },
        {
          key: 'warehouse',
          label: '倉庫',
          _style: 'text-align: center;',
          _classes: 'col-w-3'
        }
      ]
    }
  },
  methods: {
    show(orderInquiry) {
      this.orderInformation = orderInquiry
      // TODO Get detail order information inquiry
      this.tableItems = ORDER_INQUIRY_PRODUCTS
      this.isShow = true
    },
    dismiss() {
      this.chooseProduct = null
      this.isShow = false
    },
    radioChanged(item) {
      this.chooseProduct = item
    },
    onClickEdit() {
      if (this.chooseProduct)
        this.$emit(
          'showOrderInquiryEdit',
          _.cloneDeep(this.orderInformation),
          _.cloneDeep(this.chooseProduct)
        )
    }
  }
}
</script>

<style scoped>
>>> .table-container {
  height: 27vh !important;
}
</style>
