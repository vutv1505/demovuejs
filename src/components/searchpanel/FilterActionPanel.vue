<template>
  <div class="px-3">
    <CRow class="mb-2" v-if="pageTitle || rightButtons">
      <div class="col-sm">
        <div v-if="pageTitle">
          <h3 class="lb-subtitle pl-2">
            <CIcon name="cil-square" class="mr-3 bg-white scale-2" />
            {{ pageTitle }}
          </h3>
        </div>
      </div>
      <div class="col-sm">
        <div class="d-flex justify-content-end w-100">
          <div>
            <CButton
              variant="outline"
              class="bg-white border-dark ml-2 btn-menu"
              :class="{ 'btn-menu-sm': size === 'sm' }"
              @click="button.clickEvent"
              :key="index"
              v-for="(button, index) in rightButtons"
              >{{ button.text }}
            </CButton>
          </div>
        </div>
      </div>
    </CRow>

    <CRow class="justify-content-between px-3">
      <div class="col-sm mb-2" v-if="leftButtons">
        <CButton
          variant="outline"
          class="bg-white border-dark mr-2 btn-menu"
          @click="button.clickEvent"
          :key="index"
          v-for="(button, index) in leftButtons"
          >{{ button.text }}
        </CButton>
      </div>
      <div
        class="d-flex justify-content-end align-items-center align-content-center mb-2 col-sm pr-0"
      >
        <CatTableFilter
          ref="inputFilter"
          class="mb-0 filter-table-width"
          v-if="hasInput"
          max-length="40"
          @filterTable="$emit('filterTable', $event)"
        />
        <CDropdown
          v-if="hasActionSetting"
          :disabled="disableSetting"
          :size="size"
          addTogglerClasses=" bg-white"
          :class="{
            'bg-gray-200 modal-border': disableSetting,
            'ml-1': size === 'sm',
            'ml-2': size !== 'sm'
          }"
        >
          <template #toggler-content>
            <CIcon size="sm" name="cilSettings" />
          </template>
          <template>
            <slot name="setting-items"></slot>
          </template>
        </CDropdown>
        <CButton
          :size="size"
          v-if="hasActionReload"
          v-on:click="onClickActionReload"
          class=" bg-white btn-setting "
          :class="{ 'ml-1': size === 'sm', 'ml-2': size !== 'sm' }"
        >
          <CIcon name="cilReload" class="action-icon" />
        </CButton>
        <CButton
          :size="size"
          v-if="hasActionDownload"
          :disabled="disableDownload"
          v-on:click="onClickActionDownload"
          class=" bg-white btn-setting"
          :class="{ 'ml-1': size === 'sm', 'ml-2': size !== 'sm' }"
        >
          <CIcon name="cilDataTransferDown" class="action-icon" />
        </CButton>
        <CDropdown
          ref="advanceFilter"
          :size="size"
          v-if="hasActionAdvanceFilter"
          :class="{ 'ml-1': size === 'sm', 'ml-2': size !== 'sm' }"
          placement="bottom-end"
          addMenuClasses="pt-0"
          :show.sync="isShowAdvanceFilter"
        >
          <template #toggler>
            <CButton :size="size" class="btn-setting bg-white">
              <CIcon size="sm" name="cilFilter" class="action-icon" />
            </CButton>
          </template>
          <template #default>
            <AdvancedFilterContainer
              :page-id="pageId"
              :current-filter-template="currentFilterTemplate"
              @onClickSearch="$emit('onClickSearchAdvance')"
              @onClickClose="closeAdvanceFilter"
              @onClickClear="$emit('onClickClearAdvance')"
              @onSelectedFilterTemplate="
                $emit('onSelectedFilterTemplate', $event)
              "
            >
              <template #dropdown-title
                >{{ advanceFilterTitle }}
              </template>
              <template>
                <slot name="advance-filter-body"></slot>
              </template>
            </AdvancedFilterContainer>
          </template>
        </CDropdown>
      </div>
    </CRow>
  </div>
</template>

<script>
import AdvancedFilterContainer from './AdvancedFilterContainer'
import CatTableFilter from '../../components/common/categoryLayout/CatTableFilter'

export default {
  name: 'FilterActionPanel',
  components: { CatTableFilter, AdvancedFilterContainer },
  props: {
    pageId: {
      type: String
    },
    pageTitle: {
      default: '',
      type: String
    },
    leftButtons: Array,
    rightButtons: Array,
    hasInput: {
      default: true,
      type: Boolean
    },
    hasActionSetting: {
      default: true,
      type: Boolean
    },
    disableSetting: {
      default: false,
      type: Boolean
    },
    disableDownload: {
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
    advanceFilterTitle: {
      default: '検索条件',
      type: String
    },
    currentFilterTemplate: {
      type: Object,
      default: () => {
        return {}
      }
    },
    size: {
      default: '',
      require: false,
      type: String
    }
  },
  data() {
    return {
      isShowAdvanceFilter: false
    }
  },
  methods: {
    closeAdvanceFilter() {
      this.isShowAdvanceFilter = false
    },
    onClickActionReload() {
      this.$refs.inputFilter.clear()
      this.$emit('onClickActionReload')
    },
    onClickActionDownload() {
      this.$emit('onClickActionDownload')
    },
    setKeepShowingAdvanceFilter(isKeepShowing) {
      if (isKeepShowing) {
        this.$refs.advanceFilter._backupHideFunc = this.$refs.advanceFilter.hide
        this.$refs.advanceFilter.hide = function() {}
      } else {
        if (this.$refs.advanceFilter._backupHideFunc) {
          this.$refs.advanceFilter.hide = this.$refs.advanceFilter._backupHideFunc
        }
      }
      setTimeout(() => {
        this.$refs.advanceFilter.$forceUpdate()
      }, 100)
    }
  }
}
</script>

<style scoped lang="scss">
.btn-setting {
  display: inline-flex;
  height: calc(2rem + 3px);
  padding: unset !important;
  align-items: center;
  &.btn-sm {
    height: 2rem !important;
  }
}

.action-icon {
  margin: unset;
  height: 1rem;
  width: calc(2rem + 3px) !important;
}

.btn-sm .action-icon {
  width: 2rem !important;
}

.filter-table-width {
  width: calc(21rem + 27px);
}

.btn-menu-sm {
  width: 113px;
}
</style>
