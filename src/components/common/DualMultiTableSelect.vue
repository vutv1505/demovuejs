<template>
  <div class="h-100">
    <b-row>
      <b-col>
        <label v-if="showSelectedTable"
          >{{ totalSelectedData }}件の商品を選択</label
        >
        <label v-else>検索結果件数：{{ allData.length }}件</label>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-handsontable
          ref="allTable"
          :settings="hotSettings"
          @click-checkbox-all="onClickSelectedAll"
          @change-selected-data="onChangeSelectedData"
        ></b-handsontable>
      </b-col>
    </b-row>
    <br />
    <b-row v-if="showSelectedTable">
      <b-col>
        <p class="divider-table py-1">{{ dividerSelectedTable }}</p>
      </b-col>
    </b-row>
    <b-row v-if="showSelectedTable">
      <b-col>
        <b-handsontable
          ref="selectedTable"
          :settings="selectedHotSetting"
          @click-checkbox-all="unSelectAll"
          @change-selected-data="unSelect"
        ></b-handsontable>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import BHandsontable from '@/components/handsontable/BHandsontable'
import * as _ from 'lodash'

export default {
  name: 'DualMultiTableSelect',
  components: {
    BHandsontable
  },
  data: function() {
    return {
      selectedHotSetting: null,
      totalSelectedData: 0,
      selectedMap: {},
      allData: []
    }
  },
  props: {
    hotSettings: {
      required: true
    },
    primaryKey: {
      type: [String, Function],
      required: true
    },
    showSelectedTable: {
      default: true
    },
    dividerSelectedTable: {
      type: String,
      default: '選択済み'
    }
  },
  created() {
    this.hotSettings.persistentState = false
    this.selectedHotSetting = _.cloneDeep(this.hotSettings)
  },
  computed: {
    primaryKeyFactory() {
      return typeof this.primaryKey === 'string'
        ? row => row[this.primaryKey]
        : this.primaryKey
    }
  },
  methods: {
    loadData(data) {
      this.allData = data
      this.loadAllTable()
    },
    loadAllTable() {
      const data = _.cloneDeep(this.allData)
      const selectedIdList = Object.keys(this.selectedMap)
      data.forEach(row => {
        const id = this.primaryKeyFactory(row).toString()
        if (selectedIdList.includes(id)) {
          row.target = true
          this.selectedMap[id] = row
        } else if (row.target) {
          this.selectedMap[id] = row
        }
      })
      this.$refs.allTable.loadData(data)
    },
    loadSelectedTable() {
      const selectedData = Object.keys(this.selectedMap).map(id => {
        this.selectedMap[id].target = true
        return this.selectedMap[id]
      })
      this.totalSelectedData = selectedData.length
      this.$refs.selectedTable &&
        setTimeout(() => this.$refs.selectedTable.loadData(selectedData, false))
      this.$emit('change-selected-data', selectedData)
    },
    unSelectAll() {
      Object.keys(this.selectedMap).forEach(id => {
        const rowData = this.selectedMap[id]
        delete this.selectedMap[this.primaryKeyFactory(rowData)]
      })
      this.loadAllTable()
      this.loadSelectedTable()
    },
    unSelect(cell) {
      if (cell && cell.source === 'edit') {
        const rowData = this.getRowData('selectedTable', cell.row)
        delete this.selectedMap[this.primaryKeyFactory(rowData)]
        this.loadSelectedTable()
      }
    },
    onClickSelectedAll(isCheck) {
      const allData = this.$refs.allTable.getData()
      allData.forEach(rowData => {
        if (isCheck) {
          this.selectedMap[this.primaryKeyFactory(rowData)] = rowData
        } else {
          delete this.selectedMap[this.primaryKeyFactory(rowData)]
        }
      })
      this.loadSelectedTable()
    },
    getRowData(refName, row) {
      const hotInstance = this.$refs[refName].$refs.hotTable.hotInstance
      return hotInstance.getSourceDataAtRow(hotInstance.toPhysicalRow(row))
    },
    onChangeSelectedData(cell) {
      if (cell && cell.row >= 0 && cell.source === 'edit') {
        const rowData = this.getRowData('allTable', cell.row)
        if (rowData) {
          if (rowData.target) {
            if (
              this.hotSettings.selectedMode &&
              this.hotSettings.selectedMode === 'single'
            ) {
              this.selectedMap = {}
            }
            this.selectedMap[this.primaryKeyFactory(rowData)] = rowData
          } else {
            this.selectedMap[this.primaryKeyFactory(rowData)].target = false
            delete this.selectedMap[this.primaryKeyFactory(rowData)]
          }
          this.loadSelectedTable()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.divider-table {
  text-align: center;
  background-color: rgb(202, 201, 199);
  font-weight: 600;
  border-radius: 5px;
}
</style>
