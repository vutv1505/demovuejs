<template>
  <b-row>
    <b-col md="12">
      <b-card class="header-menu-area">
        <div slot="header">
          <b-row class="header-menu">
            <b-col md="4" class="horizontal">
              <slot name="back"></slot>
              <div class="screen-flex">
                <div class="screen-title">
                  <slot name="title"></slot>
                </div>
                <div class="screen-title-code"><slot name="code"></slot></div>
              </div>
            </b-col>
            <b-col md="8" class="text-right">
              <div><slot name="local-menu"></slot></div>
            </b-col>
          </b-row>
          <b-row class="header-menu">
            <b-col md="2">
              <div class="screen-title"></div>
            </b-col>
          </b-row>
        </div>

        <b-form>
          <b-row>
            <slot name="local-content"></slot>
          </b-row>
        </b-form>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'DetailHeader'
}
</script>

<style lang="scss" scoped>
.header-menu-area {
  .card-header {
    padding-bottom: 0.3rem !important;
    .card-header-title {
      font-size: 1em;
    }
    .screen-flex {
      display: flex;
      align-items: baseline;
    }
    .screen-title {
      padding-left: 0.5rem;
      padding-right: 1.5rem;
    }
    .screen-title-code {
      font-size: 16px;
    }
  }
}

.horizontal {
  display: flex;
  align-content: flex-end;
}
</style>
