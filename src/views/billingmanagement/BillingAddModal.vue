<template>
  <div>
    <CModal
      :show.sync="showOrderDetail"
      :closeOnBackdrop="false"
      :centered="true"
      size="xl"
    >
      <template #header-wrapper>
        <div class="w-100 h-100 header-container container-border">
          <h6 class="text-center m-auto font-weight-bold">在庫移動情報登録</h6>
        </div>
      </template>
      <template #body-wrapper>
        <CScrollbar class="modal-body body-container-border">
          <div class="body-item-header font-weight-bold">商品情報</div>
          <div class="p-3">
            <CRow>
              <CCol sm="6">
                <div class="label-field-no-wrap">入出庫日</div>
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
                </div>
              </CCol>
              <CCol sm="6">
                <div>
                  移動理由区分
                  <span class="text-danger font-weight-bold">[必須]</span>
                </div>
                <div>
                  <CSelect
                    placeholder="-- 未選択 --"
                    :options="listSelectReason"
                    class="mb-4"
                  />
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6">
                <div class="label-field-no-wrap">
                  商品番号
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
              <CCol sm="6">
                <div>商品名</div>
                <div>
                  <CInput
                    disabled
                    type="number"
                    max="99999999"
                    min="0"
                    v-model="
                      orderInformationDetails.productInformation
                        .numberOfInventory
                    "
                  ></CInput>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6">
                <div class="label-field-no-wrap">ロット番号</div>
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
              <CCol sm="6">
                <div>MK製造記号</div>
                <div>
                  <CInput
                    disabled
                    type="number"
                    max="99999999"
                    min="0"
                    v-model="
                      orderInformationDetails.productInformation
                        .numberOfInventory
                    "
                  ></CInput>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6">
                <div class="label-field-no-wrap">充填日</div>
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
              <CCol sm="6">
                <div>使用期限</div>
                <div>
                  <CInput
                    disabled
                    type="number"
                    max="99999999"
                    min="0"
                    v-model="
                      orderInformationDetails.productInformation
                        .numberOfInventory
                    "
                  ></CInput>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6">
                <div class="label-field-no-wrap">移動元</div>
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
              <CCol sm="6">
                <div>移動元名</div>
                <div>
                  <CInput
                    disabled
                    type="number"
                    max="99999999"
                    min="0"
                    v-model="
                      orderInformationDetails.productInformation
                        .numberOfInventory
                    "
                  ></CInput>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6">
                <div class="label-field-no-wrap">
                  移動先
                  <span class="text-danger font-weight-bold">[必須]</span>
                </div>
                <div>
                  <CInput
                    type="text"
                    maxlength="4"
                    v-model="
                      orderInformationDetails.productInformation
                        .productClassification
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
              <CCol sm="6">
                <div>移動先名</div>
                <div>
                  <CInput
                    disabled
                    type="number"
                    max="99999999"
                    min="0"
                    v-model="
                      orderInformationDetails.productInformation
                        .numberOfInventory
                    "
                  ></CInput>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6">
                <div class="label-field-no-wrap">
                  移動数量
                  <span class="text-danger font-weight-bold">[必須]</span>
                </div>
                <div>
                  <CInput
                    type="text"
                    maxlength="4"
                    v-model="
                      orderInformationDetails.productInformation
                        .productClassification
                    "
                  />
                </div>
              </CCol>
            </CRow>
            <div>
              <div>メモ（移動理由詳細等)</div>
              <CTextarea
                v-model="orderInformationDetails.memo"
                maxlength="256"
              ></CTextarea>
            </div>
          </div>
        </CScrollbar>
      </template>
      <template #footer-wrapper>
        <div class="modal-footer footer-container container-border p-1">
          <CButton
            @click="closeModal"
            color="outline-info"
            class="execute-button"
            >閉じる
          </CButton>
          <CButton
            color="info"
            class="execute-button"
            @click="handleCreateScheduledArrival"
            >登録
          </CButton>
        </div>
      </template> </CModal>
    <confirm-modal ref="confirmModal">
    </confirm-modal>
  </div>
</template>
<script>
import ConfirmModal from '../../components/modals/ConfirmModal'
export default {
  name: 'OrderDetailModal',
  components: {
    ConfirmModal
  },
  data() {
    return {
      listSelectReason: [
        '棚卸調整入庫',
        'その他入庫',
        '廃棄',
        '仕入返品',
        '棚卸調整出庫',
        'その他出庫'
      ],
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
    handleCreateScheduledArrival() {
        this.$refs.confirmModal.show(
          '在庫移動登録確認',
        '在庫移動情報を登録します。'
      )
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
