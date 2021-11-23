<template>
  <div>
    <div class="d-flex justify-content-center">
      <common-alert
        ref="commonAlert"
        class="position-absolute w-50 z-index-9999"
      ></common-alert>
    </div>
    <div>
      <common-table-filter-layout
        ref="tableFilterLayout"
        page-title="在庫移動情報照会"
        pagination
        class="px-3"
        :table-items="tableItems"
        :table-headers="tableHeaders"
        :is-loading="isLoading"
        :items-per-page="itemsPerPage"
        :right-buttons="[
          {
            text: '倉庫へ移動',
          },
          {
            text: '仕入先へ移動',
          }
        ]"
      >
        <template #choice="{index, item}">
          <td class="text-center border-bottom">
            <input
              type="radio"
              name="chooseOrderInquiryRadio"
              :value="index"
              :checked="item.choice"
            />
          </td>
        </template>
        <template #item_number="{ item }">
          <td class="border-bottom">
            <u class="hand-pointer" @click="handleShowDetail(item)">{{
                item.item_number
              }}</u>
          </td>
        </template>
      </common-table-filter-layout>
    </div>
    <movement-information-detail
      ref="movementInformationDetail"
    >
    </movement-information-detail>
  </div>
</template>
<script>
import CommonTableFilterLayout from '../../components/layouts/CommonTableFilterLayout'
import MovementInformationDetail from './MovementInformationDetail'
const ITEMS_PER_PAGE = 20
export default {
  components: {
    CommonTableFilterLayout ,
    MovementInformationDetail,
  },
  data() {
    return {
      isLoading: false,
      itemsPerPage: ITEMS_PER_PAGE,
      tableItems: [
        {
          choice: false,
          item_number: '9372H',
          product_name: '新オルビスユージュレパック（半)',
          lot_number: 1,
          storage_location: '日本ｺﾙﾏｰ㈱(化)',
          transfer_date: '2021/07/10'
        }
      ],
      tableHeaders: [
        {
          key: 'choice',
          label: '',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center; width:5%'
        },
        {
          key: 'item_number',
          label: '商品番号',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center; width:13%'
        },
        {
          key: 'product_name',
          label: '商品名',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'lot_number',
          label: 'ロット番号',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center; width:20%'
        },
        {
          key: 'storage_location',
          label: '保管先',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center; width:20%'
        },
        {
          key: 'transfer_date',
          label: '最終在修移動日',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center; width:15%'
        },
      ],
    }
  },
  methods: {
    handleShowDetail(item) {
      if (item) {
        this.$refs.movementInformationDetail.show(item)
      }
    }
  }
}
</script>
