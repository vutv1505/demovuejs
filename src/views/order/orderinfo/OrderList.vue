<template>
  <div class="body-container">
    <div class="d-flex justify-content-center">
      <CommonAlert
        ref="commonAlert"
        class="position-absolute w-50"
      ></CommonAlert>
    </div>

    <common-table-filter-layout
      class="mt-2"
      page-title="発注計画"
      page-id="order-list"
      :current-filter-template="currentFilterTemplate"
      :right-buttons="[
        { text: '更新', clickEvent: showOrderInformationDetail }
      ]"
      :left-buttons="[{ text: '全選択/解除', clickEvent: selectDeselectAll }]"
      pagination
      :table-items="tableItems"
      :table-headers="tableHeaders"
      :is-loading="isLoading"
      :items-per-page="itemsPerPage"
    >
      <template #setting-items>
        <CDropdownItem>更新</CDropdownItem>
      </template>
      <template #advance-filter-body>
        <CForm>
          <CInput
            :horizontal="{ label: 'col-sm-5', input: 'col-sm-7' }"
            label="発注年月"
          />
          <CInput
            :horizontal="{ label: 'col-sm-5', input: 'col-sm-7' }"
            label="発注期"
          />
          <CInput
            :horizontal="{ label: 'col-sm-5', input: 'col-sm-7' }"
            label="商品番号"
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
            label="MK商品コード"
          />

          <div class="form-group form-row">
            <label class="col-form-label col-sm-5">発発注予定日</label>
            <div class="col-sm-7 text-center">
              <input type="date" class="form-control" />
              ～
              <input type="date" class="form-control" />
            </div>
          </div>

          <div class="form-group form-row">
            <label class="col-form-label col-sm-5">納品予定日</label>
            <div class="col-sm-7 text-center">
              <input type="date" class="form-control" />
              ～
              <input type="date" class="form-control" placeholder="" />
            </div>
          </div>

          <CSelect
            :horizontal="{ label: 'col-sm-5', input: 'col-sm-7' }"
            label="表示順選択"
            placeholder="-- 未選択 --"
            :options="['発注予定順', '納品予定順']"
          />
        </CForm>
      </template>
      <template #select-header>
        <input
          type="checkbox"
          name="orderCheckboxAll"
          :value="-1"
          v-model="selectAll"
          @click="selectDeselectAll"
        />
      </template>
      <template #schedule_order_period-header>
        <div>発注予定 <br />（年月）</div>
      </template>
      <template #schedule_order_date-header>
        <div>発注予定 <br />（期）</div>
      </template>
      <template #start_delivery_date-header>
        <div>初回納品 <br />予定日</div>
      </template>
      <template #select="{index}">
        <td class="text-center border-bottom">
          <input
            type="checkbox"
            name="chooseOrderItemCheckbox"
            :value="index"
          />
        </td>
      </template>
      <template #order_target_status="{item}">
        <td class="text-center border-bottom">
          <span v-if="item.order_target_status === 1">〇</span>
          <span v-else-if="item.order_target_status === 2">⬤</span>
        </td>
      </template>
    </common-table-filter-layout>

    <OrderInformationDetail
      ref="modalOrderDetail"
      @onChangeOrderInformation="onChangeOrderInformation"
    ></OrderInformationDetail>
  </div>
</template>

<script>
import MOCK_ORDERS_DATA from '../../../assets/mockdata/orders'
import OrderInformationDetail from './OrderDetailModal'
import CommonAlert from '../../../components/alert/CommonAlert'
import CommonTableFilterLayout from '../../../components/layouts/CommonTableFilterLayout'

const ITEM_PER_PAGE = 15

export default {
  name: 'OrderList',
  components: {
    CommonTableFilterLayout,
    OrderInformationDetail,
    CommonAlert
  },
  data() {
    return {
      isLoading: false,
      tableItems: MOCK_ORDERS_DATA,
      itemsPerPage: ITEM_PER_PAGE,
      selectAll: false,
      tableHeaders: [
        {
          key: 'select',
          label: '',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'order_target_status',
          label: '発注対象',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'item_number',
          label: '商品番号',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'product_name',
          label: '商品名',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'product_classification',
          label: '取扱製品区分',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'schedule_order_period',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'schedule_order_date',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'start_delivery_date',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        }
      ],
      currentFilterTemplate: { searchConditions: {} }
    }
  },
  methods: {
    onClickSearchAdvanceFilter() {},
    showOrderInformationDetail() {
      this.$refs.modalOrderDetail.showModal()
    },
    onChangeOrderInformation(orderInformation) {
      // TODO write logic for change order information
      this.$refs.commonAlert.show('発注計画を更新しました。') // Success Alert
      // this.$refs.commonAlert.showError("更新処理に失敗しました。"); // Fail Alert
    },
    findItemNumber() {
      console.log('find item number')
    },
    selectDeselectAll() {
      this.selectAll = !this.selectAll
      const checkboxes = document.getElementsByName('chooseOrderItemCheckbox')
      for (const checkbox of checkboxes) {
        checkbox.checked = this.selectAll
      }
    }
  }
}
</script>

<style scoped>
.lb-subtitle {
  display: inline-flex;
  align-items: center;
}

.h-fit-content {
  height: fit-content;
}

.input-icon {
  position: absolute;
  right: 0.6em;
  top: 0;
}
</style>
