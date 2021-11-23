<template>
  <div class="body-container">
    <div class="d-flex justify-content-center">
      <common-alert ref="approvedAlert" class="position-absolute w-50" />
    </div>
    <common-table-filter-layout
      page-title="承認一覧"
      page-id="approval list"
      class="px-3"
      pagination
      :table-items="tableItems"
      :table-headers="tableHeaders"
      :is-loading="isLoading"
      :items-per-page="itemsPerPage"
      :right-buttons="[
        { text: '差戻し', clickEvent: remandForSelected },
        { text: '承認', clickEvent: approvedForSelected }
      ]"
      :left-buttons="[{ text: '全選択/解除', clickEvent: selectDeselectAll }]"
      @onClickSearchAdvance="onClickSearchAdvance"
      @onClickClearAdvance="onClickClearAdvance"
      @onSelectedFilterTemplate="onSelectedFilterTemplate"
      :current-filter-template="currentFilterTemplate"
      @update:activePage="clearSelect"
    >
      <template #setting-items>
        <CDropdownItem>承認</CDropdownItem>
        <CDropdownItem>差戻し</CDropdownItem>
        <CDropdownItem>詳細</CDropdownItem>
      </template>
      <template #advance-filter-body>
        <CForm>
          <div class="form-group form-row">
            <CInputCheckbox
              class="col-sm-5 text-left pr-0"
              label="承認対象のみ表示"
              name="cbImportResult"
            />
          </div>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-4">申請番号</label>
            <div class="col-sm-8 text-center">
              <input
                v-model="
                  currentFilterTemplate.searchConditions.applicationNumber
                "
                type="number"
                max="999999999"
                class="form-control"
              />
            </div>
          </div>

          <div class="form-group form-row">
            <label class="col-form-label col-sm-4">申請者</label>
            <div class="col-sm-8 text-center">
              <input
                v-model="currentFilterTemplate.searchConditions.applicant"
                type="text"
                maxlength="22"
                class="form-control"
              />
            </div>
          </div>

          <div class="form-group form-row">
            <label class="col-form-label col-sm-4">申請日</label>
            <div class="col-sm-8 text-center">
              <input
                type="date"
                class="form-control"
                v-model="currentFilterTemplate.searchConditions.applicationDate"
              />
            </div>
          </div>

          <div class="form-group form-row">
            <label class="col-form-label col-sm-4">発注番号</label>
            <div class="col-sm-8 text-center">
              <input type="number" max="9999999" class="form-control" />
            </div>
          </div>

          <div class="form-group form-row">
            <label class="col-form-label col-sm-4">仕入先名</label>
            <div class="col-sm-8 text-center">
              <input type="text" class="form-control" />
            </div>
          </div>

          <div class="form-group form-row align-items-baseline">
            <label class="col-form-label col-sm-4">承認状態</label>
            <div class="col-sm-8 pl-4">
              <CRow v-for="(dbOption, idx) in checkboxOptions" :key="idx">
                <b-checkbox
                  class="col-sm-5 text-left pr-0"
                  size="sm"
                  v-model="
                    currentFilterTemplate.searchConditions.approvalStatus
                  "
                  :value="dbOption[0].value"
                  name="cbApprovalStatus"
                  plain
                  >{{ dbOption[0].label }}
                </b-checkbox>
                <b-checkbox
                  class="col-sm-7 text-left pr-0"
                  size="sm"
                  v-model="
                    currentFilterTemplate.searchConditions.approvalStatus
                  "
                  :value="dbOption[1].value"
                  name="cbApprovalStatus"
                  plain
                  >{{ dbOption[1].label }}
                </b-checkbox>
              </CRow>
            </div>
          </div>
        </CForm>
      </template>
      <template #select="{index}">
        <td class="text-center border-bottom">
          <input
            type="checkbox"
            name="chooseApprovalItemCheckbox"
            :value="index"
          />
        </td>
      </template>
      <template #application_number="{item}">
        <td class="text-center border-bottom">
          <u class="hand-pointer" @click="showApprovalItemDetail(item)"
            >{{ item.application_number }}
          </u>
        </td>
      </template>
    </common-table-filter-layout>

    <ApproveDetailModal
      ref="approveDetailModal"
      @onRemand="onRemand"
    ></ApproveDetailModal>
  </div>
</template>

<script>
import { APPROVAL_LIST } from '../../assets/mockdata/approval_list'
import CommonAlert from '../../components/alert/CommonAlert'
import ApproveDetailModal from './ApproveDetailModal'
import CommonTableFilterLayout from '../../components/layouts/CommonTableFilterLayout'

const ITEM_PER_PAGE = 15

export default {
  name: 'ApprovalList',
  components: {
    CommonTableFilterLayout,
    ApproveDetailModal,
    CommonAlert
  },
  data() {
    return {
      isLoading: false,
      selectAll: false,
      checkboxOptions: [
        [{ value: 1, label: '申請中' }, { value: 2, label: '申請取消' }],
        [{ value: 3, label: '否認' }, { value: 4, label: '承認済' }]
      ],
      tableItems: APPROVAL_LIST,
      itemsPerPage: ITEM_PER_PAGE,
      tableHeaders: [
        {
          key: 'select',
          label: '',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'application_number',
          label: '申請番号',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'applicant',
          label: '申請者',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'application_date',
          label: '申請日',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'application_classification',
          label: '申請区分',
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
          key: 'approval_status',
          label: '承認状態',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        }
      ],
      currentFilterTemplate: { searchConditions: {} }
    }
  },

  methods: {
    onClickSearchAdvance() {
      console.log('Search Advance')
    },
    onClickClearAdvance() {
      this.currentFilterTemplate = { searchConditions: {} }
    },
    onSelectedFilterTemplate(selectedTemplate) {
      this.currentFilterTemplate = selectedTemplate
    },
    showApprovalItemDetail(item) {
      this.$refs.approveDetailModal.show(item)
    },
    approvedForSelected() {
      const checkedApprovalList = document.querySelectorAll(
        'input[name="chooseApprovalItemCheckbox"]:checked'
      )
      const checkedListLength = checkedApprovalList.length
      const message = '承認しました。 (申請番号：'
      if (checkedListLength > 0) {
        const firstApplicationNumber = this.tableItems[
          checkedApprovalList[0].value
        ].application_number
        if (checkedListLength === 1) {
          this.$refs.approvedAlert.show(`${message} ${firstApplicationNumber})`)
        } else {
          this.$refs.approvedAlert.show(
            `${message} ${firstApplicationNumber} (他${checkedListLength -
              1}件))`
          )
        }
      }
      this.clearSelect()
    },
    remandForSelected() {
      const checkedApprovalList = document.querySelectorAll(
        'input[name="chooseApprovalItemCheckbox"]:checked'
      )
      const message =
        '差戻しは複数申請同時にできません。対象レコードを1申請に変更して下さい。'
      const checkedListLength = checkedApprovalList.length
      if (checkedListLength > 1) {
        this.$refs.approvedAlert.showError(message)
      }
      this.clearSelect()
    },
    selectDeselectAll() {
      this.selectAll = !this.selectAll
      const checkboxes = document.getElementsByName(
        'chooseApprovalItemCheckbox'
      )
      for (const checkbox of checkboxes) {
        checkbox.checked = this.selectAll
      }
    },
    clearSelect() {
      this.selectAll = true
      this.selectDeselectAll()
    },
    onRemand(item, comment) {
      console.log(comment)
      this.$refs.approvedAlert.show(
        '差度ししました。 (申請番号： ' + item.application_number + ')'
      )
    }
  }
}
</script>

<style scoped></style>
