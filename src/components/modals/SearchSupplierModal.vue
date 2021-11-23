<template>
  <CModal
    :show.sync="isShow"
    :closeOnBackdrop="false"
    :centered="true"
    size="xl"
  >
    <template #header-wrapper>
      <div class="w-100 h-100 header-container">
        <h6 class="text-center m-auto font-weight-bold">仕入先検索</h6>
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
          :page-title="'仕入先一覧'"
          :page-id="'search-supplier'"
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
                label="仕入先名"
                :maxlength="26"
              />
              <CSelect
                :horizontal="{ label: 'col-sm-5', input: 'col-sm-7' }"
                label="商品分野"
                placeholder="-- 未選択 --"
                :options="['商品1', '商品2']"
              />
            </CForm>
            <CRow>
              <CCol sm="5">
                <label class="col-form-label">取引状態</label>
              </CCol>
              <CCol sm="7" class="mt-auto mb-auto">
                <CForm inline>
                  <CInputCheckbox label="取引中"></CInputCheckbox>
                  <CInputCheckbox
                    label="取引停止"
                    class="ml-auto"
                  ></CInputCheckbox>
                </CForm>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="5">
                <label class="col-form-label">海外専用品取扱</label>
              </CCol>
              <CCol sm="7" class="mt-auto mb-auto">
                <CForm class="" inline>
                  <CInputCheckbox label="取扱あり"></CInputCheckbox>
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
import suppliersData from '../../assets/mockdata/suppliers'

const ITEM_PER_PAGE = 15

export default {
  name: 'SearchSupplierModal',
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
      items: suppliersData,
      headers: [
        {
          key: 'select',
          label: '',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'trading_status',
          label: '取引状態',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;',
          _classes: 'text-center'
        },
        {
          key: 'supplier_code',
          label: '仕入先コード',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;',
          _classes: 'px-2'
        },
        {
          key: 'supplier_name',
          label: '仕入先名',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;',
          _classes: 'px-2'
        },
        {
          key: 'product_type',
          label: '商品分野',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;',
          _classes: 'px-2'
        },
        {
          key: 'handle_oversea',
          label: '海外専用品取扱',
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
      this.$emit('show')
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
