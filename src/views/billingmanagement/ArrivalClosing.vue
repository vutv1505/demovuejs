<template>
  <div class="body-container">
    <common-table-filter-layout
      class="px-3"
      page-id="arrival-closing"
      :current-filter-template="currentFilterTemplate"
      page-title="入荷締め"
      :right-buttons="[
        { text: '更新', clickEvent: onClickSetClosing },
        { text: '取消', clickEvent: onClickCancelClosing }
      ]"
      :left-buttons="[{ text: '全選択/解除' }]"
      pagination
      :table-items="tableItems"
      :table-headers="tableHeaders"
      :is-loading="isLoading"
      :items-per-page="itemsPerPage"
    >
      <template #setting-items>
        <CDropdownItem @click="onClickSetClosing">更新</CDropdownItem>
        <CDropdownItem @click="onClickCancelClosing">取消</CDropdownItem>
      </template>
      <template #advance-filter-body>
        <CForm>
          <CInput
            :horizontal="{ label: 'col-sm-4', input: 'col-sm-8' }"
            :maxlength="7"
            label="請求年月"
            class="mb-4"
          />
          <CSelect
            :horizontal="{ label: 'col-sm-4', input: 'col-sm-8' }"
            label="商品分野"
            placeholder="-- 未選択 --"
            :options="[]"
            class="mb-4"
          />
          <CInput
            :horizontal="{ label: 'col-sm-4', input: 'col-sm-8' }"
            label="仕入先コード"
            class="mb-4"
          >
            <template #label-after-input>
              <CButton size="sm" variant="ghost" class="input-icon">
                <CIcon name="cil-find-in-page" />
              </CButton>
            </template>
          </CInput>

          <div class="form-group form-row">
            <label class="col-sm-4">請求情報状態</label>
            <div class="col-sm-8 pl-4">
              <CRow
                v-for="(dbOption, idx) in cbBillingStatusOptions"
                :key="idx"
              >
                <CInputCheckbox
                  class="col-sm-7 text-left pr-0"
                  :label="dbOption[0].label"
                  :value="dbOption[0].value"
                  name="cbBillingStatus"
                />
                <CInputCheckbox
                  class="col-sm-5 text-left pr-0"
                  :label="dbOption[1].label"
                  :value="dbOption[1].value"
                  name="cbBillingStatus"
                />
              </CRow>
            </div>
          </div>
        </CForm>
      </template>
      <template #select="{}">
        <td class="text-center">
          <input type="checkbox" name="cbSelectArrival" />
        </td>
      </template>
      <template #arrival_type="{item}">
        <td class="text-center">
          {{ item.arrival_type }}
        </td>
      </template>
    </common-table-filter-layout>
    <confirm-modal ref="confirmModal" />
  </div>
</template>

<script>
import { ARRIVAL_CLOSING_LIST } from '../../assets/mockdata/arrival_closing_list'
import ConfirmModal from '../../components/modals/ConfirmModal'
import CommonTableFilterLayout from '../../components/layouts/CommonTableFilterLayout'

const ITEM_PER_PAGE = 15

export default {
  name: 'ArrivalClosing',
  components: { CommonTableFilterLayout, ConfirmModal },
  data() {
    return {
      isLoading: false,
      cbArrivalTypeOptions: [
        { value: 0, label: '国内' },
        { value: 1, label: '海外' }
      ],
      cbBillingStatusOptions: [
        [{ value: 0, label: '入荷締め前' }, { value: 1, label: '照合中' }],
        [{ value: 2, label: '不備有' }, { value: 3, label: '照合済' }],
        [{ value: 4, label: '請求処理' }, { value: 5, label: '請求確定' }]
      ],
      tableItems: ARRIVAL_CLOSING_LIST,
      itemsPerPage: ITEM_PER_PAGE,
      tableHeaders: [
        {
          key: 'select',
          label: '入荷締め対象',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center; width:7%'
        },
        {
          key: 'billing_date',
          label: '請求年月',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'product_type',
          label: '商品分野',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'supplier_code',
          label: '仕入先コード',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        },
        {
          key: 'supplier_name',
          label: '仕入先名',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center; width:26%'
        },
        {
          key: 'billing_status',
          label: '請求情報状態',
          _style:
            'border: 1px solid; border-color: #d8dbe0; text-align: center;'
        }
      ],
      currentFilterTemplate: { searchConditions: {} }
    }
  },
  methods: {
    onClickSearchAdvanceFilter() {},
    onClickSetClosing() {
      this.$refs.confirmModal.show(
        '入荷締め更新',
        '入荷締め情報を更新します。',
        this.processSetClosing
      )
    },
    onClickCancelClosing() {
      this.$refs.confirmModal.show(
        '入荷締め取消',
        '入荷締めを取消します。',
        this.processCancelClosing
      )
    },
    processSetClosing() {
      console.log('SetClosing...')
    },
    processCancelClosing() {
      console.log('CancelClosing...')
    }
  }
}
</script>

<style scoped></style>
