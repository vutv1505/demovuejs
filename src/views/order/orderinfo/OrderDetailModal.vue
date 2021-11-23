<template>
  <CModal
    :show.sync="showOrderDetail"
    :closeOnBackdrop="false"
    :centered="true"
    size="xl"
  >
    <template #header-wrapper>
      <div class="w-100 h-100 header-container container-border">
        <h6 class="text-center m-auto font-weight-bold">発注計画情報詳細</h6>
      </div>
    </template>
    <template #body-wrapper>
      <CScrollbar class="modal-body body-container-border">
        <div class="body-item-header font-weight-bold">
          反映条件<span class="text-danger">[必須]</span>
        </div>
        <div class="p-3">
          <CInputRadioGroup
            :options="orderInformationDetails.reflectConditions"
            :checked.sync="orderInformationDetails.reflectConditionValue"
          ></CInputRadioGroup>
        </div>
        <div class="body-item-header font-weight-bold">上書き対象情報</div>
        <div class="p-3">
          <div class="font-weight-bold">
            更新可能年月期：{{
              orderInformationDetails.informationToBeOverwritten.renewDate
            }}
            前期
          </div>
          <div>
            対象発注番号
            <span class="text-danger font-weight-bold">[必須]</span>
          </div>
          <CInput
            type="number"
            class="pt-2"
            min="0"
            max="9999999"
            v-model="
              orderInformationDetails.informationToBeOverwritten
                .targetOrderNumber
            "
          ></CInput>
        </div>
        <div class="body-item-header font-weight-bold">商品情報</div>
        <div class="p-3">
          <CRow>
            <CCol sm="4">
              <div class="label-field-no-wrap">
                商品番号
                <span class="text-danger font-weight-bold">[必須]</span>
              </div>
              <div>
                <CInput
                  disabled
                  type="number"
                  max="999999"
                  min="0"
                  v-model="
                    orderInformationDetails.productInformation.itemNumber
                  "
                />
                <CButton
                  size="sm"
                  variant="ghost"
                  class="input-icon"
                  @click="findItemNumber"
                >
                  <CIcon name="cil-find-in-page" />
                </CButton>
              </div>
            </CCol>
            <CCol sm="8">
              <div>
                商品名 <span class="text-danger font-weight-bold">[必須]</span>
              </div>
              <div>
                <CInput
                  disabled
                  type="text"
                  maxlength="32"
                  v-model="
                    orderInformationDetails.productInformation.productName
                  "
                ></CInput>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="4">
              <div class="label-field-no-wrap">
                取扱製品区分
                <span class="text-danger font-weight-bold">[必須]</span>
              </div>
              <div>
                <CInput
                  disabled
                  type="text"
                  maxlength="4"
                  v-model="
                    orderInformationDetails.productInformation
                      .productClassification
                  "
                ></CInput>
              </div>
            </CCol>
            <CCol sm="8">
              <div>
                末在庫 <span class="text-danger font-weight-bold">[必須]</span>
              </div>
              <div>
                <CInput
                  disabled
                  type="number"
                  max="99999999"
                  min="0"
                  v-model="
                    orderInformationDetails.productInformation.numberOfInventory
                  "
                ></CInput>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="4">
              <div class="label-field-no-wrap">
                ケース <span class="text-danger font-weight-bold">[必須]</span>
              </div>
              <div>
                <CInput
                  disabled
                  type="number"
                  max="999999"
                  min="0"
                  v-model="orderInformationDetails.productInformation.case"
                ></CInput>
              </div>
            </CCol>
            <CCol sm="4">
              <div class="label-field-no-wrap">
                入目数 <span class="text-danger font-weight-bold">[必須]</span>
              </div>
              <div>
                <CInput
                  disabled
                  type="number"
                  max="999999"
                  min="0"
                  v-model="
                    orderInformationDetails.productInformation.numberOfStitches
                  "
                ></CInput>
              </div>
            </CCol>
            <CCol sm="4">
              <div class="label-field-no-wrap">
                バラ <span class="text-danger font-weight-bold">[必須]</span>
              </div>
              <div>
                <CInput
                  disabled
                  type="number"
                  max="999999"
                  min="0"
                  v-model="
                    orderInformationDetails.productInformation.numberOfRose
                  "
                ></CInput>
              </div>
            </CCol>
          </CRow>
        </div>
        <div class="body-item-header font-weight-bold">計画情報</div>
        <div class="p-3">
          <CRow>
            <CCol sm="6">
              <div class="label-field-no-wrap">
                計画数（調整後)
                <span class="text-danger font-weight-bold">[必須]</span>
              </div>
              <div>
                <CInput
                  type="number"
                  max="999999"
                  min="0"
                  v-model="
                    orderInformationDetails.planingInformation.afterAdjustment
                  "
                />
              </div>
            </CCol>
            <CCol sm="6">
              <div class="label-field-no-wrap">
                計画数（調整前）
                <span class="text-danger font-weight-bold">[必須]</span>
              </div>
              <div>
                <CInput
                  type="number"
                  disabled
                  max="999999"
                  min="0"
                  v-model="
                    orderInformationDetails.planingInformation.beforeAdjustment
                  "
                ></CInput>
              </div>
            </CCol>
          </CRow>
        </div>
        <div class="body-item-header font-weight-bold">発注情報</div>
        <div class="p-3">
          <CRow>
            <CCol sm="4">
              <div class="label-field-no-wrap">
                発注予定(年月)
                <span class="text-danger font-weight-bold">[必須]</span>
              </div>
              <div>
                <masked-input
                  disabled
                  class="form-control"
                  type="text"
                  v-model="
                    orderInformationDetails.orderInformation
                      .orderScheduleSelected
                  "
                  :mask="[/\d/, /\d/, /\d/, /\d/, '/', /0|1/, /\d/]"
                  :guide="true"
                  placeholderChar="_"
                  :showMask="true"
                  :keepCharPositions="true"
                />
              </div>
            </CCol>
            <CCol sm="4">
              <div class="label-field-no-wrap">
                発注予定(期)
                <span class="text-danger font-weight-bold">[必須]</span>
              </div>
              <div>
                <CSelect
                  placeholder=""
                  disabled
                  :options="orderInformationDetails.scheduleOptions"
                />
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="4">
              <div class="label-field-no-wrap">
                納品予定(年月)
                <span class="text-danger font-weight-bold">[必須]</span>
              </div>
              <div>
                <masked-input
                  class="form-control"
                  type="text"
                  v-model="
                    orderInformationDetails.orderInformation
                      .deliveryScheduleSelected
                  "
                  :mask="[/\d/, /\d/, /\d/, /\d/, '/', /0|1/, /\d/]"
                  :guide="true"
                  placeholderChar="_"
                  :showMask="true"
                  :keepCharPositions="true"
                />
              </div>
            </CCol>
            <CCol sm="4">
              <div class="label-field-no-wrap">
                納品予定(期)
                <span class="text-danger font-weight-bold">[必須]</span>
              </div>
              <div>
                <CSelect
                  placeholder=""
                  :options="orderInformationDetails.scheduleOptions"
                />
              </div>
            </CCol>
            <CCol sm="4">
              <div class="label-field-no-wrap">初回納品予定日</div>
              <CInput
                type="date"
                :horizontal="{ input: 'col-sm-12' }"
                max="9999-12-31"
                v-model="
                  orderInformationDetails.orderInformation
                    .deliveryExpectedFirstDate
                "
              />
            </CCol>
          </CRow>
        </div>
        <div class="body-item-header font-weight-bold">その他</div>
        <div class="p-3">
          <div>メモ</div>
          <CTextarea
            v-model="orderInformationDetails.memo"
            maxlength="256"
          ></CTextarea>
        </div>
        <div class="body-item-header font-weight-bold">登録者情報</div>
        <div class="p-3">
          <CRow>
            <CCol sm="4">
              <div>登録者</div>
              <div>
                {{ orderInformationDetails.registrantInformation.name }}
              </div>
            </CCol>
            <CCol sm="8">
              <div>登録日</div>
              <div>
                {{ orderInformationDetails.registrantInformation.date }}
              </div>
            </CCol>
          </CRow>
        </div>
      </CScrollbar>
    </template>
    <template #footer-wrapper>
      <div class="modal-footer footer-container container-border p-1">
        <CButton @click="closeModal" color="outline-info" class="execute-button"
          >キャンセル
        </CButton>
        <CButton
          color="info"
          class="execute-button"
          @click="onChangeOrderInformation"
          >更新
        </CButton>
      </div>
    </template>
  </CModal>
