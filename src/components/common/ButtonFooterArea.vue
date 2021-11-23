<template>
  <footer
    v-show="isFooterOpen"
    class="regist-footer"
    :class="{
      'footer-open': isFooterOpen,
      'footer-close': !isFooterOpen
    }"
  >
    <div class="regist-btn-area">
      <b-button
        size="sm"
        variant="outline-info"
        class="cancel-btn"
        @click="$emit('onCancel')"
        >{{ cancelLabel }}</b-button
      >
      <action-button
        size="sm"
        variant="info"
        class="regist-btn"
        @click="$emit('onSave')"
        >{{ okLabel }}</action-button
      >
      <slot name="addition-buttons"></slot>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'ButtonFooterArea',
  props: ['isFooterOpen', 'cancelLabel', 'okLabel']
}
</script>

<style lang="scss" scoped>
.footer-open {
  margin-top: 0;
  transition: all 0.5s;
}
.footer-close {
  margin-top: 62px;
  transition: all 0.5s;
}

.regist-footer {
  width: 100%;
  height: 62px;
  border-radius: 0 0 0.25rem 0.25rem;
  padding: 0 2rem;
  background-color: #fff;
  .regist-btn-area {
    width: 100%;
    height: 62px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .regist-btn {
      margin-left: 10px;
    }
    .regist-btn,
    .cancel-btn {
      width: 120px;
    }
  }
}
</style>
