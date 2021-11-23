<template>
  <div>
    <b-form-input
      @blur="searchData"
      @input="onInput"
      v-bind="$attrs"
      v-model="localValue"
    ></b-form-input>
    <b-row v-if="showSuggest">
      <b-col class="no-padding-right">
        <b-handsontable
          ref="hotTable"
          :settings="hotSettings"
          :root="root"
          @mounted="loadTableData"
        ></b-handsontable
      ></b-col>
      <b-col sm="auto" class="no-padding-left">
        <button @click="showSuggest = false">X</button>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import BHandsontable from '@/components/handsontable/BHandsontable'
import { mapGetters, mapState } from '@/lib/store'

export default {
  name: 'FillFieldInput',
  components: { BHandsontable },
  props: {
    value: {}
  },
  data() {
    return {
      resultData: [],
      localValue: this.value,
      hotRef: null,
      showSuggest: false,
      hotSettings: {},
      root: {}
    }
  },
  watch: {
    value(newVal) {
      if (newVal !== this.localValue) {
        this.localValue = newVal
      }
    }
  },
  mounted() {
    const self = this
    this.hotSettings.rowHeaders = false
    this.hotSettings.readOnly = true
    this.hotSettings.selectionMode = 'single'
    this.hotSettings.stretchH = 'all'
    this.hotSettings.afterSelection = function(row) {
      self.showSuggest = false
      self.$emit('selectedData', self.$refs.hotTable.getData()[row])
    }

    if (this.value !== this.localValue) {
      this.localValue = this.value
    }
  },
  methods: {
    async searchData() {
      let result = await this.fnSearchData(this.localValue)
      if (result && Array.isArray(result) && result.length > 1) {
        this.resultData = result
        this.showSuggest = true
      } else {
        this.resultData = []
        this.showSuggest = false
        result = Array.isArray(result) ? result[0] : result
        this.$emit('selectedData', result)
      }
    },
    loadTableData() {
      this.$refs.hotTable.loadData(this.resultData)
    },
    handleOk() {
      this.showSuggest = false
      this.$emit(
        'selectedData',
        this.$refs.hotTable.getData().find(item => item.target)
      )
    },
    onInput(event) {
      this.$emit('input', event)
    }
  }
}
</script>
<style scoped></style>
