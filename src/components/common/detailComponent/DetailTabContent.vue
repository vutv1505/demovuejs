<template>
  <b-card>
    <div class="action-menu">
      <slot name="action-menu"></slot>
    </div>
    <b-tabs class="tab-area" v-model="tabIndex">
      <slot name="tab-content" :index="tabIndex"></slot>
    </b-tabs>
  </b-card>
</template>

<script>
import { mapActions, mapGetters } from '@/lib/store'
export default {
  name: 'DetailTabContent',
  data() {
    return {
      tabIndex: 0
    }
  },
  props: {
    namespace: {
      type: String,
      required: false
    }
  },
  methods: {
    ...mapActions(['setIndex'])
  },
  watch: {
    tabIndex() {
      this.setIndex(this.tabIndex)
    }
  }
}
</script>

<style lang="scss" scoped>
.action-menu {
  position: absolute;
  right: 0;
  padding: 4px 8px;

  button {
    border-color: #c8ced3;
  }
}
</style>
