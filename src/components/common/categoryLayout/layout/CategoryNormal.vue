<template>
  <div class="animated fadeIn d-flex flex-column h-100 overflow-hidden">
    <b-row>
      <b-col md="12">
        <transition name="fade">
          <cat-table-header
            ref="tableHeader"
            :namespace="namespace"
            :screenName="screenName"
            :localMenu="localMenu"
            :actionMenu="actionMenu"
            :fnSelectedData="selectedData"
            :mainComponent="this"
            :kikankesaCondition="kikankesaForm"
            @changeCurrentCondIdx="onChangeCurrentCondIdx"
            @filterTable="filterList"
          >
            <template
              v-for="(_, slot) of $scopedSlots"
              v-slot:[slot]="scope"
              :index="_"
              ><slot :name="slot" v-bind="scope"
            /></template>
          </cat-table-header>
        </transition>
      </b-col>
    </b-row>
    <b-row class="px-3">
      <cat-save-panel
        :isSavePanelOpen="showButtonSaveTable"
        :onValidate="fnValidTable"
        :onSaveData="fnSaveTable"
        @refresh-table="refreshHandsOnTable"
      >
      </cat-save-panel>
    </b-row>
    <div class="component-area h-100 overflow-hidden">
      <div class="h-100 card d-flex flex-column overflow-hidden">
        <b-handsontable
          ref="hotTableComponent"
          :settings="hotSettings"
          :root="root"
          @change-selected-data="onChangeSelected"
          @show-button-save="onShowButtonSave"
          @hide-button-save="onHideButtonSave"
        >
          <template
            v-for="(_, slot) of $scopedSlots"
            v-slot:[slot]="scope"
            :index="_"
            ><slot :name="slot" v-bind="scope"
          /></template>
        </b-handsontable>
        <div class="norec-msg" v-show="!totalData">
          表示する項目がありません
        </div>
        <slot name="shortcut-key"></slot>
      </div>
      <slot name="info-panel">
        <div></div>
      </slot>
      <loading-over-ray :isLoading="isLoading"></loading-over-ray>
    </div>
    <cat-search-panel
      ref="search"
      @click-search-panel="onSearchData(true)"
      @clear-search-panel="initSearchCondition"
      :namespace="namespace"
      :kikankesaCondition="kikankesaForm"
    >
      <template>
        <slot name="search-panel-body"></slot>
      </template>
    </cat-search-panel>
    <cat-right-panel
      ref="rightPanel"
      :title="titleRightPanel"
      :namespace="namespace"
    >
      <template>
        <slot name="right-panel-body"></slot>
      </template>
    </cat-right-panel>
  </div>
</template>

<script>
import CatSearchPanel from '../CatSearchPanel'
import CatRightPanel from '../CatRightPanel'
import CatTableHeader from '../CatTableHeader'
import CatSavePanel from '../CatSavePanel'
import BHandsontable from '@/components/handsontable/BHandsontable'
import LoadingOverRay from '@/components/common/LoadingOverRay'
import miniToastr from 'mini-toastr'
import { mapActions, mapGetters, mapState } from '@/lib/store'
import actionUtil, { defaultErrorHandle } from '@/lib/actionUtil'
import { filterList } from '@/lib/handsontable'
import { getGamencd, hasPersonalInfo } from '@/lib/gamen'

