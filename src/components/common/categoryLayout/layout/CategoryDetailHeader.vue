<template>
  <div class="animated fadeIn component-area">
    <b-row>
      <b-col md="12">
        <b-card class="header-menu-area">
          <div slot="header">
            <b-row class="header-menu">
              <b-col md="8" class="horizontal">
                <b-button
                  variant="link"
                  size="sm"
                  class="text-muted back-btn"
                  @click="onBack"
                >
                  <i class="fa fa-angle-left" aria-hidden="true"></i>
                </b-button>

                <div class="screen-title">
                  {{ screenTitle }}
                </div>

                <div class="item-detail-id">
                  {{ itemDetailId }}
                </div>
              </b-col>

              <b-col class="text-right" v-if="isShowLocalMenu">
                <slot name="local-menu">
                  <cat-local-menu
                    v-if="localMenu"
                    :namespace="namespace"
                    :localMenu="localMenu"
                    :mainComponent="$parent"
                    :fnSelectedData="fnSelectedData"
                  >
                    <template
                      v-for="(_, slot) of $scopedSlots"
                      v-slot:[slot]="scope"
                      :index="_"
                    >
                      <slot
                        :name="slot"
                        v-bind="scope"
                        v-if="localMenu[slot]"
                      />
                    </template>
                  </cat-local-menu>
                </slot>
              </b-col>
            </b-row>

            <b-row class="header-menu">
              <b-col md="2">
                <div class="screen-title"></div>
              </b-col>
              <b-col offset-md="8" md="2">
                <b-row>
                  <b-col
                    offset-md="9"
                    md="2"
                    class="text-right header-btn-area"
                  >
                    <slot name="local-menu">
                      <cat-action-menu
                        v-if="actionMenu"
                        :namespace="namespace"
                        :actionMenu="actionMenu"
                        :mainComponent="$parent"
                        :fnSelectedData="fnSelectedData"
                      >
                        <template
                          v-for="(_, slot) of $scopedSlots"
                          v-slot:[slot]="scope"
                          :index="_"
                        >
                          <slot
                            :name="slot"
                            v-bind="scope"
                            v-if="
                              (actionMenu.baseAction &&
                                actionMenu.baseAction[slot]) ||
                                (actionMenu.advanceAction &&
                                  actionMenu.advanceAction[slot])
                            "
                          />
                        </template>
                      </cat-action-menu>
                    </slot>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </div>

          <slot name="header-detail" :config="headerDetailConfig">
            <b-form>
              <b-row v-for="(row, index) in makeRows" :key="index">
                <b-col
                  v-for="(fieldConfig, field) in row"
                  :key="field"
                  :class="fieldConfig.class"
                  cols="auto"
                >
                  <b-form-group>
                    <label
                      class="parent-info-label"
                      :class="fieldConfig.labelClass"
                      >{{ fieldConfig.labelText }}</label
                    >
                    <div class="mt-1 mb-1">
                      {{
                        itemDetailData[field]
                          | dynamicFilter(
                            fieldConfig.filterName,
                            ...fieldConfig.filterParam
                          )
                      }}
                    </div>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-form>
          </slot>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import * as _ from 'lodash'
import CatLocalMenu from '@/components/common/categoryLayout/CatLocalMenu'
import CatActionMenu from '@/components/common/categoryLayout/CatActionMenu'
import { mapState } from '@/lib/store'

export default {
  name: 'CategoryDetailHeader',
  components: { CatLocalMenu, CatActionMenu },
  props: {
    screenTitle: {
      type: String,
      required: true
    },
    itemDetailId: {
      required: true
    },
    itemDetailData: {
      required: true
    },
    namespace: {
      type: String,
      required: true
    },
    localMenu: {
      type: Object
    },
    actionMenu: {
      type: Object
    },
    headerDetailConfig: {
      type: Object,
      required: true
    },
    isShowLocalMenu: {
      type: Boolean,
      default: true
    },
    rowSize: {
      type: Number,
      default: 6
    }
  },
  computed: {
    ...mapState(['checkOnBack'], () => 'document'),
    makeRows() {
      let rows = []
      let chunkSize = this.rowSize
      const fields = Object.keys(this.headerDetailConfig)
      for (let i = 0, l = fields.length; i < l; i += chunkSize) {
        const chunked = fields.slice(i, i + chunkSize)
        rows.push(_.pick(this.headerDetailConfig, chunked))
      }
      return rows
    }
  },
  methods: {
    onBack() {
      this.checkOnBack = true
      this.$router.back()
    },
    fnSelectedData() {
      return this.itemDetailData
    },
    checkOnBackFunc() {
      this.checkOnBack = true
    }
  },
  mounted() {
    window.addEventListener('popstate', this.checkOnBackFunc, false)
  },
  beforeDestroy() {
    window.removeEventListener('popstate', this.checkOnBackFunc)
  }
}
</script>

<style lang="scss" scoped>
.component-area {
  position: relative;
}
.header-menu-area {
  .parent-info-label {
    font-size: 0.76563rem;
    margin-bottom: 0;
  }
  .readonly-input {
    background-color: #fff;
    border: none;
    padding: 0;
  }
  .card-header {
    padding-bottom: 0 !important;
    .card-header-title {
      font-size: 1em;
    }
    .screen-title {
      padding-left: 4px;
    }
    .item-detail-id {
      padding-top: 2px;
      padding-left: 1.5em;
      font-size: 16px;
    }
  }
}

.horizontal {
  display: flex;
  align-content: flex-end;
}

.container-fluid {
  padding-bottom: 0 !important;
}
</style>
