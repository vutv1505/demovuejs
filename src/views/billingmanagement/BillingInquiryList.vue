<template>
  <div>
    <div class="d-flex justify-content-center">
      <common-alert
        ref="commonAlert"
        class="position-absolute w-50 z-index-9999"
      ></common-alert>
    </div>
    <confirm-modal ref="confirmModal" />
    <common-table-filter-layout
      ref="tableFilterLayout"
      page-title="請求情報照会"
      page-id="OPOS-Billing-Inquiry"
      class="px-3"
      pagination
      :table-items="computedTableItems"
      :table-headers="tableHeaders"
      :is-loading="isLoading"
      :items-per-page="itemsPerPage"
      :right-buttons="[
        { text: '入荷締め', clickEvent: onClickSetClosing },
        { text: '入荷締め取消', clickEvent: onClickCancelClosing },
        { text: '請求情報更新', clickEvent: openBillingEditModal },
        { text: 'showModel', clickEvent: showModalInfomationDetail }
      ]"
      :left-buttons="[{ text: '全選択/解除', clickEvent: reverseSelectAll }]"
      @onClickSearchAdvance="onClickSearchAdvance"
      @onClickClearAdvance="onClickClearAdvance"
      @onSelectedFilterTemplate="onSelectedFilterTemplate"
      @onClickActionReload="onActionReload"
      @update:activePage="clearSelect"
      :current-filter-template="currentFilterTemplate"
    >
      <template #setting-items>
        <CDropdownItem @click="onClickSetClosing"> 入荷締め</CDropdownItem>
        <CDropdownItem @click="onClickCancelClosing">
          入荷締め取消
        </CDropdownItem>
        <CDropdownItem @click="openBillingEditModal">
          請求情報詳細(更新)
        </CDropdownItem>
      </template>
      <template #advance-filter-body>
        <CForm>
          <validation-provider
            name="仕入先コード"
            :rules="{ numberRequiredLength: 6 }"
            v-slot="{ errors }"
          >
            <CInput
              :horizontal="{ label: 'col-sm-5', input: 'col-sm-7' }"
              addInputClasses="pr-5"
              label="仕入先コード"
              type="number"
              max="999999"
              v-model="currentFilterTemplate.searchConditions.supplierCode"
            >
              <template #label-after-input>
                <CButton
                  size="sm"
                  variant="ghost"
                  class="input-icon"
                  @click="showSearchSupplier"
                >
                  <CIcon name="cil-find-in-page" />
                </CButton>
              </template>
              <template #invalid-feedback>
                <span class="valid-msg-area fm-font-standard mt-1 mb-1">
                  {{ errors[0] }}
                </span>
              </template>
            </CInput>
          </validation-provider>

          <div class="form-group form-row">
            <label class="col-form-label col-sm-5">仕入先名</label>
            <div class="col-sm-7">
              <input
                type="text"
                maxlength="32"
                class="form-control"
                v-model="
                  currentFilterTemplate.searchConditions.supplierNameKanji
                "
              />
            </div>
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5">請求対象年月</label>
            <div class="col-sm-7">
              <date-time-picker
                class="inside-dropdown"
                param-mode="yearMonth"
                placeholder="yyyy/mm"
                v-model="
                  currentFilterTemplate.searchConditions.paymentBillingYyMm
                "
              />
            </div>
          </div>

          <CSelect
            :horizontal="{ label: 'col-sm-5', input: 'col-sm-7' }"
            label="商品分野"
            placeholder="-- 未選択 --"
            :options="productFieldCondition"
            :value.sync="currentFilterTemplate.searchConditions.productField"
          />
          <div class="form-group form-row">
            <label class="col-sm-5">請求情報照合状態</label>
            <div class="col-sm-7 pl-4">
              <CRow
                v-for="(billingStatusOption, idx) in billingVerificationStatus"
                :key="idx"
              >
                <CInputCheckbox
                  class="col-sm text-left pb-2"
                  :label="billingStatusOption.label"
                  :value="billingStatusOption.value"
                  name="cbBillingVerificationStatus"
                />
              </CRow>
            </div>
          </div>
        </CForm>
      </template>
      <template #select="{index}">
        <td class="text-center">
          <input
            type="checkbox"
            name="cbSelectBilling"
            @change="onChange"
            :value="index"
          />
        </td>
      </template>
      <template #pretaxBillingAmount="{item}">
        <td class="text-right">{{ item.pretaxBillingAmount }}</td>
      </template>
      <template #taxincludedBillingAmount="{item}">
        <td class="text-right">{{ item.taxincludedBillingAmount }}</td>
      </template>
    </common-table-filter-layout>
    <search-supplier-modal
      ref="searchSupplierModal"
      :on-choose-item="onChooseSupplier"
      @dismiss="onDismissSearchProperties"
    />
    <billing-edit-modal
      ref="billingEditModal"
      @showCommonAlert="showCommonAlert"
    />
    <billing-add-modal
      ref="billingAddModal"
    />
  </div>
