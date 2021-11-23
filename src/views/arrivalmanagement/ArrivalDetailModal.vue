<template>
  <div>
    <CModal
      :show.sync="isShow"
      :centered="true"
      size="xl"
      :closeOnBackdrop="false"
      class="position-relative"
    >
      <template #header-wrapper>
        <div class="w-100 header-container modal-border">
          <h6 class="text-center m-auto font-weight-bold">入荷情報詳細</h6>
        </div>
      </template>
      <template #body-wrapper>
        <div class="d-flex justify-content-center">
          <common-alert
            ref="commonAlert"
            class="z-index-9999 position-absolute w-50"
          />
        </div>
        <c-scrollbar
          class="modal-body modal-border-left modal-border-right"
          v-if="arrivalDetail"
          v-loading="isLoading"
        >
          <div class="body-item-header font-weight-bold">入荷情報</div>
          <CRow class="px-3 py-2">
            <div class="col-sm">
              OPOS発注番号 ：{{ arrivalDetail.orderNumber }}
            </div>
            <div class="col-sm">
              FORCE発注番号 ： {{ arrivalDetail.orderNumber }}
            </div>
          </CRow>
          <CRow class="px-3 py-2">
            <div class="col-sm">
              仕入先コード ： {{ arrivalDetail.supplierCode }}
            </div>
            <div class="col-sm">
              仕入先名 ： {{ arrivalDetail.supplierName }}
            </div>
          </CRow>
          <CRow class="px-3 py-2">
            <div class="col-sm">
              商品番号 ： {{ arrivalDetail.productCode }}
            </div>
            <div class="col-sm">商品名 ： {{ arrivalDetail.productName }}</div>
          </CRow>
          <div class="body-item-header font-weight-bold">入荷情報詳細</div>
          <div class="pt-4" v-loading-spinner="isTableLoading">
            <common-table-filter-layout
              page-id="OPOS-Purchase-Detail"
              class="py-2"
              searchGroupSize="sm"
              horizontal-scroll
              vertical-scroll
              :hasActionAdvanceFilter="false"
              :table-items="tableItems"
              :table-headers="tableHeaders"
              :tableResponsive="false"
              :right-buttons="[
                { text: '修正', clickEvent: editArrivalHistory }
              ]"
              @onClickActionReload="searchCriteria"
            >
              <template #setting-items>
                <CDropdownItem @click="editArrivalHistory">修正</CDropdownItem>
              </template>
              <template #choice="{item}">
                <td class="text-center">
                  <input
                    type="radio"
                    name="arrivalInformationHistoryRadio"
                    :checked="itemSelected === item"
                    @change="itemSelected = item"
                  />
                </td>
              </template>
              <template #orderNumber="{item}">
                <td class="text-right">{{ item.orderNumber | number }}</td>
              </template>
              <template #quantityPerCarton="{item}">
                <td class="text-right">
                  {{ item.quantityPerCarton | number }}
                </td>
              </template>
              <template #caseQuantity="{item}">
                <td class="text-right">{{ item.caseQuantity | number }}</td>
              </template>
              <template #bugQuantity="{item}">
                <td class="text-right">{{ item.bugQuantity | number }}</td>
              </template>
              <template #purchaseScheduleQuantity="{item}">
                <td class="text-right">
                  {{ item.purchaseScheduleQuantity | number }}
                </td>
              </template>
              <template #purchaseQuantity="{item}">
                <td class="text-right">
                  {{ item.purchaseQuantity | number }}
                </td>
              </template>
            </common-table-filter-layout>
          </div>
        </c-scrollbar>
      </template>
      <template #footer-wrapper>
        <div class="modal-footer footer-container modal-border">
          <CButton class="btn-sm modal-btn btn-outline-info" @click="dismiss"
            >閉じる
          </CButton>
        </div>
      </template>
    </CModal>

    <arrival-edit-modal
      ref="arrivalEditModal"
      @showCommonAlert="showCommonAlert"
    ></arrival-edit-modal>
  </div>
</template>

<script>
import CommonTableFilterLayout from '../../components/layouts/CommonTableFilterLayout'
import ArrivalEditModal from './ArrivalEditModal'
import _ from 'lodash'
import { DatePattern, formatDate } from '@/lib/DateUtils'
import PurchaseService from '../../api/purchase.service'
import CommonAlert from '../../components/alert/CommonAlert'

