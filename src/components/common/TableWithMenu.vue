<template>
  <div class="h-100">
    <b-card
      :class="title || actionMenu ? '' : 'no-title'"
      class="h-100"
      body-class="h-100 overflow-hidden"
    >
      <h6 slot="header" class="mb-0" v-if="title || actionMenu">
        <b-row>
          <b-col
            class="mt-2 fm-font-standard"
            :class="allowCollapse ? 'fm-cursor-hand' : ''"
            v-if="title"
            @click="onAllowCollapse"
            >{{ title }}</b-col
          >
          <b-col cols="auto" class="text-right header-menu mt-0">
            <cat-action-menu
              ref="actionMenu"
              :namespace="namespace"
              :actionMenu="actionMenu"
              :mainComponent="self"
              :fnSelectedData="selectedData"
            >
              <template
                v-for="(_, slot) of $scopedSlots"
                v-slot:[slot]="scope"
                :index="_"
                ><slot
                  :name="slot"
                  v-bind="scope"
                  v-if="
                    (actionMenu.baseAction && actionMenu.baseAction[slot]) ||
                      (actionMenu.advanceAction &&
                        actionMenu.advanceAction[slot])
                  "
              /></template>
            </cat-action-menu>
          </b-col>
        </b-row>
      </h6>
      <b-row class="px-3">
        <cat-save-panel
          :isSavePanelOpen="showButtonSaveTable"
          :onValidate="fnValidTable"
          :onSaveData="fnSaveTable"
          @refresh-table="loadDataTable"
        >
        </cat-save-panel>
      </b-row>
      <b-collapse
        visible
        id="collapse"
        class="h-100 d-flex flex-column"
        v-model="isShowTable"
      >
        <b-handsontable
          ref="hotTable"
          :settings="hotSettings"
          :root="root"
          @change-selected-data="onChangeSelected"
          @show-button-save="onShowButtonSave"
          @hide-button-save="onHideButtonSave"
        ></b-handsontable>
        <slot name="info-table-footer"></slot>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import CatActionMenu from '@/components/common/categoryLayout/CatActionMenu'
import BHandsontable from '@/components/handsontable/BHandsontable'
import CatSavePanel from '@/components/common/categoryLayout/CatSavePanel'
import actionUtil, { defaultErrorHandle } from '@/lib/actionUtil'

import miniToastr from 'mini-toastr'
import { mapGetters, mapActions } from '@/lib/store'

export default {
  name: 'TableWithMenu',
  components: {
    CatActionMenu,
    BHandsontable,
    CatSavePanel
  },
  props: {
    title: {
      type: String,
      required: false
    },
    namespace: {
      type: String,
      required: false
    },
    refMenu: {
      type: Object,
      required: false
    },
    actionMenu: {
      type: Object,
      required: false
    },
    data: {
      type: Array,
      required: false
    },
    root: {
      type: String,
      required: false,
      default: 'root'
    },
    hotSettings: {
      type: Object,
      required: true
    },
    saveDataActionName: {
      type: String,
      default: 'saveTable'
    },
    allowCollapse: {
      type: Boolean,
      default: false,
      required: false
    },
    saveParam: {
      required: false
    }
  },
  data() {
    return {
      showButtonSaveTable: false,
      validTable: false,
      isShowTable: true
    }
  },
  computed: {
    ...mapGetters(['toastFadeTime'], () => 'common'),
    self() {
      return this
    }
  },
  mounted() {
    this.refMenu && (this.refMenu._fnSelectedData = this.selectedData)
    setTimeout(() => this.loadDataTable())
    this.onChangeSelected()
  },
  methods: {
    ...mapActions(['updateStoreSelectedData']),
    menu() {
      return this.actionMenu && this.$refs
        ? this.$refs.actionMenu
        : this.refMenu
    },
    updateSettings() {
      this.$refs.hotTable.updateSettings()
    },
    onChangeSelected() {
      this.$emit('onChangeSelected')
      const tableData = this.$refs.hotTable.getData()
      this.updateStoreSelectedData(
        this.$refs.hotTable ? tableData.map(row => row.target) : []
      )
      if (this.menu()) {
        const selectedData = this.selectedData()
        const selectedDataLength = selectedData.length
        let fnDisable = paramMode => {
          if (paramMode == null) {
            return false
          }
          if (paramMode === 'disabled') {
            return true
          }
          if (paramMode !== 'none' && selectedDataLength === 0) {
            return true
          } else return paramMode === 'single' && selectedDataLength !== 1
        }
        this.menu().disableAction(fnDisable, selectedData, tableData)
      }
      this.$emit('afterOnChangeSelected')
    },
    selectedData() {
      return this.$refs.hotTable ? this.$refs.hotTable.getSelectedData() : []
    },
    selectedIndex() {
      return this.$refs.hotTable ? this.$refs.hotTable.getSelectedIndex() : []
    },
    loadDataTable() {
      this.$refs.hotTable && this.$refs.hotTable.loadData(this.data)
    },
    async onShowButtonSave() {
      this.showButtonSaveTable = true
    },
    onHideButtonSave() {
      this.showButtonSaveTable = false
    },
    async fnValidTable() {
      return this.$refs.hotTable.validateCells(false)
    },
    async fnSaveTable() {
      actionUtil.call(
        this,
        this.saveTableProcess,
        this.saveTableSuccess,
        this.saveTableError
      )
    },
    saveTableProcess() {
      return this.$store.dispatch(
        `${this.namespace}/${this.saveDataActionName}`,
        this.$refs.hotTable.getEditData()
      )
    },
    saveTableSuccess() {
      this.$emit('saveTableSuccess')
      miniToastr.success('更新が完了しました', '正常終了', this.toastFadeTime)
    },
    saveTableError(res) {
      defaultErrorHandle.call(this, res)
      res &&
        res.data &&
        res.updatedData &&
        this.$refs.hotTable.updateEditData(res.data.updatedData)
    },
    onAllowCollapse() {
      if (this.allowCollapse && this.title) {
        this.isShowTable = !this.isShowTable
      }
    }
  },
  watch: {
    data(value) {
      this.$refs.hotTable.loadData(value)
    },
    refMenu() {
      this.menu()._fnSelectedData = this.selectedData
    }
  }
}
</script>

<style scoped lang="scss">
.no-title {
  border: 0 !important;
  .card-body {
    padding: 0 !important;
  }
}
.fm-cursor-hand {
  cursor: pointer !important;
}
</style>