export default {
  name: 'CategoryNormal',
  components: {
    CatSearchPanel,
    CatRightPanel,
    CatTableHeader,
    CatSavePanel,
    BHandsontable,
    LoadingOverRay
  },
  props: {
    screenName: {
      type: String,
      required: true
    },
    hotSettings: {
      type: Object
    },
    root: {
      type: String
    },
    localMenu: {
      type: Object
    },
    actionMenu: {
      type: Object
    },
    namespace: {
      type: String,
      required: true
    },
    disableMenuCondition: {
      type: Function
    },
    titleRightPanel: {
      type: String
    }
  },
  data() {
    return {
      hotRef: null,
      showButtonSaveTable: false,
      validTable: false,
      kikankesaForm: {
        tantoucd: null,
        gamencd: null
      },
      hasPersonalInfoData: true
    }
  },
  computed: {
    ...mapState([
      'isSearchPanelOpen',
      'dataTable',
      'isLoading',
      'isRightPanelOpen',
      'searchCondition',
      'currentCondIdx'
    ]),
    ...mapGetters(['totalData']),
    ...mapGetters(['toastFadeTime', 'userInfo'], () => 'common'),
    ...mapState(['statusChangeNavLink', 'checkOnBack'], () => 'document')
  },
  created() {
    this.dataTable = []
    if (this.checkOnBack) {
      this.onSearchData(false)
    } else {
      this.initSearchCondition()
    }
    this.kikankesaForm.tantoucd = this.userInfo.tantoucd
    this.kikankesaForm.gamencd = getGamencd(this.screenName)
    this.hasPersonalInfoData = hasPersonalInfo(this.screenName)
  },
  mounted() {
    if (
      !this.userInfo.hasPersonalinfoDisplayAuthority &&
      this.hasPersonalInfoData
    ) {
      delete this.actionMenu.baseAction.download
    }
    this.hotRef = this.$refs.hotTableComponent
    if (this.dataTable && this.dataTable.length > 0) {
      this.refreshHandsOnTable()
    }
    this.onChangeSelected()
    this.checkOnBack = false
    if (this.statusChangeNavLink) {
      this.resetData()
      this.changeNavLink(false)
    }
  },
  methods: {
    ...mapActions([
      'initSearchCondition',
      'searchData',
      'selectSearchCondition',
      'updateStoreSelectedData',
      'saveTable',
      'hideSearchPanel',
      'hideRightPanel',
      'resetData'
    ]),
    ...mapActions(['changeNavLink'], () => 'document'),
    onSearchData(isClickSearch) {
      actionUtil.call(
        this,
        this.searchDataProcessFactory(isClickSearch),
        this.onSearchDataSuccess
      )
    },
    searchDataProcessFactory(isClickSearch) {
      return () => {
        this.hideSearchPanel()
        this.hideRightPanel()
        if (this.hotRef && isClickSearch) {
          this.hotRef.onClearFilterAndSort()
        }
        return this.searchData(isClickSearch)
      }
    },
    onSearchDataSuccess() {
      miniToastr.success(
        `検索結果は${this.numberFormat(this.totalData)}件です`,
        '正常終了',
        this.toastFadeTime
      )
    },
    selectedData() {
      return this.hotRef ? this.hotRef.getSelectedData() : []
    },
    onChangeSelected() {
      const tableData = this.hotRef.getData()
      setTimeout(() =>
        this.updateStoreSelectedData(
          this.hotRef ? tableData.map(row => row.target) : []
        )
      )
      const selectedData = this.selectedData()
      const selectedDataLength = selectedData.length
      let fnDisable = paramMode => {
        if (paramMode == null) {
          return false
        }
        if (paramMode !== 'none' && selectedDataLength === 0) {
          return true
        } else return paramMode === 'single' && selectedDataLength !== 1
      }
      this.$refs.tableHeader.$refs.localMenuElem.disableAction(
        fnDisable,
        selectedData,
        tableData
      )
      this.$refs.tableHeader.$refs.actionMenuElem.disableAction(
        fnDisable,
        selectedData,
        tableData
      )
      this.$emit(
        'onChangeSelectedDataTable',
        selectedData,
        this.hotRef.getSelectedIndex()
      )
    },
    downloadList() {
      this.hotRef.table.getPlugin('exportFile').downloadFile('csv', {
        columnHeaders: true,
        filename: `${this.screenName}_[YYYY]-[MM]-[DD]`,
        rowHeaders: false,
        range: [0, 1]
      })
    },
    refreshHandsOnTable() {
      if (this.hotRef) {
        if (this.dataTable && this.dataTable.length > 0) {
          this.hotRef.loadData(this.dataTable)
        } else {
          this.hotRef.loadData([])
        }
      }
    },
    onChangeCurrentCondIdx() {
      this.selectSearchCondition()
      if (this.currentCondIdx) {
        this.onSearchData(true)
      }
    },
    filterList(filterWord) {
      const resultFilterList = filterList(
        filterWord,
        this.hotSettings,
        this.dataTable
      )
      this.hotRef.loadData(resultFilterList)
    },
    async onShowButtonSave() {
      this.showButtonSaveTable = true
    },
    async onHideButtonSave() {
      this.showButtonSaveTable = false
    },
    fnValidTable() {
      return this.hotRef.validateCells(false)
    },
    fnSaveTable() {
      actionUtil.call(
        this,
        this.saveTableProcess,
        this.saveTableSuccess,
        this.saveTableError
      )
    },
    saveTableProcess() {
      return this.saveTable(this.hotRef.getEditData())
    },
    saveTableSuccess() {
      this.onSearchData()
      miniToastr.success('更新が完了しました', '正常終了', this.toastFadeTime)
    },
    saveTableError(res) {
      defaultErrorHandle.call(this, res)
      res &&
        res.data &&
        res.updatedData &&
        this.hotRef.updateEditData(res.data.updatedData)
    }
  },
  watch: {
    dataTable() {
      this.refreshHandsOnTable()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/variables';
.norec-msg {
  position: absolute;
  top: 40%;
  left: 40%;
}
.input-group-text {
  background-color: #fff !important;
  border-right: unset !important;
}

.header-fixed .app-body .main .card .card-body {
  padding: 0;
}

.component-area {
  display: flex;
  flex-wrap: nowrap;
  box-sizing: border-box;
  > div:nth-child(1) {
    flex: 1 1 auto;
    box-sizing: border-box;
  }
  > div:nth-child(2):not(:empty) {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 16.66667%;
    flex: 0 0 16.66667%;
    max-width: 16.66667%;
    margin-left: 15px;
  }
}
</style>
