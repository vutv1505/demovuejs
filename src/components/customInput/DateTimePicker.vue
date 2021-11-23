<template>
  <div class="position-relative">
    <date-time-picker
      class="form-control"
      :class="{ 'is-invalid': !isValid, valid: isValid }"
      v-bind="$attrs"
      :param-mode="paramMode"
      v-model="dtValue"
      :config="dtConfigs"
      autocomplete="off"
      @focus.native="$emit('onFocus')"
      @blur.native="$emit('onBlur')"
    ></date-time-picker>
  </div>
</template>

<script>
import DateTimePicker from 'vue-bootstrap-datetimepicker'
import moment from 'moment'

export default {
  name: 'DateTimePicker',
  $_veeValidate: {
    value() {
      return this.dtValue
    }
  },
  components: {
    'date-time-picker': DateTimePicker
  },
  props: {
    paramMode: {
      default: 'dateTime',
      type: String
    },
    format: {
      type: String
    },
    outputFormat: {
      type: String
    },
    value: {},
    isValid: { type: Boolean, default: true }
  },
  created() {
    this.format && (this.dtConfigs.format = this.format)
    if (!this.dtConfigs.format) {
      if (this.paramMode === 'yearMonth') {
        this.dtConfigs.format = 'YYYY/MM'
      } else if (this.paramMode === 'dateTime') {
        this.dtConfigs.format = 'YYYY/MM/DD HH:mm'
      } else {
        this.dtConfigs.format =
          this.paramMode === 'date' ? 'YYYY/MM/DD' : 'HH:mm:ss'
      }
    }
  },
  data() {
    return {
      dtValue: this.value,
      dtConfigs: {
        locale: 'ja',
        dayViewHeaderFormat: 'YYYY年 M月',
        format: '',
        showTodayButton: true,
        showClear: true,
        showClose: true,
        useCurrent: false,
        widgetPositioning: {
          horizontal: 'auto',
          vertical: 'auto'
        }
      }
    }
  },
  watch: {
    value(newValue) {
      this.dtValue = newValue
    },
    dtValue(newValue) {
      if (newValue) {
        this.$emit(
          'input',
          moment(newValue).format(this.outputFormat || this.dtConfigs.format)
        )
      } else {
        this.$emit('input', null)
      }
    }
  }
}
</script>

<style lang="scss">
@import '~pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

.bootstrap-datetimepicker-widget table td.old,
.bootstrap-datetimepicker-widget table td.new {
  color: inherit;
  opacity: 0.4;
}
.bootstrap-datetimepicker-widget .datepicker-days table td:nth-child(1) {
  color: #ff0000;
}
.bootstrap-datetimepicker-widget .datepicker-days table td:nth-child(7) {
  color: #00c0ff;
}
</style>
