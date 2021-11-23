<template>
  <div class="detail-container">
    <div :class="['detail-label', { 'full-length': isFullLength }]">
      <slot name="label" />
    </div>
    <div :class="['detail-item', { 'full-length': isFullLength }]">
      <slot name="item" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.detail-container {
  display: flex;
  padding: 0 40px 0 15px;
  margin-top: 24px;
  &.first-row {
    margin-top: 8px;
  }
  &.last-row {
    margin-bottom: 16px;
  }
  .detail-label {
    font-size: 12px;
    max-width: 16.66667%;
    width: 100%;
    padding-left: 1em;
    border-bottom: solid 1px rgb(221, 219, 218);
    &.full-length {
      max-width: 7.88888%;
    }
  }
  .detail-item {
    max-width: 83.33333%;
    width: 100%;
    padding-left: 1em;
    border-bottom: solid 1px rgb(221, 219, 218);
    &.full-length {
      max-width: 92.22222%;
    }
  }
}
</style>

<script>
export default {
  name: 'DetailColContainer',
  props: ['isFullLength']
}
</script>