export default {
  name: 'ArrivalDetailModal',
  components: { ArrivalEditModal, CommonTableFilterLayout, CommonAlert },
  data() {
    return {
      isShow: false,
      arrivalDetail: null,
      isLoading: false,
      isTableLoading: false,
      itemSelected: null,
      tableItems: [],
      tableHeaders: [
        {
          key: 'choice',
          label: '',
          _style: 'text-align: center;',
          _classes: 'col-w-0 text-center col-first'
        },
        {
          key: 'purchaseScheduleDate',
          label: '入荷予定日',
          _style: 'text-align: center;',
          _classes: 'col-w-2'
        },
        {
          key: 'deliveryScheduleDate',
          label: '納品予定日',
          _style: 'text-align: center;',
          _classes: 'col-w-2'
        },
        {
          key: 'purchaseDate',
          label: '入出庫日',
          _style: 'text-align: center;',
          _classes: 'col-w-2'
        },
        {
          key: 'purchaseScheduleQuantity',
          label: '入荷予定数',
          _style: 'text-align: center;',
          _classes: 'col-w-1'
        },
        {
          key: 'purchaseQuantity',
          label: '入出庫数',
          _style: 'text-align: center;',
          _classes: 'col-w-1'
        },
        {
          key: 'quantityPerCarton',
          label: '入目',
          _style: 'text-align: center;',
          _classes: 'col-w-1'
        },
        {
          key: 'caseQuantity',
          label: 'ケース',
          _style: 'text-align: center;',
          _classes: 'col-w-1'
        },
        {
          key: 'bugQuantity',
          label: 'バラ数',
          _style: 'text-align: center;',
          _classes: 'col-w-1'
        },
        {
          key: 'purchaseConditionDivision',
          label: '入荷状態',
          _style: 'text-align: center;',
          _classes: 'col-w-2'
        },
        {
          key: 'tradingDivision',
          label: '取引区分',
          _style: 'text-align: center;',
          _classes: 'col-w-2'
        },
        {
          key: 'deliveryToName',
          label: '納品先名',
          _style: 'text-align: center;',
          _classes: 'col-w-2'
        },
        {
          key: 'warehouseCode',
          label: '倉庫コード',
          _style: 'text-align: center;',
          _classes: 'col-w-2'
        },
        {
          key: 'mkMakeCode',
          label: 'MK製造記号',
          _style: 'text-align: center;',
          _classes: 'col-w-2'
        },
        {
          key: 'fillingDate',
          label: '充填日',
          _style: 'text-align: center;',
          _classes: 'col-w-2'
        },
        {
          key: 'makeDate',
          label: '製造日',
          _style: 'text-align: center;',
          _classes: 'col-w-2'
        },
        {
          key: 'useDeadline',
          label: '使用期限',
          _style: 'text-align: center;',
          _classes: 'col-w-2'
        },
        {
          key: 'lotNumber',
          label: 'ロット番号',
          _style: 'text-align: center;',
          _classes: 'col-w-2'
        }
      ]
    }
  },
  methods: {
    formatTableItems(data) {
      return data.map((item, index) => {
        item.useDeadline = formatDate(item.useDeadline, DatePattern.YYYY_MM_DD)
        item.makeDate = formatDate(item.makeDate, DatePattern.YYYY_MM_DD)
        item.fillingDate = formatDate(item.fillingDate, DatePattern.YYYY_MM_DD)
        item.purchaseDate = formatDate(
          item.purchaseDate,
          DatePattern.YYYY_MM_DD
        )
        item.deliveryScheduleDate = formatDate(
          item.deliveryScheduleDate,
          DatePattern.YYYY_MM_DD
        )
        item.purchaseScheduleDate = formatDate(
          item.purchaseScheduleDate,
          DatePattern.YYYY_MM_DD
        )

        item.fillingDate = formatDate(item.fillingDate, DatePattern.YYYY_MM_DD)
        item.makeDate = formatDate(item.makeDate, DatePattern.YYYY_MM_DD)
        item.bugQuantity =
          item.purchaseScheduleQuantity % item.quantityPerCarton
        item.caseQuantity =
          (item.purchaseScheduleQuantity - item.bugQuantity) /
          item.quantityPerCarton

        return item
      })
    },
    searchCriteria() {
      this.isTableLoading = true
      PurchaseService.search({
        orderNumber: this.arrivalDetail.orderNumber
      })
        .then(({ data }) => {
          this.tableItems = this.formatTableItems(data)
        })
        .catch(error => {
          this.tableItems = this.formatTableItems([])
          this.$refs.commonAlert.showError(`エラー: ${error}`)
        })
        .finally(() => {
          this.isTableLoading = false
        })
    },
    getByArrivalId(purchaseScheduleNumber, supplierCode) {
      this.isLoading = true
      PurchaseService.getByArrivalId(purchaseScheduleNumber, supplierCode)
        .then(({ data }) => {
          this.isLoading = false
          this.arrivalDetail = data
        })
        .catch(error => {
          this.isLoading = false
          this.$refs.commonAlert.showError(`エラー: ${error}`)
        })
    },
    show(item) {
      this.isShow = true
      this.arrivalDetail = item
      this.searchCriteria()
      this.getByArrivalId(item.purchaseScheduleNumber, item.supplierCode)
    },
    dismiss() {
      this.isShow = false
      this.itemSelected = null
    },
    editArrivalHistory() {
      if (this.itemSelected) {
        this.$refs.arrivalEditModal.show(_.cloneDeep(this.itemSelected))
      }
    },
    showCommonAlert(payload) {
      this.$emit('showCommonAlert', payload)
      this.dismiss()
    }
  }
}
</script>
<style scoped>
>>> .table-container {
  height: 25em !important;
}
</style>
