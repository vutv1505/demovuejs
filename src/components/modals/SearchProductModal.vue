<template>
  <CModal
    :show.sync="isShow"
    :closeOnBackdrop="false"
    :centered="true"
    size="xl"
  >
    <template #header-wrapper>
      <div class="w-100 h-100 header-container">
        <h6 class="text-center m-auto font-weight-bold">商品検索</h6>
      </div>
    </template>

    <template #body-wrapper class="modal-body">
      <c-scrollbar
        class="modal-body modal-border-left modal-border-right
         modal-border-bottom modal-border-bottom-left-radius
          modal-border-bottom-right-radius h-76vh"
        style="display: grid"
      >
        <common-table-filter-layout
          :page-title="'商品一覧'"
          :page-id="'search-product'"
          class="pb-5 position-relative"
          pagination
          :table-items="items"
          :table-headers="headers"
          :items-per-page="itemsPerPage"
          :right-buttons="[
            { text: '選択して戻る', clickEvent: onClickSelect },
            { text: 'キャンセル', clickEvent: dismiss }
          ]"
          @onClickSearchAdvance="onClickSearchAdvance"
          @onClickClearAdvance="onClickClearAdvance"
          @onSelectedFilterTemplate="onSelectedFilterTemplate"
          :current-filter-template="currentFilterTemplate"
          :pagination-container-class="'mt-5'"
        >
          <template #setting-items>
            <CDropdownItem>保存</CDropdownItem>
            <CDropdownItem>名前の変更</CDropdownItem>
            <CDropdownItem>削除</CDropdownItem>
          </template>
          <template #advance-filter-body>
            <CForm>
              <CInput
                :horizontal="{ label: 'col-sm-5', input: 'col-sm-7' }"
                label="商品番号"
                :maxlength="6"
              />
              <CInput
                :horizontal="{ label: 'col-sm-5', input: 'col-sm-7' }"
                label="商品コード"
                :maxlength="8"
              />
              <CInput
                :horizontal="{ label: 'col-sm-5', input: 'col-sm-7' }"
                label="商品名"
                :maxlength="47"
              />
            </CForm>
            <CRow class="mt-4">
              <CCol sm="5">
                <label class="col-form-label pt-0">取扱製品区分</label>
              </CCol>
              <CCol sm="7" class="mt-auto mb-auto">
                <CForm>
                  <CInputCheckbox label="通常製品"></CInputCheckbox>
                  <CInputCheckbox label="完成品"></CInputCheckbox>
                  <CInputCheckbox label="半製品"></CInputCheckbox>
                </CForm>
              </CCol>
            </CRow>
            <CRow class="mt-4">
              <CCol sm="5">
                <label class="col-form-label">廃番</label>
              </CCol>
              <CCol sm="7" class="mt-auto mb-auto">
                <CForm class="" inline>
                  <CInputCheckbox label="廃番を含む"></CInputCheckbox>
                </CForm>
              </CCol>
            </CRow>
          </template>
          <template #select="{item, index}">
            <td class="text-center border-bottom">
              <input
                type="radio"
                name="radio-choose-product"
                :value="index"
                :checked="item === selectedItem"
                v-on:change="radioChanged(item)"
              />
            </td>
          </template>
        </common-table-filter-layout>
      </c-scrollbar>
    </template>
    <template #footer-wrapper>
      <div></div>
    </template>
  </CModal>
</template>

<script>
import CommonTableFilterLayout from '../../components/layouts/CommonTableFilterLayout'
import productsData from '../../assets/mockdata/products'

const ITEM_PER_PAGE = 15

export default {
  name: 'SearchProductModal',
  components: {
    CommonTableFilterLayout
  },
  props: {
    onChooseItem: Function
  },
  data() {
    return {
      isShow: false,
      itemsPerPage: ITEM_PER_PAGE,
      currentFilterTemplate: { searchConditions: {} },
      selectedItem: null,
      items: productsData,
      headers: [
        {
          key: 'select',
          label: '',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'product_type',
          label: '商品区分',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;',
          _classes: 'text-center'
        },
        {
          key: 'item_number',
          label: '商品番号',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;',
          _classes: 'px-2'
        },
        {
          key: 'product_code',
          label: '商品コード',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;',
          _classes: 'px-2'
        },
        {
          key: 'product_name',
          label: '商品名',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;',
          _classes: 'px-2'
        },
        {
          key: 'product_alias',
          label: '種別名',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;',
          _classes: 'px-2'
        },
        {
          key: 'release_date',
          label: '発売年月',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;',
          _classes: 'text-center'
        },
        {
          key: 'product_status',
          label: '商品状態',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;',
          _classes: 'text-center'
        }
      ]
    }
  },
  methods: {
    show() {
      this.isShow = true
    },
    dismiss() {
      this.isShow = false
      this.$emit('dismiss')
    },
    radioChanged(item) {
      this.selectedItem = item
    },
    onClickSelect() {
      if (this.onChooseItem && this.selectedItem) {
        this.onChooseItem(this.selectedItem)
        this.dismiss()
      }
    },
    onClickSearchAdvance() {
      console.log('Search Advance')
    },
    onClickClearAdvance() {
      this.currentFilterTemplate = { searchConditions: {} }
    },
    onSelectedFilterTemplate(selectedTemplate) {
      this.currentFilterTemplate = selectedTemplate
    }
  }
}
</script>

<style scoped></style>
