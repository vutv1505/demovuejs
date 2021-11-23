<template>
  <b-modal
    v-model="isSyohinModalOpen"
    visible
    class="syohin-modal"
    id="modal-scoped"
    size="xl"
    scrollable
    title="商品選択"
    ok-title="保存"
    ref="syohinModal"
    ok-variant="primary btn-sm"
    cancel-title="キャンセル"
    cancel-variant="outline-primary btn-sm"
    @ok="selectedSyohin"
    @hidden="hiddenModal"
    @cancel="cancel"
    no-close-on-backdrop
    no-close-on-esc
    @shown="onShown"
  >
    <!-- <b-row>
      <b-col>
        <div v-show="syohinCnt" class="hit-cnt">{{ syohinCnt }}件の商品が選択されました</div>
      </b-col>
    </b-row>-->
    <form ref="form">
      <b-row>
        <b-col md="3">
          <div class="search-key-area">
            <b-input-group>
              <b-form-input
                size="sm"
                id="searchKey"
                v-model="searchKey"
              ></b-form-input>
              <b-input-group-prepend>
                <b-button
                  size="sm"
                  variant="primary"
                  class="input-right-search"
                  @click="syohinSearch()"
                >
                  <i class="fa fa-search syohin-search-btn"></i>
                </b-button>
              </b-input-group-prepend>
            </b-input-group>
          </div>
        </b-col>
      </b-row>
      <!-- <b-row>
        <b-col>
          <div v-show="selectedSyohinCnt" class="selected-cnt">{{ selectedSyohinCnt }}件の商品が選択されました</div>
        </b-col>
      </b-row>-->
      <b-row>
        <b-col>
          <div class="syohin-modal-hot">
            <hot-table :root="root" :settings="modalHotSettings"></hot-table>
          </div>
        </b-col>
      </b-row>
    </form>
  </b-modal>
</template>

<script>
import miniToastr from 'mini-toastr'
import { HotTable } from '@handsontable/vue'
import modal from '@/lib/modal'

export default {
  name: 'SyohinModal',
  components: {
    HotTable
  },
  props: {
    isSyohinModalOpen: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data: () => ({
    root: 'testHot',
    syohinCnt: 1,
    selectedSyohinCnt: 1,
    searchKey: '',
    readonly: true,
    modalTitle: '商品選択',
    modalHotSettings: {
      width: 'auto',
      height: 'auto',
      rowHeaders: true,
      data: [
        {
          target: false,
          syohincd: null,
          jancd: null,
          syohinkbn: {
            value: null,
            text: ''
          },
          syohinkouseikbn: {
            value: null,
            text: ''
          },
          syohinjokbn: {
            value: null,
            text: ''
          },
          syohinme: ''
        }
      ],
      colHeaders: index => {
        return [
          '',
          '商品CD',
          'JANCD',
          '商品区分',
          '商品構成',
          '商品状態',
          '商品名'
        ][index]
      },
      columns: [
        {
          // 先頭のチェックボックス
          width: 40,
          type: 'checkbox',
          data: 'target',
          className: 'selected-rec htCenter',
          readOnly: false
        },
        {
          // 商品CD
          width: 200,
          type: 'text',
          data: 'syohincd',
          className: 'syohincd'
        },
        {
          // JANCD
          width: 200,
          type: 'text',
          data: 'jancd',
          className: 'jancd'
        },
        {
          // 商品区分
          width: 160,
          type: 'text',
          data: 'syohinkbn.text',
          className: 'syohinkbn'
        },
        {
          // 商品構成
          width: 160,
          type: 'text',
          data: 'syohinkouseikbn.text',
          className: 'syohinkouseikbn'
        },
        {
          // 商品状態
          width: 160,
          type: 'text',
          data: 'syohinjokbn.text',
          className: 'syohinjokbn'
        },
        {
          // 商品名
          readOnly: false,
          width: 580,
          type: 'text',
          data: 'syohinme',
          className: 'syohinme'
        }
      ],
      beforeRenderer: function(isForced) {
        const self = this.rootElement.__vue__.$parent
        hotInstance = this

        self.hotRef = this
      },
      manualColumnResize: true,
      manualColumnMove: true,
      columnSorting: true,
      sortIndicator: true,
      copyPaste: false,
      enterBeginsEditing: false, // enterで次の行へ
      contextMenu: false, // 右クリックメニュー
      readOnly: true, // 読み取り専用
      language: 'ja-JP',
      dropdownMenu: true,
      filters: true,
      // enterMoves: { row: 0, col: 1 },
      // stretchH: 'all',
      licenseKey: 'non-commercial-and-evaluation'
    },
    hotRef: null
  }),
  mounted() {
    miniToastr.init()
    // console.table(this.$refs.testHot)
    // this.hotRef = this.$refs.testHot.hotInstance
  },
  methods: {
    syohinSearch() {
      this.$store.dispatch('common/syohinSearch').catch(e => {
        throw new Error(e)
      })
    },
    refreshHandsOnTable() {
      if (this.syohinList && this.syohinList.length > 0) {
        // this.hotRef.loadData(this.syohinList)
        hotInstance.loadData(this.syohinList)
        setTimeout(() => {
          // this.hotRef.loadData(this.syohinList)
          hotInstance.loadData(this.syohinList)
        }, 100)
      }
    },
    hiddenModal() {
      this.$emit('closeSyohinModal')
    },
    selectedSyohin(e) {
      const tableData = hotInstance.getSourceData()
      const selectedRec = tableData.filter(rec => rec.target)
      e.preventDefault()
      this.$emit('selectedSyohin', selectedRec)
      this.hiddenModal()
      this.$refs.syohinModal.hide()
      this.isHistoryModalOpen = false
    },
    cancel() {
      this.$emit('closeSyohinModal')
    },
    onShown() {
      modal(this.$refs.syohinModal.$refs)
    }
  },
  computed: {
    toastFadeTime() {
      return this.$store.getters['common/toastFadeTime']
    },
    syohinList() {
      return this.$store.getters['common/syohinList']
    }
  },
  watch: {
    syohinList() {
      this.refreshHandsOnTable()
    }
  }
}
let hotInstance = null
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';

.modal-title {
  margin: 0 auto;

  .close {
    margin: -1rem -1rem -1rem 0;
  }
}

.search-key-area {
  margin-bottom: 1em;
}
</style>
