<template>
  <div class="py-5">
    <p class="mb-0 fm-center-absolute">
      {{ message }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'ConfirmDeleteModal',
  props: {
    countRows: {
      type: Number,
      required: false
    },
    screenName: {
      type: String,
      required: true
    },
    isDetail: {
      type: Boolean,
      default: false
    },
    actionName: {
      type: String,
      default: '削除'
    }
  },
  computed: {
    message() {
      if (this.isDetail) {
        return `この${this.screenName}の${this.actionName}を実行しますか？`
      } else {
        return `選択した${this.countRows}件の${this.screenName}の${
          this.actionName
        }を実行しますか？`
      }
    }
  }
}
</script>

<style scoped></style>
