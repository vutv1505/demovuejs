<template>
  <b-form-input
    class="text-right"
    v-model="localValue"
    v-bind="$attrs"
    @blur="isEditing = false"
    @focus="isEditing = true"
    :maxlength="maxlength"
  ></b-form-input>
</template>

<script>
import { numberFormat } from '@/lib/format'

const stringToNumber = str => {
  if (str === '-') {
    return 0
  }
  if (str != null && String(str).trim().length > 0) {
    const numberValue = Number(str.replace(/,/g, ''))
    return Number.isNaN(numberValue) ? null : numberValue
  } else {
    return null
  }
}
export default {
  name: 'NumberInput',
  $_veeValidate: {
    value() {
      return stringToNumber(this.localValue)
    }
  },
  props: {
    value: {
      type: Number
    },
    decimalPart: {
      type: Boolean,
      default: false
    },
    decimalLength: {
      type: Number
    },
    maxlength: {
      type: String,
      default: '9999'
    }
  },
  data() {
    return {
      isEditing: false,
      localValue: this.value == null ? '' : this.formatData(this.value)
    }
  },
  methods: {
    formatData(value) {
      if (/^-?0?(\.0*)?$/.test(value)) {
        return value
      }
      const formattedValue = numberFormat(value, {
        thousandSeparated: true
      })
      return String(value).endsWith('.') ? `${formattedValue}.` : formattedValue
    },
    checkValidInput(text) {
      if (text == null) {
        return true
      }
      if (text.replace(/-|,|\..*/g, '').length > 15) {
        return false
      }
      let pattern = '^-?(\\d*|\\d{0,2}[,\\d{3}]*)'
      if (this.decimalPart === true) {
        pattern = pattern.concat(`(\\.\\d*)?`)
      } else if (typeof this.decimalLength === 'number') {
        pattern = pattern.concat(`(\\.\\d{0,${this.decimalLength}})?`)
      }
      return new RegExp(`${pattern}$`).test(text)
    }
  },
  watch: {
    value(newValue) {
      if (!this.isEditing) {
        if (newValue == null) {
          this.localValue = null
        } else {
          if (String(newValue) !== this.localValue) {
            this.localValue = numberFormat(newValue, this.pattern)
          }
        }
      }
    },
    localValue(newValue, oldValue) {
      if (!this.checkValidInput(newValue)) {
        setTimeout(() => (this.localValue = oldValue))
        return
      } else {
        const formattedValue = this.formatData(newValue)
        newValue !== formattedValue &&
          setTimeout(() => (this.localValue = formattedValue))
      }
      if (stringToNumber(newValue) !== this.value) {
        this.$emit('input', stringToNumber(newValue))
      }
    }
  }
}
</script>

<style scoped></style>
