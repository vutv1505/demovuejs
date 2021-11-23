<template>
  <div class="body-container">
    <div class="d-flex justify-content-center">
      <common-alert
        ref="commonAlert"
        class="z-index-9999 position-absolute w-50"
      />
    </div>
    <common-table-filter-layout
      class="px-3"
      page-title="ファイル取込"
      page-id="OPOS-IF-File"
      :current-filter-template="currentFilterTemplate"
      @onSelectedFilterTemplate="onSelectedFilterTemplate"
      :right-buttons="[{ text: '取込', clickEvent: showImportFileModal }]"
      pagination
      :table-items="computedTableItems"
      :table-headers="tableHeaders"
      :is-loading="isLoading"
      :items-per-page="itemsPerPage"
      @onClickActionReload="reload"
      @onClickSearchAdvance="onClickSearchAdvanceFilter"
      @onClickClearAdvance="onClickClearAdvance"
    >
      <template #setting-items>
        <CDropdownItem @click="showImportFileModal">取込</CDropdownItem>
      </template>
      <template #advance-filter-body>
        <CForm>
          <div class="form-group form-row">
            <label class="col-form-label col-sm-4">取込日時</label>
            <div class="col-sm-8">
              <validation-provider
                vid="importStartDatetimeStart"
                rules="sameOrBeforeDate:importStartDatetimeEnd"
                v-slot="{ valid, errors }"
              >
                <date-time-picker
                  class="inside-dropdown"
                  param-mode="dateTime"
                  placeholder="yyyy/mm/dd hh:mm"
                  name="importStartDatetimeStart"
                  :isValid="errors.length === 0"
                  v-model="
                    currentFilterTemplate.searchConditions
                      .importStartDatetimeStart
                  "
                />
                <div
                  v-show="!valid"
                  class="valid-msg-area fm-font-standard mt-1 mb-1"
                >
                  {{ errors[0] }}
                </div>
              </validation-provider>
              <div class="text-center">
                ～
              </div>
              <validation-provider
                vid="importStartDatetimeEnd"
                rules="sameOrAfterDate:importStartDatetimeStart"
                v-slot="{ valid, errors }"
              >
                <date-time-picker
                  class="inside-dropdown"
                  param-mode="dateTime"
                  placeholder="yyyy/mm/dd hh:mm"
                  name="importStartDatetimeEnd"
                  :isValid="errors.length === 0"
                  v-model="
                    currentFilterTemplate.searchConditions
                      .importStartDatetimeEnd
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
            <label class="col-sm-4">取込結果</label>
            <div class="col-sm-8 pl-4">
              <CRow
                v-for="(rowOption, idx) in cbImportResultOptions"
                :key="idx"
              >
                <b-checkbox
                  class="col-sm-7 text-left pr-0"
                  size="sm"
                  v-model="
                    currentFilterTemplate.searchConditions.importResultCode
                  "
                  :value="rowOption[0].value"
                  name="cbImportResult"
                  plain
                  >{{ rowOption[0].label }}
                </b-checkbox>
                <b-form-checkbox
                  class="col-sm-5 text-left pr-0"
                  size="sm"
                  v-model="
                    currentFilterTemplate.searchConditions.importResultCode
                  "
                  :value="rowOption[1].value"
                  name="cbImportResult"
                  plain
                  >{{ rowOption[1].label }}
                </b-form-checkbox>
              </CRow>
            </div>
          </div>

          <CInput
            :horizontal="{ label: 'col-sm-4', input: 'col-sm-8' }"
            :maxlength="22"
            label="実行者名"
            v-model="currentFilterTemplate.searchConditions.FullName"
          />

          <CSelect
            :horizontal="{ label: 'col-sm-4', input: 'col-sm-8' }"
            label="帳票名"
            placeholder="-- 未選択 --"
            :value.sync="
              currentFilterTemplate.searchConditions.importReportCode
            "
            :options="slUploadForms"
          />
        </CForm>
      </template>
      <template #importResult="{item}">
        <td>
          <u class="hand-pointer" @click="showImportFileDetailModal(item)">
            {{ item.importResult }}
          </u>
        </td>
      </template>
    </common-table-filter-layout>

    <import-file-upload-modal
      ref="importFileModals"
      @importFileModalSaved="importFileModalSaved"
    />
    <import-file-detail-modal ref="importFileDetailModal" />
  </div>
</template>

