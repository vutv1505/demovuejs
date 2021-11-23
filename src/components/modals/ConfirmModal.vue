<template>
  <CModal
    :show.sync="showModal"
    :closeOnBackdrop="false"
    :centered="true"
    size="lg"
  >
    <template #header-wrapper>
      <div class="w-100 header-container modal-border">
        <h6 class="text-center m-auto font-weight-bold">{{ title }}</h6>
      </div>
    </template>
    <template #body-wrapper>
      <div class="modal-body modal-border-left modal-border-right">
        <div class="pl-2 pr-2">
          {{ message }} <br />
          よろしいですか？
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
      >
        <template #addition-buttons>
          <slot name="addition-buttons"></slot>
        </template>
      </button-footer-area>
    </template>
  </CModal>
</template>

<script>
import ButtonFooterArea from '../common/ButtonFooterArea'

export default {
  name: 'ConfirmModal',
  components: { ButtonFooterArea },
  data() {
    return {
      title: '',
      message: '',
      showModal: false,
      onPositive: Function,
      onNegative: Function
    }
  },
  methods: {
    show(title, message, onPositive = null, onNegative = null) {
      this.title = title
      this.message = message
      this.onPositive = onPositive
      this.onNegative = onNegative
      this.showModal = true
    },
    dismiss() {
      this.showModal = false
    },
    onSave() {
      if (this.onPositive) {
        this.onPositive()
      }
      this.dismiss()
    },
    onCancel() {
      if (this.onNegative) {
        this.onNegative()
      }
      this.dismiss()
    }
  }
}
</script>

<style scoped></style>
