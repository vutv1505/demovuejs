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
        page-title="ロット番号情報照会"
        page-id="OPOS-Purchase-Inquiry"
        pagination
        class="px-3"
        :table-items="computedTableItems"
        :table-headers="tableHeaders"
        :is-loading="isLoading"
        :items-per-page="itemsPerPage"
        :right-buttons="[
          {
            text: 'ロット番号情報更新',
          }
        ]"
        :current-filter-template="currentFilterTemplate"
      >
        <template #advance-filter-body>
          <CForm>
            <validation-provider
              name="商品番号"
              :rules="{ numberRequiredLength: 6 }"
              v-slot="{ errors }"
              v-model="currentFilterTemplate.searchConditions.supplierCode"
            >
              <CInput
                :horizontal="{ label: 'col-sm-5', input: 'col-sm-7' }"
                addInputClasses="pr-5"
                label="仕入先コード"
                type="number"
              >
                <template #label-after-input>
                  <CButton
                    size="sm"
                    variant="ghost"
                    class="input-icon"
                  >
                    <CIcon name="cil-find-in-page" />
                  </CButton>
                </template>
                <template #invalid-feedback>
                <span class="valid-msg-area fm-font-standard mt-1 mb-1">
                  {{ errors[0] }}
                </span>
                </template>
              </CInput>
            </validation-provider>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5">商品名</label>
              <div class="col-sm-7">
                <input
                  type="text"
                  maxlength="32"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5">ロット番号</label>
              <div class="col-sm-7">
                <input
                  type="text"
                  maxlength="32"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5">MK製造記号</label>
              <div class="col-sm-7">
                <input
                  type="text"
                  maxlength="32"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5">充填日</label>
              <div class="col-sm-7">
                <date-time-picker
                  class="inside-dropdown"
                  param-mode="yearMonth"
                  placeholder="yyyy/mm"
                />
                <div>~</div>
                <date-time-picker
                  class="inside-dropdown"
                  param-mode="yearMonth"
                  placeholder="yyyy/mm"
                />
              </div>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5">使用期限</label>
              <div class="col-sm-7">
                <date-time-picker
                  class="inside-dropdown"
                  param-mode="yearMonth"
                  placeholder="yyyy/mm"
                />
                <div>~</div>
                <date-time-picker
                  class="inside-dropdown"
                  param-mode="yearMonth"
                  placeholder="yyyy/mm"
                />
              </div>
            </div>
          </CForm>
        </template>
        <template #select="{index}">
          <td class="text-center">
            <input
              type="checkbox"
              name="cbSelectBilling"
              :value="index"
            />
          </td>
        </template>
      </common-table-filter-layout>
    </div>
  </div>
</template>
<script>
import CommonTableFilterLayout from '../../components/layouts/CommonTableFilterLayout'
import { DatePattern, formatDate } from '../../lib/DateUtils'
const ITEMS_PER_PAGE = 20
import { ValidationProvider } from 'vee-validate'
import _ from 'lodash'
import DateTimePicker from '@/components/customInput/DateTimePicker'
export default {
  components: {
    CommonTableFilterLayout,
    ValidationProvider,
    DateTimePicker
  },
  data() {
    return {
      currentFilterTemplate: { searchConditions: {} },
      isLoading: false,
      itemsPerPage: ITEMS_PER_PAGE,
      tableItems: [
        {
          select: false,
          itemNumber: 123,
          productName: 'ﾎﾜｲﾄｸﾘｱｴｯｾﾝｽ ｻﾝﾌﾟﾙ',
          lotNumber: 1,
          MK_manufacturing_code: 'A1B2C3',
          fillingDay: '2021/06/01',
          periodOfUse: '2021/06/01',
        },
        {
          select: false,
          itemNumber: 123,
          productName: 'ﾎﾜｲﾄｸﾘｱｴｯｾﾝｽ ｻﾝﾌﾟﾙ',
          lotNumber: 1,
          MK_manufacturing_code: 'A1B2C3',
          fillingDay: '2021/06/01',
          periodOfUse: '2021/06/01',
        },
        {
          select: false,
          itemNumber: 123,
          productName: 'ﾎﾜｲﾄｸﾘｱｴｯｾﾝｽ ｻﾝﾌﾟﾙ',
          lotNumber: 1,
          MK_manufacturing_code: 'A1B2C3',
          fillingDay: '2021/06/01',
          periodOfUse: '2021/06/01',
        },
        {
          select: false,
          itemNumber: 123,
          productName: 'ﾎﾜｲﾄｸﾘｱｴｯｾﾝｽ ｻﾝﾌﾟﾙ',
          lotNumber: 1,
          MK_manufacturing_code: 'A1B2C3',
          fillingDay: '2021/06/01',
          periodOfUse: '2021/06/01',
        },
        {
          select: false,
          itemNumber: 123,
          productName: 'ﾎﾜｲﾄｸﾘｱｴｯｾﾝｽ ｻﾝﾌﾟﾙ',
          lotNumber: 1,
          MK_manufacturing_code: 'A1B2C3',
          fillingDay: '2021/06/01',
          periodOfUse: '2021/06/01',
        },
        {
          select: false,
          itemNumber: 123,
          productName: 'ﾎﾜｲﾄｸﾘｱｴｯｾﾝｽ ｻﾝﾌﾟﾙ',
          lotNumber: 1,
          MK_manufacturing_code: 'A1B2C3',
          fillingDay: '2021/06/01',
          periodOfUse: '2021/06/01',
        },
      ],
      tableHeaders: [
      {
        key: 'select',
        label: '更新対象',
        _style:
          'border: 1px solid; border-color: #d8dbe0; text-align: center; width:9%'
      },
      {
        key: 'itemNumber',
        label: '商品番号',
        _style:
          'border: 1px solid; border-color: #d8dbe0; text-align: center; width:13%'
      },
      {
        key: 'productName',
        label: '商品名',
        _style:
          'border: 1px solid; border-color: #d8dbe0; text-align: center; width:23%'
      },
      {
        key: 'lotNumber',
        label: 'ロット番号',
        _style:
          'border: 1px solid; border-color: #d8dbe0; text-align: center;width:10%'
      },
      {
        key: 'MK_manufacturing_code',
        label: 'MK製造記号',
        _style: 'border: 1px solid; border-color: #d8dbe0; text-align: center;width:15%'
      },
      {
        key: 'fillingDay',
        label: '充填日',
        _style:
          'border: 1px solid; border-color: #d8dbe0; text-align: center;width:15%'
      },
      {
        key: 'periodOfUse',
        label: '使用期限',
        _style:
          'border: 1px solid; border-color: #d8dbe0; text-align: center;width:15%'
      }
    ],
    }
  },
  computed: {
    computedTableItems() {
      return _.cloneDeep(this.tableItems).map((item, index) => {
        item.originIndex = index
        item.purchaseScheduleDate = formatDate(
          item.purchaseScheduleDate,
          DatePattern.YYYY_MM_DD
        )
        item.purchaseDate = formatDate(
          item.purchaseDate,
          DatePattern.YYYY_MM_DD
        )
        return item
      })
    }
  },
}
</script>
<style scoped>
</style>
