<template>
  <div>
    <div class="d-flex justify-content-center">
      <common-alert
        ref="commonAlert"
        class="position-absolute w-50 z-index-9999"
      ></common-alert>
    </div>
    <common-table-filter-layout
      ref="tableFilterLayout"
      page-title="入荷情報照会"
      page-id="OPOS-Purchase-Inquiry"
      class="px-3"
      pagination
      :table-items="computedTableItems"
      :table-headers="tableHeaders"
      :is-loading="isLoading"
      :items-per-page="itemsPerPage"
      :right-buttons="[
        { text: '予定登録', clickEvent: openArrivalScheduleRegistrationModal },
        { text: '複製', clickEvent: openArrivalScheduleDuplicateModal },
        { text: '実績登録', clickEvent: openArrivalRegistrationModal }
      ]"
      @onClickSearchAdvance="onClickSearchAdvance"
      @onClickClearAdvance="onClickClearAdvance"
      @onSelectedFilterTemplate="onSelectedFilterTemplate"
      @onClickActionReload="onActionReload"
      :current-filter-template="currentFilterTemplate"
    >
      <template #setting-items>
        <CDropdownItem @click="openArrivalScheduleDuplicateModal">
          複製</CDropdownItem
        >
        <CDropdownItem @click="openArrivalRegistrationModal">
          実績登録
        </CDropdownItem>
      </template>
      <template #advance-filter-body>
        <CForm>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-4">OPOS発注番号</label>
            <div class="col-sm-8">
              <validation-provider
                name="発注番号"
                :rules="{ numberRequiredLength: 7 }"
                v-slot="{ valid, errors }"
              >
                <input
                  type="number"
                  max="9999999"
                  class="form-control"
                  v-model="currentFilterTemplate.searchConditions.orderNumber"
                />
                <div
                  v-show="!valid"
                  class="valid-msg-area fm-font-standard mt-1 mb-1"
                >
                  {{ errors[0] }}
                </div>
              </validation-provider>
            </div>
          </div>

          <validation-provider
            name="仕入先コード"
            :rules="{ numberRequiredLength: 6 }"
            v-slot="{ valid, errors }"
          >
            <CInput
              :horizontal="{ label: 'col-sm-4', input: 'col-sm-8' }"
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

          <validation-provider
            name="商品番号"
            :rules="{ charRequiredLength: 6 }"
            v-slot="{ valid, errors }"
          >
            <CInput
              :horizontal="{ label: 'col-sm-4', input: 'col-sm-8' }"
              label="商品番号"
              type="text"
              maxlength="6"
              v-model="currentFilterTemplate.searchConditions.productNumber"
            >
              <template #label-after-input>
                <CButton
                  size="sm"
                  variant="ghost"
                  class="input-icon"
                  @click="showSearchProduct"
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
            <label class="col-form-label col-sm-4">商品名</label>
            <div class="col-sm-8">
              <input
                type="text"
                maxlength="32"
                class="form-control"
                v-model="currentFilterTemplate.searchConditions.productName"
              />
            </div>
          </div>

          <div class="form-group form-row">
            <label class="col-form-label col-sm-4">入荷予定日</label>
            <div class="col-sm-8">
              <validation-provider
                rules="sameOrBeforeDate:purchaseScheduleDateEnd|beforeDate6Month:purchaseScheduleDateEnd"
                vid="purchaseScheduleDateStart"
                v-slot="{ valid, errors }"
              >
                <date-time-picker
                  class="inside-dropdown"
                  param-mode="date"
                  placeholder="yyyy/mm/dd"
                  v-model="
                    currentFilterTemplate.searchConditions
                      .purchaseScheduleDateStart
                  "
                  :isValid="errors.length === 0"
                ></date-time-picker>
                <div
                  v-show="!valid"
                  class="valid-msg-area fm-font-standard mt-1 mb-1"
                >
                  {{ errors[0] }}
                </div>
              </validation-provider>
              <div class="text-center">～</div>
              <validation-provider
                vid="purchaseScheduleDateEnd"
                rules="sameOrAfterDate:purchaseScheduleDateStart|afterDate6Month:purchaseScheduleDateStart"
                v-slot="{ valid, errors }"
              >
                <date-time-picker
                  class="inside-dropdown"
                  param-mode="date"
                  placeholder="yyyy/mm/dd"
                  :isValid="errors.length === 0"
                  v-model="
                    currentFilterTemplate.searchConditions
                      .purchaseScheduleDateEnd
                  "
                />
                <div
                  v-show="!valid"
                  class="valid-msg-area fm-font-standard mt-1 mb-1"
                >
                  {{ errors[0] }}
                </div>
              </validation-provider>
            </div>
          </div>

          <div class="form-group form-row">
            <label class="col-form-label col-sm-4">入出庫日</label>
            <div class="col-sm-8 ">
              <validation-provider
                rules="sameOrBeforeDate:purchaseDateEnd|beforeDate6Month:purchaseDateEnd"
                vid="purchaseDateStart"
                v-slot="{ valid, errors }"
              >
                <date-time-picker
                  class="inside-dropdown"
                  param-mode="date"
                  placeholder="yyyy/mm/dd"
                  :isValid="errors.length === 0"
                  v-model="
                    currentFilterTemplate.searchConditions.purchaseDateStart
                  "
                />
                <div
                  v-show="!valid"
                  class="valid-msg-area fm-font-standard mt-1 mb-1"
                >
                  {{ errors[0] }}
                </div>
              </validation-provider>
              <div class="text-center">～</div>
              <validation-provider
                vid="purchaseDateEnd"
                rules="sameOrAfterDate:purchaseDateStart|afterDate6Month:purchaseDateStart"
                v-slot="{ valid, errors }"
              >
                <date-time-picker
                  class="inside-dropdown"
                  param-mode="date"
                  placeholder="yyyy/mm/dd"
                  :isValid="errors.length === 0"
                  v-model="
                    currentFilterTemplate.searchConditions.purchaseDateEnd
                  "
                />
                <div
                  v-show="!valid"
                  class="valid-msg-area fm-font-standard mt-1 mb-1"
                >
                  {{ errors[0] }}
                </div>
              </validation-provider>
            </div>
          </div>

          <CSelect
            :horizontal="{ label: 'col-sm-4', input: 'col-sm-8' }"
            label="入荷状態"
            placeholder="-- 未選択 --"
            :options="purchaseCondition"
            :value.sync="
              currentFilterTemplate.searchConditions.purchaseConditionDivision
            "
          />
          <validation-provider
            name="納品先コード"
            :rules="{ numberRequiredLength: 6 }"
            v-slot="{ valid, errors }"
          >
            <CInput
              :horizontal="{ label: 'col-sm-4', input: 'col-sm-8' }"
              label="納品先コード"
              type="number"
              max="999999"
              v-model="currentFilterTemplate.searchConditions.deliveryToCode"
            >
              <template #label-after-input>
                <CButton
                  size="sm"
                  variant="ghost"
                  class="input-icon"
                  @click="showSearchDeliveryName"
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
        </CForm>
      </template>
      <template #choice="{index}">
        <td class="text-center">
          <input
            type="radio"
            name="chooseArrivalInformationRadio"
            :value="index"
            v-model="selectedArrivalNumber"
          />
        </td>
      </template>
      <template #orderNumber="{item}">
        <td class="border-bottom">
          <u class="hand-pointer" @click="openArrivalInformationDetail(item)">{{
            item.orderNumber
          }}</u>
        </td>
      </template>
      <template #purchaseScheduleQuantity="{item}">
        <td class="text-right">{{ item.purchaseScheduleQuantity | number }}</td>
      </template>
      <template #purchaseQuantity="{item}">
        <td class="text-right">{{ item.purchaseQuantity | number }}</td>
      </template>
    </common-table-filter-layout>

    <ArrivalRegistrationModal
      ref="arrivalRegistrationModal"
      @showCommonAlert="showCommonAlert"
      @registration-success="onActionReload"
    ></ArrivalRegistrationModal>

    <arrival-detail-modal
      ref="arrivalDetailModal"
      @showCommonAlert="showCommonAlert"
    />

    <ArrivalScheduleRegistrationModal
      ref="arrivalScheduleDuplicateModal"
      @showCommonAlert="showCommonAlert"
      @registration-success="onActionReload"
    ></ArrivalScheduleRegistrationModal>

    <ArrivalScheduleRegistrationModal
      ref="arrivalScheduleRegistrationModal"
      @showCommonAlert="showCommonAlert"
      @registration-success="onActionReload"
    ></ArrivalScheduleRegistrationModal>

    <search-supplier-modal
      ref="searchSupplierModal"
      :on-choose-item="onChooseSupplier"
      @dismiss="onDismissSearchProperties"
    />
    <search-supplier-modal
      ref="searchDeliveryNameModal"
      :on-choose-item="onChooseDeliveryName"
      @dismiss="onDismissSearchProperties"
    />
    <search-product-modal
      ref="searchProductModal"
      :on-choose-item="onChooseProduct"
      @dismiss="onDismissSearchProperties"
    />
  </div>
