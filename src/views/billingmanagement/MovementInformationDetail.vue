<template>
  <CModal
    :show.sync="isShow"
    :closeOnBackdrop="false"
    :centered="true"
    size="xl"
  >
    <template #header-wrapper>
      <div class="w-100 h-100 header-container modal-border">
        <h6 class="text-center m-auto font-weight-bold">在庫移動情報詳細</h6>
      </div>
    </template>
    <template #body-wrapper>
      <c-scrollbar class="modal-body modal-border-left modal-border-right">
        <div class="body-item-header font-weight-bold">商品情報</div>
        <div class="px-3 py-1">
          <CRow class="px-3 pb-1">
            <div class="col-sm">商品番号 ：{{ detailData.item_number }}</div>
            <div class="col-sm">商品名 ：{{ detailData.product_name }}</div>
          </CRow>
        </div>
        <div class="px-3 py-1">
          <CRow class="px-3 pb-1">
            <div class="col-sm">ロット番号 ：{{ detailData.lot_number }}</div>
            <div class="col-sm">保管先 ：{{ detailData.storage_location }}</div>
          </CRow>
        </div>
        <div class="px-3 py-1">
          <CRow class="px-3 pb-1">
            <div class="col-sm">
              現在在庫数量 ：12,345,678
            </div>
            <div class="col-sm">
              最終在庫移動日 ：{{ detailData.transfer_date }}
            </div>
          </CRow>
        </div>
        <div class="body-item-header font-weight-bold">移動履歴詳細</div>
        <div class='mt-3'>
          <common-table-filter-layout
            ref="tableFilterLayout"
            vertical-scroll
            horizontal-scroll
            class="px-3"
            :hasActionAdvanceFilter="false"
            :tableResponsive="false"
            :table-items="tableItems"
            :table-headers="tableHeaders"
            :is-loading="isLoading"
          >
          </common-table-filter-layout>
        </div>
      </c-scrollbar>
    </template>
  </CModal>
</template>
<script>
import _ from 'lodash'
import CommonTableFilterLayout from '../../components/layouts/CommonTableFilterLayout'
export default {
  components: {
    CommonTableFilterLayout
  },
  data() {
    return {
      detailData: {},
      isShow: false,
      tableHeaders: [
        {
          key: 'index',
          label: 'No.',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center; width:5%'
        },
        {
          key: 'entry_date',
          label: '入出庫日',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center; width:10%'
        },
        {
          key: 'reason_movement',
          label: '移動理由区分',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center; width:17%'
        },
        {
          key: 'moving_source',
          label: '移動元',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center; width:17%'
        },
        {
          key: 'destination',
          label: '移動先',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center; width:17%'
        },
        {
          key: 'quantity',
          label: '移動数量',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center; width:10%'
        },
        {
          key: 'note',
          label: 'メモ',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        }
      ],
      tableItems: [
        {
          index: 1,
          entry_date: '2021/07/15',
          reason_movement: '仕入返品入庫',
          moving_source: 'オルビス本社倉庫',
          destination: '日本ｺﾙﾏｰ㈱(化)',
          quantity: 2,
          note: '',
        },
        {
          index: 2,
          entry_date: '2021/07/15',
          reason_movement: '仕入返品入庫',
          moving_source: 'オルビス本社倉庫',
          destination: '日本ｺﾙﾏｰ㈱(化)',
          quantity: 2,
          note: '',
        },
        {
          index: 3,
          entry_date: '2021/07/15',
          reason_movement: '仕入返品入庫',
          moving_source: 'オルビス本社倉庫',
          destination: '日本ｺﾙﾏｰ㈱(化)',
          quantity: 2,
          note: '',
        },
        {
          index: 4,
          entry_date: '2021/07/15',
          reason_movement: '仕入返品入庫',
          moving_source: 'オルビス本社倉庫',
          destination: '日本ｺﾙﾏｰ㈱(化)',
          quantity: 2,
          note: '',
        },
        {
          index: 5,
          entry_date: '2021/07/15',
          reason_movement: '仕入返品入庫',
          moving_source: 'オルビス本社倉庫',
          destination: '日本ｺﾙﾏｰ㈱(化)',
          quantity: 2,
          note: '',
        },
        {
          index: 6,
          entry_date: '2021/07/15',
          reason_movement: '仕入返品入庫',
          moving_source: 'オルビス本社倉庫',
          destination: '日本ｺﾙﾏｰ㈱(化)',
          quantity: 2,
          note: '',
        },
        {
          index: 7,
          entry_date: '2021/07/15',
          reason_movement: '仕入返品入庫',
          moving_source: 'オルビス本社倉庫',
          destination: '日本ｺﾙﾏｰ㈱(化)',
          quantity: 2,
          note: '',
        },
        {
          index: 8,
          entry_date: '2021/07/15',
          reason_movement: '仕入返品入庫',
          moving_source: 'オルビス本社倉庫',
          destination: '日本ｺﾙﾏｰ㈱(化)',
          quantity: 2,
          note: '',
        },
        {
          index: 9,
          entry_date: '2021/07/15',
          reason_movement: '仕入返品入庫',
          moving_source: 'オルビス本社倉庫',
          destination: '日本ｺﾙﾏｰ㈱(化)',
          quantity: 2,
          note: '',
        },
        {
          index: 10,
          entry_date: '2021/07/15',
          reason_movement: '仕入返品入庫',
          moving_source: 'オルビス本社倉庫',
          destination: '日本ｺﾙﾏｰ㈱(化)',
          quantity: 2,
          note: '',
        },
      ]
    }
  },
  methods: {
    show(item) {
      this.detailData = item
      this.isShow = true
    }
  }
}
</script>
