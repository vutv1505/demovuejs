<template>
  <div>
    <filter-action-panel
      ref="actionPanel"
      :page-title="pageTitle"
      :page-id="pageId"
      @onClickSearchAdvance="$emit('onClickSearchAdvance')"
      @onClickClearAdvance="$emit('onClickClearAdvance')"
      @onClickActionReload="actionReload"
      @onClickActionDownload="actionDownload"
      @onSelectedFilterTemplate="$emit('onSelectedFilterTemplate', $event)"
      @filterTable="filterTable"
      :has-input="hasInput"
      :has-action-setting="hasActionSetting"
      :has-action-reload="hasActionReload"
      :has-action-download="hasActionDownload"
      :has-action-advance-filter="hasActionAdvanceFilter"
      :disable-setting="disableSetting"
      :disable-download="disableDownload"
      :size="searchGroupSize"
      :left-buttons="leftButtons"
      :right-buttons="rightButtons"
      :current-filter-template="currentFilterTemplate"
    >
      <template
        v-for="(_, slot) of $scopedSlots"
        v-slot:[slot]="scope"
        :index="_"
      >
        <slot :name="slot" v-bind="scope" />
      </template>
    </filter-action-panel>
    <div
      class="table-container"
      :class="{
        'horizontal-scroll-table': horizontalScroll,
        'vertical-scroll-table': verticalScroll
      }"
    >
      <c-data-table
        ref="cDataTable"
        :class="tableClass"
        :items="tableItems"
        :fields="tableHeaders"
        :loading="isLoading"
        outlined
        striped
        :activePage="currentPage"
        :itemsPerPage="itemsPerPage"
        @pages-change="totalPages = $event"
        :size="'sm'"
        :responsive="tableResponsive"
        :noItemsView="{ noResults: noItemMessage, noItems: noItemMessage }"
        @filtered-items-change="onFilterChange"
      >
        <template
          v-for="(_, slot) of $scopedSlots"
          v-slot:[slot]="scope"
          :index="_"
        >
          <slot :name="slot" v-bind="scope" />
        </template>
      </c-data-table>
    </div>
    <div
      class="pagination-container"
      :class="paginationContainerClass"
      v-if="pagination"
    >
      <CPagination
        v-show="true"
        :active-page.sync="currentPage"
        :pages="totalPages"
        align="center"
        @update:activePage="$emit('update:activePage')"
      />
    </div>
  </div>
</template>

<script>
import FilterActionPanel from '../searchpanel/FilterActionPanel'
import * as Papa from 'papaparse'
import * as _ from 'lodash'
import FileUtils from '../../lib/file-utils'
import { TSV } from '../../lib/file-utils'

export default {
  name: 'CommonTableFilterLayout',
  components: { FilterActionPanel },
  props: {
    pageTitle: {
      default: '',
      type: String
    },
    pageId: {
      type: String
    },
    tableItems: {
      type: Array,
      require: true
    },
    tableHeaders: {
      type: Array,
      require: false
    },
    isLoading: {
      type: Boolean,
      require: true,
      default: false
    },
    itemsPerPage: {
      type: Number,
      require: true,
      default: 15
    },
    pagination: {
      type: Boolean,
      require: true,
      default: false
    },
    searchGroupSize: {
      type: String,
      require: false,
      default: ''
    },
    tableResponsive: {
      type: Boolean,
      default: true
    },
    tableClass: {
      type: [String, Array, Object],
      require: false,
      default: 'bg-white'
    },
    paginationContainerClass: String,
    hasInput: {
      default: true,
      type: Boolean
    },
    disableSetting: {
      default: false,
      type: Boolean
    },
    hasActionReload: {
      default: true,
      type: Boolean
    },
    hasActionDownload: {
      default: true,
      type: Boolean
    },
    hasActionAdvanceFilter: {
      default: true,
      type: Boolean
    },
    hasActionSetting: {
      default: true,
      type: Boolean
    },
    leftButtons: Array,
    rightButtons: Array,
    currentFilterTemplate: {
      type: Object,
      default: () => {
        return {}
      }
    },
    horizontalScroll: {
      default: false,
      type: Boolean
    },
    verticalScroll: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      currentPage: 1,
      totalPages: 1,
      disableDownload: true,
      noItemMessage: '対象データが存在しません。'
    }
  },
  created() {
    if (!this.pagination) {
      this.currentPage = 0
    }
  },
  methods: {
    filterTable(filterWord) {
      this.$refs.cDataTable.tableFilterChange(filterWord)
    },
    setKeepShowingAdvanceFilter(isKeepShowing) {
      this.$refs.actionPanel.setKeepShowingAdvanceFilter(isKeepShowing)
    },
    actionReload() {
      this.currentPage = 1
      this.$emit('onClickActionReload')
    },
    actionDownload() {
      this.downloadCSV()
      this.$emit('onClickActionDownload')
    },
    onFilterChange(sortedItems) {
      this.disableDownload = _.isEmpty(sortedItems)
    },
    downloadCSV() {
      if (this.tableItems && this.tableHeaders) {
        if (this.disableDownload) {
          return
        }
        const fileName = `${this.pageId}_${new Date().getTime()}.${TSV}`
        // Build header
        const csvHeaders = this.tableHeaders
          .map(({ label }) => label)
          .filter(label => label)
        const csvColumn = this.tableHeaders.map(({ key }) => key)

        const arrCsvData = _.map(this.$refs.cDataTable.sortedItems, item =>
          _.chain(item)
            .pick(csvColumn) // Keep only prop in csvColumn: {col1: "val1", col2: "val2", col3: "val3"} to {col1: "val1", col2: "val2"}
            .values() // Convert from {col1: "val1", col2: "val2"} to ["val1", "val2"]
            .value()
        )
        const strCsvContent = Papa.unparse(
          { fields: csvHeaders, data: arrCsvData },
          { quotes: false, delimiter: '\t', header: true }
        )
        FileUtils.downloadFile(fileName, strCsvContent)
      }
    }
  }
}
</script>

<style scoped></style>