<script>
import ImportFileUploadModal from './ImportFileUploadModal'
import ImportFileDetailModal from './ImportFileDetailModal'
import CommonTableFilterLayout from '../../components/layouts/CommonTableFilterLayout'
import ImportFileService from '../../api/import-file.service'
import MasterDataService from '../../api/master-data.service'
import { MD_IMPORT_FORM } from '@/api/master-data-category-code'
import CommonAlert from '../../components/alert/CommonAlert'
import moment from 'moment'
import * as _ from 'lodash'
import DateTimePicker from '@/components/customInput/DateTimePicker'
import { ValidationProvider } from 'vee-validate'

const ITEM_PER_PAGE = 15

export default {
  name: 'ImportFileList',
  components: {
    ValidationProvider,
    DateTimePicker,
    ImportFileUploadModal,
    CommonTableFilterLayout,
    ImportFileDetailModal,
    CommonAlert
  },
  data() {
    return {
      isLoading: true,
      itemsPerPage: ITEM_PER_PAGE,
      cbImportResultOptions: [
        [{ value: 1, label: '取込中' }, { value: 2, label: '取込完了' }],
        [{ value: 3, label: 'エラー' }, { value: 4, label: '警告終了' }],
        [{ value: 9, label: 'システムエラー' }, { value: 9999, label: '取消' }]
      ],
      slUploadForms: [],
      tableItems: [],
      tableHeaders: [
        {
          key: 'importStartDatetime',
          label: '取込日時',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'importResult',
          label: '取込結果',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'importerName',
          label: '実行者名',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'reportName',
          label: '帳票名',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'totalCount',
          label: '総件数',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;',
          _classes: 'text-right'
        },
        {
          key: 'warningCount',
          label: '警告件数',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;',
          _classes: 'text-right'
        },
        {
          key: 'errorCount',
          label: 'エラー件数',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;',
          _classes: 'text-right'
        }
      ],
      currentFilterTemplate: { searchConditions: {} }
    }
  },
  methods: {
    showImportFileModal() {
      this.$refs.importFileModals.show()
    },
    importFileModalSaved(file) {
      // Todo handle with imported file
    },
    onClickSearchAdvanceFilter() {
      this.searchCriteria()
    },
    onClickClearAdvance() {
      this.currentFilterTemplate.searchConditions = {}
    },
    showImportFileDetailModal(fileDetail) {
      this.$refs.importFileDetailModal.show(fileDetail.importNumber)
    },
    reload() {
      this.searchCriteria()
    },
    onSelectedFilterTemplate(selectedTemplate) {
      this.currentFilterTemplate = selectedTemplate
    },
    loadImportFileList() {
      this.isLoading = true
      ImportFileService.getList()
        .then(({ data }) => {
          this.isLoading = false
          this.tableItems = data
        })
        .catch(error => {
          this.isLoading = false
          this.$refs.commonAlert.show(`エラー: ${error}`)
        })
    },
    searchCriteria() {
      const body = _.cloneDeep(this.currentFilterTemplate.searchConditions)

      this.isLoading = true
      ImportFileService.search(body)
        .then(({ data }) => {
          this.isLoading = false
          //TODO this.tableItems = data
          this.tableItems = data
        })
        .catch(error => {
          this.isLoading = false
          this.$refs.commonAlert.show(`エラー: ${error}`)
        })
    },
    prepareMasterData() {
      // Get master data for
      MasterDataService.getCategoryItems(MD_IMPORT_FORM)
        .then(({ data }) => {
          this.slUploadForms = _.sortBy(data, ['displayorder']).map(item => {
            return { label: item.divisionName, value: item.divisionCode }
          })
        })
        .catch(error => {})
    }
  },
  computed: {
    computedTableItems() {
      return this.tableItems.map((item, index) => {
        item.originIndex = index
        item.importStartDatetime = moment(
          item.importFileInfo.importStartDatetime,
          'YYYY-MM-DD HH:mm:ss:sss'
        ).format('YYYY/MM/DD HH:mm')
        item.importResult = item.importFileResult.importResultName
        item.importerName = `${item.importFileInfo.nameKanjiLastName}${
          item.importFileInfo.nameKanjiFirstName
        }`
        item.reportName = item.importFileInfo.reportName
        item.totalCount = this.numberFormat(item.importFileResult.totalCount)
        item.warningCount = this.numberFormat(
          item.importFileResult.warningCount
        )
        item.errorCount = this.numberFormat(item.importFileResult.errorCount)
        return item
      })
    }
  },
  created() {
    this.prepareMasterData()
    this.loadImportFileList()
  }
}
</script>

<style scoped></style>
