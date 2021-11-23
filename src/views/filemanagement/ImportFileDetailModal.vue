<template>
  <div>
    <CModal
      :show.sync="isShow"
      :centered="true"
      size="xl"
      :close-on-backdrop="false"
    >
      <template #header-wrapper>
        <div class="w-100 header-container modal-border">
          <h6 class="text-center m-auto font-weight-bold">取込結果詳細</h6>
        </div>
      </template>
      <template #body-wrapper>
        <c-scrollbar
          class="modal-body modal-border-left modal-border-right"
          v-if="fileDetail"
          v-loading="isLoading"
        >
          <div class="body-item-header font-weight-bold">取込ファイル情報</div>
          <CRow class="p-3">
            <CInput
              class="col-sm"
              disabled
              :addLabelClasses="['mb-1', 'label-field-no-wrap']"
              addInputClasses="border-dark"
              label="取込帳票名"
              maxlength="66"
              :value="fileDetail.importFileInfo.reportName"
            />
            <CInput
              class="col-sm"
              disabled
              :addLabelClasses="['mb-1', 'label-field-no-wrap']"
              addInputClasses="border-dark"
              label="取込ファイル名"
              maxlength="66"
              :value="fileDetail.importFileInfo.importFileName"
            />
          </CRow>
          <div class="body-item-header font-weight-bold">取込結果</div>
          <div class="p-3">
            <div class="row">
              <CInput
                class="col-sm mb-1"
                disabled
                :addLabelClasses="['mb-1', 'label-field-no-wrap']"
                addInputClasses="border-dark"
                label="取込日時"
                :value="
                  fileDetail.importFileInfo.importStartDatetime
                    | dateFormat('YYYY/MM/DD hh:mm:ss', 'YYYY-MM-DD hh:mm:ss')
                "
              />
              <CInput
                class="col-sm mb-1"
                disabled
                :addLabelClasses="['mb-1', 'label-field-no-wrap']"
                addInputClasses="border-dark"
                label="取込結果"
                :value="fileDetail.importFileResult.importResultName"
              />
              <CInput
                class="col-sm mb-1"
                disabled
                :addLabelClasses="['mb-1', 'label-field-no-wrap']"
                addInputClasses="border-dark"
                label="実行者"
                maxlength="22"
                :value="
                  `${fileDetail.importFileInfo.nameKanjiLastName}${
                    fileDetail.importFileInfo.nameKanjiFirstName
                  }`
                "
              />
            </div>
            <div class="row">
              <CInput
                class="col-sm"
                disabled
                :addLabelClasses="['mb-1', 'label-field-no-wrap']"
                :addInputClasses="['border-dark', 'text-right']"
                label="総件数"
                :value="fileDetail.importFileResult.totalCount | number"
              />
              <CInput
                class="col-sm"
                disabled
                :addLabelClasses="['mb-1', 'label-field-no-wrap']"
                :addInputClasses="['border-dark', 'text-right']"
                label="警告件数"
                :value="fileDetail.importFileResult.warningCount | number"
              />
              <CInput
                class="col-sm"
                disabled
                :addLabelClasses="['mb-1', 'label-field-no-wrap']"
                :addInputClasses="['border-dark', 'text-right']"
                label="エラー件数"
                :value="fileDetail.importFileResult.errorCount | number"
              />
            </div>
          </div>
          <div class="body-item-header font-weight-bold">
            警告・エラー内容一覧
          </div>
          <div class="pt-4">
            <common-table-filter-layout
              page-id="OPOS-IF-FileImportResult"
              @onClickActionReload="loadImportFileDetail"
              class="py-2"
              searchGroupSize="sm"
              vertical-scroll
              :hasActionAdvanceFilter="false"
              :table-items="tableItems"
              :table-headers="tableHeaders"
              :tableResponsive="false"
              :disable-setting="true"
            >
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
  </div>
</template>

<script>
import CommonTableFilterLayout from '../../components/layouts/CommonTableFilterLayout'
import fileManagementService from '../../api/import-file.service'

export default {
  name: 'ImportFileDetail',
  components: { CommonTableFilterLayout },
  data() {
    return {
      isShow: false,
      importNumber: 0,
      fileDetail: {
        importFileInfo: {
          reportName: '',
          importFileName: '',
          importStartDatetime: '',
          nameKanjiLastName: '',
          nameKanjiFirstName: ''
        },
        importFileResult: {
          importResultName: '',
          totalCount: '',
          warningCount: '',
          errorCount: ''
        },
        importFileResultDetails: []
      },
      isLoading: false,
      tableItems: [],
      tableHeaders: [
        {
          key: 'rowQuantity',
          label: '行',
          _style: 'text-align: center; border: 1px solid #727272 '
        },
        {
          key: 'errorcategory',
          label: '種別',
          _style: 'text-align: center; border: 1px solid #727272 '
        },
        {
          key: 'errorCode',
          label: 'コード',
          _style: 'text-align: center; border: 1px solid #727272 '
        },
        {
          key: 'errorMessage',
          label: 'エラーメッセージ',
          _style: 'text-align: center; border: 1px solid #727272 '
        }
      ]
    }
  },
  methods: {
    show(importNumber) {
      this.isShow = true
      this.importNumber = importNumber
      this.loadImportFileDetail()
    },
    dismiss() {
      this.isShow = false
      this.isLoading = false
    },
    async loadImportFileDetail() {
      this.isLoading = true
      try {
        const fileImportResult = await fileManagementService.getByFileId(
          this.importNumber
        )
        this.fileDetail = fileImportResult.data
        this.tableItems = this.fileDetail.importFileResultDetails
        this.isLoading = false
      } catch (e) {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped></style>
