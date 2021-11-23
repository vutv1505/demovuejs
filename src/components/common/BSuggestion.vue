<template>
  <div>
    <b-form-input
      class="suggest-input"
      v-bind="$attrs"
      v-model="localValue"
      placeholder="検索ワードに該当する候補を出力します"
      autocomplete="off"
      @keyup="processKey"
      @keydown="processControl"
      @focus="open"
      @blur="close"
      :disabled="disabled"
    ></b-form-input>
    <b-spinner class="spinner" v-if="remoteProcess"></b-spinner>
    <v-suggest
      v-else
      ref="suggest"
      :data="localData"
      :show-field="showFieldFunction"
      @values="selectItem"
      v-model="vSuggestValue"
    />
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'BSuggestion',
  $_veeValidate: {
    value() {
      return this.getFieldId(this.localValue)
    }
  },
  data() {
    return {
      localValue: '',
      selectedId: null,
      vSuggestValue: '',
      localData: [],
      remoteProcess: null,
      isFocus: false,
      mapShowToId: {},
      mapIdToShow: {}
    }
  },
  props: {
    data: {
      type: Array,
      required: false
    },
    fnSearchData: {
      type: Function
    },
    delay: {
      default: 500
    },
    showField: {
      type: [String, Function, Array],
      required: true
    },
    idField: {
      type: String,
      default: 'id'
    },
    value: {},
    disabled: {
      type: Boolean,
      required: false
    }
  },
  async mounted() {
    this.initStyle()
    const _suggest = this.$refs.suggest
    const populate = _suggest.populate
    _suggest.populate = function() {
      if (_.isEmpty(_suggest.text)) {
        _suggest.list = _suggest.data
      } else {
        populate.call(_suggest)
      }
    }
    if (this.data) {
      this.localData = _.cloneDeep(this.data)
    } else {
      if (this.fnSearchData && this.value != null && this.value !== '') {
        this.localData = await this.fnSearchData(this.value)
      }
    }
    this.initData()
    document.body.addEventListener('keydown', this.whole)
    document.body.addEventListener('wheel', this.whole)
    document.body.addEventListener('click', this.clickToOpen)
  },
  methods: {
    initStyle() {
      const parentElement = this.$refs.suggest.$refs.input.parentElement
      parentElement.style.height = '0'
      parentElement.removeChild(parentElement.childNodes[2])
      this.$refs.suggest.$refs.input.style.height = '0'
      this.$refs.suggest.$refs.input.style.height = '0'
      this.$refs.suggest.$refs.input.style.padding = '0'
      this.$refs.suggest.$refs.input.style.margin = '0'
      this.$refs.suggest.$refs.input.tabIndex = '-1'
    },
    initData() {
      this.selectedId = this.value
      this.localData.forEach(item => {
        const showData = this.generateShowText(item)
        if (this.mapShowToId[showData]) {
          this.mapShowToId[showData].push(item[this.idField])
        } else {
          this.mapShowToId[showData] = [item[this.idField]]
        }
        this.mapIdToShow[item[this.idField]] = showData
        if (this.value === item[this.idField]) {
          this.localValue = showData
        }
      })
    },
    showFieldFunction(row) {
      if (
        (typeof this.showField === 'string' &&
          row[this.idField] !== row[this.showField]) ||
        _.isArray(this.showField)
      ) {
        return row[this.idField] + ': ' + this.generateShowText(row)
      } else {
        return this.generateShowText(row)
      }
    },
    async refactorSearchProcess() {
      this.localData = await this.fnSearchData(this.localValue)
      this.initData()
    },
    processKey(e) {
      if ([38, 40, 27, 9].includes(e.keyCode)) return
      const self = this
      if (this.fnSearchData) {
        if (![13].includes(e.keyCode)) {
          if (this.remoteProcess) {
            clearTimeout(this.remoteProcess)
          }
          this.remoteProcess = setTimeout(
            () =>
              this.refactorSearchProcess().finally(() => {
                self.remoteProcess = null
                setTimeout(() => {
                  self.initStyle()
                  self.open(e)
                })
              }),
            this.delay
          )
        } else if (this.remoteProcess === null && this.localData.length === 1) {
          this.$refs.suggest.selectItem(this.localData[0])
        }
      } else if (this.$refs.suggest) {
        if (![13].includes(e.keyCode)) {
          this.$refs.suggest.processKey(e)
        } else if (this.$refs.suggest.list.length === 1) {
          this.$refs.suggest.selectItem(this.$refs.suggest.list[0])
        }
      }
    },
    processControl(e) {
      this.$refs.suggest && this.$refs.suggest.processControl(e)
    },
    clickToOpen(e) {
      this.isFocus && this.open(e)
    },
    open(e) {
      if (this.$refs.suggest) {
        this.$refs.suggest.open(e)
      }
      this.isFocus = true
    },
    close() {
      this.isFocus = false
      if (!this.getFieldId(this.localValue)) {
        this.localValue = null
      }
      setTimeout(() => this.$emit('blur'), 200)
    },
    whole(e) {
      if (e.type === 'wheel' || e.key === 'Tab') {
        this.$refs.suggest.$refs.drop.whole(e)
      }
    },
    selectItem(item) {
      this.selectedId = item[this.idField]
      this.localValue = this.generateShowText(item)
      this.updateVSuggestValue(this.localValue)
    },
    getFieldId(showValue) {
      const listId = this.mapShowToId[showValue]
      if (listId) {
        if (listId.includes(this.selectedId)) {
          return this.selectedId
        } else {
          return listId[0]
        }
      } else {
        return null
      }
    },
    updateVSuggestValue(newValue) {
      this.vSuggestValue = null
      setTimeout(() => (this.vSuggestValue = newValue))
    },
    generateShowText(item) {
      if (typeof this.showField === 'string') {
        return item[this.showField]
      } else if (_.isArray(this.showField)) {
        let mergedField = ''
        _.forEach(this.showField, i => {
          mergedField += item[i]
        })
        return mergedField
      } else {
        return this.showField(item)
      }
    }
  },
  watch: {
    data(newData) {
      this.localData = _.cloneDeep(newData) || []
      this.initData()
    },
    async value(newValue) {
      this.selectedId = newValue
      if (!this.isFocus) {
        if (this.fnSearchData && newValue != null && newValue !== '') {
          this.localData = await this.fnSearchData(newValue)
          this.initData()
        }
        if (this.localValue !== this.mapIdToShow[newValue]) {
          this.localValue = this.mapIdToShow[newValue]
        }
      }
    },
    localValue(newValue) {
      if (this.vSuggestValue !== newValue) {
        this.updateVSuggestValue(newValue)
      }
      const fieldId = this.getFieldId(newValue)
      if (fieldId !== this.selectedId) {
        this.selectedId = fieldId
      }
    },
    selectedId(newValue) {
      if (newValue !== this.value) {
        this.$emit('input', newValue)
      }
    }
  },
  destroyed() {
    document.body.removeEventListener('keydown', this.whole)
    document.body.removeEventListener('wheel', this.whole)
    document.body.removeEventListener('click', this.clickToOpen)
  }
}
</script>

<style scoped>
.spinner {
  margin: 7px;
}
</style>