</template>

<script>
import CommonTableFilterLayout from '@/components/layouts/CommonTableFilterLayout'
import { ValidationProvider } from 'vee-validate'
import { numberFormat } from '@/lib/format'
import SearchSupplierModal from '@/components/modals/SearchSupplierModal'
import CommonAlert from '@/components/alert/CommonAlert'
import ConfirmModal from '@/components/modals/ConfirmModal'
import BillingService from '@/api/billing.service'
import BillingEditModal from './BillingEditModal'
import _ from 'lodash'
import MasterDataService from '@/api/master-data.service'
import { MD_BILLING_ITEM_MANAGED } from '@/api/master-data-category-code'
import DateTimePicker from '@/components/customInput/DateTimePicker'
import BillingAddModal from './BillingAddModal'

const ITEMS_PER_PAGE = 15

export default {
  name: 'BillingInquiryList',
  components: {
    DateTimePicker,
    BillingEditModal,
    ConfirmModal,
    CommonAlert,
    SearchSupplierModal,
    CommonTableFilterLayout,
    ValidationProvider,
    BillingAddModal
  },
  data() {
    return {
      itemsPerPage: ITEMS_PER_PAGE,
      isLoading: false,
      disableBtnUpdate: false,
      currentFilterTemplate: { searchConditions: {} },
      tableItems: [],
      tableHeaders: [
        {
          key: 'select',
          label: '更新対象',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center; width:7%'
        },
        {
          key: 'supplierNameKanji',
          label: '仕入先名',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center; width:25%'
        },
        {
          key: 'paymentBillingYyMm',
          label: '請求対象年月',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'productAreasCode',
          label: '商品分野',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'billingMatchConditionDivision',
          label: '請求情報照合状態',
          _style: 'border: 1px solid; border-color: #d8dbe0; text-align: center'
        },
        {
          key: 'pretaxBillingAmount',
          label: '請求金額(税抜)',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'taxincludedBillingAmount',
          label: '請求金額(税込)',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        }
      ],
      productFieldCondition: [],
      transport: [{ label: '国内', value: 0 }, { label: '海外', value: 1 }],
      billingVerificationStatus: [
        { label: '入荷締め前', value: 0 },
        { label: '請求情報照合中', value: 1 },
        { label: '請求情報不一致', value: 2 },
        { label: '請求情報照合済', value: 3 },
        { label: '請求情報確定', value: 4 }
      ],
      transportDomestic: true,
      transportAbroad: true,
      selectAll: false,
      selectedBilling: null
    }
  },
  methods: {
    showModalInfomationDetail() {
      this.$refs.billingAddModal.showModal()
    },
    openBillingEditModal() {
      const selectedBillings = this.getBillingSelectedArr()
      if (selectedBillings.length === 0) {
        this.$refs.commonAlert.showError(`更新対象を選択して下さい。`)
      } else if (selectedBillings.length === 1) {
        this.$refs.billingEditModal.show(
          _.cloneDeep(this.tableItems[selectedBillings[0].value])
        )
      } else {
        this.$refs.commonAlert.showError(
          `請求情報更新を行う場合、更新対象レコードの複数選択はできません。`
        )
      }
    },
    onChange() {
      const selectedBillings = this.getBillingSelectedArr()
      let disableBtnUpdate = false
      selectedBillings.forEach(item => {
        let tableItem = this.tableItems[item.value]
        if (tableItem.billingMatchConditionDivision.trim() === '') {
          disableBtnUpdate = true
        }
      })
      document.querySelectorAll('.btn-menu').forEach(item => {
        if (item.textContent.trim() === '入荷締め前') {
          item.setAttribute('disabled', 'true')
        }
      })
      document.querySelectorAll('.btn-menu').forEach(item => {
        if (item.textContent.trim() === '請求情報更新') {
          if (disableBtnUpdate) {
            item.setAttribute('disabled', 'true')
          } else {
            item.removeAttribute('disabled')
          }
        }
      })
    },
    reverseSelectAll() {
      this.selectAll = !this.selectAll
      const checkBoxes = document.getElementsByName('cbSelectBilling')
      for (let checkBox of checkBoxes) {
        checkBox.checked = this.selectAll
      }
    },
    clearSelect() {
      this.selectAll = true
      this.reverseSelectAll()
    },
    onClickSearchAdvance() {
      this.searchCriteria()
    },
    onClickClearAdvance() {
      this.currentFilterTemplate = { searchConditions: {} }
    },
    onSelectedFilterTemplate(selectedTemplate) {
      this.currentFilterTemplate = selectedTemplate
    },
    onShowSearchProperties() {
      this.$refs.tableFilterLayout.setKeepShowingAdvanceFilter(true)
    },
    onDismissSearchProperties() {
      this.$refs.tableFilterLayout.setKeepShowingAdvanceFilter(false)
    },
    showSearchSupplier() {
      this.onShowSearchProperties()
      this.$refs.searchSupplierModal.show()
    },
    onChooseSupplier(supplier) {
      this.currentFilterTemplate.searchConditions.supplierCode =
        supplier.supplier_code
    },
    getBillingSelectedArr() {
      return document.querySelectorAll('input[name="cbSelectBilling"]:checked')
    },
    onClickSetClosing() {
      const billingCheckedList = this.getBillingSelectedArr()
      if (billingCheckedList.length === 0) {
        this.$refs.commonAlert.showError(`更新対象を選択して下さい。`)
      } else
        this.$refs.confirmModal.show(
          '入荷締め更新',
          '入荷締めを行います。',
          this.processSetClosing
        )
    },
    onClickCancelClosing() {
      this.$refs.confirmModal.show(
        '入荷締め取消',
        '入荷締めを取消します。',
        this.processCancelClosing
      )
    },
    processSetClosing() {
      console.log('SetClosing...')
    },
    processCancelClosing() {
      console.log('CancelClosing...')
    },
    showCommonAlert(payload) {
      if (payload.isSuccess) {
        this.$refs.commonAlert.show(payload.message)
      } else {
        this.$refs.commonAlert.showError(payload.message)
      }
    },
    loadBillingList() {
      this.isLoading = true
      BillingService.getList()
        .then(({ data }) => {
          this.tableItems = data
        })
        .catch(error => {
          this.$refs.commonAlert.showError(`エラー: ${error}`)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    searchCriteria() {
      const body = _.cloneDeep(this.currentFilterTemplate.searchConditions)
      this.isLoading = true
      BillingService.search(body)
        .then(({ data }) => {
          this.tableItems = data
        })
        .catch(error => {
          this.$refs.commonAlert.show(`エラー: ${error}`)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    onActionReload() {
      this.searchCriteria()
    },
    prepareMasterData() {
      // Get master data for productFieldCondition
      MasterDataService.getCategoryItems(MD_BILLING_ITEM_MANAGED)
        .then(({ data }) => {
          this.productFieldCondition = _.sortBy(data, ['displayorder']).map(
            item => {
              return { label: item.divisionName, value: item.divisionCode }
            }
          )
        })
        .catch(error => {})
    }
  },
  computed: {
    computedTableItems() {
      return this.tableItems.map((item, index) => {
        item.originIndex = index
        if (item.billingMatchConditionDivision.trim() === '入荷締め前') {
          item.pretaxBillingAmount = ''
          item.taxincludedBillingAmount = ''
        } else {
          item.pretaxBillingAmount = numberFormat(item.pretaxBillingAmount)
          item.taxincludedBillingAmount = numberFormat(
            item.taxincludedBillingAmount
          )
        }
        return item
      })
    }
  },
  created() {
    this.loadBillingList()
    this.prepareMasterData()
  }
}
</script>

<style scoped></style>
