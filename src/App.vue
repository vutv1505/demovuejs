<template>
  <div class="w-100 h-100">
    <router-view class="h-100"></router-view>
    <loading-over-ray :isLoading="isLoading"></loading-over-ray>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isLoading: false
    }
  }
}
</script>

<style lang="scss">
/* Import Font Awesome Icons Set */
$fa-font-path: '~font-awesome/fonts/';
@import '~font-awesome/scss/font-awesome.scss';
/* Import Simple Line Icons Set */
$simple-line-font-path: '~simple-line-icons/fonts/';
@import '~simple-line-icons/scss/simple-line-icons.scss';
/* Import Flag Icons Set */
@import '~flag-icon-css/css/flag-icon.min.css';
/* Import Bootstrap Vue Styles */
@import '~bootstrap-vue/dist/bootstrap-vue.css';
// Import Main styles for this application
@import 'assets/scss/style';
/* Import handsontable Styles */
@import '~handsontable/dist/handsontable.full.css';
/* Import v-suggestions Styles */
@import '~v-suggestions/dist/v-suggestions.css';
@import '~v-calendar/lib/v-calendar.min.css';
</style>
