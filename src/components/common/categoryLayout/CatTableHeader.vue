<template>
  <b-card class="header-menu-area" no-body>
    <b-card-header>
      <b-row class="header-menu">
        <b-col cols="2">
          <span class="screen-title">{{ screenName }}</span>
        </b-col>
        <b-col cols="2">
          <cat-condition-list
            :namespace="namespace"
            @changeCurrentCondIdx="$emit('changeCurrentCondIdx')"
          ></cat-condition-list>
        </b-col>
        <b-col cols="3">
          <cat-table-filter
            @filterTable="$emit('filterTable', $event)"
          ></cat-table-filter>
        </b-col>
        <b-col cols="5" class="text-right">
          <slot name="local-menu">
            <cat-local-menu
              ref="localMenuElem"
              :namespace="namespace"
              :localMenu="localMenu"
              :mainComponent="mainComponent"
              :fnSelectedData="fnSelectedData"
            >
              <template
                v-for="(_, slot) of $scopedSlots"
                v-slot:[slot]="scope"
                :index="_"
                ><slot :name="slot" v-bind="scope" v-if="localMenu[slot]"
              /></template>
            </cat-local-menu>
          </slot>
        </b-col>
      </b-row>

      <b-row class="header-menu">
        <b-col>
          <slot name="header-info">
            <div v-show="totalData" class="data-list-count mt-1">
              検索結果件数：{{ numberFormat(totalData) }}件
              <slot name="more-info-header"></slot>
            </div>
          </slot>
        </b-col>
        <b-col cols="auto" align-self="end" class="text-right header-btn-area">
          <slot name="action-menu">
            <cat-action-menu
              ref="actionMenuElem"
              :namespace="namespace"
              :actionMenu="actionMenuWithFilterTable()"
              :mainComponent="mainComponent"
              :fnSelectedData="fnSelectedData"
              @filterTable="$emit('filterTable', $event)"
            >
              <template
                v-for="(_, slot) of $scopedSlots"
                v-slot:[slot]="scope"
                :index="_"
              >
                <slot :name="slot" v-bind="scope"> </slot>
              </template>
            </cat-action-menu>
          </slot>
        </b-col>
      </b-row>
    </b-card-header>
  </b-card>
</template>

<script>
import { mapGetters } from '@/lib/store'
import CatLocalMenu from './CatLocalMenu'
import CatActionMenu from './CatActionMenu'
import CatConditionList from './CatConditionList'
import CatTableFilter from './CatTableFilter'
import { mapActions } from '@/lib/store'

export default {
  name: 'CatTableHeader',
  components: {
    CatConditionList,
    CatActionMenu,
    CatLocalMenu,
    CatTableFilter
  },
  props: {
    namespace: {
      type: String,
      required: true
    },
    screenName: {
      type: String,
      required: true
    },
    localMenu: {
      type: Object
    },
    actionMenu: {
      type: Object
    },
    fnSelectedData: {
      type: Function,
      required: true
    },
    kikankesaCondition: {
      type: Object,
      required: true
    },
    mainComponent: {}
  },
  computed: {
    ...mapGetters(['totalData'])
  },
  created() {
    this.getKikankesaTable(this.kikankesaCondition)
  },
  methods: {
    ...mapActions(['getKikankesaTable']),
    actionMenuWithFilterTable() {
      if (
        this.actionMenu.baseAction &&
        this.actionMenu.baseAction.advanceAction == null &&
        this.actionMenu.advanceAction
      ) {
        this.actionMenu.baseAction = {
          advanceAction: true,
          ...this.actionMenu.baseAction
        }
      }
      if (this.actionMenu && this.actionMenu.baseAction.filterTable == null) {
        this.actionMenu.baseAction = {
          filterTable: true,
          ...this.actionMenu.baseAction
        }
      }
      return this.actionMenu
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/variables';
.header-menu-area {
  .card-header {
    .card-header-title {
      font-size: 1em;
    }
    .screen-title {
      width: 100%;
    }
    .direct-search {
      height: calc(1.5em + 0.5rem + 2px) !important;
      align-self: center;
    }
    .right-panel-open {
      background-color: $chinese-blue;
      color: $meringue !important;
    }
  }
}
.header-menu {
  .fa {
    font-size: 16px;
  }
  .card-header-actions {
    margin-top: 8px;
  }
  .text-muted {
    background-color: #fff;
    border-color: #c8ced3;
    margin-left: 4px;
  }
  .data-list-count {
    padding-top: 7px;
  }
}

.horizontal {
  display: flex;
  align-content: flex-end;
}

.filter-word {
  display: inline-block;
  font-style: normal;
  font-weight: normal;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
