<template>
  <c-modal
    :show.sync="showModal"
    :closeOnBackdrop="false"
    :centered="true"
    size="xl"
  >
    <template #header-wrapper>
      <div class="w-100 header-container modal-border">
        <h6 class="text-center m-auto font-weight-bold">
          OPOS発注番号検索
        </h6>
      </div>
    </template>
    <template #body-wrapper>
      <c-scrollbar
        class="modal-body  modal-border-left modal-border-right
         modal-border-bottom modal-border-bottom-left-radius
          modal-border-bottom-right-radius"
        style="display: grid"
      >
        <common-table-filter-layout
          class="pb-5 position-relative"
          page-title="OPOS発注番号一覧"
          page-id="OPOS-Purchase-ScheduleRegistration-OrderNumberSearch"
          :current-filter-template="currentFilterTemplate"
          searchGroupSize="sm"
          pagination
          :items-per-page="itemsPerPage"
          :table-items="computedItems"
          :table-headers="tableHeaders"
          :right-buttons="[
            { text: '選択して戻る', clickEvent: selectThenReturn },
            { text: 'キャンセル', clickEvent: dismiss }
          ]"
          :has-action-download="false"
          :has-action-setting="false"
          :is-loading="isLoading"
          @onClickClearAdvance="onClickClearAdvanceFilter"
          @onClickSearchAdvance="onClickSearchAdvanceFilter"
          @onClickActionReload="getOrderList"
        >
          <template #advance-filter-body>
            <CForm>
              <CInput
                :horizontal="{ label: 'col-sm-5', input: 'col-sm-7' }"
                label="仕入先コード"
                addInputClasses="pr-2-rem"
              >
                <template #label-after-input>
                  <CButton size="sm" variant="ghost" class="input-icon">
                    <CIcon name="cil-find-in-page" />
                  </CButton>
                </template>
              </CInput>
              <CInput
                :horizontal="{ label: 'col-sm-5', input: 'col-sm-7' }"
                label="商品番号"
                addInputClasses="pr-2-rem"
              >
                <template #label-after-input>
                  <CButton size="sm" variant="ghost" class="input-icon">
                    <CIcon name="cil-find-in-page" />
                  </CButton>
                </template>
              </CInput>
              <CInput
                :horizontal="{ label: 'col-sm-5', input: 'col-sm-7' }"
                label="商品名"
              />
              <div class="form-group form-row">
                <label class="col-form-label col-sm-5">納品予定日</label>
                <div class="col-sm-7 text-center">
                  <input type="date" class="form-control" />
                  ～
                  <input type="date" class="form-control" />
                </div>
              </div>
              <CInput
                :horizontal="{ label: 'col-sm-5', input: 'col-sm-7' }"
                label="納品先コード"
                addInputClasses="pr-2-rem"
              >
                <template #label-after-input>
                  <CButton size="sm" variant="ghost" class="input-icon">
                    <CIcon name="cil-find-in-page" />
                  </CButton>
                </template>
              </CInput>
            </CForm>
          </template>
          <template #choice="{index}">
            <td class="text-center">
              <input
                type="radio"
                name="chooseOrder"
                :value="index"
                :checked="index === orderSelectedIndex"
                v-model="orderSelectedIndex"
              />
            </td>
          </template>
          <template #deliveryScheduleQuantity="{item}">
            <td class="text-right">
              {{ item.deliveryScheduleQuantity | number }}
            </td>
          </template>
        </common-table-filter-layout>
      </c-scrollbar>
    </template>
    <template #footer-wrapper>
      <div></div
    ></template>
  </c-modal>
</template>

<script>
import CommonTableFilterLayout from '../layouts/CommonTableFilterLayout'
import PurchaseRegistrationService from '../../api/purchase-registration.service'
import { formatDate, DatePattern } from '@/lib/DateUtils'
const ITEM_PER_PAGE = 15
import _ from 'lodash'
import { numberFormat } from '@/lib/format'

export default {
  name: 'SearchOrderModal',
  components: { CommonTableFilterLayout },
  data() {
    return {
      showModal: false,
      itemsPerPage: ITEM_PER_PAGE,
      tableItems: [],
      orderSelectedIndex: null,
      isLoading: false,
      tableHeaders: [
        {
          key: 'choice',
          label: '',
          _style: 'text-align: center; border: 1px solid #727272 '
        },
        {
          key: 'orderNumber',
          label: 'OPOS発注番号',
          _style: 'text-align: center; border: 1px solid #727272 '
        },
        {
          key: 'forceOrderNumber',
          label: 'FORCE発注番号',
          _style: 'text-align: center; border: 1px solid #727272 '
        },
        {
          key: 'productNumber',
          label: '商品番号',
          _style: 'text-align: center; border: 1px solid #727272 '
        },
        {
          key: 'supplierNameKanji',
          label: '仕入先名',
          _style: 'text-align: center; border: 1px solid #727272 '
        },
        {
          key: 'productName',
          label: '商品名',
          _style: 'text-align: center; border: 1px solid #727272 '
        },
        {
          key: 'deliveryScheduleQuantity',
          label: '納品予定数',
          _style: 'text-align: center; border: 1px solid #727272 '
        },
        {
          key: 'deliveryScheduleDate',
          label: '納品予定日',
          _style: 'text-align: center; border: 1px solid #727272 '
        },
        {
          key: 'deliveryToName',
          label: '納品先名',
          _style: 'text-align: center; border: 1px solid #727272 '
        }
      ],
      currentFilterTemplate: { searchConditions: {} },
      computedItems: []
    }
  },
  methods: {
    show() {
      this.showModal = true
      this.getOrderList()
    },
    dismiss() {
      this.showModal = false
    },
    selectThenReturn() {
      if (this.orderSelectedIndex >= 0) {
        this.$emit(
          'order-selected',
          _.cloneDeep(this.tableItems[this.orderSelectedIndex])
        )
        this.dismiss()
      }
    },
    onClickSearchAdvanceFilter() {
      console.log('Click search')
    },
    onClickClearAdvanceFilter() {
      console.log('Click clear')
    },
    getOrderList() {
      this.isLoading = true
      PurchaseRegistrationService.getOrderList()
        .then(({ data }) => {
          this.computedTableItems(data)
        })
        .catch(() => {})
        .finally(() => {
          this.isLoading = false
        })
    },
    computedTableItems(data) {
      this.tableItems = data
      this.computedItems = _.cloneDeep(data).map(item => {
        item.deliveryScheduleDate = formatDate(
          item.deliveryScheduleDate,
          DatePattern.YYYY_MM_DD
        )
        item.deliveryScheduleQuantity = numberFormat(
          item.deliveryScheduleQuantity
        )
        return item
      })
    }
  }
}
</script>

<style scoped>
.modal-body {
  height: 80vh;
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 0;
}
</style>
