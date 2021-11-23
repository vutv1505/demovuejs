<template>
  <div>
    <CModal
      :show.sync="isShow"
      :closeOnBackdrop="false"
      :centered="true"
      size="xl"
    >
      <template #header-wrapper>
        <div class="w-100 header-container modal-border">
          <h6 class="text-center m-auto font-weight-bold">
            取込情報
          </h6>
        </div>
      </template>
      <template #body-wrapper>
        <c-scrollbar
          class="modal-body modal-border-left modal-border-right modal-max-height"
        >
          <div class="body-item-header font-weight-bold">
            取込帳票名 <span class="text-danger font-weight-bold">[必須]</span>
          </div>
          <CRow class="p-3">
            <CSelect
              class="col-sm-5"
              :options="listFormName"
              :value.sync="selectedUploadForm"
              @change="clearInputFile"
              placeholder="-- 未選択 --"
            ></CSelect>
          </CRow>
          <div class="body-item-header font-weight-bold">
            取込ファイル
            <span class="text-danger font-weight-bold">[必須]</span>
          </div>
          <CRow class="p-3 align-items-center">
            <CInput
              class="col-sm-5 mb-0"
              type="text"
              maxlength="66"
              :value.sync="importFileName"
            />
            <div class="col-sm pl-0">
              <label
                for="import-file"
                class="btn btn-sm btn-square mb-0 ml-0 border-dark"
                :class="{
                  disabled: selectedUploadForm === 0
                }"
                >参照</label
              >
              <input
                type="file"
                class="d-none"
                id="import-file"
                name="import-file"
                :disabled="selectedUploadForm === 0"
                @change="selectFile"
              />
            </div>
          </CRow>
          <CRow class="px-3">
            <div class="col-sm-5 mb-0" v-show="errorList.length > 0">
              <span class="text-danger">エラー項目があります。</span
              ><a href="javascript:void(0)" @click="downloadErrorFile"
                >エラーファイル出力(リンク)</a
              >
            </div>
          </CRow>
        </c-scrollbar>
      </template>
      <template #footer-wrapper>
        <button-footer-area
          class="modal-border"
          is-footer-open="true"
          cancel-label="キャンセル"
          ok-label="取込"
          @onCancel="onCancel"
          @onSave="onSave"
        ></button-footer-area>
      </template>
    </CModal>
  </div>
</template>

<script>
import ButtonFooterArea from '../../components/common/ButtonFooterArea'
import * as Papa from 'papaparse'
import validateTSVData from '../../lib/validateTSV'
import { validateScheduleArrivalConfig } from './validateconfig/validate-schedule-arrival.config'
import { validateArrivalRecordConfig } from './validateconfig/validate-arrival-record.config'
import FileUtils from '../../lib/file-utils'

const FORM_ARRIVAL_SCHEDULE = 1
const FORM_ARRIVAL_RECORD = 2
const FORM_COMPONENT_MASTER = 3
const FORM_PURCHASE_RETURN = 4

export default {
  name: 'ImportFileUploadModal',
  components: { ButtonFooterArea },
  data() {
    return {
      isLoading: false,
      isShow: false,
      importFileName: '',
      importFile: null,
      listFormName: [
        { value: FORM_ARRIVAL_SCHEDULE, label: '入荷予定情報' },
        { value: FORM_ARRIVAL_RECORD, label: '入荷実績情報' },
        { value: FORM_COMPONENT_MASTER, label: '構成品マスタ' },
        { value: FORM_PURCHASE_RETURN, label: '仕入返品情報' }
      ], // TODO get data from API master data
      selectedUploadForm: 0,
      errorList: []
    }
  },
  methods: {
    clearInputFile() {
      this.importFile = null
      this.importFileName = ''
      document.getElementById('import-file').value = null
      this.errorList.length = 0
    },
    onCancel() {
      this.dismiss()
    },
    onSave() {
      if (this.importFile) this.$emit('importFileModalSaved', this.importFile)
      this.dismiss()
    },
    show() {
      this.isShow = true
    },
    dismiss() {
      this.clearInputFile()
      this.errorList = []
      this.selectedUploadForm = 0
      this.isShow = false
    },
    selectFile(event) {
      if (event.target.files[0]) {
        this.importFile = event.target.files[0]
        this.importFileName = this.importFile.name

        // Read file data and handle
        this.parseUploadFile(this.importFile)
      }
    },
    parseUploadFile(file) {
      this.isLoading = true
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        worker: true,
        dynamicTyping: false,
        encoding: 'Shift-JIS',
        complete: csv => {
          switch (this.selectedUploadForm) {
            case FORM_ARRIVAL_SCHEDULE:
              this.errorList = validateTSVData(
                csv.data,
                validateScheduleArrivalConfig
              )
              break
            case FORM_ARRIVAL_RECORD:
              this.errorList = validateTSVData(
                csv.data,
                validateArrivalRecordConfig
              )
              break
          }
        }
      })
    },
    downloadErrorFile() {
      // Make TSV from errorList
      const strCsvContent = Papa.unparse(this.errorList, {
        quotes: false,
        delimiter: '\t',
        header: true
      })
      FileUtils.downloadFile(
        `${this.importFileName}_errList.tsv`,
        strCsvContent
      )
    }
  }
}
</script>

<style scoped></style>
