<template>
  <div class="h-100">
    <b-row
      class="m-0"
      v-for="(row, rowId) in rows"
      :key="rowId"
      :class="row.class"
    >
      <b-col
        v-for="(col, colId) in row.cols"
        :key="colId"
        :md="col.size || (colId === 'divide' ? 12 : 6)"
        :class="col.class"
      >
        <slot :name="'col-' + colId">
          <div
            v-if="colId === 'divide'"
            :class="col.labelClass || 'divide-bar'"
          >
            {{ col.label }}
          </div>
          <div v-else-if="colId === 'space'"></div>
          <div v-else class="detail-container">
            <div :class="labelClass(col)">
              {{ col.label }}
            </div>
            <slot
              v-if="colId !== 'divide'"
              :name="'col-value' + colId"
              :value="data[colId]"
            >
              <div
                v-if="col.type && col.type === 'checkbox'"
                :class="valueClass(col)"
              >
                <i
                  v-if="
                    (col.unCheckedValue &&
                      data[colId] !== col.unCheckedValue) ||
                      (!col.unCheckedValue && data[colId])
                  "
                  class="fa fa-check fa-lg btn-outline-success"
                ></i>
                <i v-else class="fa fa-times fa-lg btn-outline-danger"></i>
              </div>
              <div
                v-else-if="col.type && col.type === 'textarea'"
                :class="valueClass(col)"
              >
                <textarea
                  v-text="data[colId]"
                  rows="15"
                  cols="230"
                  readonly
                ></textarea>
              </div>
              <div
                v-else-if="col.type && col.type === 'link'"
                :class="valueClass(col)"
              >
                <b-link @click="col.onClick(data[colId], data)">{{
                  data[colId]
                    | dynamicFilter(col.filterName, ...col.filterParam)
                }}</b-link>
              </div>
              <div v-else :class="valueClass(col)">
                {{
                  data[colId]
                    | dynamicFilter(col.filterName, ...col.filterParam)
                }}
              </div>
            </slot>
          </div>
        </slot>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'CatLessonDetailBody',
  props: {
    rows: {
      required: true
    },
    data: {
      required: false
    }
  },
  methods: {
    labelClass(col) {
      let labelClass = col.labelClass || 'detail-label'
      if (col.labelSize) {
        labelClass += ' col-md-' + col.labelSize
      } else if (col.size === 12) {
        labelClass += ' col-md-2'
      } else {
        labelClass += ' col-md-4'
      }
      labelClass += ' pb-1'
      return labelClass
    },
    valueClass(col) {
      let valueClass = col.valueClass || 'detail-item'
      if (col.labelSize) {
        valueClass += ' col-md-' + (12 - col.labelSize)
      } else if (col.size === 12) {
        valueClass += ' col-md-10'
      } else {
        valueClass += ' col-md-8'
      }
      if (col.type === 'textarea') {
        valueClass += ' pb-2'
      } else {
        valueClass += ' pb-1'
      }
      return valueClass
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-container {
  display: flex;
  padding: 0 10px 0 5px;
  margin-top: 24px;
  font-size: 12px;
  &.first-row {
    margin-top: 8px;
  }
  &.last-row {
    margin-bottom: 16px;
  }
  .detail-label {
    width: 100%;
    max-width: 200px;
    font-weight: bold !important;
    padding-left: 10px;
    border-bottom: solid 1px rgb(221, 219, 218);
  }
  .detail-item {
    width: 100%;
    padding-left: 0;
    border-bottom: solid 1px rgb(221, 219, 218);
  }
}

.divide-bar {
  margin-top: 16px;
  padding: 2px 8px;
  border-radius: 4px;
  background-color: rgb(242, 242, 242);
}

.fm-hidden {
  display: none !important;
}
</style>
