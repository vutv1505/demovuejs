<template>
  <transition name="fade">
    <div
      class="save-panel text-center"
      :class="{ close: !isSavePanelOpen }"
      :style="{
        width: width + 'px'
      }"
    >
      <b-row class="py-2">
        <b-col>
          <b-button
            size="sm"
            class="fm-width-button mr-2"
            variant="outline-primary"
            @click="$emit('refresh-table')"
            >キャンセル</b-button
          >
          <action-button
            size="sm"
            class="fm-width-button ml-2"
            variant="primary"
            @click="openModalSaveTable"
            >保存</action-button
          >
        </b-col>
      </b-row>

      <b-modal
        ref="modal"
        @shown="onShown"
        id="modal_confirmSaveTable"
        title="一覧編集 保存"
        scrollable
        ok-title="保存"
        ok-variant="primary btn-sm"
        v-model="isShow"
        @ok="onSaveData"
        cancel-title="キャンセル"
        cancel-variant="outline-primary btn-sm"
        no-close-on-backdrop
        no-close-on-esc
      >
        <div class="py-5">
          <p class="mb-0 fm-center-absolute">
            変更内容を保存しますか？
          </p>
        </div>
      </b-modal>
    </div>
  </transition>
</template>

<script>
import miniToastr from 'mini-toastr'
import { mapGetters, mapState } from '@/lib/store'
import modal from '@/lib/modal'

export default {
  name: 'CatSavePanel',
  data() {
    return {
      isShow: false
    }
  },
  props: {
    isSavePanelOpen: {
      type: Boolean,
      required: true
    },
    onValidate: {
      type: Function,
      default: () => false,
      required: false
    },
    onSaveData: {
      type: Function,
      default: () => {},
      required: false
    }
  },
  computed: {
    ...mapGetters(['toastFadeTime'], () => 'common'),
    ...mapState(
      ['mainOffset.top', 'mainOffset.left', 'mainOffset.width'],
      () => 'document'
    )
  },
  methods: {
    async openModalSaveTable() {
      const isValid = await this.onValidate()
      if (isValid) {
        this.isShow = true
      } else {
        miniToastr.error(
          '更新処理が失敗しました',
          '異常終了',
          this.toastFadeTime
        )
      }
    },
    onShown() {
      modal(this.$refs.modal.$refs)
    }
  }
}
</script>

<style scoped></style>
