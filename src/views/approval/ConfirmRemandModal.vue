<template>
  <CModal
    :show.sync="showModal"
    :closeOnBackdrop="false"
    :centered="true"
    size="lg"
  >
    <template #header-wrapper>
      <div class="w-100 header-container modal-border">
        <h6 class="text-center m-auto font-weight-bold">差戻し確認</h6>
      </div>
    </template>
    <template #body-wrapper>
      <div class="modal-body modal-border-left modal-border-right">
        <div class="pl-2 pr-2">
          申請番号：{{ approvalId }} を差戻しします。よろしいですか？
          <div class="mt-2">
            差戻しコメント <span class="text-danger">[必須]</span>
          </div>
          <CTextarea class="mt-1" v-model="comment" maxlength="130"></CTextarea>
        </div>
      </div>
    </template>
    <template #footer-wrapper>
      <button-footer-area
        class="modal-border-left modal-border-right modal-border-bottom"
        is-footer-open="true"
        cancel-label="キャンセル"
        ok-label="はい"
        @onCancel="onCancel"
        @onSave="onSave"
      ></button-footer-area>
    </template>
  </CModal>
</template>

<script>
import ButtonFooterArea from '../../components/common/ButtonFooterArea'

export default {
  name: 'ConfirmRemandModal',
  components: { ButtonFooterArea },
  data() {
    return {
      showModal: false,
      approvalId: '',
      onClickSave: Function,
      comment: ''
    }
  },
  methods: {
    show(approvalId, onClickSave) {
      this.approvalId = approvalId
      this.onClickSave = onClickSave
      this.showModal = true
    },
    dismiss() {
      this.showModal = false
    },
    onSave() {
      if (this.onClickSave) {
        this.onClickSave(this.comment)
      }
      this.dismiss()
    },
    onCancel() {
      this.dismiss()
    }
  }
}
</script>

<style scoped></style>
