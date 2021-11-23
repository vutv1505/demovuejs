<template>
  <b-tabs :class="tabsClass" :lazy="true">
    <b-tab
      class="h-100"
      @click="onActiveTab(tabId)"
      v-for="(tabConfig, tabId) in tabList"
      :title="tabConfig.title"
      :active="tabConfig.active"
      :key="tabId"
      :disabled="tabConfig.disabled"
    >
      <slot :name="'tab-' + tabId"></slot>
    </b-tab>
    <template slot="tabs-end">
      <div class="tab-menu pr-sm-1">
        <slot name="tab-menu" :activeTab="activeTab"></slot>
      </div>
    </template>
  </b-tabs>
</template>

<script>
export default {
  name: 'CategoryTabsBody',
  data() {
    return {
      activeTab: null
    }
  },
  props: {
    border: {
      required: false,
      default: true
    },
    tabList: {
      required: true
    }
  },
  mounted() {
    this.activeTab = Object.keys(this.tabList)[0]
  },
  computed: {
    tabsClass() {
      let tabsClass = 'h-100 tab-area d-flex flex-column'
      if (this.border) {
        tabsClass += ' card'
      }
      return tabsClass
    }
  },
  methods: {
    onActiveTab(activeTab) {
      this.activeTab = activeTab
      this.$emit('change-tab', activeTab)
    }
  }
}
</script>

<style scoped>
.tab-menu {
  margin-left: auto;
  margin-bottom: auto;
  margin-top: auto;
}
</style>