</template>

<script>
import CommonAlert from '../../components/alert/CommonAlert'
import CommonTableFilterLayout from '../../components/layouts/CommonTableFilterLayout'
import ArrivalDetailModal from './ArrivalDetailModal'
import ArrivalRegistrationModal from './ArrivalRegistrationModal'
import ArrivalScheduleRegistrationModal from './ArrivalScheduleRegistrationModal'
import SearchSupplierModal from '../../components/modals/SearchSupplierModal'
import SearchProductModal from '../../components/modals/SearchProductModal'
import PurchaseService from '../../api/purchase.service'
import MasterDataService from '../../api/master-data.service'
import { MD_PURCHASE_STATUS } from '../../api/master-data-category-code'
import { ValidationProvider } from 'vee-validate'
import moment from 'moment'
import _ from 'lodash'
import DateTimePicker from '@/components/customInput/DateTimePicker'
import { DatePattern, formatDate } from '@/lib/DateUtils'

const ITEMS_PER_PAGE = 20

export default {
  name: 'ArrivalList',
  components: {
    DateTimePicker,
    SearchProductModal,
    ArrivalDetailModal,
    ArrivalRegistrationModal,
    ArrivalScheduleRegistrationModal,
    CommonTableFilterLayout,
    CommonAlert,
    SearchSupplierModal,
    ValidationProvider
  },
  data() {
    return {
      isLoading: false,
      itemsPerPage: ITEMS_PER_PAGE,
      tableItems: [],
      tableHeaders: [
        {
          key: 'choice',
          label: '',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'orderNumber',
          label: 'OPOS発注番号',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'supplierName',
          label: '仕入先名',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'productNumber',
          label: '商品番号',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'productName',
          label: '商品名',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'purchaseScheduleDate',
          label: '入荷予定日',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'purchaseDate',
          label: '入出庫日',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'purchaseScheduleQuantity',
          label: '入荷予定数',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'purchaseQuantity',
          label: '入出庫数',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'purchaseConditionDivision',
          label: '入荷状態',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'deliveryToName',
          label: '納品先名',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        }
      ],
      currentFilterTemplate: { searchConditions: {} },
      selectedArrivalNumber: -1,
      purchaseCondition: [],
      lastApiCall: 0 // 0 = getAllData; 1 = search/criteria
    }
  },
  methods: {
    openArrivalInformationDetail(item) {
      this.$refs.arrivalDetailModal.show(item)
    },
    openArrivalRegistrationModal() {
      if (this.selectedArrivalNumber >= 0)
        this.$refs.arrivalRegistrationModal.show(
          this.tableItems[this.selectedArrivalNumber].purchaseScheduleNumber,
          this.tableItems[this.selectedArrivalNumber].supplierCode
        )
    },
    openArrivalScheduleRegistrationModal() {
      this.$refs.arrivalScheduleRegistrationModal.show()
    },
    openArrivalScheduleDuplicateModal() {
      if (this.selectedArrivalNumber >= 0) {
        this.$refs.arrivalScheduleDuplicateModal.show(
          this.tableItems[this.selectedArrivalNumber]
        )
      }
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
    showCommonAlert(payload) {
      if (payload.isSuccess) {
        this.$refs.commonAlert.show(payload.message)
      } else {
        this.$refs.commonAlert.showError(payload.message)
      }
    },
    showSearchSupplier() {
      this.onShowSearchProperties()
      this.$refs.searchSupplierModal.show()
    },
    showSearchDeliveryName() {
      this.onShowSearchProperties()
      this.$refs.searchDeliveryNameModal.show()
    },
    showSearchProduct() {
      this.onShowSearchProperties()
      this.$refs.searchProductModal.show()
    },
    onShowSearchProperties() {
      this.$refs.tableFilterLayout.setKeepShowingAdvanceFilter(true)
    },
    onDismissSearchProperties() {
      this.$refs.tableFilterLayout.setKeepShowingAdvanceFilter(false)
    },
    onChooseSupplier(supplier) {
      this.currentFilterTemplate.searchConditions.supplierCode =
        supplier.supplier_code
    },
    onChooseProduct(product) {
      this.currentFilterTemplate.searchConditions.productNumber =
        product.item_number
      // Todo need change to productNumber when apply API.
    },
    onChooseDeliveryName(supplier) {
      this.currentFilterTemplate.searchConditions.deliveryToCode =
        supplier.supplier_code
    },
    searchCriteria() {
      const body = _.cloneDeep(this.currentFilterTemplate.searchConditions)
      this.isLoading = true
      this.lastApiCall = 1
      PurchaseService.search(body)
        .then(({ data }) => {
          this.tableItems = this.sortTableItems(data)
          data.length > 0
            ? (this.selectedArrivalNumber = 0)
            : (this.selectedArrivalNumber = -1)
        })
        .catch(error => {
          this.selectedArrivalNumber = -1
          this.$refs.commonAlert.show(`エラー: ${error}`)
        })
        .finally(() => (this.isLoading = false))
    },
    onActionReload() {
      if (this.lastApiCall) this.searchCriteria()
      else this.loadPurchaseList()
    },
    loadPurchaseList() {
      this.isLoading = true
      this.lastApiCall = 0
      PurchaseService.getList()
        .then(({ data }) => {
          this.tableItems = this.sortTableItems(data)
          data.length > 0
            ? (this.selectedArrivalNumber = 0)
            : (this.selectedArrivalNumber = -1)
        })
        .catch(error => {
          this.selectedArrivalNumber = -1
          this.$refs.commonAlert.showError(`エラー: ${error}`)
        })
        .finally(() => (this.isLoading = false))
    },
    prepareMasterData() {
      // Get master data for
      MasterDataService.getCategoryItems(MD_PURCHASE_STATUS)
        .then(({ data }) => {
          this.purchaseCondition = _.sortBy(data, ['displayorder']).map(
            item => {
              return { label: item.divisionName, value: item.divisionCode }
            }
          )
        })
        .catch(error => {})
    },
    sortTableItems(tableData) {
      return tableData.sort(
        (firstItem, secondItem) =>
          moment(secondItem.purchaseScheduleDate).unix() -
          moment(firstItem.purchaseScheduleDate).unix()
      )
    }
  },
  computed: {
    computedTableItems() {
      return _.cloneDeep(this.tableItems).map((item, index) => {
        item.originIndex = index
        item.purchaseScheduleDate = formatDate(
          item.purchaseScheduleDate,
          DatePattern.YYYY_MM_DD
        )
        item.purchaseDate = formatDate(
          item.purchaseDate,
          DatePattern.YYYY_MM_DD
        )
        return item
      })
    }
  },
  created() {
    this.loadPurchaseList()
    this.prepareMasterData()
  }
}
</script>

<style scoped></style>