</template>

<script>
import MaskedInput from 'vue-text-mask'

export default {
  name: 'OrderDetailModal',
  components: {
    MaskedInput
  },
  data() {
    return {
      showOrderDetail: false,
      // TODO using ajax to fetch order information details
      orderInformationDetails: {
        reflectConditionValue: '',
        reflectConditions: [
          { value: 'updateOnlyPlan', label: '計画のみ更新' },
          { value: 'overwriteExistOrder', label: '既にある発注書に上書き' },
          { value: 'createNewOrder', label: '新規の発注書を作成' }
        ],
        informationToBeOverwritten: {
          renewDate: '21/05',
          targetOrderNumber: ''
        },
        productInformation: {
          itemNumber: 123456,
          productName: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
          productClassification: '半製品',
          numberOfInventory: 12345678,
          case: 12345678,
          numberOfStitches: 12345678,
          numberOfRose: 12345678
        },
        planingInformation: {
          beforeAdjustment: 123456,
          afterAdjustment: 123456
        },
        scheduleOptions: [
          { value: 'earlyStage', label: '前期' },
          { value: 'lateStage', label: '后期' }
        ],
        orderInformation: {
          orderScheduleSelected: '2021/04',
          orderScheduleStateSelected: { value: 'earlyStage', label: '前期' },
          deliveryScheduleSelected: '2021/06',
          deliveryScheduleStateSelected: { value: 'earlyStage', label: '前期' },
          deliveryExpectedFirstDate: null
        },
        memo:
          'ＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸ',
        registrantInformation: {
          name: '発注管理グループ オルビス 花子',
          date: '2021/04/01'
        }
      }
    }
  },
  methods: {
    showModal() {
      this.showOrderDetail = true
    },
    closeModal() {
      this.showOrderDetail = false
    },
    findItemNumber() {
      console.log('find item number')
    },
    onChangeOrderInformation() {
      this.$emit('onChangeOrderInformation', this.orderInformationDetails)
      this.closeModal()
    }
  }
}
</script>

<style scoped>
.modal-body {
  height: 80vh;
}

.execute-button {
  min-width: 100px;
}

.container-border {
  border: 1px solid gray;
}

.body-container-border {
  border-left: 1px solid gray;
  border-right: 1px solid gray;
}

.input-icon {
  position: absolute;
  right: 1.3rem;
  top: 1.3rem;
}
</style>
